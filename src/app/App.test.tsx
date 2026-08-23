import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('affiche le titre Lafiya et le statut du socle', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Lafiya' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Le socle technique est prêt.')).toBeVisible()
  })
})
