import { render, screen, fireEvent } from '@testing-library/react'
import Home from '@/app/page'

describe('Flux utilisateur principal', () => {
  it('affiche le formulaire de date de naissance au départ', () => {
    render(<Home />)
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
  })

  it('permet de saisir une date de naissance et affiche le calendrier et le compteur', () => {
    render(<Home />)
    const input = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(input, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Votre vie en semaines')).toBeInTheDocument()
    expect(screen.getByText('Temps restant estimé')).toBeInTheDocument()
  })

  it('permet d\'ouvrir et de fermer les paramètres', () => {
    render(<Home />)
    const input = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(input, { target: { value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button'))
    const btn = screen.getByText(/modifier les paramètres/i)
    fireEvent.click(btn)
    expect(screen.getByText(/espérance de vie/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/masquer les paramètres/i))
    expect(screen.queryByText(/espérance de vie/i)).not.toBeInTheDocument()
  })

  it('gère une date de naissance invalide', () => {
    render(<Home />)
    const input = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(input, { target: { value: 'abcd-ef-gh' } })
    fireEvent.click(screen.getByRole('button'))
    // On attend que le formulaire reste affiché
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
  })

  it('gère une date de naissance extrême (dans le futur)', () => {
    render(<Home />)
    const input = screen.getByLabelText(/date de naissance/i)
    fireEvent.change(input, { target: { value: '2999-01-01' } })
    fireEvent.click(screen.getByRole('button'))
    // Le calendrier et le compteur doivent s\'afficher même pour une date future
    expect(screen.getByText('Votre vie en semaines')).toBeInTheDocument()
    expect(screen.getByText('Temps restant estimé')).toBeInTheDocument()
  })

  it('vérifie la présence des rôles ARIA et labels', () => {
    render(<Home />)
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
    // Vérifie la présence du bouton
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('affiche le formulaire si aucune date n\'est saisie', () => {
    render(<Home />)
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument()
  })
}) 