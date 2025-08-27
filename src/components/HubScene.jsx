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
      { x: -550, y: -275 }, // Top left - Experience
      { x: 400, y: -275 },  // Top right - Projects
      { x: -550, y: 60 },  // Bottom left - Tech Stack
      { x: 400, y: 60 }    // Bottom right - Education  
    ]
    return positions[index] || { x: 0, y: 0 }
  }

  return (
    <div className="relative h-full w-full bg-slate-900 overflow-hidden">
      {/* Soccer Goal Background - Clean Version */}
        {/* Goal frame as a single wide rectangle */}
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3/4 h-2/3 border-4 border-white shadow-2xl rounded-sm"></div>
        
        {/* Grass covering the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-green-600 via-green-500 to-green-400"></div>
        
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
      

    </div>
  )
}

export default HubScene 