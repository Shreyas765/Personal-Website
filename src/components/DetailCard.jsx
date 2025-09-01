import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

const DetailCard = ({ section, onClose }) => {
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
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 4 === 0 ? 'bg-cyan-400/40' : 
                i % 4 === 1 ? 'bg-blue-400/40' : 
                i % 4 === 2 ? 'bg-purple-400/40' : 'bg-emerald-400/40'
              }`}
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
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
                  animate={{
                    textShadow: [
                      '0 0 15px rgba(34, 211, 238, 0.4), 0 2px 8px rgba(0, 0, 0, 0.8)',
                      '0 0 25px rgba(34, 211, 238, 0.8), 0 2px 8px rgba(0, 0, 0, 0.8)',
                      '0 0 15px rgba(34, 211, 238, 0.4), 0 2px 8px rgba(0, 0, 0, 0.8)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
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
              <motion.ul className="space-y-6">
                {section.content.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="group relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div 
                      className="flex items-start gap-6 p-6 rounded-2xl border backdrop-blur-lg transition-all duration-300 group-hover:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 211, 238, 0.1)'
                      }}
                    >
                      {/* Animated Bullet Point */}
                      <motion.div 
                        className="relative mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg relative z-10" />
                        <motion.div 
                          className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </motion.div>
                      
                      <span className="text-lg text-white/95 leading-relaxed font-medium">
                        {item}
                      </span>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 pointer-events-none"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>


        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailCard 