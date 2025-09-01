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

  // Map section IDs to simplified names
  const getSectionName = (sectionId) => {
    const nameMap = {
      'experience': 'Experience',
      'projects': 'Projects', 
      'tech': 'Tech Stack',
      'education': 'Education'
    }
    return nameMap[sectionId] || sectionId
  }

  return (
    <motion.button
      className="w-36 h-36 rounded-full shadow-xl flex flex-col items-center justify-center text-center p-2 cursor-pointer group relative overflow-hidden"
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
        background: '#ffffff',
        border: '3px solid #dc2626'
      }}
    >
      {/* Target Circles Background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Outermost red circle */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: '#dc2626'
          }}
        />
        
        {/* Second white circle */}
        <div 
          className="absolute rounded-full bg-white"
          style={{
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%'
          }}
        />
        
        {/* Third red circle */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '20%',
            left: '20%',
            width: '60%',
            height: '60%',
            background: '#dc2626'
          }}
        />
        
        {/* Fourth white circle */}
        <div 
          className="absolute rounded-full bg-white"
          style={{
            top: '30%',
            left: '30%',
            width: '40%',
            height: '40%'
          }}
        />
        
        {/* Center red circle */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '40%',
            left: '40%',
            width: '20%',
            height: '20%',
            background: '#dc2626'
          }}
        />
      </div>

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
      
      {/* Content directly over target */}
      <div className="relative z-10">
        <h3 className="text-lg font-black text-black mb-0 transition-colors duration-200 drop-shadow-[2px_2px_4px_rgba(255,255,255,0.8)]">
          {getSectionName(section.id)}
        </h3>
      </div>

    </motion.button>
  )
}

export default NodeBubble 