'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard } from "@fortawesome/free-regular-svg-icons"
import { faLightbulb, faPaperPlane, faUser, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export default function AiPage() {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const [showPop , setShowPop] = useState(false)

  const handleInputChange = (e) => {
    setInput(e.target.value)
    setIsTyping(true)
  }

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted:', input)
    setInput('')
    setIsTyping(false)
    setShowPop(true)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 pt-[70px] p-4'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'
      >
        <div className='p-6 '>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>AI Assistant</h1>
          <div className='relative '>
            <textarea 
              className='border-2 border-gray-300 text-black w-full h-40 text-lg font-semibold p-4 outline-none rounded-lg transition-all duration-300 focus:border-blue-500 resize-none'
              placeholder='Ask Me Anything'
              value={input}
              onChange={handleInputChange}
            ></textarea>
            <motion.button 
              className='absolute bottom-4 right-4 text-white bg-blue-500 text-lg p-2 w-12 h-12 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </motion.button>
          </div>
        </div>
        <motion.div 
          className='bg-gray-100 p-6 rounded-b-lg'
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center space-x-4 mb-4'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'>
              <FontAwesomeIcon icon={faLightbulb} className='text-white text-xl' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-800'>AI Assistant</h2>
              <p className='text-gray-600'>How can I help you today?</p>
            </div>
          </div>
          <p className='text-lg text-gray-700'>
            {isTyping ? 'Typing...' : 'Power of AI at your fingertips. Ask me anything.'}
          </p>
        </motion.div>
      </motion.div>
      {
        showPop && (
          <motion.div
  className="w-full max-w-md h-20 mx-auto mt-4 bg-white rounded-lg shadow-md"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="flex items-center justify-between p-4">
    <h1 className="text-lg font-semibold text-indigo-500 text-center flex-1">
      It is under development, Thank You for Choosing!!
    </h1>
    <button onClick={() => setShowPop(false)} className="ml-4">
      <FontAwesomeIcon icon={faXmark} className="text-2xl" />
    </button>
  </div>
</motion.div>

        )
      }
    </div>
  )
}