import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'

const DetailCard = ({ section, onClose }) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Focus trap
  useEffect(() => {
    const firstFocusable = document.querySelector('[data-focusable]')
    if (firstFocusable) {
      firstFocusable.focus()
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Card */}
        <motion.div
          className="relative w-[90vw] h-[90vh] rounded-2xl shadow-2xl bg-slate-900/95 border border-white/10 overflow-hidden flex flex-col"
          initial={{ 
            scale: 0.3, 
            opacity: 0,
            y: 0,
            rotateX: 15
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
            rotateX: 0
          }}
          exit={{ 
            scale: 0.3, 
            opacity: 0,
            y: 0,
            rotateX: 15
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${section.id}-title`}
        >
          {/* Header */}
          <div className="p-8 pb-6 border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 
                id={`${section.id}-title`}
                className="text-4xl font-bold text-white"
              >
                {section.title}
              </h2>
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Close"
                data-focusable
              >
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>
            <p className="text-xl text-white/70 mt-3">{section.short}</p>
          </div>

          {/* Content */}
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <ul className="space-y-6">
                {section.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-white/5 hover:bg-slate-800/50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-lg" />
                    <span className="text-lg text-white/90 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Additional content space for future expansion */}
              <div className="mt-12 p-8 bg-slate-800/20 rounded-2xl border border-white/5">
                <h3 className="text-2xl font-semibold text-white mb-4">More Details Coming Soon</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  This section will be expanded with more detailed information, images, and interactive elements.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 pt-6 border-t border-white/10 bg-gradient-to-r from-slate-700/50 to-slate-800/50">
            <div className="max-w-4xl mx-auto">
              <button className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 group hover:scale-105 shadow-lg">
                {section.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailCard 