"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LifeCalendar } from "@/components/life-calendar"
import { RemainingTimeCounter } from "@/components/remaining-time-counter"
import { BirthDateForm } from "@/components/birth-date-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CalendarDays, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [lifeExpectancy, setLifeExpectancy] = useState(80)
  const [secondBirthDate, setSecondBirthDate] = useState<Date | null>(null)
  const [secondLifeExpectancy, setSecondLifeExpectancy] = useState(80)
  const [showStartForm, setShowStartForm] = useState(false)
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar')
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  const handleStartClick = () => {
    setShowStartForm(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8f8f7] to-[#f0f0f0]">
      {/* Section Hero */}
      {!birthDate && (
        <div className="relative flex items-center justify-center min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <motion.div 
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image 
                src="/logo.png" 
                alt="Memento Mori" 
                width={300} 
                height={150} 
                className="h-auto" 
                priority
              />
            </motion.div>
            <motion.p 
              className="text-xl text-[#1a1a1a]/70 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Visualisez le temps qu'il vous reste et appréciez chaque moment de votre vie.
            </motion.p>
            <motion.button
              onClick={handleStartClick}
              className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#2a2a2a] transition-all duration-300 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer maintenant
            </motion.button>
          </div>
        </div>
      )}

      {/* Section Features */}
      {!birthDate && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-3xl mb-4 flex justify-center">📅</div>
              <h3 className="text-lg font-medium mb-3">Visualisation</h3>
              <p className="text-[#1a1a1a]/70">Visualisez votre vie semaine par semaine dans un calendrier interactif.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-3xl mb-4 flex justify-center">👥</div>
              <h3 className="text-lg font-medium mb-3">Temps partagé</h3>
              <p className="text-[#1a1a1a]/70">Découvrez combien de temps vous partagez avec vos proches.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="text-3xl mb-4 flex justify-center">⚡</div>
              <h3 className="text-lg font-medium mb-3">Personnalisation</h3>
              <p className="text-[#1a1a1a]/70">Ajustez l'espérance de vie selon vos préférences.</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Section principale */}
      {birthDate && (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/logo.png" 
                alt="Memento Mori" 
                width={150} 
                height={75} 
                className="h-auto" 
              />
            </div>
            {/* Compteur */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <RemainingTimeCounter 
                birthDate={birthDate} 
                lifeExpectancy={lifeExpectancy}
              />
            </div>

            {/* Sélecteur de vue */}
            <div className="flex justify-center gap-4">
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                onClick={() => setViewMode('calendar')}
                className="flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                Vue Calendrier
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'outline'}
                onClick={() => setViewMode('timeline')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Vue Timeline
              </Button>
            </div>

            {/* Calendrier */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <LifeCalendar 
                birthDate={birthDate} 
                lifeExpectancy={lifeExpectancy}
                secondBirthDate={secondBirthDate}
                secondLifeExpectancy={secondLifeExpectancy}
                viewMode={viewMode}
                onOpenSettings={() => setShowSettingsDialog(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#e5e5e5] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#1a1a1a]/70">
            Memento Mori - Visualisez le temps qu'il vous reste
          </p>
        </div>
      </footer>

      {/* Dialog pour le formulaire initial */}
      <Dialog open={showStartForm} onOpenChange={setShowStartForm}>
        <DialogContent className="sm:max-w-[600px] p-8">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-light">Commencer votre voyage</DialogTitle>
            <DialogDescription className="text-base">
              Entrez votre date de naissance et votre espérance de vie pour visualiser le temps qu'il vous reste.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <BirthDateForm
              onSubmit={(date, expectancy) => {
                setBirthDate(date)
                setLifeExpectancy(expectancy)
                setShowStartForm(false)
              }}
              initialDate={birthDate}
              initialLifeExpectancy={lifeExpectancy}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog pour les paramètres */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[600px] p-8">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-light">Modifier les paramètres</DialogTitle>
            <DialogDescription className="text-base">
              Ajustez vos paramètres ou ajoutez une seconde personne pour visualiser votre temps commun.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-8">
            {/* Vos paramètres */}
            <div>
              <h3 className="text-lg font-medium mb-4">Vos paramètres</h3>
              <BirthDateForm
                onSubmit={(date, expectancy) => {
                  setBirthDate(date)
                  setLifeExpectancy(expectancy)
                }}
                initialDate={birthDate}
                initialLifeExpectancy={lifeExpectancy}
              />
            </div>
            
            {/* Paramètres de la seconde personne */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                {secondBirthDate ? "Paramètres de la seconde personne" : "Ajouter une seconde personne"}
              </h3>
              <BirthDateForm
                onSubmit={(date, expectancy) => {
                  setSecondBirthDate(date)
                  setSecondLifeExpectancy(expectancy)
                  setShowSettingsDialog(false)
                }}
                initialDate={secondBirthDate}
                initialLifeExpectancy={secondLifeExpectancy}
                isSecondPerson={true}
              />
              {secondBirthDate && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSecondBirthDate(null)
                      setShowSettingsDialog(false)
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer la seconde personne
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
