"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { calculateLivedWeeks, calculateSharedLifeWeeks } from "@/lib/time-utils"
import Image from "next/image"
import { Settings } from "lucide-react"

interface LifeCalendarProps {
  birthDate: Date
  lifeExpectancy: number
  secondBirthDate?: Date | null
  secondLifeExpectancy?: number
  viewMode?: 'calendar' | 'timeline'
  onOpenSettings?: () => void
}

export function LifeCalendar({ 
  birthDate, 
  lifeExpectancy,
  secondBirthDate,
  secondLifeExpectancy = 80,
  viewMode = 'calendar',
  onOpenSettings
}: LifeCalendarProps) {
  const totalWeeks = lifeExpectancy * 52
  const livedWeeks = useMemo(() => calculateLivedWeeks(birthDate), [birthDate])

  const sharedLife = useMemo(() => {
    if (!secondBirthDate) return null
    return calculateSharedLifeWeeks(birthDate, lifeExpectancy, secondBirthDate, secondLifeExpectancy)
  }, [birthDate, lifeExpectancy, secondBirthDate, secondLifeExpectancy])

  // Chaque colonne représente une année
  const numColumns = lifeExpectancy
  const numRows = 52

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <div className="flex justify-center flex-1">
          {/* Supprimer l'affichage du logo */}
        </div>
        <div className="flex justify-end flex-1">
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-[#f0f0f0] transition-colors"
            aria-label="Modifier les paramètres"
          >
            <Settings size={24} className="text-[#1a1a1a]/70" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-light mb-4 text-center">
        {secondBirthDate ? "Votre vie en commun" : "Votre vie en semaines"}
      </h2>
      <p className="text-center mb-4 text-sm text-[#1a1a1a]/70">
        {secondBirthDate 
          ? `Chaque carré représente une semaine. Vous avez vécu ${sharedLife?.livedSharedWeeks} semaines ensemble sur ${sharedLife?.totalSharedWeeks} semaines communes.`
          : `Chaque carré représente une semaine. Vous avez vécu ${livedWeeks} semaines sur ${totalWeeks}.`
        }
      </p>

      {/* Conteneur principal du calendrier */}
      <div className="w-full max-w-[2000px] mx-auto border border-[#e5e5e5] rounded-lg p-6 bg-white">
        {viewMode === 'calendar' ? (
          <>
            {/* En-tête des années */}
            <div className="grid mb-4" style={{ 
              gridTemplateColumns: `repeat(${numColumns}, 20px)`,
              gap: "2px"
            }}>
              {Array.from({ length: numColumns }, (_, yearIndex) => (
                <div key={yearIndex} className="text-center text-sm font-medium text-[#1a1a1a]/60">
                  {yearIndex}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div
              className="grid w-fit"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numColumns}, 20px)`,
                gridTemplateRows: `repeat(${numRows}, 20px)`,
                gap: "2px",
              }}
            >
              {Array.from({ length: numRows }, (_, weekIndex) => (
                Array.from({ length: numColumns }, (_, yearIndex) => {
                  const weekNumber = yearIndex * 52 + weekIndex
                  const isLived = weekNumber < livedWeeks

                  // Déterminer la classe en fonction de la période commune
                  let className = "week-square "
                  if (secondBirthDate && sharedLife) {
                    const weekDate = new Date(birthDate)
                    weekDate.setDate(weekDate.getDate() + (weekNumber * 7))
                    
                    if (weekDate >= sharedLife.start && weekDate <= sharedLife.end) {
                      className += weekDate <= new Date() ? "week-shared-lived" : "week-shared-future"
                    } else {
                      className += isLived ? "week-lived" : "week-future"
                    }
                  } else {
                    className += isLived ? "week-lived" : "week-future"
                  }

                  return (
                    <motion.div
                      key={`${yearIndex}-${weekIndex}`}
                      className={className}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: Math.min(weekNumber * 0.0001, 1),
                        duration: 0.3,
                      }}
                    />
                  )
                })
              )).flat()}
            </div>
          </>
        ) : (
          <div className="w-full">
            {/* Vue graphique améliorée */}
            <div className="w-full">
              {/* Barre de progression pour la première personne */}
              <div className="mb-8">
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-sm font-medium">Vous</span>
                  <span className="text-sm text-[#1a1a1a]/70">{Math.floor((livedWeeks / totalWeeks) * 100)}% de votre vie</span>
                </div>
                <div className="w-full h-8 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#d1d1d1] to-[#a0a0a0] rounded-full"
                    style={{ width: `${(livedWeeks / totalWeeks) * 100}%` }}
                  >
                  </div>
                </div>
                <div className="grid grid-cols-5 text-xs text-[#1a1a1a]/60 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="text-center">
                      {Math.floor(i * (lifeExpectancy / 4))} ans
                    </div>
                  ))}
                  <div className="text-center">
                    {lifeExpectancy} ans
                  </div>
                </div>
              </div>

              {/* Barre de progression pour la seconde personne si présente */}
              {secondBirthDate && (
                <div className="mb-8">
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-sm font-medium">Seconde personne</span>
                    <span className="text-sm text-[#1a1a1a]/70">
                      {Math.floor((calculateLivedWeeks(secondBirthDate) / (secondLifeExpectancy * 52)) * 100)}% de sa vie
                    </span>
                  </div>
                  <div className="w-full h-8 bg-[#f0f0f0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#a8d8ea] to-[#7cb9d1] rounded-full"
                      style={{ width: `${(calculateLivedWeeks(secondBirthDate) / (secondLifeExpectancy * 52)) * 100}%` }}
                    >
                    </div>
                  </div>
                  <div className="grid grid-cols-5 text-xs text-[#1a1a1a]/60 mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="text-center">
                        {Math.floor(i * (secondLifeExpectancy / 4))} ans
                      </div>
                    ))}
                    <div className="text-center">
                      {secondLifeExpectancy} ans
                    </div>
                  </div>
                </div>
              )}

              {/* Temps partagé si deux personnes */}
              {secondBirthDate && sharedLife && (
                <div className="mb-8">
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-sm font-medium">Temps partagé</span>
                    <span className="text-sm text-[#1a1a1a]/70">
                      {Math.floor((sharedLife.livedSharedWeeks / sharedLife.totalSharedWeeks) * 100)}% de votre temps commun
                    </span>
                  </div>
                  <div className="w-full h-8 bg-[#f0f0f0] rounded-full overflow-hidden relative">
                    {/* La zone commune complète */}
                    <div 
                      className="h-full bg-[#e5e5e5] absolute top-0 left-0"
                      style={{ 
                        width: `${(sharedLife.totalSharedWeeks / Math.max(totalWeeks, secondLifeExpectancy * 52)) * 100}%`,
                        left: `${(Math.max(0, (sharedLife.start.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) / totalWeeks) * 100}%`
                      }}
                    >
                    </div>
                    {/* La partie déjà vécue ensemble */}
                    <div 
                      className="h-full bg-gradient-to-r from-[#ffd28f] to-[#ffbb5c] absolute top-0 left-0"
                      style={{ 
                        width: `${(sharedLife.livedSharedWeeks / Math.max(totalWeeks, secondLifeExpectancy * 52)) * 100}%`,
                        left: `${(Math.max(0, (sharedLife.start.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) / totalWeeks) * 100}%`
                      }}
                    >
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Statistiques détaillées */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="bg-[#f8f8f7] p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium mb-2">Années vécues</h3>
                <p className="text-2xl font-light">{Math.floor(livedWeeks / 52)}</p>
              </div>
              <div className="bg-[#f8f8f7] p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium mb-2">Années restantes</h3>
                <p className="text-2xl font-light">{Math.ceil((totalWeeks - livedWeeks) / 52)}</p>
              </div>
              {secondBirthDate && sharedLife && (
                <>
                  <div className="bg-[#f8f8f7] p-4 rounded-lg text-center">
                    <h3 className="text-sm font-medium mb-2">Années ensemble</h3>
                    <p className="text-2xl font-light">{Math.floor(sharedLife.livedSharedWeeks / 52)}</p>
                  </div>
                  <div className="bg-[#f8f8f7] p-4 rounded-lg text-center">
                    <h3 className="text-sm font-medium mb-2">Années futures ensemble</h3>
                    <p className="text-2xl font-light">{Math.ceil((sharedLife.totalSharedWeeks - sharedLife.livedSharedWeeks) / 52)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Légende */}
      <div className="flex justify-center items-center gap-4 mt-4 text-xs flex-wrap text-[#1a1a1a]/70">
        {viewMode === 'calendar' ? (
          secondBirthDate ? (
            <>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#d1d1d1]"></div>
                <span>Semaines vécues ensemble</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#a8d8ea]"></div>
                <span>Semaines futures ensemble</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#f0f0f0] border border-[#e5e5e5]"></div>
                <span>Semaines hors période commune</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#d1d1d1]"></div>
                <span>Semaines vécues</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#f0f0f0] border border-[#e5e5e5]"></div>
                <span>Semaines futures</span>
              </div>
            </>
          )
        ) : (
          <>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gradient-to-r from-[#d1d1d1] to-[#a0a0a0]"></div>
              <span>Votre temps vécu</span>
            </div>
            {secondBirthDate && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#a8d8ea] to-[#7cb9d1]"></div>
                  <span>Temps vécu (2ème personne)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#ffd28f] to-[#ffbb5c]"></div>
                  <span>Temps partagé vécu</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
