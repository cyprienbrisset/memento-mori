import { calculateLivedWeeks, calculateRemainingTime, calculateSharedLifeWeeks } from '@/lib/time-utils'

describe('Time Utils', () => {
  describe('calculateLivedWeeks', () => {
    it('devrait calculer correctement le nombre de semaines vécues', () => {
      const birthDate = new Date('1990-01-01')
      const result = calculateLivedWeeks(birthDate)
      
      expect(typeof result).toBe('number')
      expect(Number.isInteger(result)).toBe(true)
      expect(result).toBeGreaterThan(0)
      expect(result).toBe(Math.floor((Date.now() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000)))
    })

    it('devrait retourner un nombre négatif pour une date de naissance future', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      
      const weeks = calculateLivedWeeks(futureDate)
      expect(weeks).toBeLessThan(0)
    })
  })

  describe('calculateRemainingTime', () => {
    it('devrait calculer correctement le temps restant', () => {
      const birthDate = new Date('1990-01-01')
      const lifeExpectancy = 80
      
      const result = calculateRemainingTime(birthDate, lifeExpectancy)
      
      expect(result).toHaveProperty('années')
      expect(result).toHaveProperty('mois')
      expect(result).toHaveProperty('jours')
      expect(result).toHaveProperty('heures')
      expect(result).toHaveProperty('minutes')
      expect(result).toHaveProperty('secondes')
      
      expect(result.années).toBeLessThanOrEqual(lifeExpectancy)
      expect(result.mois).toBeLessThanOrEqual(12)
      expect(result.jours).toBeLessThanOrEqual(31)
      expect(result.heures).toBeLessThanOrEqual(24)
      expect(result.minutes).toBeLessThanOrEqual(60)
      expect(result.secondes).toBeLessThanOrEqual(60)
      
      Object.values(result).forEach(value => {
        expect(value).toBeGreaterThanOrEqual(0)
        expect(Number.isInteger(value)).toBe(true)
      })
    })

    it('devrait retourner 0 pour toutes les valeurs si l\'espérance de vie est dépassée', () => {
      const birthDate = new Date('1900-01-01')
      const lifeExpectancy = 80
      
      const remaining = calculateRemainingTime(birthDate, lifeExpectancy)
      
      Object.values(remaining).forEach(value => {
        expect(value).toBe(0)
      })
    })
  })

  describe('calculateSharedLifeWeeks', () => {
    it('devrait calculer correctement les semaines de vie partagées', () => {
      const birthDate1 = new Date('1990-01-01')
      const birthDate2 = new Date('1992-01-01')
      const lifeExpectancy1 = 80
      const lifeExpectancy2 = 80

      const result = calculateSharedLifeWeeks(birthDate1, lifeExpectancy1, birthDate2, lifeExpectancy2)

      expect(result).toHaveProperty('totalSharedWeeks')
      expect(result).toHaveProperty('livedSharedWeeks')
      expect(result).toHaveProperty('remainingSharedWeeks')
      expect(result).toHaveProperty('start')
      expect(result).toHaveProperty('end')

      expect(result.totalSharedWeeks).toBeGreaterThan(0)
      expect(result.livedSharedWeeks).toBeGreaterThan(0)
      expect(result.remainingSharedWeeks).toBeGreaterThan(0)
      expect(result.start).toBeInstanceOf(Date)
      expect(result.end).toBeInstanceOf(Date)
    })

    it('devrait gérer correctement les cas où il n\'y a pas de période commune', () => {
      const birthDate1 = new Date('1990-01-01')
      const birthDate2 = new Date('2080-01-01')
      const lifeExpectancy1 = 80
      const lifeExpectancy2 = 80

      const result = calculateSharedLifeWeeks(birthDate1, lifeExpectancy1, birthDate2, lifeExpectancy2)

      expect(result.totalSharedWeeks).toBe(0)
      expect(result.livedSharedWeeks).toBe(0)
      expect(result.remainingSharedWeeks).toBe(0)
    })

    it('devrait gérer correctement les espérances de vie différentes', () => {
      const birthDate1 = new Date('1990-01-01')
      const birthDate2 = new Date('1992-01-01')
      const lifeExpectancy1 = 80
      const lifeExpectancy2 = 90

      const result = calculateSharedLifeWeeks(birthDate1, lifeExpectancy1, birthDate2, lifeExpectancy2)

      expect(result.totalSharedWeeks).toBeGreaterThan(0)
      expect(result.end.getFullYear()).toBe(birthDate1.getFullYear() + lifeExpectancy1)
    })
  })
}) 