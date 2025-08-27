export const sections = [
  { 
    id: "experience", 
    title: "Experience", 
    short: "Where I've worked",
    cta: "View timeline",
    content: [
      "Senior Developer at TechCorp (2022-Present)",
      "Full Stack Developer at StartupXYZ (2020-2022)",
      "Junior Developer at BigTech Inc (2018-2020)"
    ]
  },
  { 
    id: "projects", 
    title: "Projects", 
    short: "Things I built",
    cta: "See portfolio",
    content: [
      "E-commerce platform with React & Node.js",
      "Mobile app for local businesses",
      "Open-source contribution to popular libraries"
    ]
  },
  { 
    id: "tech", 
    title: "Tech Stack", 
    short: "What I use",
    cta: "Explore skills",
    content: [
      "Frontend: React, Vue, TypeScript, Tailwind CSS",
      "Backend: Node.js, Python, PostgreSQL, MongoDB",
      "DevOps: Docker, AWS, CI/CD, Kubernetes"
    ]
  },
  { 
    id: "education", 
    title: "Education", 
    short: "How I learned",
    cta: "View credentials",
    content: [
      "Master's in Computer Science, Tech University",
      "Bachelor's in Software Engineering",
      "Various certifications in cloud and development"
    ]
  }
] 

export const sectionIds = sections.map(section => section.id) 