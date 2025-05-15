import { render, screen, fireEvent } from '@testing-library/react'
import { BirthDateForm } from '@/components/birth-date-form'

describe('BirthDateForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('devrait afficher le champ de date', () => {
    render(<BirthDateForm onSubmit={jest.fn()} />)
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
  })

  it('devrait appeler onSubmit avec une date valide', () => {
    const handleSubmit = jest.fn()
    render(<BirthDateForm onSubmit={handleSubmit} />)
    const input = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(input, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button'))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('devrait rendre le formulaire avec les champs requis', () => {
    render(<BirthDateForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/espérance de vie/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /commencer/i })).toBeInTheDocument()
  })

  it('devrait appeler onSubmit avec les valeurs correctes', () => {
    render(<BirthDateForm onSubmit={mockOnSubmit} />)

    const dateInput = screen.getByLabelText(/date de naissance/i)
    const submitButton = screen.getByRole("button", { name: /commencer/i })

    fireEvent.change(dateInput, { target: { value: "1990-01-01" } })
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.any(Date), 80)
  })

  it('devrait afficher les valeurs initiales si fournies', () => {
    const initialDate = new Date("1990-01-01")
    const initialLifeExpectancy = 85

    render(
      <BirthDateForm
        onSubmit={mockOnSubmit}
        initialDate={initialDate}
        initialLifeExpectancy={initialLifeExpectancy}
      />
    )

    expect(screen.getByLabelText(/date de naissance/i)).toHaveValue("1990-01-01")
    expect(screen.getByLabelText(/espérance de vie/i)).toHaveValue("85")
    expect(screen.getByRole("button", { name: /mettre à jour/i })).toBeInTheDocument()
  })

  it('devrait afficher les libellés adaptés pour la seconde personne', () => {
    render(<BirthDateForm onSubmit={mockOnSubmit} isSecondPerson />)

    expect(screen.getByLabelText(/date de naissance de la seconde personne/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/espérance de vie de la seconde personne/i)).toBeInTheDocument()
  })

  it('ne devrait pas soumettre le formulaire si la date n\'est pas fournie', () => {
    render(<BirthDateForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole("button", { name: /commencer/i })
    fireEvent.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('devrait mettre à jour l\'espérance de vie lors du changement du slider', () => {
    render(<BirthDateForm onSubmit={mockOnSubmit} />)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '85' } })

    const dateInput = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(dateInput, { target: { value: "1990-01-01" } })
    fireEvent.click(screen.getByRole("button", { name: /commencer/i }))

    expect(mockOnSubmit).toHaveBeenCalledWith(expect.any(Date), 85)
  })
}) 