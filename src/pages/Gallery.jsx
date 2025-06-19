import { motion } from 'framer-motion'
import { Images } from 'lucide-react'
import { useState, useContext, useEffect } from 'react'
import { ModalContext } from '@/App'
import { useCallback } from 'react'

export default function Gallery() {
  const galleryImages = [
    '/images/gallery-image-12.jpg',
    '/images/gallery-image-6.jpg',
    '/images/gallery-image-4.jpg',
    '/images/gallery-image-1.jpg',
    '/images/gallery-image-3.jpg',
    '/images/gallery-image-9.jpg',
    '/images/gallery-image-10.jpg',
    '/images/gallery-image-8.jpg',
    '/images/gallery-image-7.jpg',
  ]
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { setIsModalOpen } = useContext(ModalContext)

  const openImage = (index) => {
    setSelectedImage(galleryImages[index])
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const closeImage = useCallback(() => {
    setSelectedImage(null)
    setIsModalOpen(false)
  }, [setIsModalOpen])

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setSelectedImage(galleryImages[nextIndex])
    setCurrentIndex(nextIndex)
  }, [currentIndex, galleryImages])

  const goToPrev = useCallback(() => {
    const prevIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedImage(galleryImages[prevIndex])
    setCurrentIndex(prevIndex)
  }, [currentIndex, galleryImages])

  // Add keyboard event listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeImage()
      }
    }

    const handleKeyNextPress = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    }

    const handleKeyPrevPress = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleKeyNextPress)
    window.addEventListener('keydown', handleKeyPrevPress)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleKeyNextPress)
      window.removeEventListener('keydown', handleKeyPrevPress)
    }
  }, [closeImage, goToNext, goToPrev])

  return (
    <section id="gallery" className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-gray-800"
          >
            Gallery
          </motion.h2>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="h-[1px] w-12 bg-rose-200" />
            <Images className="w-5 h-5 text-rose-400" />
            <div className="h-[1px] w-12 bg-rose-200" />
          </motion.div>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openImage(index)}
              className="relative overflow-hidden rounded-lg cursor-pointer mb-4 break-inside-avoid group"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <motion.div
            className="relative max-w-4xl w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-12 right-0 bg-white/20 rounded-full p-2 cursor-pointer"
              onClick={closeImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>
            <img
              src={selectedImage}
              alt="Selected gallery image"
              className="w-full max-h-[80vh] object-contain"
            />

            {/* Navigation Arrows */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2  rounded-full p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2   rounded-full p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
