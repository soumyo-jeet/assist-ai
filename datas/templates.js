export const coverLetterTemplates = {
  tones: [
    {
      id: "professional",
      name: "Professional",
      description: "Formal and business-appropriate tone suitable for corporate environments"
    },
    {
      id: "enthusiastic",
      name: "Enthusiastic",
      description: "Energetic and passionate tone that shows excitement for the role"
    },
    {
      id: "confident",
      name: "Confident",
      description: "Self-assured tone that demonstrates strong belief in capabilities"
    },
    {
      id: "conversational",
      name: "Conversational",
      description: "Friendly and approachable tone that feels natural and genuine"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Innovative and imaginative tone for creative industries"
    }
  ],

  industries: [
    {
      id: "technology",
      name: "Technology",
      jobTitles: [
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps Engineer",
        "Data Scientist",
        "Machine Learning Engineer",
        "Product Manager",
        "UI/UX Designer",
        "QA Engineer",
        "System Administrator",
        "Security Engineer",
        "Cloud Architect"
      ]
    },
    {
      id: "finance",
      name: "Finance",
      jobTitles: [
        "Financial Analyst",
        "Investment Banker",
        "Accountant",
        "Financial Advisor",
        "Risk Analyst",
        "Portfolio Manager",
        "Credit Analyst",
        "Compliance Officer",
        "Treasury Analyst",
        "Financial Planner"
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare",
      jobTitles: [
        "Registered Nurse",
        "Physician Assistant",
        "Medical Laboratory Scientist",
        "Healthcare Administrator",
        "Physical Therapist",
        "Occupational Therapist",
        "Pharmacist",
        "Medical Assistant",
        "Healthcare IT Specialist",
        "Clinical Research Coordinator"
      ]
    },
    {
      id: "marketing",
      name: "Marketing",
      jobTitles: [
        "Marketing Manager",
        "Digital Marketing Specialist",
        "Content Marketing Manager",
        "SEO Specialist",
        "Social Media Manager",
        "Brand Manager",
        "Marketing Analyst",
        "Public Relations Specialist",
        "Email Marketing Specialist",
        "Growth Hacker"
      ]
    },
    {
      id: "education",
      name: "Education",
      jobTitles: [
        "Teacher",
        "Professor",
        "School Administrator",
        "Curriculum Developer",
        "Educational Consultant",
        "Instructional Designer",
        "School Counselor",
        "Librarian",
        "Education Technology Specialist",
        "Academic Advisor"
      ]
    },
    {
      id: "engineering",
      name: "Engineering",
      jobTitles: [
        "Mechanical Engineer",
        "Electrical Engineer",
        "Civil Engineer",
        "Chemical Engineer",
        "Aerospace Engineer",
        "Biomedical Engineer",
        "Environmental Engineer",
        "Industrial Engineer",
        "Structural Engineer",
        "Systems Engineer"
      ]
    },
    {
      id: "sales",
      name: "Sales",
      jobTitles: [
        "Sales Representative",
        "Account Executive",
        "Business Development Manager",
        "Sales Manager",
        "Inside Sales Specialist",
        "Outside Sales Representative",
        "Key Account Manager",
        "Sales Engineer",
        "Customer Success Manager",
        "Territory Sales Manager"
      ]
    },
    {
      id: "hr",
      name: "Human Resources",
      jobTitles: [
        "HR Manager",
        "Recruiter",
        "Talent Acquisition Specialist",
        "HR Business Partner",
        "Training Coordinator",
        "Employee Relations Specialist",
        "Compensation Analyst",
        "Benefits Administrator",
        "HRIS Specialist",
        "Organizational Development Consultant"
      ]
    },
    {
      id: "consulting",
      name: "Consulting",
      jobTitles: [
        "Management Consultant",
        "Strategy Consultant",
        "IT Consultant",
        "Financial Consultant",
        "Operations Consultant",
        "Change Management Consultant",
        "Business Analyst",
        "Project Manager",
        "Program Manager",
        "Solution Architect"
      ]
    },
    {
      id: "creative",
      name: "Creative",
      jobTitles: [
        "Graphic Designer",
        "Art Director",
        "Copywriter",
        "Creative Director",
        "Video Editor",
        "Photographer",
        "Illustrator",
        "Brand Designer",
        "Motion Graphics Designer",
        "Content Creator"
      ]
    }
  ]
};

export const getJobTitlesForIndustry = (industryId) => {
  const industry = coverLetterTemplates.industries.find(ind => ind.id === industryId);
  return industry ? industry.jobTitles : [];
};

export const getToneById = (toneId) => {
  return coverLetterTemplates.tones.find(tone => tone.id === toneId);
};

export const getIndustryById = (industryId) => {
  return coverLetterTemplates.industries.find(industry => industry.id === industryId);
};