import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { SELECTED_CITY_SESSION_KEY } from './cityPreference.ts'
import { LocationsExplorer } from './LocationsExplorer.tsx'

function renderExplorer(path = '/ou-donner') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LocationsExplorer />
    </MemoryRouter>,
  )
}

describe('LocationsExplorer — transition depuis le test', () => {
  afterEach(() => sessionStorage.clear())

  it('préremplit la zone depuis le paramètre de sortie du test', () => {
    renderExplorer('/ou-donner?ville=porto-novo')
    expect(screen.getByLabelText('Ville ou zone')).toHaveValue('porto-novo')
    expect(
      screen.getAllByRole('button', { name: /STS Ouémé/i })
        .some((button) => button.getAttribute('aria-pressed') === 'true'),
    ).toBe(true)
  })

  it('reprend la ville de session en l’absence de paramètre', () => {
    sessionStorage.setItem(SELECTED_CITY_SESSION_KEY, 'cotonou')
    renderExplorer()
    expect(screen.getByLabelText('Ville ou zone')).toHaveValue('cotonou')
  })

  it('laisse le filtre inchangé lorsque le lieu actif change', () => {
    renderExplorer()
    fireEvent.click(screen.getAllByRole('button', { name: /STS Ouémé/i })[0])
    expect(screen.getByLabelText('Ville ou zone')).toHaveValue('all')
  })
})
