import { render, screen } from '@testing-library/react'
import { LifeCalendar } from '@/components/life-calendar'

describe('LifeCalendar', () => {
  const defaultProps = {
    birthDate: new Date('1990-01-01'),
    lifeExpectancy: 80
  }

  it('devrait afficher le calendrier avec le titre correct', () => {
    render(<LifeCalendar {...defaultProps} />)
    expect(screen.getByText(/votre vie en semaines/i)).toBeInTheDocument()
  })

  it('devrait afficher le nombre correct de semaines vécues', () => {
    render(<LifeCalendar {...defaultProps} />)
    const weeksText = screen.getByText(/vous avez vécu/i)
    expect(weeksText).toBeInTheDocument()
  })

  it('devrait afficher la légende correcte pour une seule personne', () => {
    render(<LifeCalendar {...defaultProps} />)
    expect(screen.getByText(/semaines vécues/i)).toBeInTheDocument()
    expect(screen.getByText(/semaines futures/i)).toBeInTheDocument()
  })

  it('devrait afficher le calendrier partagé quand une seconde personne est fournie', () => {
    const secondPersonProps = {
      ...defaultProps,
      secondBirthDate: new Date('1992-01-01'),
      secondLifeExpectancy: 80
    }

    render(<LifeCalendar {...secondPersonProps} />)
    expect(screen.getByText(/votre vie en commun/i)).toBeInTheDocument()
  })

  it('devrait afficher la légende correcte pour deux personnes', () => {
    const secondPersonProps = {
      ...defaultProps,
      secondBirthDate: new Date('1992-01-01'),
      secondLifeExpectancy: 80
    }

    render(<LifeCalendar {...secondPersonProps} />)
    expect(screen.getByText(/semaines vécues ensemble/i)).toBeInTheDocument()
    expect(screen.getByText(/semaines futures ensemble/i)).toBeInTheDocument()
    expect(screen.getByText(/semaines hors période commune/i)).toBeInTheDocument()
  })

  it('devrait afficher les statistiques de temps partagé', () => {
    const secondPersonProps = {
      ...defaultProps,
      secondBirthDate: new Date('1992-01-01'),
      secondLifeExpectancy: 80
    }

    render(<LifeCalendar {...secondPersonProps} />)
    const sharedStats = screen.getByText(/vous avez vécu/i)
    expect(sharedStats).toHaveTextContent(/semaines ensemble/i)
  })

  it('devrait afficher les années tous les 5 ans', () => {
    render(<LifeCalendar {...defaultProps} />)
    const yearLabels = screen.getAllByText(/^\d+$/)
    expect(yearLabels.length).toBeGreaterThan(0)
  })

  it('devrait afficher le bon nombre de carrés pour une personne', () => {
    render(<LifeCalendar {...defaultProps} />)
    const squares = document.querySelectorAll('.week-square')
    expect(squares.length).toBe(defaultProps.lifeExpectancy * 52)
  })

  it('devrait afficher les carrés avec les bonnes classes pour deux personnes', () => {
    const secondPersonProps = {
      ...defaultProps,
      secondBirthDate: new Date('1992-01-01'),
      secondLifeExpectancy: 80
    }

    render(<LifeCalendar {...secondPersonProps} />)
    const squares = document.querySelectorAll('.week-square')
    
    // Vérifier qu'il y a au moins un carré de chaque type
    expect(document.querySelector('.week-shared-lived')).toBeInTheDocument()
    expect(document.querySelector('.week-shared-future')).toBeInTheDocument()
    expect(document.querySelector('.week-lived')).toBeInTheDocument()
    expect(document.querySelector('.week-future')).toBeInTheDocument()
  })
}) 