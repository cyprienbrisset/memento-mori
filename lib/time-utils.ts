export function calculateRemainingTime(birthDate: Date, lifeExpectancy: number) {
  const now = new Date()

  // Calculate death date based on birth date and life expectancy
  const deathDate = new Date(birthDate)
  deathDate.setFullYear(deathDate.getFullYear() + lifeExpectancy)

  // If already passed the estimated death date, return zeros
  if (now > deathDate) {
    return {
      années: 0,
      mois: 0,
      jours: 0,
      heures: 0,
      minutes: 0,
      secondes: 0,
    }
  }

  // Calculate the difference in milliseconds
  const diffMs = deathDate.getTime() - now.getTime()

  // Convert to various time units
  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30.44) // Average days in a month
  const years = Math.floor(days / 365.25) // Account for leap years

  return {
    années: years,
    mois: months % 12,
    jours: days % 30,
    heures: hours % 24,
    minutes: minutes % 60,
    secondes: seconds % 60,
  }
}

export function calculateLivedWeeks(birthDate: Date) {
  const now = new Date()
  const diffMs = now.getTime() - birthDate.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  const diffWeeks = Math.floor(diffDays / 7)

  return diffWeeks
}

/**
 * Calcule les semaines de vie commune entre deux personnes
 * @param birthDateA Date de naissance de la personne A
 * @param lifeExpectancyA Espérance de vie de la personne A
 * @param birthDateB Date de naissance de la personne B
 * @param lifeExpectancyB Espérance de vie de la personne B
 * @returns {
 *   totalSharedWeeks: nombre total de semaines communes,
 *   livedSharedWeeks: nombre de semaines communes déjà vécues,
 *   remainingSharedWeeks: nombre de semaines communes restantes,
 *   start: Date de début de la période commune,
 *   end: Date de fin de la période commune
 * }
 */
export function calculateSharedLifeWeeks(
  birthDateA: Date,
  lifeExpectancyA: number,
  birthDateB: Date,
  lifeExpectancyB: number
) {
  // Date de début de la période commune : le plus tard des deux anniversaires
  const start = new Date(Math.max(birthDateA.getTime(), birthDateB.getTime()))
  // Date de fin de la période commune : le plus tôt des deux dates de fin de vie
  const endA = new Date(birthDateA)
  endA.setFullYear(endA.getFullYear() + lifeExpectancyA)
  const endB = new Date(birthDateB)
  endB.setFullYear(endB.getFullYear() + lifeExpectancyB)
  const end = new Date(Math.min(endA.getTime(), endB.getTime()))

  // Si la période commune n'existe pas
  if (start > end) {
    return {
      totalSharedWeeks: 0,
      livedSharedWeeks: 0,
      remainingSharedWeeks: 0,
      start,
      end,
    }
  }

  const now = new Date()
  // Nombre total de semaines communes
  const totalSharedWeeks = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7))
  // Nombre de semaines communes déjà vécues
  const livedSharedWeeks = now > start ? Math.max(0, Math.min(totalSharedWeeks, Math.floor((Math.min(now.getTime(), end.getTime()) - start.getTime()) / (1000 * 60 * 60 * 24 * 7)))) : 0
  // Nombre de semaines communes restantes
  const remainingSharedWeeks = now < end ? Math.max(0, Math.ceil((end.getTime() - Math.max(now.getTime(), start.getTime())) / (1000 * 60 * 60 * 24 * 7))) : 0

  return {
    totalSharedWeeks,
    livedSharedWeeks,
    remainingSharedWeeks,
    start,
    end,
  }
}
