import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('affiche la direction éditoriale et les deux actions principales', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Un don\.Un lien vital\./i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Vérifier mon éligibilité/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /Trouver où donner/i }).length).toBeGreaterThan(0)
  })

  it('rend les huit groupes sanguins et les six questions du catalogue', () => {
    render(<App />)

    expect(screen.getByText('AB-')).toBeVisible()
    expect(screen.getByText('O-')).toBeVisible()
    expect(screen.getAllByRole('group').length).toBeGreaterThanOrEqual(6)
    expect(screen.getByText(/Dernière mise à jour : 27 août 2026/i)).toBeVisible()
  })

  it('ouvre puis referme le méga-menu Le don', () => {
    render(<App />)

    const trigger = screen.getByRole('button', { name: 'Le don' })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Comprendre et préparer chaque étape.')).toBeVisible()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})
