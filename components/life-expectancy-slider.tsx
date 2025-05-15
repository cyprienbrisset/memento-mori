"use client"

import type React from "react"
import { useState } from "react"
import LifeExpectancyEstimator from '@/components/life-expectancy-estimator'

interface LifeExpectancySliderProps {
  value: number
  onChange: (value: number) => void
  label?: string
}

export const LifeExpectancySlider = ({ value, onChange, label = "Espérance de vie" }: LifeExpectancySliderProps) => {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="life-expectancy" className="block text-sm font-medium">
          {label}: {localValue} ans
        </label>
        <LifeExpectancyEstimator onEstimate={(years) => {
          setLocalValue(years)
          onChange(years)
        }} />
      </div>
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
