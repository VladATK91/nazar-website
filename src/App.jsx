import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import Homepage from './pages/Homepage'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Media from './pages/Media'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { key } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [key])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
        <Route path="/reservations" element={<PageTransition><Reservations /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function AppInner() {
  return (
    <div className="grain-overlay min-h-screen bg-[#0A0A0A]">
      <ScrollToTop />
      <ScrollProgress />
      <Navigation />
      <AnimatedRoutes />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
