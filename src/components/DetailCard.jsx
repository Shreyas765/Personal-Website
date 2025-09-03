import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronRight, Calendar, Award, ExternalLink, Github, Play, Code } from 'lucide-react'

const DetailCard = ({ section, onClose }) => {
  const [expandedItems, setExpandedItems] = useState(new Set())

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Focus trap
  useEffect(() => {
    const firstFocusable = document.querySelector('[data-focusable]')
    if (firstFocusable) {
      firstFocusable.focus()
    }
  }, [])

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Enhanced Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        
        {/* Card */}
        <motion.div
          className="relative w-[90vw] h-[90vh] rounded-3xl overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          initial={{ 
            scale: 0.3, 
            opacity: 0,
            y: 50,
            rotateX: 15
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
            rotateX: 0
          }}
          exit={{ 
            scale: 0.3, 
            opacity: 0,
            y: 50,
            rotateX: 15
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${section.id}-title`}
        >
          {/* Animated Border Glow */}
          <motion.div 
            className="absolute inset-0 rounded-3xl border border-cyan-400/40"
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 211, 238, 0.3)',
                '0 0 40px rgba(34, 211, 238, 0.6)',
                '0 0 20px rgba(34, 211, 238, 0.3)'
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating Background Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 4 === 0 ? 'bg-cyan-400/30' : 
                i % 4 === 1 ? 'bg-blue-400/30' : 
                i % 4 === 2 ? 'bg-purple-400/30' : 'bg-emerald-400/30'
              }`}
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Header */}
          <div className="relative p-8 pb-6 border-b border-cyan-400/20 bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50">
            {/* Header Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <motion.h2 
                  id={`${section.id}-title`}
                  className="text-4xl font-black text-white tracking-wide"
                  style={{
                    textShadow: '0 0 20px rgba(34, 211, 238, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {section.title}
                </motion.h2>
                
              </div>
              
              <motion.button
                onClick={onClose}
                className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-red-400/30 backdrop-blur-lg group overflow-hidden"
                style={{
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(239, 68, 68, 0.2)'
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(239, 68, 68, 0.4)'
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close"
                data-focusable
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <X className="w-6 h-6 text-red-400 group-hover:text-white transition-colors duration-300 relative z-10" />
              </motion.button>
            </div>
            
            <motion.p 
              className="text-xl text-cyan-200/90 mt-4 relative z-10"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
              }}
            >
              {section.short}
            </motion.p>
          </div>

          {/* Content */}
          <div className="relative p-8 pb-12 flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div className="space-y-4">
                {section.content.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="group relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    {/* Accolades and Education Sections - Simple Card Layout */}
                    {(section.id === 'accolades' || section.id === 'education') ? (
                      <motion.div
                        className="p-6 rounded-2xl border backdrop-blur-lg transition-all duration-200 hover:scale-[1.005] w-full max-w-5xl mx-auto"
                        style={{
                          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
                          border: '1px solid rgba(34, 211, 238, 0.2)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 211, 238, 0.1)'
                        }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Logo for education section */}
                            {section.id === 'education' && item.logo && (
                              <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <img 
                                  src={item.logo} 
                                  alt={`${item.title} logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    // Hide logo container if image fails to load
                                    e.target.parentElement.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-lg text-cyan-200/90 mt-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-cyan-400/80 text-sm flex-shrink-0">
                            <Calendar className="w-4 h-4" />
                            <span>{item.period}</span>
                          </div>
                        </div>
                        {/* For accolades, show description, for education show achievements */}
                        {section.id === 'accolades' ? (
                          <p className="text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                        ) : section.id === 'education' && item.achievements ? (
                          <div className="space-y-2 mt-4">
                            {item.achievements.map((achievement, achIndex) => (
                              <div
                                key={achIndex}
                                className="text-slate-300 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                }}
                              />
                            ))}
                          </div>
                        ) : null}
                      </motion.div>
                    ) : (
                      // Regular expandable layout for other sections
                      <>
                    {/* Clickable Header */}
                    <motion.button
                      onClick={() => toggleExpanded(index)}
                      className="w-full flex items-center justify-between gap-4 p-6 rounded-2xl border backdrop-blur-lg transition-all duration-200 hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 211, 238, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        {/* Animated Icon */}
                        <motion.div 
                          className="relative flex-shrink-0"
                          animate={{
                            rotate: expandedItems.has(index) ? 90 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className="w-5 h-5 text-cyan-400" />
                        </motion.div>
                        
                        {/* Content Header */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            {/* Company Logo */}
                            {item.logo && (
                              <div className="w-16 h-16 flex items-center justify-center">
                                <img 
                                  src={item.logo} 
                                  alt={`${item.company} logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    // Hide logo container if image fails to load
                                    e.target.parentElement.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white">
                                {item.title}
                              </h3>
                              {item.company && (
                                <p className="text-sm text-cyan-200/80 mt-1">
                                  {item.company}
                                </p>
                              )}
                              {item.sneakPeek && (
                                <p className="text-sm text-slate-300/90 mt-2 italic">
                                  {item.sneakPeek}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-cyan-400/80 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>{item.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expand/Collapse Indicator */}
                      <motion.div
                        animate={{
                          rotate: expandedItems.has(index) ? 180 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </motion.button>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedItems.has(index) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 mt-2 rounded-xl border-l-4 border-cyan-400/50 bg-gradient-to-r from-slate-900/40 to-slate-800/40 backdrop-blur-lg">
                            {/* Project Images */}
                            {item.images && item.images.length > 0 && (
                              <div className="mb-6">
                                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                                  Project Images
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {item.images.map((image, imgIndex) => (
                                    <div
                                      key={imgIndex}
                                      className="relative overflow-hidden rounded-lg border border-cyan-400/20"
                                    >
                                      <img 
                                        src={image} 
                                        alt={`${item.title} screenshot ${imgIndex + 1}`}
                                        className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300 bg-slate-800/50 rounded-lg"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Description */}
                            <p className="text-slate-200 leading-relaxed mb-4">
                              {item.description}
                            </p>

                            {/* Tech Stack */}
                            {item.techStack && item.techStack.length > 0 && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Code className="w-4 h-4 text-emerald-400" />
                                  <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                                    Tech Stack
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {item.techStack.map((tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-full text-xs text-emerald-200 font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Project Links */}
                            {item.links && Object.keys(item.links).length > 0 && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <ExternalLink className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                                    Links
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  {item.links.github && (
                                    <motion.a
                                      href={item.links.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-500/30 rounded-lg text-sm text-gray-200 hover:text-white hover:border-gray-400/50 transition-all duration-300"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Github className="w-4 h-4" />
                                      GitHub
                                    </motion.a>
                                  )}
                                  {item.links.live && (
                                    <motion.a
                                      href={item.links.live}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/50 to-blue-700/50 border border-blue-400/30 rounded-lg text-sm text-blue-200 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Live Site
                                    </motion.a>
                                  )}
                                  {item.links.demo && (
                                    <motion.a
                                      href={item.links.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/50 to-red-700/50 border border-red-400/30 rounded-lg text-sm text-red-200 hover:text-white hover:border-red-400/50 transition-all duration-300"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Play className="w-4 h-4" />
                                      Demo
                                    </motion.a>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Achievements */}
                            {item.achievements && item.achievements.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Award className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                                    Key Achievements
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {item.achievements.map((achievement, achIndex) => (
                                    <li
                                      key={achIndex}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-slate-300 text-sm leading-relaxed">
                                        {achievement}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 pointer-events-none"
                      transition={{ duration: 0.3 }}
                    />
                    </>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailCard 