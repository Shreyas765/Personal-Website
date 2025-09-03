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
        className="px-12 py-5 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-cyan-400/50 rounded-2xl font-bold text-4xl text-white flex items-center gap-8 backdrop-blur-lg relative overflow-hidden"
        style={{
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
        }}
        animate={hasWon ? { 
          scale: [1, 1.05, 1],
          rotateY: [0, 180, 0]
        } : {
          scale: [1, 1.01, 1],
        }}
        transition={{ 
          duration: hasWon ? 0.8 : 4,
          ease: "easeInOut",
          repeat: hasWon ? 0 : Infinity
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-60"></div>
        
        {/* Animated border glow */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border border-cyan-400/30"
          animate={{
            boxShadow: hasWon ? [
              '0 0 20px rgba(34, 211, 238, 0.4)',
              '0 0 40px rgba(34, 211, 238, 0.8)',
              '0 0 20px rgba(34, 211, 238, 0.4)'
            ] : [
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
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-6">
          {hasWon ? (
            <>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
              </motion.div>
              <span className="tracking-wide bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-black">
                5 - 4
              </span>
            </>
          ) : (
            <>
              <span className="tracking-wide bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black">
                {score}
              </span>
              <span className="text-slate-400 text-3xl font-light">—</span>
              <span className="tracking-wide text-slate-300 font-black">4</span>
            </>
          )}
        </div>

        {/* Progress indicator */}
        {!hasWon && (
          <div className="absolute bottom-1 left-0 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
                             animate={{ width: `${(score / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        )}
      </motion.div>

      {/* Enhanced confetti effect when won */}
      <AnimatePresence>
        {hasWon && (
          <>
            {/* Local burst confetti around scoreboard */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    i % 3 === 0 ? 'bg-yellow-400' : 
                    i % 3 === 1 ? 'bg-cyan-400' : 'bg-purple-400'
                  }`}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1,
                    scale: 0
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 150,
                    y: (Math.random() - 0.5) * 150,
                    opacity: 0,
                    scale: [0, 1.5, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>


          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Scoreboard 