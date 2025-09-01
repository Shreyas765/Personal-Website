import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Scoreboard from './Scoreboard'
import NodeBubble from './NodeBubble'
import { sections } from '../data/sections'

const HubScene = ({ onSectionOpen, score, hasWon }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  // Calculate positions for the four nodes in corners
  const getNodePosition = (index, total = 4) => {
    const positions = [
      { x: -470, y: -260 }, // Top left - Experience
      { x: 330, y: -260 },  // Top right - Projects
      { x: -470, y: 60 },  // Bottom left - Tech Stack
      { x: 330, y: 60 }    // Bottom right - Education  
    ]
    return positions[index] || { x: 0, y: 0 }
  }

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {/* Scoreboard */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <Scoreboard score={score} hasWon={hasWon} />
      </div>

      {/* Enhanced Sponsor Board - Professional Roles with Realistic Sections */}
      <div className="absolute bottom-36 left-0 w-full z-1 overflow-hidden">
        <motion.div
          className="flex items-center h-160 shadow-2xl"
          style={{ 
            width: '200%'
          }}
          animate={{
            x: [0, -800]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {/* First set of sponsor sections */}
          <div className="flex items-center whitespace-nowrap">
             {/* Sponsor Section 1 - Red */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-red-600" style={{ minWidth: '200px' }}>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">DEVELOPER</span>
             </div>
             
             {/* Sponsor Section 2 - Blue */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-blue-600" style={{ minWidth: '200px' }}>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">RESEARCHER</span>
             </div>
             
             {/* Sponsor Section 3 - Light Green */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-green-400" style={{ minWidth: '200px' }}>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">DESIGNER</span>
             </div>
             
             {/* Sponsor Section 4 - Yellow */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-yellow-500" style={{ minWidth: '200px' }}>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">ENGINEER</span>
             </div>
          </div>
          
          {/* Duplicate set 1 for seamless loop */}
          <div className="flex items-center whitespace-nowrap">
             {/* Sponsor Section 1 - Red (duplicate) */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-red-600" style={{ minWidth: '200px' }}>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">DEVELOPER</span>
             </div>
             
             {/* Sponsor Section 2 - Blue (duplicate) */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-blue-600" style={{ minWidth: '200px' }}>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-white font-bold text-3xl tracking-wide drop-shadow-lg">RESEARCHER</span>
             </div>
             
             {/* Sponsor Section 3 - Light Green (duplicate) */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-green-400" style={{ minWidth: '200px' }}>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">DESIGNER</span>
             </div>
             
             {/* Sponsor Section 4 - Yellow (duplicate) */}
             <div className="flex flex-col items-center justify-center px-12 h-full bg-yellow-500" style={{ minWidth: '200px' }}>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">SOFTWARE</span>
               <span className="text-black font-bold text-3xl tracking-wide drop-shadow-lg">ENGINEER</span>
             </div>
          </div>


        </motion.div>
      </div>

      {/* Center Profile Picture - About Me */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.button
          className="w-44 h-44 rounded-full ring-4 ring-emerald-400/30 shadow-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-4xl font-bold text-white overflow-hidden cursor-pointer hover:ring-emerald-400/50 transition-all duration-200"
          onClick={() => onSectionOpen('about')}
          whileHover={{ 
            scale: 1.05,
            ringColor: "rgba(16, 185, 129, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [0, 1, -1, 0],
            x: [0, 10, -8, 5, 0],
            y: [0, -5, 8, -3, 0]
          }}
          transition={{ 
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          {/* Placeholder for profile picture */}
          <div className="w-full h-full flex items-center justify-center">
            <span className="flex justify-center text-3xl">Shreyas Arisa</span>
          </div>
          {/* Add your profile picture here by replacing the span above with: */}
          {/* <img src="/path-to-your-photo.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
        </motion.button>
      </div>

      {/* Orbiting Nodes */}
      {sections.map((section, index) => {
        const position = getNodePosition(index)
        return (
          <motion.div
            key={section.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
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
              onClick={() => onSectionOpen(section.id)}
            />
          </motion.div>
        )
      })}

      {/* Soccer Goal Background - Behind the Grass */}
      {/* Goal frame - main structure */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2/3 h-3/4 z-1">
        {/* Left post */}
        <div className="absolute left-0 top-0 w-4 h-full bg-white shadow-lg" style={{
          background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)'
        }}></div>
        
        {/* Right post */}
        <div className="absolute right-0 top-0 w-4 h-full bg-white shadow-lg" style={{
          background: 'linear-gradient(to left, #ffffff, #f8f9fa)',
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.3)'
        }}></div>
        
        {/* Top crossbar */}
        <div className="absolute top-0 left-0 w-full h-4 bg-white shadow-lg" style={{
          background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}></div>
        
        {/* Goal net pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)
            `,
            backgroundSize: '15px 15px'
          }}
        ></div>
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
      
      {/* Enhanced Multi-Layer Smoother Football Pitch Grass */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden z-10">
        {/* Grass layer 1 - deepest background */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(to top, #1a4a1a, #2a5a2a)',
            clipPath: 'polygon(0% 100%, 0% 30%, 10% 28%, 20% 32%, 30% 29%, 40% 34%, 50% 31%, 60% 35%, 70% 32%, 80% 36%, 90% 33%, 100% 38%, 100% 100%)'
          }}
          animate={{
            x: [0, -2, 2, 0],
            scaleX: [1, 1.01, 0.99, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grass layer 2 - background */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-5/6"
          style={{
            background: 'linear-gradient(to top, #2d5a2d, #3a6a3a)',
            clipPath: 'polygon(0% 100%, 0% 30%, 4% 27%, 8% 33%, 12% 26%, 16% 35%, 20% 28%, 24% 36%, 28% 25%, 32% 38%, 36% 27%, 40% 39%, 44% 26%, 48% 40%, 52% 25%, 56% 41%, 60% 28%, 64% 42%, 68% 27%, 72% 43%, 76% 26%, 80% 44%, 84% 29%, 88% 45%, 92% 28%, 96% 46%, 100% 32%, 100% 100%)'
          }}
          animate={{
            x: [0, -1.5, 1.5, 0],
            scaleX: [1, 1.008, 0.992, 1]
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        
        {/* Grass layer 3 - mid layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-3/4"
          style={{
            background: 'linear-gradient(to top, #3a6b3a, #4a7a4a)',
            clipPath: 'polygon(0% 100%, 0% 35%, 5% 32%, 10% 38%, 15% 30%, 20% 40%, 25% 33%, 30% 41%, 35% 29%, 40% 43%, 45% 31%, 50% 44%, 55% 28%, 60% 45%, 65% 32%, 70% 46%, 75% 30%, 80% 47%, 85% 34%, 90% 48%, 95% 33%, 100% 46%, 100% 100%)'
          }}
          animate={{
            x: [0, 1, -1, 0],
            scaleX: [1, 1.005, 0.995, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        />
        
        {/* Grass layer 4 - mid-front layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-2/3"
          style={{
            background: 'linear-gradient(to top, #4a7c4a, #5a8a5a)',
            clipPath: 'polygon(0% 100%, 0% 40%, 6% 37%, 12% 44%, 18% 35%, 24% 46%, 30% 38%, 36% 47%, 42% 34%, 48% 48%, 54% 36%, 60% 49%, 66% 33%, 72% 50%, 78% 39%, 84% 51%, 90% 37%, 96% 52%, 100% 48%, 100% 100%)'
          }}
          animate={{
            x: [0, -0.8, 0.8, 0],
            scaleX: [1, 1.003, 0.997, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />

        {/* Grass layer 5 - front layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background: 'linear-gradient(to top, #5a8c5a, #6a9a6a)',
            clipPath: 'polygon(0% 100%, 0% 50%, 8% 47%, 15% 54%, 23% 45%, 30% 56%, 38% 48%, 45% 57%, 53% 44%, 60% 58%, 68% 46%, 75% 59%, 83% 49%, 90% 60%, 100% 50%, 100% 100%)'
          }}
          animate={{
            x: [0, 0.5, -0.5, 0],
            scaleX: [1, 1.002, 0.998, 1]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />

        {/* Grass layer 6 - top layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/3"
          style={{
            background: 'linear-gradient(to top, #6a9c6a, #7aaa7a)',
            clipPath: 'polygon(0% 100%, 0% 60%, 10% 57%, 20% 64%, 30% 55%, 40% 66%, 50% 58%, 60% 67%, 70% 56%, 80% 68%, 90% 59%, 100% 60%, 100% 100%)'
          }}
          animate={{
            x: [0, -0.3, 0.3, 0],
            scaleX: [1, 1.001, 0.999, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />

        {/* Grass layer 7 - very front layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/4"
          style={{
            background: 'linear-gradient(to top, #7aac7a, #8aba8a)',
            clipPath: 'polygon(0% 100%, 0% 70%, 12% 68%, 25% 73%, 37% 66%, 50% 74%, 62% 65%, 75% 75%, 87% 67%, 100% 74%, 100% 100%)'
          }}
          animate={{
            x: [0, 0.2, -0.2, 0],
            scaleX: [1, 1.0008, 0.9992, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Grass layer 8 - topmost highlights */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/6"
          style={{
            background: 'linear-gradient(to top, #8abc8a, #9aca9a)',
            clipPath: 'polygon(0% 100%, 0% 80%, 16% 78%, 33% 83%, 50% 77%, 66% 84%, 83% 76%, 100% 80%, 100% 100%)'
          }}
          animate={{
            x: [0, -0.1, 0.1, 0],
            scaleX: [1, 1.0005, 0.9995, 1]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
        />

        {/* Grass layer 9 - extra coverage for black spots */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-72 -z-10"
          style={{
            background: 'linear-gradient(to top,rgb(84, 153, 84),rgb(88, 153, 88))',
            clipPath: 'polygon(0% 100%, 0% 50%, 20% 49%, 100% 51%, 60% 49%, 100% 51%, 100% 100%, 100% 100%)'
          }}
          animate={{
            x: [0, 0.05, -0.05, 0],
            scaleX: [1, 1.0003, 0.9997, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
      </div>

    </div>
  )
}

export default HubScene