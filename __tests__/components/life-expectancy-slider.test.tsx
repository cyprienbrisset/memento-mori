import { render, screen, fireEvent } from '@testing-library/react'
import { LifeExpectancySlider } from '@/components/life-expectancy-slider'

describe('LifeExpectancySlider', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('devrait afficher le slider avec la valeur initiale', () => {
    render(<LifeExpectancySlider value={80} onChange={mockOnChange} />)
    
    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('80')
    expect(screen.getByText(/espérance de vie: 80 ans/i)).toBeInTheDocument()
  })

  it('devrait appeler onChange lors du changement de valeur', () => {
    render(<LifeExpectancySlider value={80} onChange={mockOnChange} />)
    
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '85' } })
    
    expect(mockOnChange).toHaveBeenCalledWith(85)
    expect(screen.getByText(/espérance de vie: 85 ans/i)).toBeInTheDocument()
  })

  it('devrait afficher les limites min et max', () => {
    render(<LifeExpectancySlider value={80} onChange={mockOnChange} />)
    
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('120')).toBeInTheDocument()
  })

  it('devrait utiliser le label personnalisé si fourni', () => {
    const customLabel = 'Espérance de vie personnalisée'
    render(<LifeExpectancySlider value={80} onChange={mockOnChange} label={customLabel} />)
    
    expect(screen.getByText(new RegExp(`${customLabel}: 80 ans`, 'i'))).toBeInTheDocument()
  })

  it('devrait respecter les limites min et max', () => {
    render(<LifeExpectancySlider value={80} onChange={mockOnChange} />)
    
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '40' } })
    expect(mockOnChange).not.toHaveBeenCalledWith(40)
    
    fireEvent.change(slider, { target: { value: '130' } })
    expect(mockOnChange).not.toHaveBeenCalledWith(130)
  })

  it('devrait gérer correctement les valeurs invalides', () => {
    render(<LifeExpectancySlider value={80} onChange={mockOnChange} />)
    
    const slider = screen.getByRole('slider')
    
    // Test avec une valeur non numérique
    fireEvent.change(slider, { target: { value: 'abc' } })
    expect(mockOnChange).not.toHaveBeenCalled()
    
    // Test avec une valeur négative
    fireEvent.change(slider, { target: { value: '-10' } })
    expect(mockOnChange).not.toHaveBeenCalled()
    
    // Test avec une valeur décimale
    fireEvent.change(slider, { target: { value: '80.5' } })
    expect(mockOnChange).toHaveBeenCalledWith(80)
  })
}) 