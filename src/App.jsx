import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, ChevronDown, FileText } from 'lucide-react'
import { sections } from './data/sections'

// Background Particles Component
const BackgroundParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.random() * 300 + 200,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: '50%',
            animation: `floatVertical ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [expandedExperience, setExpandedExperience] = useState({})
  const [expandedEducation, setExpandedEducation] = useState({})
  const [currentTitle, setCurrentTitle] = useState(0)
  
  const titles = [
    { text: 'Researcher', color: 'text-blue-400' },
    { text: 'Engineer', color: 'text-purple-400' },
    { text: 'Developer', color: 'text-cyan-400' }
  ]

  // Rotate titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 2000) // Change every 2 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Handle scroll for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => s.id)
      for (const sectionId of sectionElements) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    const rightPanel = document.getElementById('right-panel')
    if (rightPanel) {
      rightPanel.addEventListener('scroll', handleScroll)
      return () => rightPanel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    const rightPanel = document.getElementById('right-panel')
    if (element && rightPanel) {
      const offsetTop = element.offsetTop - rightPanel.offsetTop - 80
      rightPanel.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  const toggleExperience = (index) => {
    setExpandedExperience(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const toggleEducation = (index) => {
    setExpandedEducation(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="min-h-screen animated-bg text-white flex relative overflow-hidden">
      <BackgroundParticles />
      
      {/* Left Panel - Floating Profile */}
      <div className="hidden lg:flex lg:w-1/3 xl:w-1/4 fixed left-0 top-0 h-screen p-6 lg:p-12 z-10">
        <div className="w-full h-full flex items-center justify-center lg:justify-start lg:ml-8">
          <div style={{ width: '35rem', maxWidth: '95%' }}>
            {/* Floating Profile Card */}
            <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-black border border-blue-800 rounded-2xl p-6 shadow-2xl shadow-blue-900/50 backdrop-blur-sm">
              <div className="text-center mb-4">
                <img 
                  src="/Pictures/ShreyasArisa.png" 
                  alt="Shreyas Arisa"
                  className="w-58 h-58 rounded-xl mx-auto mb-4 border-4 border-blue-500 shadow-xl shadow-blue-500/50 object-cover"
                  style={{ scale: '1.05', objectPosition: 'center 20%' }}
                />
                <h1 className="text-3xl xl:text-4xl font-bold mb-3 text-white">
                  Shreyas Arisa
                </h1>
                <div className="mb-3 h-12 flex items-center justify-center gap-2">
                  <span className="text-xl text-blue-300">Software</span>
                  <span className={`text-3xl font-bold transition-all duration-500 ease-in-out ${titles[currentTitle].color}`}>
                    {titles[currentTitle].text}
                  </span>
                </div>
                <p className="text-sm text-blue-200/70">
                  Computer Science @ Georgia Tech
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2 mb-4">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      activeSection === section.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' 
                        : 'text-blue-200 hover:bg-blue-900/50 hover:text-white'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full transition-all ${
                      activeSection === section.id 
                        ? 'bg-white' 
                        : 'bg-blue-400 group-hover:bg-blue-300'
                    }`}></span>
                    <span className="font-medium text-sm tracking-wide">
                      {section.title}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Social Links with Resume */}
              <div className="border-t border-blue-800 pt-4">
                <div className="flex justify-center space-x-3">
                  <a 
                    href="https://github.com/Shreyas765" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg text-blue-200 hover:text-white transition-all hover:scale-110 transform hover:shadow-lg hover:shadow-blue-600/50"
                  >
                    <Github size={22} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/shreyas-arisa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg text-blue-200 hover:text-white transition-all hover:scale-110 transform hover:shadow-lg hover:shadow-blue-600/50"
                  >
                    <Linkedin size={22} />
                  </a>
                  <a 
                    href="mailto:sarisa3@gatech.edu"
                    className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg text-blue-200 hover:text-white transition-all hover:scale-110 transform hover:shadow-lg hover:shadow-blue-600/50"
                  >
                    <Mail size={22} />
                  </a>
                  <a 
                    href="/resume.pdf" 
                    download
                    className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg text-blue-200 hover:text-white transition-all hover:scale-110 transform hover:shadow-lg hover:shadow-blue-600/50"
                    title="Download Resume"
                  >
                    <FileText size={22} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-blue-900">
        <div className="p-4 flex items-center space-x-4">
          <img 
            src="/Pictures/ShreyasArisa.png" 
            alt="Shreyas Arisa"
            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
          <div>
            <h1 className="text-xl font-bold text-white">
              Shreyas Arisa
            </h1>
            <p className="text-sm text-blue-300">Software Engineer</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Scrolling Content */}
      <div 
        id="right-panel"
        className="w-full lg:w-2/3 xl:w-3/4 lg:ml-[33.333%] xl:ml-[25%] h-screen overflow-y-auto pt-20 lg:pt-0 relative z-10"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
          
          {/* About Me Section */}
          <section id="about" className="mb-32 scroll-mt-24">
            <h2 className="section-header text-4xl font-bold mb-8 text-white sticky top-0 backdrop-blur-md py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 z-10 border-b border-blue-900/30 tracking-tight">
              About Me
            </h2>
            <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-xl p-8 border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-900/30 transition-all">
              <p className="text-blue-100/90 text-lg leading-relaxed mb-6">
                {sections.find(s => s.id === 'about')?.content.bio}
              </p>
              
              {/* <div className="mb-6">
                <h3 className="text-blue-300 font-semibold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Current Focus
                </h3>
                <p className="text-blue-100/80 text-base ml-5">
                  {sections.find(s => s.id === 'about')?.content.currentFocus}
                </p>
              </div> */}

              <div>
                <h3 className="text-blue-300 font-semibold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Current Interests
                </h3>
                <div className="flex flex-wrap gap-2 ml-5">
                  {sections.find(s => s.id === 'about')?.content.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-blue-600/20 rounded-full text-sm text-blue-200 border border-blue-600/30 hover:bg-blue-600/30 hover:border-blue-500/50 transition-all"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-32 scroll-mt-24">
            <h2 className="section-header text-4xl font-bold mb-8 text-white sticky top-0 backdrop-blur-md py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 z-10 border-b border-blue-900/30 tracking-tight">
              Experience
            </h2>
            <div className="space-y-6">
              {sections.find(s => s.id === 'experience')?.content.map((exp, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-xl border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-900/30 transition-all">
                    {/* Header - Always visible */}
                    <button
                      onClick={() => toggleExperience(index)}
                      className="w-full p-6 text-left hover:from-blue-950/50 hover:to-black/70 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          {exp.logo && (
                            <img 
                              src={exp.logo} 
                              alt={exp.company}
                              className="w-10 h-10 object-contain bg-white rounded-lg p-2 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-base text-blue-200">{exp.company}</p>
                          </div>
                          <ChevronDown 
                            className={`text-blue-400 flex-shrink-0 transition-transform ${
                              expandedExperience[index] ? 'rotate-180' : ''
                            }`}
                            size={20}
                          />
                        </div>
                      </div>
                      <span className="text-blue-300/70 text-sm">{exp.period}</span>
                    </button>
                    
                    {/* Expandable Content */}
                    {expandedExperience[index] && (
                      <div className="px-6 pb-6 pt-0 border-t border-blue-900/30">
                        <p className="text-blue-100/80 mb-4 text-sm leading-relaxed mt-4">{exp.description}</p>
                        
                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <ChevronRight className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-blue-100/80">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {exp.techStack && exp.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map((tech, i) => (
                              <span 
                                key={i}
                                className="px-3 py-1 bg-blue-600/20 rounded-full text-xs text-blue-300 border border-blue-600/30 hover:bg-blue-600/30 hover:border-blue-500/50 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-32 scroll-mt-24">
            <h2 className="section-header text-4xl font-bold mb-8 text-white sticky top-0 backdrop-blur-md py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 z-10 border-b border-blue-900/30 tracking-tight">
              Projects
            </h2>
            <div className="overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-12 lg:px-12">
              <div className="flex space-x-6 min-w-min">
                {sections.find(s => s.id === 'projects')?.content.map((project, index) => (
                  <div 
                    key={index}
                    className="group relative flex-shrink-0 w-80"
                  >
                    <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-xl overflow-hidden hover:from-blue-950/50 hover:to-black/70 transition-all border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-900/30 h-full">
                      {project.images && project.images[0] && (
                        <div className="overflow-hidden border-b border-blue-900/50">
                          <img 
                            src={project.images[0]} 
                            alt={project.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                            {project.title}
                          </h3>
                          <span className="text-blue-300/70 text-xs">{project.period}</span>
                        </div>
                        
                        <p className="text-blue-100/80 mb-3 text-xs leading-relaxed line-clamp-3">{project.sneakPeek}</p>
                        
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.techStack.slice(0, 4).map((tech, i) => (
                              <span 
                                key={i}
                                className="px-2 py-0.5 bg-blue-600/20 rounded-full text-xs text-blue-300 border border-blue-600/30"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 4 && (
                              <span className="px-2 py-0.5 text-xs text-blue-400">
                                +{project.techStack.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {project.links && (
                          <div className="flex space-x-3">
                            {project.links.github && (
                              <a 
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs hover:underline"
                              >
                                <Github size={14} />
                                <span>Code</span>
                              </a>
                            )}
                            {project.links.live && (
                              <a 
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs hover:underline"
                              >
                                <ExternalLink size={14} />
                                <span>Demo</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-blue-400/50 text-xs mt-4 text-center">← Scroll horizontally to see more →</p>
          </section>

          {/* Education Section */}
          <section id="education" className="mb-32 scroll-mt-24">
            <h2 className="section-header text-4xl font-bold mb-8 text-white sticky top-0 backdrop-blur-md py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 z-10 border-b border-blue-900/30 tracking-tight">
              Education
            </h2>
            <div className="space-y-6">
              {sections.find(s => s.id === 'education')?.content.map((edu, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-xl border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-900/30 transition-all">
                    {/* Header - Always visible */}
                    <button
                      onClick={() => toggleEducation(index)}
                      className="w-full p-6 text-left hover:from-blue-950/50 hover:to-black/70 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          {edu.logo && (
                            <img 
                              src={edu.logo} 
                              alt={edu.title}
                              className="w-10 h-10 object-contain flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {edu.title}
                            </h3>
                            <div className="flex items-center space-x-3 mt-1">
                              <p className="text-base text-blue-200">{edu.description}</p>
                              <span className="text-blue-300/70 text-sm">• {edu.period}</span>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`text-blue-400 flex-shrink-0 transition-transform ${
                              expandedEducation[index] ? 'rotate-180' : ''
                            }`}
                            size={20}
                          />
                        </div>
                      </div>
                    </button>
                    
                    {/* Expandable Content */}
                    {expandedEducation[index] && (
                      <div className="px-6 pb-6 pt-0 border-t border-blue-900/30">
                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="space-y-2 mt-4">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <ChevronRight className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-blue-100/80">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="mb-32 scroll-mt-24">
            <h2 className="section-header text-4xl font-bold mb-8 text-white sticky top-0 backdrop-blur-md py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 z-10 border-b border-blue-900/30 tracking-tight">
              Skills
            </h2>
            <div className="space-y-8">
              {/* Languages */}
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Languages
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {sections.find(s => s.id === 'skills')?.content.languages.map((skill, index) => (
                    <div 
                      key={index}
                      className="group relative"
                    >
                      <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-lg p-3 hover:from-blue-950/50 hover:to-black/70 transition-all border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/30 flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-white rounded-md p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-blue-100 text-xs font-medium text-center group-hover:text-blue-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Frameworks & Databases
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {sections.find(s => s.id === 'skills')?.content.frameworks.map((skill, index) => (
                    <div 
                      key={index}
                      className="group relative"
                    >
                      <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-lg p-3 hover:from-blue-950/50 hover:to-black/70 transition-all border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/30 flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-white rounded-md p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-blue-100 text-xs font-medium text-center group-hover:text-blue-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Developer Tools */}
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Developer Tools
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {sections.find(s => s.id === 'skills')?.content.tools.map((skill, index) => (
                    <div 
                      key={index}
                      className="group relative"
                    >
                      <div className="bg-gradient-to-br from-blue-950/30 to-black/50 rounded-lg p-3 hover:from-blue-950/50 hover:to-black/70 transition-all border border-blue-900/50 hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/30 flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-white rounded-md p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-blue-100 text-xs font-medium text-center group-hover:text-blue-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section id="awards" className="mb-32 scroll-mt-24">
            <h2 className="section-header text-4xl font-bold mb-8 text-white sticky top-0 backdrop-blur-md py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 z-10 border-b border-blue-900/30 tracking-tight">
              Awards
            </h2>
            <div className="relative pl-8">
              {/* Timeline vertical line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800"></div>
              
              <div className="space-y-8">
                {sections.find(s => s.id === 'awards')?.content.map((award, index) => (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-black group-hover:bg-blue-400 group-hover:scale-125 transition-all shadow-lg shadow-blue-500/50"></div>
                    
                    <div className="ml-4">
                      <div className="flex items-baseline space-x-3 mb-2">
                        <span className="text-blue-400 text-sm font-bold">{award.period}</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {award.title}
                        </h3>
                      </div>
                      <p className="text-blue-300 text-sm mb-1 font-medium">{award.organization}</p>
                      <p className="text-blue-100/70 text-sm leading-relaxed">{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mobile Social Links */}
          <div className="lg:hidden mt-16 pt-8 border-t border-blue-900">
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="https://github.com/Shreyas765" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg transition-colors hover:shadow-lg hover:shadow-blue-600/50"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/shreyas-arisa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg transition-colors hover:shadow-lg hover:shadow-blue-600/50"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:sarisa3@gatech.edu"
                className="p-3 bg-blue-900/50 hover:bg-blue-600 rounded-lg transition-colors hover:shadow-lg hover:shadow-blue-600/50"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 
