import { useEffect, useState } from 'react'
import '../styles/Splash.css'

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src="/logo.png" alt="Mouhamed VJ" className="splash-logo" />
      </div>
    </div>
  )
}
