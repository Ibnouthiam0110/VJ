import { useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface LightboxProps {
  images: Array<{ id: string; url: string; title: string }>
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  const currentImage = images[currentIndex]

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '2rem'
      }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      tabIndex={0}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'transparent',
          color: '#fff',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer'
        }}
      >
        <FaTimes />
      </button>

      {/* Image container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '90vw',
          maxHeight: '80vh',
          marginBottom: '1rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {currentImage.url.includes('youtube') || currentImage.url.includes('vimeo') ? (
          <iframe
            src={currentImage.url}
            title={currentImage.title}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '800px',
              maxHeight: '600px',
              border: 'none',
              borderRadius: '0.5rem'
            }}
            allowFullScreen
          />
        ) : (
          <img
            src={currentImage.url}
            alt={currentImage.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '0.5rem'
            }}
          />
        )}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          color: '#fff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePrevious}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          <FaChevronLeft />
        </button>

        <div style={{ textAlign: 'center', minWidth: '200px' }}>
          <p style={{ margin: '0 0 0.5rem' }}>{currentImage.title}</p>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        <button
          onClick={handleNext}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}
