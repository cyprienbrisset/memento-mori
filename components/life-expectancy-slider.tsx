"use client"

import type React from "react"

import { useState } from "react"

interface LifeExpectancySliderProps {
  value: number
  onChange: (value: number) => void
  label?: string
}

export function LifeExpectancySlider({ value, onChange, label = "Espérance de vie" }: LifeExpectancySliderProps) {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div>
      <label htmlFor="life-expectancy" className="block text-sm font-medium mb-2">
        {label}: {localValue} ans
      </label>
      <input
        type="range"
        id="life-expectancy"
        min="50"
        max="120"
        value={localValue}
        onChange={handleChange}
        className="w-full h-2 bg-[#e5e5e5] rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-[#1a1a1a]/60 mt-1">
        <span>50</span>
        <span>120</span>
      </div>
    </div>
  )
}
