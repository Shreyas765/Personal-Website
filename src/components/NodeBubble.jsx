import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NodeBubble = ({ section, onClick, disabled = false }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setIsClicked(true)
    onClick()
    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 300)
  }

  // Map section IDs to simplified names - professional red theme
  const getSectionConfig = (sectionId) => {
    const configMap = {
      'experience': {
        name: 'Experience',
        gradient: 'from-red-500 to-red-600',
        glowColor: 'rgba(239, 68, 68, 0.25)',
        ringColor: 'border-red-300/80',
        accentColor: '#dc2626'
      },
      'projects': {
        name: 'Projects', 
        gradient: 'from-red-500 to-red-600',
        glowColor: 'rgba(239, 68, 68, 0.25)',
        ringColor: 'border-red-300/80',
        accentColor: '#dc2626'
      },
      'accolades': {
        name: 'Accolades',
        gradient: 'from-red-500 to-red-600',
        glowColor: 'rgba(239, 68, 68, 0.25)',
        ringColor: 'border-red-300/80',
        accentColor: '#dc2626'
      },
      'education': {
        name: 'Education',
        gradient: 'from-red-500 to-red-600',
        glowColor: 'rgba(239, 68, 68, 0.25)',
        ringColor: 'border-red-300/80',
        accentColor: '#dc2626'
      }
    }
    return configMap[sectionId] || {
      name: sectionId,
      gradient: 'from-red-500 to-red-600',
      glowColor: 'rgba(239, 68, 68, 0.25)',
      ringColor: 'border-red-300/80',
      accentColor: '#dc2626'
    }
  }

  const config = getSectionConfig(section.id)

  return (
    <motion.button
      className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-3 group relative overflow-hidden ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      onClick={handleClick}
      whileHover={disabled ? {} : { 
        scale: 1.05
      }}
      whileTap={disabled ? {} : { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      style={{
        boxShadow: `0 8px 25px -8px ${config.glowColor}, 0 4px 12px -4px rgba(0, 0, 0, 0.1)`
      }}
    >
      {/* Main background with professional gradient */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
          style={{
            background: `linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)`
          }}
        />
        
        {/* Subtle highlight for dimension */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Target rings - cleaner and more professional */}
      <div className="absolute inset-0 rounded-full">
        {/* Outer ring */}
        <div 
          className="absolute rounded-full border-2 border-white/40"
          style={{
            top: '12%',
            left: '12%',
            width: '76%',
            height: '76%'
          }}
        />
        
        {/* Middle ring */}
        <div 
          className="absolute rounded-full border-2 border-white/50"
          style={{
            top: '25%',
            left: '25%',
            width: '50%',
            height: '50%'
          }}
        />
        
        {/* Inner ring */}
        <div 
          className="absolute rounded-full border-2 border-white/60"
          style={{
            top: '38%',
            left: '38%',
            width: '24%',
            height: '24%'
          }}
        />
        
        {/* Center bullseye */}
        <div 
          className="absolute rounded-full bg-white/90"
          style={{
            top: '46%',
            left: '46%',
            width: '8%',
            height: '8%',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
          }}
        />
      </div>

      {/* Subtle hover glow */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          filter: 'blur(12px)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Click effect - simplified */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/80"
            initial={{ scale: 0.9, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      
      {/* Content with improved readability */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h3 
          className="text-lg font-bold text-white mb-0 text-center leading-tight tracking-wide"
          style={{
            textShadow: `
              1px 1px 3px rgba(0, 0, 0, 0.8),
              0 0 8px rgba(0, 0, 0, 0.6)
            `,
            fontWeight: '700'
          }}
          whileHover={{
            scale: 1.02
          }}
        >
          {config.name}
        </motion.h3>
      </div>

      {/* Professional border accent */}
      <div 
        className="absolute inset-0 rounded-full border border-red-400/30"
        style={{
          boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)'
        }}
      />
    </motion.button>
  )
}

export default NodeBubble 