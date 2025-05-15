import { cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('devrait combiner des classes simples', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('devrait gérer les classes conditionnelles', () => {
      expect(cn('foo', { bar: true, baz: false })).toBe('foo bar')
    })

    it('devrait gérer les classes Tailwind', () => {
      expect(cn('px-2 py-1', 'bg-red-500', 'hover:bg-red-600')).toBe('px-2 py-1 bg-red-500 hover:bg-red-600')
    })

    it('devrait gérer les classes en conflit', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('devrait gérer les valeurs undefined et null', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
    })
  })
}) 