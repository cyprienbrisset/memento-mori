"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { calculateRemainingTime } from "@/lib/time-utils"

interface RemainingTimeCounterProps {
  birthDate: Date
  lifeExpectancy: number
}

export function RemainingTimeCounter({ birthDate, lifeExpectancy }: RemainingTimeCounterProps) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(birthDate, lifeExpectancy))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(birthDate, lifeExpectancy))
    }, 1000)

    return () => clearInterval(interval)
  }, [birthDate, lifeExpectancy])

  const counterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-light mb-4 text-center">Temps restant estimé</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(remainingTime).map(([unit, value], i) => (
          <motion.div
            key={unit}
            className="bg-white p-3 rounded-lg border border-[#d1d1d1] text-center"
            variants={counterVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <span className="block text-2xl font-light">{value}</span>
            <span className="text-xs text-[#1a1a1a]/70 capitalize">{unit}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
