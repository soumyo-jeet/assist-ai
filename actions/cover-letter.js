
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Generate 3 different variants
  const variants = [];
  const variantStyles = [
    { name: "variant1", style: "concise and impactful" },
    { name: "variant2", style: "narrative and story-driven" },
    { name: "variant3", style: "achievement-focused" }
  ];

  for (const variant of variantStyles) {
    const prompt = `
      Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.

      About the candidate:
      - Industry: ${user.industry}
      - Years of Experience: ${user.experience}
      - Skills: ${user.skills?.join(", ")}
      - Professional Background: ${user.bio}

      Job Description:
      ${data.jobDescription}

      Template Settings:
      - Tone: ${data.tone}
      - Industry: ${data.industry}

      Requirements for this ${variant.style} version:
      1. Use a ${data.tone} tone appropriate for the ${data.industry} industry
      2. Highlight relevant skills and experience
      3. Show understanding of the company's needs
      4. Keep it concise (max 400 words)
      5. Use proper business letter formatting in markdown
      6. Include specific examples of achievements
      7. Relate candidate's background to job requirements
      8. Make this version ${variant.style} - focus on different aspects than other variants

      IMPORTANT: Write this as if a real person wrote it, not an AI. Use:
      - Natural language variations and personal touches
      - Slight imperfections that show humanity
      - Varied sentence lengths (some short, some long)
      - Personal anecdotes or specific examples
      - Authentic enthusiasm without being over-the-top
      - Industry-specific terminology used naturally
      - Avoid robotic phrases like "I am excited to" - use "I'm really interested in" instead
      - Include subtle personality hints that feel genuine

      Format the letter in markdown. Make it sound like a human professional wrote it.
    `;

    try {
      const result = await model.generateContent(prompt);
      const content = result.response.text().trim();

      variants.push({
        id: variant.name,
        content,
        style: variant.style,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error generating ${variant.name}:`, error.message);
      // Continue with other variants even if one fails
    }
  }

  if (variants.length === 0) {
    throw new Error("Failed to generate any cover letter variants");
  }

  const coverLetter = await db.coverLetter.create({
    data: {
      content: variants[0].content, // Keep first variant as main content for backward compatibility
      jobDescription: data.jobDescription,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      tone: data.tone,
      industry: data.industry,
      variants,
      selectedVariant: variants[0].id,
      status: "completed",
      userId: user.id,
    },
  });

  return coverLetter;
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function rewriteCoverLetter(coverLetterId, variantId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const coverLetter = await db.coverLetter.findUnique({
    where: {
      id: coverLetterId,
      userId: user.id,
    },
  });

  if (!coverLetter) throw new Error("Cover letter not found");

  const variant = coverLetter.variants.find(v => v.id === variantId);
  if (!variant) throw new Error("Variant not found");

  const prompt = `
    Rewrite this cover letter with a fresh perspective and different wording while maintaining the same key information and professional tone.

    Original letter:
    ${variant.content}

    Requirements:
    1. Keep the same structure and key points
    2. Use different wording and sentence structure
    3. Maintain professional tone appropriate for ${coverLetter.industry} industry
    4. Keep similar length
    5. Make it sound natural and human-written
    6. Focus on different achievements or aspects than the original

    Return only the rewritten cover letter in markdown format.
  `;

  try {
    const result = await model.generateContent(prompt);
    const newContent = result.response.text().trim();

    // Update the variant in the database
    const updatedVariants = coverLetter.variants.map(v =>
      v.id === variantId
        ? { ...v, content: newContent, createdAt: new Date().toISOString() }
        : v
    );

    return await db.coverLetter.update({
      where: { id: coverLetterId },
      data: {
        variants: updatedVariants,
        content: variantId === coverLetter.selectedVariant ? newContent : coverLetter.content,
      },
    });
  } catch (error) {
    console.error("Error rewriting cover letter:", error.message);
    throw new Error("Failed to rewrite cover letter");
  }
}

export async function shortenCoverLetter(coverLetterId, variantId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const coverLetter = await db.coverLetter.findUnique({
    where: {
      id: coverLetterId,
      userId: user.id,
    },
  });

  if (!coverLetter) throw new Error("Cover letter not found");

  const variant = coverLetter.variants.find(v => v.id === variantId);
  if (!variant) throw new Error("Variant not found");

  const prompt = `
    Shorten this cover letter while keeping all essential information and impact.

    Original letter:
    ${variant.content}

    Requirements:
    1. Reduce length by 20-30%
    2. Keep all key achievements and qualifications
    3. Maintain professional tone
    4. Ensure it still flows naturally
    5. Remove redundant phrases while keeping impact

    Return only the shortened cover letter in markdown format.
  `;

  try {
    const result = await model.generateContent(prompt);
    const newContent = result.response.text().trim();

    // Update the variant in the database
    const updatedVariants = coverLetter.variants.map(v =>
      v.id === variantId
        ? { ...v, content: newContent, createdAt: new Date().toISOString() }
        : v
    );

    return await db.coverLetter.update({
      where: { id: coverLetterId },
      data: {
        variants: updatedVariants,
        content: variantId === coverLetter.selectedVariant ? newContent : coverLetter.content,
      },
    });
  } catch (error) {
    console.error("Error shortening cover letter:", error.message);
    throw new Error("Failed to shorten cover letter");
  }
}

export async function expandCoverLetter(coverLetterId, variantId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const coverLetter = await db.coverLetter.findUnique({
    where: {
      id: coverLetterId,
      userId: user.id,
    },
  });

  if (!coverLetter) throw new Error("Cover letter not found");

  const variant = coverLetter.variants.find(v => v.id === variantId);
  if (!variant) throw new Error("Variant not found");

  const prompt = `
    Expand this cover letter by adding more specific details and examples while maintaining professional tone.

    Original letter:
    ${variant.content}

    Candidate background:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}

    Job details:
    - Company: ${coverLetter.companyName}
    - Position: ${coverLetter.jobTitle}
    - Description: ${coverLetter.jobDescription}

    Requirements:
    1. Add 20-30% more content with specific examples
    2. Include more detailed achievements
    3. Add relevant skills and experiences
    4. Maintain professional tone appropriate for ${coverLetter.industry} industry
    5. Keep the letter well-structured and flowing naturally

    Return only the expanded cover letter in markdown format.
  `;

  try {
    const result = await model.generateContent(prompt);
    const newContent = result.response.text().trim();

    // Update the variant in the database
    const updatedVariants = coverLetter.variants.map(v =>
      v.id === variantId
        ? { ...v, content: newContent, createdAt: new Date().toISOString() }
        : v
    );

    return await db.coverLetter.update({
      where: { id: coverLetterId },
      data: {
        variants: updatedVariants,
        content: variantId === coverLetter.selectedVariant ? newContent : coverLetter.content,
      },
    });
  } catch (error) {
    console.error("Error expanding cover letter:", error.message);
    throw new Error("Failed to expand cover letter");
  }
}

export async function saveCoverLetterVariant(coverLetterId, variantId, content = null, finalize = false) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const coverLetter = await db.coverLetter.findUnique({
    where: {
      id: coverLetterId,
      userId: user.id,
    },
  });

  if (!coverLetter) throw new Error("Cover letter not found");

  let updateData = {};

  if (content) {
    // Update specific variant content
    const updatedVariants = coverLetter.variants.map(v =>
      v.id === variantId
        ? { ...v, content, createdAt: new Date().toISOString() }
        : v
    );
    updateData.variants = updatedVariants;
  }

  if (finalize) {
    updateData.selectedVariant = variantId;
    updateData.content = content || coverLetter.variants.find(v => v.id === variantId)?.content || coverLetter.content;
    updateData.status = "completed";
  }

  return await db.coverLetter.update({
    where: { id: coverLetterId },
    data: updateData,
  });
}
