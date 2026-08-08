import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Splash from './components/Splash'
import Home from './pages/Home'
import Bio from './pages/Bio'
import Music from './pages/Music'
import Clips from './pages/Clips'
import Blog from './pages/Blog'
import Gallery from './pages/Gallery'
import ExclusiveVideos from './pages/ExclusiveVideos'
import Agenda from './pages/Agenda'
import Contact from './pages/Contact'

const queryClient = new QueryClient()

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const splashShown = sessionStorage.getItem('splashShown')
    return !splashShown
  })

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true')
    setShowSplash(false)
  }

  return (
    <QueryClientProvider client={queryClient}>
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/music" element={<Music />} />
            <Route path="/clips" element={<Clips />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/exclusive" element={<ExclusiveVideos />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
