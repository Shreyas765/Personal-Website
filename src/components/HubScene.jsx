import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Mail, Github, Linkedin } from 'lucide-react'
import Scoreboard from './Scoreboard'
import NodeBubble from './NodeBubble'
import { sections } from '../data/sections'

const HubScene = ({ onSectionOpen, score, hasWon, showConfetti, selectedSection }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [showWelcomePopup, setShowWelcomePopup] = useState(true)
  const [ballAnimation, setBallAnimation] = useState(null) // { targetId, targetPosition }
  const [isAnimating, setIsAnimating] = useState(false)

  // Ball starting position (penalty spot)
  const ballStartPosition = { x: -10, y: 400 } // Relative to center

  // Generate random stars for the background
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70, // Only in upper 70% of screen
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDelay: Math.random() * 3
    }))
  }

  // Generate shooting stars
  const generateShootingStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * 50 + 50, // Start from right side
      startY: Math.random() * 30 + 10, // Upper portion
      endX: Math.random() * 50, // End on left side
      endY: Math.random() * 30 + 40, // Lower portion
      delay: Math.random() * 10,
      duration: Math.random() * 2 + 1
    }))
  }

  const [stars] = useState(() => generateStars(150))
  const [shootingStars] = useState(() => generateShootingStars(5))

  // Auto-dismiss welcome popup after 5 seconds
  useEffect(() => {
    if (showWelcomePopup) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(false)
      }, 5000) // 5 seconds

      return () => clearTimeout(timer)
    }
  }, [showWelcomePopup])

  // Calculate positions for the four nodes relative to goal bounds
  // These positions are percentages of the goal width/height
  const getNodePosition = (index, goalBounds) => {
    const relativePositions = [
      { x: 0.05, y: 0.25 }, // Top left - Experience (5% from left, 25% from top) - moved left by ~100px
      { x: 0.85, y: 0.25 }, // Top right - Projects (85% from left, 25% from top)
      { x: 0.05, y: 0.75 }, // Bottom left - Accolades (5% from left, 75% from top) - moved left by ~100px
      { x: 0.85, y: 0.75 }  // Bottom right - Education (85% from left, 75% from top)
    ]
    
    const relativePos = relativePositions[index] || { x: 0.5, y: 0.5 }
    
    return {
      x: goalBounds.x + (relativePos.x * goalBounds.width) - goalBounds.width / 2,
      y: goalBounds.y + (relativePos.y * goalBounds.height) - goalBounds.height / 2
    }
  }

  // Handle node clicks with ball animation
  const handleNodeClick = (sectionId) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    let targetPosition
    
    if (sectionId === 'about') {
      targetPosition = { x: 0, y: 0 } // Center position
    } else {
      // Get current goal bounds for responsive positioning
      const goalElement = document.querySelector('[data-goal-container]')
      if (goalElement) {
        const rect = goalElement.getBoundingClientRect()
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        
        const goalBounds = {
          x: rect.left + rect.width / 2 - centerX,
          y: rect.top + rect.height / 2 - centerY,
          width: rect.width,
          height: rect.height
        }
        
        const sectionIndex = sections.findIndex(s => s.id === sectionId)
        targetPosition = getNodePosition(sectionIndex, goalBounds)
      } else {
        // Fallback to old positioning if goal element not found
        const sectionIndex = sections.findIndex(s => s.id === sectionId)
        const fallbackPositions = [
          { x: -520, y: -260 }, // Top left - Experience
          { x: 375, y: -260 },  // Top right - Projects
          { x: -520, y: 115 },  // Bottom left - Tech Stack
          { x: 375, y: 115 }    // Bottom right - Education  
        ]
        targetPosition = fallbackPositions[sectionIndex] || { x: 0, y: 0 }
      }
    }
    
    setBallAnimation({ targetId: sectionId, targetPosition })
    
    // After animation completes, open the section
    setTimeout(() => {
      setBallAnimation(null)
      setIsAnimating(false)
      onSectionOpen(sectionId)
    }, 1200) // Animation duration + small delay
  }

  // Unified Goal with Nodes Component
  const GoalWithNodes = () => {
    const [goalBounds, setGoalBounds] = useState({ x: 0, y: 0, width: 1100, height: 575 })
    
    useEffect(() => {
      const updateGoalBounds = () => {
        const goalElement = document.querySelector('[data-goal-container]')
        if (goalElement) {
          const rect = goalElement.getBoundingClientRect()
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
          
          setGoalBounds({
            x: rect.left + rect.width / 2 - centerX,
            y: rect.top + rect.height / 2 - centerY,
            width: rect.width,
            height: rect.height
          })
        }
      }
      
      updateGoalBounds()
      window.addEventListener('resize', updateGoalBounds)
      return () => window.removeEventListener('resize', updateGoalBounds)
    }, [])

    return (
      <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2" style={{ zIndex: 20 }}>
        {/* Goal Container */}
        <div 
          data-goal-container
          className="relative w-[min(1100px,80vw)] h-[575px]"
          style={{ 
            aspectRatio: '1100/575',
            maxWidth: '80vw',
            height: 'auto',
            minHeight: '400px'
          }}
        >
          {/* Goal frame - main structure */}
          <div className="absolute inset-0">
            {/* Left post */}
            <div className="absolute left-0 top-0 w-1 h-full bg-white shadow-lg" style={{
              background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
              boxShadow: '4px 0 12px rgba(0, 0, 0, 0.4)',
              width: 'max(4px, 0.4%)'
            }}></div>
            
            {/* Right post */}
            <div className="absolute right-0 top-0 w-1 h-full bg-white shadow-lg" style={{
              background: 'linear-gradient(to left, #ffffff, #f8f9fa)',
              boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.4)',
              width: 'max(4px, 0.4%)'
            }}></div>
            
            {/* Top crossbar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white shadow-lg" style={{
              background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              height: 'max(4px, 0.7%)'
            }}></div>
            
            {/* Goal net pattern - more realistic */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 2px, transparent 4px),
                  linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.5) 2px, transparent 4px)
                `,
                backgroundSize: 'max(20px, 2%) max(20px, 3.5%)',
              }}
            ></div>
          </div>

          {/* Nodes positioned relative to goal bounds */}
          {sections.map((section, index) => {
            const relativePositions = [
              { x: 0.03, y: 0.05 }, // Top left - Experience (moved left from 0.15 to 0.05)
              { x: 0.85, y: 0.05 }, // Top right - Projects  
              { x: 0.03, y: 0.75 }, // Bottom left - Accolades (moved left from 0.15 to 0.05)
              { x: 0.85, y: 0.75 }  // Bottom right - Education
            ]
            
            const relativePos = relativePositions[index] || { x: 0.5, y: 0.5 }
            
            return (
              <motion.div
                key={section.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                style={{
                  left: `${relativePos.x * 100}%`,
                  top: `${relativePos.y * 100}%`,
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                <NodeBubble
                  section={section}
                  onClick={() => handleNodeClick(section.id)}
                  disabled={isAnimating}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  // Soccer Ball Component
  const SoccerBall = ({ position, targetPosition, isAnimating }) => {
    return (
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
        initial={{ 
          x: ballStartPosition.x, 
          y: ballStartPosition.y,
          scale: 1
        }}
        animate={isAnimating ? {
          x: targetPosition.x,
          y: targetPosition.y,
          scale: [1, 1.2, 0.8],
          rotate: [0, 720] // Two full rotations
        } : {
          x: ballStartPosition.x,
          y: ballStartPosition.y,
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          scale: { times: [0, 0.5, 1] }
        }}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img 
            src="/Pictures/soccerball.png" 
            alt="Soccer Ball" 
            className="w-full h-full object-cover"
            style={{
              transform: 'scale(2.5) translateX(0%) translateY(3.5%)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {/* Starry Sky Background */}
      <div className="absolute inset-0 z-0">
        {/* Background gradient for night sky */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 30%, #334155 70%, #000000 100%)'
          }}
        />
        
        {/* Static Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.twinkleDelay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Shooting Stars */}
        {shootingStars.map((shootingStar) => (
          <motion.div
            key={shootingStar.id}
            className="absolute"
            style={{
              left: `${shootingStar.startX}%`,
              top: `${shootingStar.startY}%`,
            }}
            animate={{
              x: [`0vw`, `${shootingStar.endX - shootingStar.startX}vw`],
              y: [`0vh`, `${shootingStar.endY - shootingStar.startY}vh`],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: shootingStar.duration,
              repeat: Infinity,
              delay: shootingStar.delay,
              repeatDelay: 8 + Math.random() * 5,
              ease: "easeOut"
            }}
          >
            {/* Shooting star trail */}
            <div 
              className="relative"
              style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 20%, rgba(147,197,253,1) 60%, rgba(255,255,255,1) 100%)',
                boxShadow: '0 0 10px rgba(147,197,253,0.8), 0 0 20px rgba(147,197,253,0.4)',
                borderRadius: '1px'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Scoreboard with Side Buttons */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Left Side Buttons */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        >
          {/* Resume Button */}
          <motion.button
            className="group relative w-12 h-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-cyan-400/30 rounded-xl flex items-center justify-center backdrop-blur-lg overflow-hidden"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(34, 211, 238, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Add resume download/view logic here
              console.log('Resume clicked');
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <FileText className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Resume
            </div>
          </motion.button>

          {/* Contact Button */}
          <motion.button
            className="group relative w-12 h-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-emerald-400/30 rounded-xl flex items-center justify-center backdrop-blur-lg overflow-hidden"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              try {
                // Copy email to clipboard
                await navigator.clipboard.writeText('varisa3@gatech.edu');
              } catch (err) {
                console.error('Failed to copy email: ', err);
              }
              // Always open email client regardless of clipboard success
              window.open('mailto:varisa3@gatech.edu', '_blank');
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <Mail className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Contact
            </div>
          </motion.button>
        </motion.div>

        {/* Scoreboard */}
        <Scoreboard score={score} hasWon={hasWon} />

        {/* Right Side Buttons */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        >
          {/* GitHub Button */}
          <motion.button
            className="group relative w-12 h-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-purple-400/30 rounded-xl flex items-center justify-center backdrop-blur-lg overflow-hidden"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(147, 51, 234, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open('https://github.com/shreyas765', '_blank');
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <Github className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              GitHub
            </div>
          </motion.button>

          {/* LinkedIn Button */}
          <motion.button
            className="group relative w-12 h-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-blue-400/30 rounded-xl flex items-center justify-center backdrop-blur-lg overflow-hidden"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open('https://linkedin.com/in/shreyas-arisa', '_blank');
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              LinkedIn
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Futuristic Tech Stack Carousel */}
      <div className="absolute bottom-60 left-0 w-full z-10 overflow-hidden">
        <motion.div
          className="flex items-center h-28 relative"
          style={{ 
            width: 'max-content'
          }}
          animate={selectedSection ? {
            x: '0%' // Pause animation when detail card is open
          } : {
            x: ['0%', '-15%']
          }}
          transition={{
            duration: selectedSection ? 0 : 120,
            repeat: selectedSection ? 0 : Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {/* Tech stack sections with futuristic glass-morphism styling */}
          {Array.from({ length: 20 }, (_, i) => [
            { 
              title: 'REACT', 
              subtitle: 'FRONTEND', 
              accentColor: 'cyan',
              gradientFrom: 'from-cyan-500/20',
              gradientTo: 'to-blue-500/20',
              borderColor: 'border-cyan-400/40',
              glowColor: 'shadow-cyan-500/30',
              textAccent: 'text-cyan-400',
              logo: '/Pictures/react-2.svg'
            },
            { 
              title: 'NEXT.JS', 
              subtitle: 'FRAMEWORK', 
              accentColor: 'slate',
              gradientFrom: 'from-slate-500/20',
              gradientTo: 'to-gray-500/20',
              borderColor: 'border-slate-400/40',
              glowColor: 'shadow-slate-500/30',
              textAccent: 'text-slate-300',
              logo: '/Pictures/next-js.svg'
            },
            { 
              title: 'PYTHON', 
              subtitle: 'AI/ML', 
              accentColor: 'yellow',
              gradientFrom: 'from-yellow-500/20',
              gradientTo: 'to-amber-500/20',
              borderColor: 'border-yellow-400/40',
              glowColor: 'shadow-yellow-500/30',
              textAccent: 'text-yellow-400',
              logo: '/Pictures/python-5.svg'
            },
            { 
              title: 'GIT', 
              subtitle: 'VERSION CONTROL', 
              accentColor: 'orange',
              gradientFrom: 'from-orange-500/20',
              gradientTo: 'to-red-500/20',
              borderColor: 'border-orange-400/40',
              glowColor: 'shadow-orange-500/30',
              textAccent: 'text-orange-400',
              logo: '/Pictures/git-icon.svg'
            },
            { 
              title: 'JAVA', 
              subtitle: 'LANGUAGE', 
              accentColor: 'red',
              gradientFrom: 'from-red-500/20',
              gradientTo: 'to-orange-500/20',
              borderColor: 'border-red-400/40',
              glowColor: 'shadow-red-500/30',
              textAccent: 'text-red-400',
              logo: '/Pictures/java.svg'
            },
            { 
              title: 'DOCKER', 
              subtitle: 'DEVOPS', 
              accentColor: 'blue',
              gradientFrom: 'from-blue-500/20',
              gradientTo: 'to-sky-500/20',
              borderColor: 'border-blue-400/40',
              glowColor: 'shadow-blue-500/30',
              textAccent: 'text-blue-400',
              logo: '/Pictures/docker.svg'
            },
            { 
              title: 'PYTORCH', 
              subtitle: 'AI/ML', 
              accentColor: 'orange',
              gradientFrom: 'from-orange-500/20',
              gradientTo: 'to-red-500/20',
              borderColor: 'border-orange-400/40',
              glowColor: 'shadow-orange-500/30',
              textAccent: 'text-orange-400',
              logo: '/Pictures/pytorch-2.svg'
            },
            { 
              title: 'MONGODB', 
              subtitle: 'DATABASE', 
              accentColor: 'emerald',
              gradientFrom: 'from-emerald-500/20',
              gradientTo: 'to-green-500/20',
              borderColor: 'border-emerald-400/40',
              glowColor: 'shadow-emerald-500/30',
              textAccent: 'text-emerald-400',
              logo: '/Pictures/mongodb-icon-1.svg'
            },
            { 
              title: 'TAILWINDCSS', 
              subtitle: 'STYLING', 
              accentColor: 'teal',
              gradientFrom: 'from-teal-500/20',
              gradientTo: 'to-cyan-500/20',
              borderColor: 'border-teal-400/40',
              glowColor: 'shadow-teal-500/30',
              textAccent: 'text-teal-400',
              logo: '/Pictures/tailwind-css-2.svg'
            },
            { 
              title: 'GOOGLE CLOUD', 
              subtitle: 'PLATFORM', 
              accentColor: 'blue',
              gradientFrom: 'from-blue-500/20',
              gradientTo: 'to-indigo-500/20',
              borderColor: 'border-blue-400/40',
              glowColor: 'shadow-blue-500/30',
              textAccent: 'text-blue-400',
              logo: '/Pictures/google_cloud.svg'
            },
            { 
              title: 'AWS', 
              subtitle: 'CLOUD', 
              accentColor: 'orange',
              gradientFrom: 'from-orange-500/20',
              gradientTo: 'to-yellow-500/20',
              borderColor: 'border-orange-400/40',
              glowColor: 'shadow-orange-500/30',
              textAccent: 'text-orange-400',
              logo: '/Pictures/aws-2.svg'
            },
            { 
              title: 'POSTGRESQL', 
              subtitle: 'DATABASE', 
              accentColor: 'indigo',
              gradientFrom: 'from-indigo-500/20',
              gradientTo: 'to-blue-500/20',
              borderColor: 'border-indigo-400/40',
              glowColor: 'shadow-indigo-500/30',
              textAccent: 'text-indigo-400',
              logo: '/Pictures/postgresql.svg'
            },
            { 
              title: 'C++', 
              subtitle: 'LANGUAGE', 
              accentColor: 'blue',
              gradientFrom: 'from-blue-500/20',
              gradientTo: 'to-indigo-500/20',
              borderColor: 'border-blue-400/40',
              glowColor: 'shadow-blue-500/30',
              textAccent: 'text-blue-400',
              logo: '/Pictures/c.svg'
            }
          ]).flat().map((tech, index) => (
            <motion.div 
              key={index}
              className={`relative flex flex-col items-center justify-center px-8 h-full bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-lg border-r border-white/10 overflow-hidden`}
              style={{ 
                minWidth: '280px',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              }}
              whileHover={{
                scale: 1.02,
                                 boxShadow: `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${
                   tech.accentColor === 'cyan' ? 'rgba(34, 211, 238, 0.3)' : 
                   tech.accentColor === 'slate' ? 'rgba(148, 163, 184, 0.3)' :
                   tech.accentColor === 'green' ? 'rgba(34, 197, 94, 0.3)' :
                   tech.accentColor === 'yellow' ? 'rgba(234, 179, 8, 0.3)' :
                   tech.accentColor === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                   tech.accentColor === 'red' ? 'rgba(239, 68, 68, 0.3)' :
                   tech.accentColor === 'orange' ? 'rgba(249, 115, 22, 0.3)' :
                   tech.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.3)' :
                   tech.accentColor === 'teal' ? 'rgba(20, 184, 166, 0.3)' :
                   tech.accentColor === 'indigo' ? 'rgba(99, 102, 241, 0.3)' :
                   tech.accentColor === 'purple' ? 'rgba(147, 51, 234, 0.3)' :
                   'rgba(147, 51, 234, 0.3)'
                 }, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background glow */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${tech.gradientFrom} ${tech.gradientTo} opacity-0`}
                animate={{
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
              
              {/* Animated border accent */}
              <motion.div 
                className={`absolute inset-0 border ${tech.borderColor} rounded-sm`}
                animate={{
                  borderOpacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <div className="w-12 h-12 mb-3 flex items-center justify-center filter drop-shadow-lg">
                  {tech.logo.startsWith('/Pictures/') ? (
                    <img 
                      src={tech.logo} 
                      alt={`${tech.title} logo`}
                      className="w-full h-full object-contain"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(100%)'
                      }}
                    />
                  ) : (
                    <div className="text-4xl">
                      {tech.logo}
                    </div>
                  )}
                </div>
                
                                <motion.span 
                  className={`${tech.textAccent} font-black text-2xl tracking-[0.15em] relative`}
                  style={{
                    textShadow: `0 0 10px ${
                      tech.accentColor === 'cyan' ? 'rgba(34, 211, 238, 0.5)' :
                      tech.accentColor === 'slate' ? 'rgba(148, 163, 184, 0.5)' :
                      tech.accentColor === 'green' ? 'rgba(34, 197, 94, 0.5)' :
                      tech.accentColor === 'yellow' ? 'rgba(234, 179, 8, 0.5)' :
                      tech.accentColor === 'blue' ? 'rgba(59, 130, 246, 0.5)' :
                      tech.accentColor === 'red' ? 'rgba(239, 68, 68, 0.5)' :
                      tech.accentColor === 'orange' ? 'rgba(249, 115, 22, 0.5)' :
                      tech.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.5)' :
                      tech.accentColor === 'teal' ? 'rgba(20, 184, 166, 0.5)' :
                      tech.accentColor === 'indigo' ? 'rgba(99, 102, 241, 0.5)' :
                      tech.accentColor === 'purple' ? 'rgba(147, 51, 234, 0.5)' :
                      'rgba(147, 51, 234, 0.5)'
                    }, 0 2px 4px rgba(0, 0, 0, 0.8)`
                  }}
                  animate={{
                    textShadow: [
                      `0 0 5px ${
                        tech.accentColor === 'cyan' ? 'rgba(34, 211, 238, 0.3)' :
                        tech.accentColor === 'slate' ? 'rgba(148, 163, 184, 0.3)' :
                        tech.accentColor === 'green' ? 'rgba(34, 197, 94, 0.3)' :
                        tech.accentColor === 'yellow' ? 'rgba(234, 179, 8, 0.3)' :
                        tech.accentColor === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                        tech.accentColor === 'red' ? 'rgba(239, 68, 68, 0.3)' :
                        tech.accentColor === 'orange' ? 'rgba(249, 115, 22, 0.3)' :
                        tech.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.3)' :
                        tech.accentColor === 'teal' ? 'rgba(20, 184, 166, 0.3)' :
                        tech.accentColor === 'indigo' ? 'rgba(99, 102, 241, 0.3)' :
                        tech.accentColor === 'purple' ? 'rgba(147, 51, 234, 0.3)' :
                        'rgba(147, 51, 234, 0.3)'
                      }, 0 2px 4px rgba(0, 0, 0, 0.8)`,
                      `0 0 15px ${
                        tech.accentColor === 'cyan' ? 'rgba(34, 211, 238, 0.8)' :
                        tech.accentColor === 'slate' ? 'rgba(148, 163, 184, 0.8)' :
                        tech.accentColor === 'green' ? 'rgba(34, 197, 94, 0.8)' :
                        tech.accentColor === 'yellow' ? 'rgba(234, 179, 8, 0.8)' :
                        tech.accentColor === 'blue' ? 'rgba(59, 130, 246, 0.8)' :
                        tech.accentColor === 'red' ? 'rgba(239, 68, 68, 0.8)' :
                        tech.accentColor === 'orange' ? 'rgba(249, 115, 22, 0.8)' :
                        tech.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.8)' :
                        tech.accentColor === 'teal' ? 'rgba(20, 184, 166, 0.8)' :
                        tech.accentColor === 'indigo' ? 'rgba(99, 102, 241, 0.8)' :
                        tech.accentColor === 'purple' ? 'rgba(147, 51, 234, 0.8)' :
                        'rgba(147, 51, 234, 0.8)'
                      }, 0 2px 4px rgba(0, 0, 0, 0.8)`,
                      `0 0 5px ${
                        tech.accentColor === 'cyan' ? 'rgba(34, 211, 238, 0.3)' :
                        tech.accentColor === 'slate' ? 'rgba(148, 163, 184, 0.3)' :
                        tech.accentColor === 'green' ? 'rgba(34, 197, 94, 0.3)' :
                        tech.accentColor === 'yellow' ? 'rgba(234, 179, 8, 0.3)' :
                        tech.accentColor === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                        tech.accentColor === 'red' ? 'rgba(239, 68, 68, 0.3)' :
                        tech.accentColor === 'orange' ? 'rgba(249, 115, 22, 0.3)' :
                        tech.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.3)' :
                        tech.accentColor === 'teal' ? 'rgba(20, 184, 166, 0.3)' :
                        tech.accentColor === 'indigo' ? 'rgba(99, 102, 241, 0.3)' :
                        tech.accentColor === 'purple' ? 'rgba(147, 51, 234, 0.3)' :
                        'rgba(147, 51, 234, 0.3)'
                      }, 0 2px 4px rgba(0, 0, 0, 0.8)`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15
                  }}
                >
                  {tech.title}
                </motion.span>
              </div>
              
              {/* Subtle particle effect */}
              <motion.div
                className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional futuristic overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none" 
             style={{
               background: 'linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.05) 25%, rgba(147, 51, 234, 0.05) 50%, rgba(16, 185, 129, 0.05) 75%, transparent 100%)'
             }}
        />
      </div>

      {/* Center Profile Picture - About Me */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        {/* Circular Text Around Profile Picture */}
        <div className="absolute inset-0 w-96 h-96 -top-16 -left-16 pointer-events-none">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 384 384"
          >
            {/* Define the circular path for text */}
            <defs>
              {/* Top arc - convex down */}
              <path
                id="circle-top"
                d="M 50,192 A 142,142 0 0,1 334,192"
                fill="none"
              />
              {/* Bottom arc - convex up  */}
              <path
                id="circle-bottom"
                d="M 50,210 A 142,142 0 0,0 334,210"
                fill="none"
              />
            </defs>
            
            {/* Top text - "SHREYAS ARISA" (convex down) */}
            <text className="fill-white text-2xl font-black tracking-[0.3em]" style={{ 
              fontSize: '24px', 
              fontWeight: '900',
              strokeWidth: '1px',
              stroke: 'rgba(0,0,0,0.5)',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,255,255,0.3))' 
            }}>
              <textPath href="#circle-top" startOffset="50%" textAnchor="middle">
                SHREYAS ARISA
              </textPath>
            </text>
            
            {/* Bottom text - "CS @ GEORGIA TECH" (convex up) */}
            <text className="fill-cyan-400 text-xl font-black tracking-[0.2em]" style={{ 
              fontSize: '22px', 
              fontWeight: '900',
              strokeWidth: '1px',
              stroke: 'rgba(0,0,0,0.5)',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(34,211,238,0.4))' 
            }}>
              <textPath href="#circle-bottom" startOffset="50%" textAnchor="middle">
                CS @ GEORGIA TECH
              </textPath>
            </text>
          </svg>
        </div>

        <motion.button
          className="w-64 h-64 rounded-full ring-4 ring-blue-400/30 shadow-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-4xl font-bold text-white overflow-hidden cursor-pointer hover:ring-blue-400/50 transition-all duration-200 relative z-10"
          onClick={() => handleNodeClick('about')}
          whileHover={{ 
            scale: 1.05,
            ringColor: "rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnimating}
        >
          {/* Profile picture */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-full">
            <img 
              src="/Pictures/mypic.png" 
              alt="Shreyas Arisa - Profile" 
              className="w-full h-full object-cover"
              style={{
                transform: 'scale(1.7) translateX(12%) translateY(5%)',
                transformOrigin: 'center center'
              }}
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span 
              className="hidden w-full h-full items-center justify-center text-3xl text-white"
              style={{ display: 'none' }}
            >
              Shreyas Arisa
            </span>
          </div>
        </motion.button>
      </div>

      {/* Unified Goal with Nodes Component */}
      <GoalWithNodes />

      {/* Soccer Ball */}
      <SoccerBall 
        position={ballStartPosition}
        targetPosition={ballAnimation?.targetPosition || ballStartPosition}
        isAnimating={isAnimating && ballAnimation}
      />

      {/* Goal Line - Full Width */}
      <div className="absolute bottom-56 left-0 w-full h-1 bg-white shadow-lg" style={{ zIndex: 2 }}></div>

      {/* Goal Area / Penalty Box Lines */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2" style={{ zIndex: 2 }}>
        {/* Penalty box rectangle */}
        <div 
          className="relative"
          style={{
            width: '1550px',
            height: '235px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'bottom center'
          }}
        >
          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-white shadow-lg"></div>
          {/* Left line */}
          <div className="absolute top-0 left-0 w-2 h-full bg-white shadow-lg"></div>
          {/* Right line */}
          <div className="absolute top-0 right-0 w-2 h-full bg-white shadow-lg"></div>
          
          {/* Penalty spot */}
          <div 
            className="absolute bg-white rounded-full shadow-lg"
            style={{
              width: '16px',
              height: '16px',
              left: '50%',
              bottom: '-100px',
              transform: 'translateX(-50%)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
          ></div>
        </div>
      </div>



      {/* Full Screen Confetti Drop */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
                     {[...Array(60)].map((_, i) => {
            const colors = [
              'bg-yellow-400', 'bg-cyan-400', 'bg-purple-400', 'bg-emerald-400', 
              'bg-orange-400', 'bg-pink-400', 'bg-blue-400', 'bg-red-400',
              'bg-green-400', 'bg-indigo-400'
            ];
            const shapes = ['rounded-full', 'rounded-sm', 'rounded-md', 'rounded-none'];
                         const sizes = ['w-2 h-2', 'w-3 h-3', 'w-4 h-4', 'w-2 h-4', 'w-4 h-2', 'w-3 h-5'];
            
            return (
              <motion.div
                key={`confetti-drop-${i}`}
                                 className={`absolute ${colors[i % colors.length]} ${shapes[i % shapes.length]} ${sizes[i % sizes.length]} shadow-lg`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-50px'
                }}
                initial={{ 
                  y: -50,
                  x: 0,
                  opacity: 0,
                  rotate: Math.random() * 360,
                  scale: 0
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  x: (Math.random() - 0.5) * 300,
                  opacity: [0, 1, 1, 0.8, 0],
                  rotate: Math.random() * 1440 + 360, // 2-4 full rotations
                  scale: [0, 1.2, 1, 0.8, 0.3]
                }}
                                 transition={{ 
                   duration: Math.random() * 3 + 4, // 4-7 seconds fall time
                   delay: Math.random() * 2, // Stagger over 2 seconds
                   ease: [0.25, 0.1, 0.25, 1] // Gravity-like easing
                 }}
              />
            );
                     })}
         </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Notification */}
      {showWelcomePopup && (
        <motion.div
          className="fixed top-4 right-4 z-50 max-w-xs cursor-pointer"
          initial={{ 
            opacity: 0,
            x: 100,
            scale: 0.9
          }}
          animate={{ 
            opacity: 1,
            x: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            x: 100,
            scale: 0.9
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
          onClick={() => setShowWelcomePopup(false)}
        >
          <motion.div
            className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg border border-cyan-400/50 rounded-xl p-4 shadow-2xl"
            style={{
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Animated border glow */}
            <motion.div 
              className="absolute inset-0 rounded-xl border border-cyan-400/30"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.2)',
                  '0 0 20px rgba(34, 211, 238, 0.4)',
                  '0 0 10px rgba(34, 211, 238, 0.2)'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Close button */}
            <button
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcomePopup(false);
              }}
            >
              ×
            </button>
            
            {/* Content */}
            <div className="relative z-10 pr-6">
              {/* Title */}
              <motion.h3 
                className="text-lg font-black text-white tracking-wide mb-3"
                style={{
                  textShadow: '0 0 8px rgba(34, 211, 238, 0.5)'
                }}
              >
                Shoot at the targets!
              </motion.h3>
              
              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                Click on the profile picture or section bubbles to explore my portfolio
              </p>
            </div>
            
            {/* Small floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  i % 3 === 0 ? 'bg-cyan-400/60' : 
                  i % 3 === 1 ? 'bg-blue-400/60' : 'bg-purple-400/60'
                }`}
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${15 + Math.random() * 70}%`,
                }}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
      
      {/* Pitch Grass */}
      <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full h-full"
            style={{
              zIndex: 1,
              background: `
                linear-gradient(to bottom, #22c55e 0%, #16a34a 30%, #15803d 70%, #166534 100%),
                linear-gradient(90deg, 
                  rgba(34, 197, 94, 0.8) 0%, 
                  rgba(22, 163, 74, 0.6) 12.5%, 
                  rgba(34, 197, 94, 0.8) 25%, 
                  rgba(22, 163, 74, 0.6) 37.5%, 
                  rgba(34, 197, 94, 0.8) 50%,
                  rgba(22, 163, 74, 0.6) 62.5%, 
                  rgba(34, 197, 94, 0.8) 75%, 
                  rgba(22, 163, 74, 0.6) 87.5%, 
                  rgba(34, 197, 94, 0.8) 100%
                ),
                radial-gradient(ellipse 3px 1px at 25% 70%, rgba(21, 128, 61, 0.6) 0%, transparent 100%),
                radial-gradient(ellipse 2px 1px at 75% 30%, rgba(34, 197, 94, 0.5) 0%, transparent 100%),
                radial-gradient(ellipse 4px 1px at 45% 85%, rgba(21, 128, 61, 0.4) 0%, transparent 100%),
                radial-gradient(ellipse 2px 1px at 85% 60%, rgba(34, 197, 94, 0.6) 0%, transparent 100%)
              `,
              backgroundSize: '100% 100%, 80px 100%, 12px 8px, 18px 12px, 15px 10px, 20px 14px'
            }}
          />
        </div>


      </div>

    </div>
  )
}

export default HubScene