"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CloudCharacterProps {
  className?: string
}

export default function CloudCharacter({ className = "" }: CloudCharacterProps) {
  const [isBlinking, setIsBlinking] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 300)
      },
      Math.random() * 3000 + 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [])

  // Random speaking effect
  useEffect(() => {
    const speakInterval = setInterval(
      () => {
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 500)
      },
      Math.random() * 5000 + 5000,
    )

    return () => clearInterval(speakInterval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Speech bubble that appears randomly */}
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md text-xs w-32 text-center z-10"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-slate-800"></div>
          Dream big today! ✨
        </motion.div>
      )}

      {/* Cloud character */}
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Main cloud body */}
        <path
          d="M67.5,40c0,8.284-6.716,15-15,15H25c-11.046,0-20-8.954-20-20c0-11.046,8.954-20,20-20
          c0.342,0,0.682,0.009,1.02,0.025C29.056,7.4,36.45,2,45,2c11.046,0,20,8.954,20,20c0,0.342-0.009,0.682-0.025,1.02
          C66.6,23.056,72,30.45,72,39C72,39.336,71.836,39.648,71.5,40H67.5z"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="2"
        />

        {/* Eyes */}
        <motion.ellipse
          cx="35"
          cy="30"
          rx={isBlinking ? 0.5 : 3}
          ry={isBlinking ? 0.5 : 4}
          fill="#333333"
          animate={{ rx: isBlinking ? 0.5 : 3, ry: isBlinking ? 0.5 : 4 }}
          transition={{ duration: 0.1 }}
        />
        <motion.ellipse
          cx="50"
          cy="30"
          rx={isBlinking ? 0.5 : 3}
          ry={isBlinking ? 0.5 : 4}
          fill="#333333"
          animate={{ rx: isBlinking ? 0.5 : 3, ry: isBlinking ? 0.5 : 4 }}
          transition={{ duration: 0.1 }}
        />

        {/* Smile */}
        <path d="M38 40C40.5 43 44.5 43 47 40" stroke="#333333" strokeWidth="2" strokeLinecap="round" />

        {/* Cheeks */}
        <circle cx="30" cy="35" r="3" fill="#FFAAAA" fillOpacity="0.6" />
        <circle cx="55" cy="35" r="3" fill="#FFAAAA" fillOpacity="0.6" />
      </svg>
    </div>
  )
}
