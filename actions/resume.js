"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords

    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export async function suggestSkills(industry, currentSkills = "") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
    Based on the industry "${industry}", suggest relevant technical and soft skills.
    Current skills: ${currentSkills}

    Provide a comma-separated list of 10-15 relevant skills that would be valuable for this industry.
    Include a mix of technical skills, soft skills, and industry-specific competencies.
    Focus on in-demand skills for ${industry} roles.

    Return only the comma-separated list of skills.
  `;

  try {
    const result = await model.generateContent(prompt);
    const skills = result.response.text().trim();
    return skills;
  } catch (error) {
    console.error("Error suggesting skills:", error);
    throw new Error("Failed to suggest skills");
  }
}

export async function suggestExperienceDescription(jobTitle, company, achievements = "") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
    Write a compelling job description for a ${jobTitle} position at ${company}.
    ${achievements ? `Include these achievements: ${achievements}` : ''}

    Requirements:
    1. Start with strong action verbs
    2. Include quantifiable results where possible
    3. Use industry-specific terminology
    4. Keep it concise but impactful (3-6 bullet points)
    5. Focus on accomplishments and impact

    Format as bullet points.
  `;

  try {
    const result = await model.generateContent(prompt);
    const description = result.response.text().trim();
    return description;
  } catch (error) {
    console.error("Error suggesting experience description:", error);
    throw new Error("Failed to suggest experience description");
  }
}

export async function suggestSummary(industry, experience, skills) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
    Write a professional summary for someone with ${experience} years of experience in ${industry}.
    Skills: ${skills}

    Requirements:
    1. 2-3 sentences maximum
    2. Highlight key strengths and expertise
    3. Show career focus and goals
    4. Use confident, professional language
    5. Include relevant keywords for ATS

    Make it personalized and compelling.
  `;

  try {
    const result = await model.generateContent(prompt);
    const summary = result.response.text().trim();
    return summary;
  } catch (error) {
    console.error("Error suggesting summary:", error);
    throw new Error("Failed to suggest summary");
  }
}

export async function exportResumeAsJSON(resumeId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resume = await db.resume.findUnique({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) throw new Error("Resume not found");

  // Parse the markdown content and convert to structured JSON
  // This is a simplified version - in a real implementation, you'd want more sophisticated parsing
  const resumeData = {
    personalInfo: {
      name: user.name,
      email: user.email,
      industry: user.industry,
      experience: user.experience,
      bio: user.bio,
    },
    skills: user.skills,
    resume: {
      id: resume.id,
      template: resume.template,
      sectionOrder: resume.sectionOrder,
      content: resume.content,
      atsScore: resume.atsScore,
      feedback: resume.feedback,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    },
    exportDate: new Date().toISOString(),
  };

  return resumeData;
}

export async function importLinkedInData({ method, profileUrl, profileData }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let parsedData = {};

  if (method === "url" && profileUrl) {
    // For URL method, we'd typically use LinkedIn API
    // For now, return a placeholder response
    throw new Error("LinkedIn URL import is not yet implemented. Please use the paste data method.");
  } else if (method === "paste" && profileData) {
    // Parse the pasted LinkedIn data
    const prompt = `
      Parse the following LinkedIn profile data and extract structured information.
      Return a JSON object with the following structure:
      {
        "summary": "professional summary text",
        "experience": [
          {
            "title": "Job Title",
            "company": "Company Name",
            "duration": "Start Date - End Date",
            "description": "Job description"
          }
        ],
        "education": [
          {
            "degree": "Degree Name",
            "school": "School Name",
            "year": "Graduation Year"
          }
        ],
        "skills": ["skill1", "skill2", "skill3"]
      }

      LinkedIn Data:
      ${profileData}

      Extract as much relevant information as possible. If certain sections are missing, omit them from the JSON.
      Focus on professional experience, education, and skills.
    `;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      // Try to parse the JSON response
      try {
        // Remove any markdown formatting if present
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || [null, responseText];
        const jsonText = jsonMatch[1] || responseText;

        parsedData = JSON.parse(jsonText);
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        // Fallback: create a basic structure
        parsedData = {
          summary: "Imported from LinkedIn profile data",
          experience: [],
          education: [],
          skills: []
        };
      }
    } catch (error) {
      console.error("Error parsing LinkedIn data:", error);
      throw new Error("Failed to parse LinkedIn profile data");
    }
  }

  return parsedData;
}