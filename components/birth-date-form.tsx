"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { LifeExpectancySlider } from "./life-expectancy-slider"

interface BirthDateFormProps {
  onSubmit: (date: Date, lifeExpectancy: number) => void
  initialDate?: Date | null
  initialLifeExpectancy?: number
  isSecondPerson?: boolean
}

export function BirthDateForm({ 
  onSubmit, 
  initialDate, 
  initialLifeExpectancy = 80,
  isSecondPerson = false 
}: BirthDateFormProps) {
  const [date, setDate] = useState<string>(initialDate ? initialDate.toISOString().split("T")[0] : "")
  const [lifeExpectancy, setLifeExpectancy] = useState(initialLifeExpectancy)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date) {
      onSubmit(new Date(date), lifeExpectancy)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="birthdate" className="block text-sm font-medium mb-2">
          {isSecondPerson ? "Date de naissance de la seconde personne" : "Date de naissance"}
        </label>
        <input
          type="date"
          id="birthdate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-[#d1d1d1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
          required
        />
      </div>

      <div className="mb-6">
        <LifeExpectancySlider 
          value={lifeExpectancy} 
          onChange={setLifeExpectancy}
          label={isSecondPerson ? "Espérance de vie de la seconde personne" : "Espérance de vie"}
        />
      </div>

      <motion.button
        type="submit"
        className="w-full bg-[#1a1a1a] text-white py-3 rounded-md hover:bg-[#000000] transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {initialDate ? "Mettre à jour" : "Commencer"}
      </motion.button>
    </form>
  )
}
