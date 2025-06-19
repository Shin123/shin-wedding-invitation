// src/pages/LandingPage.jsx
import config from '@/config/config'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import PropTypes from 'prop-types'

const LandingPage = ({ onOpenInvitation }) => {
  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeOut',
            }}
            className="absolute"
          >
            <Heart
              className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${
                i % 3 === 0
                  ? 'text-rose-400'
                  : i % 3 === 1
                    ? 'text-pink-400'
                    : 'text-red-400'
              }`}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden max-w-[430px] mx-auto"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Main Content */}

      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-[url('/images/cover-landing-bg.jpg')] max-w-screen-xl"
        // style={{ backgroundImage: `url(${currentBg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Card Container */}
          <div className="backdrop-blur-sm  p-6 sm:p-8 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl ">
            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="space-y-2">
                <h1 className="flex flex-row justify-center text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight [text-shadow:_0_0_8px_rgb(255_255_255_/_80%)]">
                  {config.data.groomName}
                  {/* <span className="text-rose-400 mx-2 sm:mx-3">&</span> */}
                  <div className=" pr-2 pl-2">
                    <FloatingHearts />
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Heart
                        className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto"
                        fill="currentColor"
                      />
                    </motion.div>
                  </div>

                  {config.data.brideName}
                </h1>

                <motion.div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                  <div className="h-px w-12 sm:w-16 bg-rose-200/50" />
                  <div className="w-2 h-2 rounded-full bg-rose-300" />
                  <div className="h-px w-12 sm:w-16 bg-rose-200/50" />
                </motion.div>
              </div>
            </motion.div>

            {/* Open Invitation Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 sm:mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInvitation}
                className="group relative w-full bg-rose-500 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Mở lời mời</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

LandingPage.propTypes = {
  onOpenInvitation: PropTypes.func.isRequired,
}

export default LandingPage
