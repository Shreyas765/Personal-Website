import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'

const Scoreboard = ({ score, hasWon }) => {
  return (
    <motion.div 
      className="relative"
      initial={{ 
        scale: 0,
        opacity: 0,
        y: -20
      }}
      animate={{ 
        scale: 1,
        opacity: 1,
        y: 0
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }}
    >
      <motion.div
        className="px-8 py-4 bg-black/90 border-2 border-yellow-400 rounded-lg font-bold text-3xl text-yellow-400 flex items-center gap-4 shadow-2xl backdrop-blur-md relative overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(255, 193, 7, 0.4), 0 0 0 2px rgba(255, 193, 7, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          fontFamily: 'Arial Black, Impact, sans-serif',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
        }}
        animate={hasWon ? { 
          scale: [1, 1.1, 1],
          rotateY: [0, 180, 0]
        } : {
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 25px 50px -12px rgba(255, 193, 7, 0.4), 0 0 0 2px rgba(255, 193, 7, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            '0 25px 50px -12px rgba(255, 193, 7, 0.6), 0 0 0 2px rgba(255, 193, 7, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            '0 25px 50px -12px rgba(255, 193, 7, 0.4), 0 0 0 2px rgba(255, 193, 7, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          ]
        }}
        transition={{ 
          duration: hasWon ? 0.6 : 3,
          ease: "easeInOut",
          repeat: hasWon ? 0 : Infinity
        }}
      >
        {/* Subtle scoreboard background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-yellow-400/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-4">
          {hasWon ? (
            <>
              <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
              <span className="tracking-wider">4 - 4</span>
              <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
            </>
          ) : (
            <>
              <span className="tracking-wider">{score}</span>
              <span className="text-yellow-400/80 text-2xl">-</span>
              <span className="tracking-wider">4</span>
            </>
          )}
        </div>
      </motion.div>

      {/* Confetti effect when won */}
      <AnimatePresence>
        {hasWon && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Scoreboard 