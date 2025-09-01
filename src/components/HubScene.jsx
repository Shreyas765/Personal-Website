import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Mail, Github, Linkedin } from 'lucide-react'
import Scoreboard from './Scoreboard'
import NodeBubble from './NodeBubble'
import { sections } from '../data/sections'

const HubScene = ({ onSectionOpen, score, hasWon }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
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

  // Calculate positions for the four nodes in corners
  const getNodePosition = (index, total = 4) => {
    const positions = [
      { x: -520, y: -260 }, // Top left - Experience
      { x: 375, y: -260 },  // Top right - Projects
      { x: -520, y: 115 },  // Bottom left - Tech Stack
      { x: 375, y: 115 }    // Bottom right - Education  
    ]
    return positions[index] || { x: 0, y: 0 }
  }

  // Handle node clicks with ball animation
  const handleNodeClick = (sectionId) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    let targetPosition
    
    if (sectionId === 'about') {
      targetPosition = { x: 0, y: 0 } // Center position
    } else {
      const sectionIndex = sections.findIndex(s => s.id === sectionId)
      targetPosition = getNodePosition(sectionIndex)
    }
    
    setBallAnimation({ targetId: sectionId, targetPosition })
    
    // After animation completes, open the section
    setTimeout(() => {
      setBallAnimation(null)
      setIsAnimating(false)
      onSectionOpen(sectionId)
    }, 1200) // Animation duration + small delay
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
            onClick={() => {
              // Add contact logic here (email, contact form, etc.)
              console.log('Contact clicked');
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

      {/* Enhanced Sponsor Board - Professional Roles with Realistic Sections */}
      <div className="absolute bottom-60 left-0 w-full z-10 overflow-hidden">
        <motion.div
          className="flex items-center h-24 shadow-2xl"
          style={{ 
            width: 'max-content'
          }}
          animate={{
            x: ['0%', '-15%']
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {/* Sponsor sections with enhanced styling */}
          {Array.from({ length: 20 }, (_, i) => [
            { title: 'SOFTWARE', subtitle: 'DESIGNER', bgColor: 'bg-gradient-to-br from-red-500 to-red-700', textColor: 'text-white', shadow: 'shadow-red-500/30' },
            { title: 'AI/ML', subtitle: 'RESEARCHER', bgColor: 'bg-gradient-to-br from-blue-500 to-blue-700', textColor: 'text-white', shadow: 'shadow-blue-500/30' },
            { title: 'SOFTWARE', subtitle: 'ENGINEER', bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600', textColor: 'text-black', shadow: 'shadow-yellow-500/30' }
          ]).flat().map((sponsor, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center justify-center px-8 h-full ${sponsor.bgColor} ${sponsor.shadow} border-r-2 border-white/20`} 
              style={{ minWidth: '280px' }}
            >
              <span className={`${sponsor.textColor} font-black text-2xl tracking-wider drop-shadow-2xl mb-1`}>
                {sponsor.title}
              </span>
              <span className={`${sponsor.textColor} font-black text-2xl tracking-wider drop-shadow-2xl`}>
                {sponsor.subtitle}
              </span>
            </div>
          ))}
        </motion.div>
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

      {/* Orbiting Nodes */}
      {sections.map((section, index) => {
        const position = getNodePosition(index)
        return (
          <motion.div
            key={section.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ 
              x: position.x, 
              y: position.y,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: position.x, 
              y: position.y,
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

      {/* Soccer Ball */}
      <SoccerBall 
        position={ballStartPosition}
        targetPosition={ballAnimation?.targetPosition || ballStartPosition}
        isAnimating={isAnimating && ballAnimation}
      />

      {/* Soccer Goal - Realistic Position */}
      {/* Goal frame - main structure */}
      <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2 w-[1100px] h-[575px] z-20">
        {/* Left post */}
        <div className="absolute left-0 top-0 w-4 h-full bg-white shadow-lg" style={{
          background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.4)'
        }}></div>
        
        {/* Right post */}
        <div className="absolute right-0 top-0 w-4 h-full bg-white shadow-lg" style={{
          background: 'linear-gradient(to left, #ffffff, #f8f9fa)',
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.4)'
        }}></div>
        
        {/* Top crossbar */}
        <div className="absolute top-0 left-0 w-full h-4 bg-white shadow-lg" style={{
          background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
        }}></div>
        
        {/* Goal net pattern - more realistic */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 2px, transparent 4px),
              linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.5) 2px, transparent 4px)
            `,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

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

      {/* Win Celebration CTA */}
      {hasWon && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105">
            View Résumé
          </button>
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