import { ConciergeBell } from "lucide-react"

export const sections = [
  { 
    id: "experience", 
    title: "Experience", 
    short: "TOP BINS!!!",
    cta: "View timeline",
    content: [
      {
        title: "Software Engineering Intern",
        company: "Narb.",
        logo: "/Pictures/narbtechnology_logo.svg", //
        period: "September 2025 - Present",
        description: "Incoming Software Engineering Intern",
        techStack: [],
        achievements: [
          
        ]
      },
      {
        title: "ML Researcher",
        company: "Center for Artificial Intelligence in Science and Engineering (ARTISAN)",
        logo: "/Pictures/GT_Computing.svg", // Updated to use GT.svg for GRAIT-DM
        period: "May 2025 - Present",
        description: "Building autoencoders to reproduce protein structures by compressing and regenerating AlphaFold2's Evoformer embeddings from OpenFold.",
        techStack: ["Python", "PyTorch", "NumPy", "HPC", "NLP", "OpenFold", "scikit-learn"],
        achievements: [
          "Engineered a Variational Autoencoder achieving 50% dimensionality reJduction with low reconstruction MSE: 0.03 across 180+ variable sized proteins of up to 638 residues",
          "Built a framework to visualize protein structure preservation and family clustering through heatmaps and t-SNE with 90% noise reduction and 0.844 mean correlation between dimensions"
        ]
      },
      {
        title: "Software Engineer - Software Lead",
        company: "Apache Airavata - Vertically Integrated Projects (VIP)",
        logo: "/Pictures/VIP.svg", // Updated to use VIP.svg for Apache Airavata
        period: "January 2025 - Present", 
        description: "Leading scalable HPC and AI-driven solutions, integrating user-friendly interfaces with optimized resource management to accelerate research and data-intensive applications.",
        techStack: ["Python", "Flask", "SLURM", "HPC", "NLP", "Docker"],
        achievements: [
          "Contributed to a NSF/NASA-funded open-source project by integrating NLP pipelines with High Performance Computing (HPC)",
          "Created a user-centric UI with Flask to upload and detect 650,000+ malicious URLs on Georgia Tech's ICE supercomputing-cluster",
          "Automated SLURM job editing and resource allocation with a Python script, reducing detection time by 600%"
        ]
      },
      {
        title: "Software Engineering Intern",
        company: "Kavi Media LLC",
        logo: "/Pictures/KaviMedia.svg", // Updated to use KaviMedia.svg
        period: "May 2024 - August 2024",
        description: "Built scalable backend pipelines and user-facing mobile features to deliver personalized audio content recommendations and seamless multimedia experiences.",
        techStack: ["React Native", "MariaDB", "ElasticSearch", "Gorse", "Node.js"],
        achievements: [
          "Designed scalable data ingestion pipeline processing 50k+ multimedia items for MariaDB and ElasticSearch",
          "Developed UI for Radio and Podcast screens for a mobile audio app deployed for beta-testing using React Native",
          "Worked on Gorse to power personalized content recs leading to a 1.5x recommendation click-through rate"
        ]
      },
      {
        title: "ML Research Intern",
        company: "GRAIT-DM Lab (Georgia Tech)",
        logo: "/Pictures/GT.svg", // Updated to use GT_Computing.svg for GRAIT-DM
        period: "May 2022 - August 2022",
        description: "Assisted Ph.D. researchers in NLP by running large-scale text classification experiments for fake news detection and streamlining model debugging through parameterized testing.",
        techStack: ["Python", "scikit-learn", "Pandas", "NLP", "Machine Learning"],
        achievements: [
          "Conducted 15+ text-classification experiments for fake-news detection on data from social media platforms like X, Instagram, and other News outlets",
          "Collaborated with Ph.D. candidates on NLP research with the NELA-GT project, monitoring and reporting model errors from parameterized tests that exceeded 10,000 epochs, ultimately reducing debugging times"
        ]
      }
    ]
  },
  { 
    id: "projects", 
    title: "Projects", 
    short: "Things I built",
    cta: "See portfolio",
    content: [
      {
        title: "GiftSpark",
        period: "February 2025 - Present",
        sneakPeek: "AI-powered B2B gift recommendations for 10k+ employees using AWS APIs",
        description: "An AI-powered gift recommendation platform that helps HR teams find perfect gifts for their employees based on their preferences and occasion.",
        images: ["/Pictures/GS_Dashboard.png"], // Array of project images
        links: {
          live: "https://giftspark.net",
        },
        techStack: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "AWS PA API", "OpenAI API", "Google OAuth2.0"],
        achievements: [
          "A B2B AI gift recommendation software using openAI and AWS’s PA API to generate gifts for 10k+ employees",
          "Built a user-friendly Next.js, TailwindCSS, and React.js professional frontend and integrated Postmark for SMTP features used by 120+ beta testers",
          "Engineered a full Autobuy pipeline with business access using Google OAuth 2.0 and MongoDB for user data"
        ]
      },
      {
        title: "DJMoody", 
        period: "May 2025 - June 2025",
        sneakPeek: "AI-powered music energy classifier with 85%+ accuracy and intelligent crossfade detection for seamless DJ transitions",
        description: "An intelligent DJ assistant that uses PyTorch neural networks to classify music energy levels and automatically detect optimal crossfade points for transitions between tracks.",
        images: ["/Pictures/DJMoody_Dash.png"],
        links: {
          github: "https://github.com/Shreyas765/DJMoody",
          live: "https://dj-moody.vercel.app",
        },
        techStack: ["PyTorch","Scikit-learn", "Neural Networks", "Next.Js", "TailWindCSS", "Librosa"],
        achievements: [
          "Developed a PyTorch-based neural network achieving 85%+ validation accuracy for music energy classification across 3 categories using 75+ audio samples, with end-to-end data collection and training pipeline",
          "Implemented optimal crossfade point detection using beat analysis and energy matching for 30-second transitions",
          "Designed and deployed a Next.js + TailwindCSS web application, ensuring integration of model outputs with a dynamic UI"
        ]
      },
    ]
  },
  { 
    id: "accolades", 
    title: "Accolades", 
    cta: "Awards",
    content: [
      {
        title: "American Invitational Mathematics Examination (AIME) Invitee (Top 2.5% of 200,000+)",
        period: "2023",
        description: "Mathematical Association of America (MAA)"
      },
      {
        title: "1st Place Website Design at State| National Qualifier",
        period: "2023",
        description: "Future Business Leaders of America (FBLA)"
      },
      {
        title: "Governor's Honors Program Mathematics Finalist (1 of 70 from all of Georgia)",
        period: "2023",
        description: "Georgia Governor's Office of Student Achievement"
      },
      {
        title: "Harvard Debate Octofinalists (top 3.5% of 500+)",
        period: "2023",
        description: "Harvard Debate Council"
      },
      {
        title: "FTC Deans List Semifinalist",
        period: "2022",
        description: "FIRST Robotics"
      }
    ]
  },
  { 
    id: "education", 
    title: "Education", 
    cta: "View credentials",
    content: [
      {
        title: "Georgia Institute of Technology",
        logo: "/Pictures/GT.svg",
        period: "Expected May 2027",
        description: "B.S. in Computer Science",
        achievements: [
          "**Concentration:** Intelligence / Information and Internetworks",
          "**GPA:** 3.88/4.0",
          "**Relevant Coursework:** Data Structures & Algorithms, AI, Databases, OOP, Machine Learning, Systems & Networks",
          "**Honors:** Faculty Honors / Dean's List x2"
        ]
      },
    ]
  }
] 

export const sectionIds = sections.map(section => section.id) 