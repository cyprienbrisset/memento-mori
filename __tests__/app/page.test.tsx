import { render, screen, fireEvent } from '@testing-library/react'
import Home from '@/app/page'

describe('Page principale', () => {
  it('devrait afficher le titre et la description', () => {
    render(<Home />)
    expect(screen.getByText('Memento Mori')).toBeInTheDocument()
    expect(screen.getByText(/visualisez le temps qu'il vous reste/i)).toBeInTheDocument()
  })

  it('devrait afficher le formulaire initial', () => {
    render(<Home />)
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /commencer/i })).toBeInTheDocument()
  })

  it('devrait afficher le compteur et le calendrier après soumission', () => {
    render(<Home />)
    
    const dateInput = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))

    expect(screen.getByText(/il vous reste/i)).toBeInTheDocument()
    expect(screen.getByText(/votre vie en semaines/i)).toBeInTheDocument()
  })

  it('devrait afficher le bouton pour ajouter une seconde personne', () => {
    render(<Home />)
    
    const dateInput = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))

    expect(screen.getByRole('button', { name: /ajouter une seconde personne/i })).toBeInTheDocument()
  })

  it('devrait afficher le formulaire pour la seconde personne', () => {
    render(<Home />)
    
    // Remplir le premier formulaire
    const dateInput = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))

    // Cliquer sur le bouton pour ajouter une seconde personne
    fireEvent.click(screen.getByRole('button', { name: /ajouter une seconde personne/i }))

    // Vérifier que le formulaire de la seconde personne est affiché
    expect(screen.getByLabelText(/date de naissance de la seconde personne/i)).toBeInTheDocument()
  })

  it('devrait afficher les statistiques de temps partagé après ajout de la seconde personne', () => {
    render(<Home />)
    
    // Remplir le premier formulaire
    const dateInput = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))

    // Ajouter la seconde personne
    fireEvent.click(screen.getByRole('button', { name: /ajouter une seconde personne/i }))
    const secondDateInput = screen.getByLabelText(/date de naissance de la seconde personne/i)
    fireEvent.change(secondDateInput, { target: { value: '1992-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))

    // Vérifier les statistiques de temps partagé
    expect(screen.getByText(/temps partagé/i)).toBeInTheDocument()
    expect(screen.getByText(/semaines ensemble/i)).toBeInTheDocument()
  })

  it('devrait permettre de modifier les paramètres', () => {
    render(<Home />)
    
    // Remplir le premier formulaire
    const dateInput = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))

    // Ouvrir les paramètres
    fireEvent.click(screen.getByRole('button', { name: /modifier les paramètres/i }))
    
    // Vérifier que le formulaire de modification est affiché
    expect(screen.getByRole('button', { name: /mettre à jour/i })).toBeInTheDocument()
  })
}) 