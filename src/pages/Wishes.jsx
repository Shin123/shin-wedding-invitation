import Modal from '@/components/Modal'
import Marquee from '@/components/ui/marquee'
import { formatEventDate } from '@/lib/formatEventDate'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Heart,
  MessageCircle,
  Send,
  User,
  X,
  XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useForm } from 'react-hook-form'

export default function Wishes() {
  const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setIsLoading] = useState(false)
  const [attendance, setAttendance] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showNotiModal, setShowNotiModal] = useState(false)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      message: '',
      attending: '',
    },
  })

  const options = [
    {
      value: 'ATTENDING_GROOM_PARTY',
      label: 'Tham gia tiệc ở Phan Rang Ngày 19/7',
    },
    {
      value: 'ATTENDING_BRIDE_PARTY',
      label: 'Tham gia tiệc ở Nha Trang ngày 20/7',
    },
    { value: 'NOT_ATTENDING', label: 'Rất tiếc, tôi chưa thể tham gia' },
  ]
  const [wishes, setWishes] = useState([])

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'ATTENDING_GROOM_PARTY':
      case 'ATTENDING_BRIDE_PARTY':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case 'NOT_ATTENDING':
        return <XCircle className="w-4 h-4 text-rose-500" />
      default:
        return null
    }
  }

  const onSubmit = async (value) => {
    if (!attendance) {
      setShowNotiModal(true)
      return
    }

    try {
      setIsSubmitting(true)
      const body = {
        ...value,
        time: new Date().toISOString(),
        hoTen: value.name,
        loiChuc: value.message,
        xacNhan: attendance,
        show: false,
      }
      const formBody = new FormData()
      for (const key in body) {
        formBody.append(key, body[key])
      }
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formBody,
      })
    } catch (error) {
      console.log(error)
    } finally {
      const newWishObj = {
        id: wishes.length + 1,
        name: value.name, // Replace with actual user name
        message: value.message,
        attend: 'attending',
        timestamp: new Date().toISOString(),
      }
      reset()
      setAttendance('')
      setIsSubmitting(false)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      setWishes((prev) => [newWishObj, ...prev])
    }
  }

  // Hàm để fetch danh sách lời chúc
  const fetchWishes = () => {
    setIsLoading(true)
    fetch(SCRIPT_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const filterWishes = data.data.filter((wish) => wish.show === true)
          const formattedWishes = filterWishes.map((wish) => ({
            ...wish,
            timestamp: new Date(wish.time).toISOString(),
            name: wish.hoTen,
            message: wish.loiChuc,
            attending: wish.xacNhan,
          }))
          setWishes(formattedWishes)
        }

        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching wishes:', error)
        setIsLoading(false)
      })
  }

  // Dùng useEffect để gọi hàm fetchWishes khi component được render lần đầu
  useEffect(() => {
    fetchWishes()
  }, [])

  return (
    <>
      <section id="wishes" className="min-h-screen relative overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        <div className="container mx-auto px-4 py-10 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Wishes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 max-w-md mx-auto"
            >
              Những lời chúc của bạn là món quà tinh thần vô giá trong ngày đặc
              biệt này. Chúc đi, ngại chi!
            </motion.p>
            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MessageCircle className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Wishes List */}
          <div className="max-w-2xl mx-auto space-y-6">
            <AnimatePresence>
              <Marquee
                speed={15}
                gradient={false}
                className="[--duration:15s] py-2"
              >
                {wishes.map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative w-[280px]"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                    {/* Card content */}
                    <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md h-full">
                      {/* Header */}
                      <div className="flex items-start space-x-3 mb-2">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                            {wish.name[0].toUpperCase()}
                          </div>
                        </div>

                        {/* Name, Time, and Attendance */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-800 text-sm truncate">
                              {wish.name}
                            </h4>
                            {getAttendanceIcon(wish.attending)}
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <Clock className="w-3 h-3" />
                            <time className="truncate">
                              {formatEventDate(wish.timestamp)}
                            </time>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">
                        {wish.message}
                      </p>

                      {/* Optional: Time indicator for recent messages */}
                      {Date.now() - new Date(wish.timestamp).getTime() <
                        3600000 && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                            New
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </Marquee>
            </AnimatePresence>
          </div>
          {/* Wishes Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                <div className="space-y-2">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>Họ & Tên của bạn:</span>
                    </div>
                    <input
                      {...register('name', { required: true })}
                      type="text"
                      placeholder="Vui lòng nhập họ và tên..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                      required
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2 relative"
                  >
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Xác nhận tham gia</span>
                    </div>

                    {/* Custom Select Button */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                    >
                      <span
                        className={
                          attendance ? 'text-gray-700' : 'text-gray-400'
                        }
                      >
                        {attendance
                          ? options.find((opt) => opt.value === attendance)
                              ?.label
                          : 'Vui lòng chọn...'}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Options */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                        >
                          {options.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setAttendance(option.value)
                                setIsOpen(false)
                              }}
                              whileHover={{
                                backgroundColor: 'rgb(255, 241, 242)',
                              }}
                              className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${
                                          attendance === option.value
                                            ? 'bg-rose-50 text-rose-600'
                                            : 'text-gray-700 hover:bg-rose-50'
                                        }`}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Wish Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Lời chúc</span>
                    </div>
                    <textarea
                      {...register('message', { required: true })}
                      placeholder="Hãy dành tặng cô dâu & chú rể lời chúc thân thương ..."
                      className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Heart className="w-5 h-5" />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${
                      isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-rose-500 hover:bg-rose-600'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Đang gửi...' : 'Gửi'}</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        <Modal isOpen={showNotiModal} onClose={() => setShowNotiModal(false)}>
          <div className="space-y-6 ">
            <div className="flex justify-between  items-center">
              <h4 className="text-xl text-gray-800">
                Vui lòng xác nhận tham gia!
              </h4>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotiModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-3"></div>
          </div>
        </Modal>
      </section>
    </>
  )
}
