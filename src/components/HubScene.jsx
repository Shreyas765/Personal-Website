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
      {/* Soccer Goal Background - Clean Version */}
        {/* Goal frame - main structure */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2/3 h-3/4">
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
        
        
        
      {/* Scoreboard */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <Scoreboard score={score} hasWon={hasWon} />
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
      
      {/* Enhanced Multi-Layer Animated Grass at Goal Base */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden">
        {/* Grass layer 1 - deepest background */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background: '#1a4a1a',
            clipPath: 'polygon(0% 100%, 0% 10%, 1% 8%, 2% 15%, 3% 5%, 4% 18%, 5% 4%, 6% 20%, 7% 9%, 8% 16%, 9% 6%, 10% 22%, 11% 3%, 12% 25%, 13% 11%, 14% 9%, 15% 22%, 16% 4%, 17% 28%, 18% 12%, 19% 8%, 20% 24%, 21% 6%, 22% 30%, 23% 10%, 24% 18%, 25% 4%, 26% 32%, 27% 9%, 28% 22%, 29% 5%, 30% 28%, 31% 12%, 32% 10%, 33% 24%, 34% 3%, 35% 35%, 36% 11%, 37% 16%, 38% 6%, 39% 30%, 40% 9%, 41% 22%, 42% 4%, 43% 32%, 44% 12%, 45% 10%, 46% 26%, 47% 5%, 48% 38%, 49% 11%, 50% 18%, 51% 3%, 52% 40%, 53% 9%, 54% 24%, 55% 6%, 56% 35%, 57% 12%, 58% 11%, 59% 28%, 60% 4%, 61% 42%, 62% 10%, 63% 22%, 64% 5%, 65% 38%, 66% 12%, 67% 9%, 68% 30%, 69% 3%, 70% 45%, 71% 11%, 72% 24%, 73% 6%, 74% 40%, 75% 14%, 76% 10%, 77% 32%, 78% 4%, 79% 48%, 80% 12%, 81% 22%, 82% 5%, 83% 42%, 84% 11%, 85% 9%, 86% 35%, 87% 3%, 88% 50%, 89% 10%, 90% 26%, 91% 6%, 92% 45%, 93% 14%, 94% 11%, 95% 38%, 96% 4%, 97% 52%, 98% 12%, 99% 22%, 100% 55%, 100% 100%)'
          }}
          animate={{
            x: [0, -3, 3, 0],
            scaleX: [1, 1.03, 0.97, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grass layer 2 - background */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-5/6"
          style={{
            background: '#2d5a2d',
            clipPath: 'polygon(0% 100%, 0% 8%, 2% 6%, 4% 12%, 6% 4%, 8% 16%, 10% 2%, 12% 18%, 14% 5%, 16% 20%, 18% 3%, 20% 22%, 22% 6%, 24% 24%, 26% 4%, 28% 26%, 30% 5%, 32% 28%, 34% 3%, 36% 30%, 38% 6%, 40% 32%, 42% 4%, 44% 34%, 46% 5%, 48% 36%, 50% 3%, 52% 38%, 54% 6%, 56% 40%, 58% 4%, 60% 42%, 62% 5%, 64% 44%, 66% 3%, 68% 46%, 70% 6%, 72% 48%, 74% 4%, 76% 50%, 78% 5%, 80% 52%, 82% 3%, 84% 54%, 86% 6%, 88% 56%, 90% 4%, 92% 58%, 94% 5%, 96% 60%, 98% 3%, 100% 62%, 100% 100%)'
          }}
          animate={{
            x: [0, -2, 2, 0],
            scaleX: [1, 1.02, 0.98, 1]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        
        {/* Grass layer 3 - mid layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-3/4"
          style={{
            background: '#3a6b3a',
            clipPath: 'polygon(0% 100%, 0% 15%, 2% 12%, 4% 18%, 6% 8%, 8% 22%, 10% 10%, 12% 25%, 14% 6%, 16% 28%, 18% 12%, 20% 30%, 22% 8%, 24% 32%, 26% 10%, 28% 35%, 30% 6%, 32% 38%, 34% 12%, 36% 40%, 38% 8%, 40% 42%, 42% 10%, 44% 45%, 46% 6%, 48% 48%, 50% 12%, 52% 50%, 54% 8%, 56% 52%, 58% 10%, 60% 55%, 62% 6%, 64% 58%, 66% 12%, 68% 60%, 70% 8%, 72% 62%, 74% 10%, 76% 65%, 78% 6%, 80% 68%, 82% 12%, 84% 70%, 86% 8%, 88% 72%, 90% 10%, 92% 75%, 94% 6%, 96% 78%, 98% 12%, 100% 80%, 100% 100%)'
          }}
          animate={{
            x: [0, 1, -1, 0],
            scaleX: [1, 1.01, 0.99, 1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Grass layer 4 - mid-front layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-2/3"
          style={{
            background: '#4a7c4a',
            clipPath: 'polygon(0% 100%, 0% 20%, 2% 18%, 4% 25%, 6% 15%, 8% 28%, 10% 16%, 12% 32%, 14% 12%, 16% 35%, 18% 18%, 20% 38%, 22% 14%, 24% 40%, 26% 16%, 28% 42%, 30% 12%, 32% 45%, 34% 18%, 36% 48%, 38% 14%, 40% 50%, 42% 16%, 44% 52%, 46% 12%, 48% 55%, 50% 18%, 52% 58%, 54% 14%, 56% 60%, 58% 16%, 60% 62%, 62% 12%, 64% 65%, 66% 18%, 68% 68%, 70% 14%, 72% 70%, 74% 16%, 76% 72%, 78% 12%, 80% 75%, 82% 18%, 84% 78%, 86% 14%, 88% 80%, 90% 16%, 92% 82%, 94% 12%, 96% 85%, 98% 18%, 100% 88%, 100% 100%)'
          }}
          animate={{
            x: [0, -1, 1, 0],
            scaleX: [1, 1.005, 0.995, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Grass layer 5 - front layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background: '#5a8c5a',
            clipPath: 'polygon(0% 100%, 0% 35%, 2% 30%, 4% 38%, 6% 25%, 8% 42%, 10% 28%, 12% 45%, 14% 22%, 16% 48%, 18% 30%, 20% 50%, 22% 25%, 24% 52%, 26% 28%, 28% 55%, 30% 22%, 32% 58%, 34% 30%, 36% 60%, 38% 25%, 40% 62%, 42% 28%, 44% 65%, 46% 22%, 48% 68%, 50% 30%, 52% 70%, 54% 25%, 56% 72%, 58% 28%, 60% 75%, 62% 22%, 64% 78%, 66% 30%, 68% 80%, 70% 25%, 72% 82%, 74% 28%, 76% 85%, 78% 22%, 80% 88%, 82% 30%, 84% 90%, 86% 25%, 88% 92%, 90% 28%, 92% 95%, 94% 22%, 96% 98%, 98% 30%, 100% 100%, 100% 100%)'
          }}
          animate={{
            x: [0, 0.5, -0.5, 0],
            scaleX: [1, 1.003, 0.997, 1]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Grass layer 6 - top layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/3"
          style={{
            background: '#6a9c6a',
            clipPath: 'polygon(0% 100%, 0% 45%, 2% 40%, 4% 48%, 6% 35%, 8% 52%, 10% 38%, 12% 55%, 14% 32%, 16% 58%, 18% 40%, 20% 60%, 22% 35%, 24% 62%, 26% 38%, 28% 65%, 30% 32%, 32% 68%, 34% 40%, 36% 70%, 38% 35%, 40% 72%, 42% 38%, 44% 75%, 46% 32%, 48% 78%, 50% 40%, 52% 80%, 54% 35%, 56% 82%, 58% 38%, 60% 85%, 62% 32%, 64% 88%, 66% 40%, 68% 90%, 70% 35%, 72% 92%, 74% 38%, 76% 95%, 78% 32%, 80% 98%, 82% 40%, 84% 100%, 86% 35%, 88% 95%, 90% 38%, 92% 98%, 94% 32%, 96% 100%, 98% 40%, 100% 95%, 100% 100%)'
          }}
          animate={{
            x: [0, -0.3, 0.3, 0],
            scaleX: [1, 1.001, 0.999, 1]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Grass layer 7 - very front layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/4"
          style={{
            background: '#7aac7a',
            clipPath: 'polygon(0% 100%, 0% 65%, 3% 60%, 6% 68%, 9% 55%, 12% 72%, 15% 58%, 18% 75%, 21% 52%, 24% 78%, 27% 60%, 30% 80%, 33% 55%, 36% 82%, 39% 58%, 42% 85%, 45% 52%, 48% 88%, 51% 60%, 54% 90%, 57% 55%, 60% 92%, 63% 58%, 66% 95%, 69% 52%, 72% 98%, 75% 60%, 78% 100%, 81% 55%, 84% 95%, 87% 58%, 90% 98%, 93% 52%, 96% 100%, 99% 60%, 100% 95%, 100% 100%)'
          }}
          animate={{
            x: [0, 0.2, -0.2, 0],
            scaleX: [1, 1.0005, 0.9995, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />

        {/* Grass layer 8 - topmost highlights */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/6"
          style={{
            background: '#8abc8a',
            clipPath: 'polygon(0% 100%, 0% 75%, 5% 70%, 10% 78%, 15% 65%, 20% 82%, 25% 68%, 30% 85%, 35% 62%, 40% 88%, 45% 70%, 50% 90%, 55% 65%, 60% 92%, 65% 68%, 70% 95%, 75% 62%, 80% 98%, 85% 70%, 90% 100%, 95% 65%, 100% 95%, 100% 100%)'
          }}
          animate={{
            x: [0, -0.1, 0.1, 0],
            scaleX: [1, 1.0002, 0.9998, 1]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
      </div>

    </div>
  )
}

export default HubScene