import { render, screen, act } from '@testing-library/react'
import { RemainingTimeCounter } from '@/components/remaining-time-counter'

// S'assurer que jest-dom est bien importé pour les assertions
import '@testing-library/jest-dom'

describe('RemainingTimeCounter', () => {
  const mockBirthDate = new Date('1990-01-01')
  const mockLifeExpectancy = 80

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('devrait afficher le titre', () => {
    render(<RemainingTimeCounter birthDate={mockBirthDate} lifeExpectancy={mockLifeExpectancy} />)
    expect(screen.getByText('Temps restant estimé')).toBeInTheDocument()
  })

  it('devrait afficher toutes les unités de temps', () => {
    render(<RemainingTimeCounter birthDate={mockBirthDate} lifeExpectancy={mockLifeExpectancy} />)
    expect(screen.getByText('années')).toBeInTheDocument()
    expect(screen.getByText('mois')).toBeInTheDocument()
    expect(screen.getByText('jours')).toBeInTheDocument()
    expect(screen.getByText('heures')).toBeInTheDocument()
    expect(screen.getByText('minutes')).toBeInTheDocument()
    expect(screen.getByText('secondes')).toBeInTheDocument()
  })

  it('devrait mettre à jour le compteur toutes les secondes', () => {
    render(<RemainingTimeCounter birthDate={mockBirthDate} lifeExpectancy={mockLifeExpectancy} />)
    
    const initialSeconds = screen.getByText('secondes').previousElementSibling?.textContent
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    const updatedSeconds = screen.getByText('secondes').previousElementSibling?.textContent
    expect(updatedSeconds).not.toBe(initialSeconds)
  })

  it('devrait afficher le compteur avec le temps restant', () => {
    render(<RemainingTimeCounter birthDate={mockBirthDate} lifeExpectancy={mockLifeExpectancy} />)
    
    expect(screen.getByText(/il vous reste/i)).toBeInTheDocument()
    expect(screen.getByText(/années/i)).toBeInTheDocument()
    expect(screen.getByText(/mois/i)).toBeInTheDocument()
    expect(screen.getByText(/jours/i)).toBeInTheDocument()
  })

  it('devrait afficher 0 pour toutes les valeurs si l\'espérance de vie est dépassée', () => {
    const oldBirthDate = new Date('1900-01-01')
    render(<RemainingTimeCounter birthDate={oldBirthDate} lifeExpectancy={80} />)
    
    const remainingText = screen.getByText(/il vous reste/i)
    expect(remainingText).toHaveTextContent(/0 années/i)
    expect(remainingText).toHaveTextContent(/0 mois/i)
    expect(remainingText).toHaveTextContent(/0 jours/i)
  })

  it('devrait afficher des valeurs positives pour une personne jeune', () => {
    const youngBirthDate = new Date()
    youngBirthDate.setFullYear(youngBirthDate.getFullYear() - 20)
    
    render(<RemainingTimeCounter birthDate={youngBirthDate} lifeExpectancy={80} />)
    
    const remainingText = screen.getByText(/il vous reste/i)
    expect(remainingText).toHaveTextContent(/\d+ années/i)
    expect(remainingText).toHaveTextContent(/\d+ mois/i)
    expect(remainingText).toHaveTextContent(/\d+ jours/i)
  })

  it('devrait mettre à jour le compteur avec une nouvelle espérance de vie', () => {
    const { rerender } = render(
      <RemainingTimeCounter birthDate={mockBirthDate} lifeExpectancy={80} />
    )
    
    const initialText = screen.getByText(/il vous reste/i).textContent
    
    rerender(<RemainingTimeCounter birthDate={mockBirthDate} lifeExpectancy={90} />)
    
    const updatedText = screen.getByText(/il vous reste/i).textContent
    expect(updatedText).not.toBe(initialText)
  })

  it('devrait gérer correctement les dates futures', () => {
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)
    
    render(<RemainingTimeCounter birthDate={futureDate} lifeExpectancy={80} />)
    
    const remainingText = screen.getByText(/il vous reste/i)
    expect(remainingText).toHaveTextContent(/80 années/i)
  })
}) 