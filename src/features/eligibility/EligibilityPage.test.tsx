import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { EligibilityPage } from './EligibilityPage.tsx'

describe('EligibilityPage', () => {
  it('présente une introduction compacte et crédible', () => {
    render(
      <MemoryRouter>
        <EligibilityPage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Faisons le point, simplement.' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'Quel âge avez-vous ?' })).toBeVisible()
    expect(screen.getByText('Vos réponses ne sont ni enregistrées ni transmises.')).toBeVisible()
    expect(screen.queryByText(/challenge|critères simplifiés/i)).not.toBeInTheDocument()
  })
})
