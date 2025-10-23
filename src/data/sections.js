import { ConciergeBell } from "lucide-react"

export const sections = [
  {
    id: "about",
    title: "About Me",
    cta: "Learn more",
    content: {
      bio: "Hey, I'm Shreyas! I'm a Computer Science student at Georgia Tech passionate about building impactful software solutions and AI powered applications.",
      interests: ["Software Engineering", "Production Engineering", "Distributed Systems", "AI/ML Research"],
      currentFocus: "Currently working on protein structure analysis using deep learning at ARTISAN Research Lab"
    }
  },
  { 
    id: "experience", 
    title: "Experience", 
    short: "Professional Work",
    cta: "View timeline",
    content: [
      {
        title: "ML Engineer - Undergraduate",
        company: "ARTISAN Research Lab @Georgia Tech",
        logo: "/Pictures/GT_Computing.svg",
        period: "May 2025 - Present",
        description: "Building autoencoders to reproduce protein structures by compressing and regenerating AlphaFold2's Evoformer embeddings.",
        techStack: ["Python", "PyTorch", "Matplotlib", "scikit-learn", "HPC", "Distributed Systems"],
        achievements: [
          "Engineered an autoencoder in Python using PyTorch, achieving 50% dimensionality reduction with a low error of 0.03 on 180+ proteins from Google DeepMind's AlphaFold2 alongside Google Summer of Code Contributors",
          "Built a framework using Matplotlib and scikit-learn to visualize protein structure preservation and family clustering through heatmaps and t-SNE with 90% noise reduction and 0.844 mean correlation between dimensions",
          "Utilized distributed systems in High Performance Computing clusters to improve training time from 2 hours to 5 minutes"
        ]
      },
      {
        title: "CTO and Co-Founder",
        company: "GiftSpark",
        logo: "/Pictures/giftspark.svg",
        period: "December 2024 - August 2025",
        description: "Co-founded and led technical development of a B2B AI-powered gift recommendation platform backed by Create-X funding.",
        techStack: ["TypeScript", "React", "Node.js", "MongoDB", "AWS PA API", "OpenAI API", "Google OAuth2.0", "SMTP"],
        achievements: [
          "Engineered a full-stack B2B platform using AWS Product Advertising API and OpenAI to generate personalized gift recommendations for 10,000+ employees with TypeScript and React with MongoDB for data modeling",
          "Secured over $5000 in Create-X backed funding for software development and received interest from 20+ clients",
          "Optimized RESTful API batch processing to reduce latency by 76% (21s to 5s) while maintaining AWS compliance",
          "Implemented secure business-only authentication with Google OAuth2.0 and automated email delivery with SMTP"
        ]
      },
      {
        title: "Software Engineer - Lead",
        company: "Apache Airavata",
        logo: "/Pictures/VIP.svg",
        period: "January 2025 - May 2025", 
        description: "Led a four-person engineering team on a NSF/NASA-funded project integrating NLP pipelines with High Performance Computing.",
        techStack: ["Python", "Flask", "SLURM", "HPC", "Linux", "Agile"],
        achievements: [
          "Developed a Python pipeline to manage SLURM-based High Performance Computing workloads that improved detection time by 600% through more optimized distributed and parallel systems on a NSF/NASA funded project",
          "Pioneered and deployed a Flask interface to scan over 650,000 malicious URLs in Linux environments",
          "Led a four-person engineering team and coordinated Agile sprints to deliver production-ready software"
        ]
      },
      {
        title: "Software Engineer Intern",
        company: "Kavi Media",
        logo: "/Pictures/KaviMedia.svg",
        period: "June 2024 - August 2024",
        description: "Built scalable backend pipelines and user-facing mobile features to deliver personalized audio content recommendations.",
        techStack: ["React Native", "JavaScript", "MariaDB", "ElasticSearch", "Gorse", "Node.js"],
        achievements: [
          "Developed a scalable data ingestion system to process 50k+ multimedia items into NoSQL MariaDB and ElasticSearch",
          "Designed UI for Podcast screens on an audio app deployed for beta-testing using React Native and JavaScript",
          "Leveraged Gorse for machine-learning–driven content recommendations enhancing click through rate by 1.5x"
        ]
      },
      {
        title: "Software Development Intern",
        company: "EdnaML Research Lab @Georgia Tech",
        logo: "/Pictures/GT.svg",
        period: "June 2023 - August 2023",
        description: "Collaborated with Ph.D. researchers on NLP experiments for fake-news detection on Twitter.",
        techStack: ["Python", "Google Colab", "Docker", "Git", "PyTorch", "TensorFlow", "NLP"],
        achievements: [
          "Reproduced 15+ ML workflows in Python using Google Colab, Docker, and Git for fake-news detection on Twitter",
          "Collaborated with Ph.D. researchers on NLP experiments, leveraging PyTorch & TensorFlow to monitor and report model errors from 10k+ epoch parameterized tests, reducing debugging times significantly"
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
        title: "RefNet",
        period: "September 2025",
        sneakPeek: "Won 2nd place Best Overall Project at HackGT12 - AI assistant for literature reviews",
        description: "An AI-powered literature review assistant that analyzes academic papers and creates interactive citation graphs. Won 2nd place Best Overall Project at HackGT12 against 900+ competitors.",
        images: ["/Pictures/RefNet.png"],
        links: {
          live: "https://refnet.wiki",
        },
        techStack: ["Docker", "AWS EC2", "Python", "React", "Flask", "D3.js", "REST API", "Node.js", "GPT-4o", "CedarOS"],
        achievements: [
          "Won 2nd place Best Overall Project at HackGT against 900+ competitors for an AI assistant for literature reviews",
          "Deployed React frontend with dockerized Flask/Python backend hosted on AWS EC2 instances for scalability",
          "Built interactive D3.js graph visualizations to analyze 200M+ academic papers with citation and depth control feature",
          "Integrated GPT-4o via CedarOS to directly manipulate the React frontend by highlighting graph nodes and inserting papers by interacting with a draggable chat on a whiteboard-like interface"
        ]
      },
      {
        title: "DJMoody", 
        period: "June 2025",
        sneakPeek: "AI-powered music energy classifier with 85%+ accuracy and intelligent crossfade detection",
        description: "An intelligent DJ assistant that uses PyTorch neural networks to classify music energy levels and automatically detect optimal crossfade points for transitions between tracks.",
        images: ["/Pictures/DJMoody_Dash.png"],
        links: {
          github: "https://github.com/Shreyas765/DJMoody",
          live: "https://dj-moody.vercel.app",
        },
        techStack: ["PyTorch", "Next.js", "React", "TailwindCSS", "Librosa", "GitHub Actions", "CI/CD"],
        achievements: [
          "Trained a PyTorch-based neural network with 85%+ accuracy to detect audio energy levels on 3 clusters",
          "Implemented beat alignment and energy matching algorithms to create smooth 30-second transitions with Librosa",
          "Deployed a Next.js and TailwindCSS web app with CI/CD pipelines using GitHub Actions"
        ]
      },
      {
        title: "Space Debris Collection",
        period: "April 2025",
        sneakPeek: "Gameboy Advance game built in C with Docker containerization",
        description: "A GBA game built in C lang using DMA, Mode 3 graphics, and hardware interrupts to simulate asteroids & debris collection gameplay.",
        images: ["/Pictures/GBA.png"],
        links: {
          github: "https://github.com/Shreyas765/Space-Debris-Collection",
        },
        techStack: ["C", "Docker", "GBA Development", "DMA", "Hardware Interrupts"],
        achievements: [
          "Built a GBA game in C lang using DMA, Mode 3 graphics, and hardware interrupts to simulate asteroids & debris",
          "Containerized the Gameboy Advanced toolchain with Docker, ensuring cross-compilation and reproducible builds"
        ]
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
        description: "BSMS in Computer Science",
        achievements: [
          "Relevant Coursework: Data Structures & Algorithms, Artificial Intelligence, Machine Learning, Databases, Java OOP, Systems & Networks"
        ]
      },
    ]
  },
  { 
    id: "skills", 
    title: "Skills", 
    cta: "Technical Skills",
    content: {
      languages: [
        { name: "Python", icon: "/Pictures/python-5.svg" },
        { name: "Java", icon: "/Pictures/java.svg" },
        { name: "C", icon: "/Pictures/c.svg" },
        { name: "JavaScript", icon: "/Pictures/react-2.svg" },
        { name: "TypeScript", icon: "/Pictures/next-js.svg" },
      ],
      frameworks: [
        { name: "React", icon: "/Pictures/react-2.svg" },
        { name: "Next.js", icon: "/Pictures/next-js.svg" },
        { name: "TailwindCSS", icon: "/Pictures/tailwind-css-2.svg" },
        { name: "MongoDB", icon: "/Pictures/mongodb-icon-1.svg" },
        { name: "PostgreSQL", icon: "/Pictures/postgresql.svg" },
        { name: "PyTorch", icon: "/Pictures/pytorch-2.svg" },
      ],
      tools: [
        { name: "Docker", icon: "/Pictures/docker.svg" },
        { name: "AWS", icon: "/Pictures/aws-2.svg" },
        { name: "Git", icon: "/Pictures/git-icon.svg" },
        { name: "Google Cloud", icon: "/Pictures/google_cloud.svg" },
      ]
    }
  },
  { 
    id: "awards", 
    title: "Awards", 
    cta: "Recognition",
    content: [
      {
        title: "2nd Best Overall Project - HackGT12",
        period: "2025",
        organization: "HackGT",
        description: "Awarded 2nd place out of 900+ competitors for RefNet, an AI-powered literature review assistant"
      },
      {
        title: "American Invitational Mathematics Examination (AIME) Qualifier",
        period: "2023",
        organization: "Mathematical Association of America (MAA)",
        description: "Top 2.5% of 200,000+ participants nationwide"
      },
      {
        title: "Governor's Honors Program Mathematics Finalist",
        period: "2023",
        organization: "Georgia Governor's Office of Student Achievement",
        description: "Selected as 1 of 70 math finalists from all of Georgia"
      },
      {
        title: "1st Place Website Design at State Competition",
        period: "2023",
        organization: "Future Business Leaders of America (FBLA)",
        description: "State champion and National Qualifier"
      },
      {
        title: "Harvard Debate Octofinalists",
        period: "2023",
        organization: "Harvard Debate Council",
        description: "Top 3.5% of 500+ competitors"
      },
      {
        title: "FTC Dean's List Semifinalist",
        period: "2022",
        organization: "FIRST Robotics",
        description: "Recognized for leadership and technical excellence in robotics"
      }
    ]
  }
] 

export const sectionIds = sections.map(section => section.id)
