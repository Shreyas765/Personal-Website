import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NodeBubble = ({ section, onClick }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    onClick()
    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 300)
  }

  return (
    <motion.button
      className="w-36 h-36 rounded-full shadow-xl flex flex-col items-center justify-center text-center p-2 cursor-pointer group relative"
      onClick={handleClick}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.25)"
      }}
      whileTap={{ 
        scale: 1.3,
        transition: { duration: 0.2 }
      }}
      animate={{ 
        scale: [1, 1.02, 1],
        y: [0, -2, 0]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-controls={`panel-${section.id}`}
      aria-expanded="false"
      style={{
        background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #ef4444 100%)',
        border: '2px solid rgba(220, 38, 38, 0.5)'
      }}
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Enhanced glow effect on click */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-600/30 blur-md"
            initial={{ 
              scale: 0.8,
              opacity: 0
            }}
            animate={{ 
              scale: 2,
              opacity: [0, 0.6, 0]
            }}
            exit={{ 
              scale: 2,
              opacity: 0
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Ripple effect on click */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-600"
            initial={{ 
              scale: 0.8,
              opacity: 1
            }}
            animate={{ 
              scale: 2.5,
              opacity: 0
            }}
            exit={{ 
              scale: 2.5,
              opacity: 0
            }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-red-400 transition-colors duration-200 drop-shadow-sm">
          {section.title}
        </h3>
        <p className="text-xs text-white/80 group-hover:text-white/90 transition-colors duration-200 drop-shadow-sm">
          {section.short}
        </p>
      </div>


    </motion.button>
  )
}

export default NodeBubble 