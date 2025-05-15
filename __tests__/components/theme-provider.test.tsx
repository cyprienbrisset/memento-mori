import { render } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'
import { type ThemeProviderProps } from 'next-themes'

// Mock pour window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeProvider', () => {
  it('devrait rendre les enfants correctement', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('devrait accepter les props du ThemeProvider', () => {
    const testProps: ThemeProviderProps = {
      attribute: 'data-theme' as const,
      defaultTheme: 'dark',
      enableSystem: true,
      disableTransitionOnChange: true,
    }
    
    const { getByText } = render(
      <ThemeProvider {...testProps}>
        <div>Test Content</div>
      </ThemeProvider>
    )
    
    expect(getByText('Test Content')).toBeInTheDocument()
  })
}) 