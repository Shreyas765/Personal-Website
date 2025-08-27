# Personal Website MVP

An interactive personal website featuring a hub scene with orbiting nodes, animated spotlights, and a progressive scoring system.

## 🚀 Features

- **Interactive Hub Scene**: Central avatar with six orbiting section nodes
- **Animated Spotlights**: Two moving light cones that create a stage atmosphere
- **Progressive Scoring**: Scoreboard increments as users explore different sections
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Mobile-friendly with large touch targets
- **Accessibility**: Keyboard navigation, screen reader support, and focus management
- **Win Celebration**: Special animation when all sections are explored

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── HubScene.jsx      # Main scene with avatar and orbiting nodes
│   ├── Spotlight.jsx     # Animated light effects
│   ├── Scoreboard.jsx    # Progress tracker with win celebration
│   ├── NodeBubble.jsx    # Individual section nodes
│   └── DetailCard.jsx    # Modal for section content
├── data/
│   └── sections.js       # Content data for all sections
├── App.jsx               # Main application component
├── main.jsx              # Entry point
└── index.css             # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-website-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 User Experience Flow

1. **Landing**: Avatar lit by two animated spotlights, six bubbles pulsing around
2. **Exploration**: Click any bubble to zoom into a detailed card view
3. **Progress**: Scoreboard increments on first visit to each section
4. **Completion**: After exploring all six sections, scoreboard flips to "6-5" with celebration
5. **CTA**: Final call-to-action button appears for next steps

## 🎨 Design System

### Colors
- **Primary**: Emerald-400 (#34d399)
- **Background**: Slate-900 to Black gradient
- **Accents**: White/10 borders, glassy overlays

### Animations
- **Bubbles**: Gentle breathing and floating effects
- **Spotlights**: Slow opposing sway motion
- **Transitions**: Smooth scale and opacity changes
- **Celebration**: Confetti burst with scoreboard flip

### Typography
- **Font**: Inter (system fallbacks)
- **Hierarchy**: Clear title/content distinction
- **Readability**: High contrast with proper spacing

## 📱 Responsive Design

- **Mobile**: Hex-like ring layout that fits small screens
- **Touch**: Large tap targets (28x28 minimum)
- **Keyboard**: Tab navigation with focus indicators
- **Screen Readers**: ARIA labels and live regions

## ♿ Accessibility Features

- **Keyboard Navigation**: Tab through nodes, Enter to open
- **Focus Management**: Proper focus trapping in modals
- **Screen Reader Support**: ARIA labels and live announcements
- **Reduced Motion**: Respects user preferences
- **High Contrast**: Clear visual hierarchy

## 🔧 Customization

### Content
Edit `src/data/sections.js` to modify:
- Section titles and descriptions
- Content bullet points
- Call-to-action text

### Styling
Modify `tailwind.config.js` for:
- Color schemes
- Animation timings
- Custom utilities

### Layout
Adjust in `HubScene.jsx`:
- Node positioning radius
- Avatar size and styling
- Spotlight positioning

## 🚀 Future Enhancements

- **Progress Persistence**: Save to localStorage
- **Advanced Animations**: Particle effects, 3D transforms
- **Content Management**: CMS integration
- **Analytics**: Track user engagement
- **SEO Optimization**: Meta tags and structured data

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion 