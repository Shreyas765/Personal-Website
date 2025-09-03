import React, { useState, useEffect } from 'react'
import HubScene from './components/HubScene'
import DetailCard from './components/DetailCard'
import { sections } from './data/sections'

function App() {
  const [openedSections, setOpenedSections] = useState({})
  const [selectedSection, setSelectedSection] = useState(null)
  const [score, setScore] = useState(0)
  const [hasWon, setHasWon] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Calculate score from opened sections
  useEffect(() => {
    const newScore = Object.values(openedSections).filter(Boolean).length
    setScore(newScore)
    
    // Check win condition - 5 sections total (4 data sections + about)
    if (newScore === 5 && !hasWon) {
      setHasWon(true)
      setShowConfetti(true)
      // Hide confetti after 8 seconds
      setTimeout(() => setShowConfetti(false), 8000)
    }
  }, [openedSections, hasWon])

  const handleSectionOpen = (sectionId) => {
    setSelectedSection(sections.find(s => s.id === sectionId))
    
    // Mark as opened if first time
    if (!openedSections[sectionId]) {
      setOpenedSections(prev => ({
        ...prev,
        [sectionId]: true
      }))
    }
  }

  const handleSectionClose = () => {
    setSelectedSection(null)
  }

  return (
    <div className="App h-screen w-screen relative overflow-hidden">
      <HubScene 
        onSectionOpen={handleSectionOpen}
        score={score}
        hasWon={hasWon}
        showConfetti={showConfetti}
        selectedSection={selectedSection}
      />
      
      {selectedSection && (
        <DetailCard
          section={selectedSection}
          onClose={handleSectionClose}
        />
      )}
    </div>
  )
}

export default App 