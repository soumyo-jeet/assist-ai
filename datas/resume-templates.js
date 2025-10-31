export const resumeTemplates = {
  modern: {
    id: "modern",
    name: "Modern",
    description: "Clean, contemporary design with subtle colors and modern typography",
    css: `
      .resume-modern {
        font-family: 'Inter', 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #374151;
        max-width: 800px;
        margin: 0 auto;
        background: white;
      }
      .resume-modern h1 {
        color: #1f2937;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        border-bottom: 3px solid #3b82f6;
        padding-bottom: 0.5rem;
      }
      .resume-modern h2 {
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        border-left: 4px solid #3b82f6;
        padding-left: 1rem;
      }
      .resume-modern .contact-info {
        background: #f8fafc;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        text-align: center;
      }
      .resume-modern .contact-info a {
        color: #3b82f6;
        text-decoration: none;
      }
      .resume-modern .entry {
        margin-bottom: 1.5rem;
        padding-left: 1rem;
        border-left: 2px solid #e5e7eb;
      }
      .resume-modern .entry-title {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }
      .resume-modern .entry-org {
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .resume-modern .entry-date {
        color: #9ca3af;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
    `,
    sections: ["contact", "summary", "experience", "education", "skills", "projects"]
  },

  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional, professional layout with serif fonts and formal styling",
    css: `
      .resume-classic {
        font-family: 'Times New Roman', 'Georgia', serif;
        line-height: 1.5;
        color: #000000;
        max-width: 800px;
        margin: 0 auto;
        background: white;
      }
      .resume-classic h1 {
        color: #000000;
        font-size: 2.25rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .resume-classic h2 {
        color: #000000;
        font-size: 1.25rem;
        font-weight: bold;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #000000;
        padding-bottom: 0.25rem;
      }
      .resume-classic .contact-info {
        text-align: center;
        margin-bottom: 1.5rem;
        font-style: italic;
      }
      .resume-classic .contact-info a {
        color: #000000;
        text-decoration: none;
      }
      .resume-classic .entry {
        margin-bottom: 1rem;
      }
      .resume-classic .entry-title {
        font-weight: bold;
        margin-bottom: 0.25rem;
      }
      .resume-classic .entry-org {
        font-style: italic;
        margin-bottom: 0.5rem;
      }
      .resume-classic .entry-date {
        float: right;
        font-size: 0.875rem;
      }
      .resume-classic .entry::after {
        content: "";
        display: table;
        clear: both;
      }
    `,
    sections: ["contact", "summary", "experience", "education", "skills", "projects"]
  },

  creative: {
    id: "creative",
    name: "Creative",
    description: "Bold, artistic design with vibrant colors and creative layouts",
    css: `
      .resume-creative {
        font-family: 'Poppins', 'Helvetica', sans-serif;
        line-height: 1.7;
        color: #2d3748;
        max-width: 800px;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      }
      .resume-creative h1 {
        color: #ffffff;
        font-size: 2.75rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      .resume-creative h2 {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        background: rgba(255,255,255,0.1);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        backdrop-filter: blur(10px);
      }
      .resume-creative .contact-info {
        background: rgba(255,255,255,0.1);
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      .resume-creative .contact-info a {
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
      }
      .resume-creative .entry {
        background: rgba(255,255,255,0.05);
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        border-left: 4px solid #ffd700;
      }
      .resume-creative .entry-title {
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 0.25rem;
        font-size: 1.1rem;
      }
      .resume-creative .entry-org {
        color: #e2e8f0;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .resume-creative .entry-date {
        color: #cbd5e0;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
      .resume-creative .skills-section {
        background: rgba(255,255,255,0.05);
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
      }
      .resume-creative .skill-tag {
        display: inline-block;
        background: #ffd700;
        color: #2d3748;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        margin: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `,
    sections: ["contact", "summary", "experience", "education", "skills", "projects"]
  }
};

export const defaultSectionOrder = [
  "contact",
  "summary",
  "experience",
  "education",
  "skills",
  "projects"
];

export const sectionLabels = {
  contact: "Contact Information",
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects"
};

export const getTemplateById = (templateId) => {
  return resumeTemplates[templateId] || resumeTemplates.modern;
};