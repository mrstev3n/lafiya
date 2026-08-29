import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SELECTED_CITY_SESSION_KEY } from '../locations/cityPreference.ts'
import { EligibilityFlow } from './EligibilityFlow.tsx'

const today = '2026-08-28'

function renderFlow() {
  return render(
    <MemoryRouter>
      <EligibilityFlow today={today} />
    </MemoryRouter>,
  )
}

function submitAge(age: string) {
  fireEvent.change(screen.getByLabelText('Âge, en années'), { target: { value: age } })
  fireEvent.click(screen.getByRole('button', { name: 'Vérifier mon âge' }))
}

function submitWeight(weight: string) {
  fireEvent.change(screen.getByLabelText('Poids, en kilogrammes'), { target: { value: weight } })
  fireEvent.click(screen.getByRole('button', { name: 'Passer au dernier don' }))
}

function reachLastDonation(age = '25', weight = '62') {
  submitAge(age)
  submitWeight(weight)
}

describe('EligibilityFlow', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    sessionStorage.clear()
  })

  it('affiche immédiatement la première question et sa progression', () => {
    renderFlow()
    expect(screen.getByText('Étape 1 sur 3')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Quel âge avez-vous ?' })).toBeVisible()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', 'Étape 1 sur 3')
  })

  it('associe l’erreur au champ et replace le focus', async () => {
    renderFlow()
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier mon âge' }))
    const input = screen.getByLabelText('Âge, en années')
    const alert = screen.getByRole('alert')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input.getAttribute('aria-describedby') ?? '').toContain(alert.id)
    await waitFor(() => expect(input).toHaveFocus())
  })

  it('oriente positivement un mineur sans demander son poids', () => {
    renderFlow()
    submitAge('15')
    expect(screen.getByRole('heading', { name: 'Votre démarche commence déjà.' })).toBeVisible()
    expect(screen.getByText(/environ 3 ans/i)).toBeVisible()
    expect(screen.queryByLabelText('Poids, en kilogrammes')).not.toBeInTheDocument()
  })

  it('emploie le singulier lorsqu’il reste environ un an', () => {
    renderFlow()
    submitAge('17')
    expect(screen.getByText(/environ 1 an avant/i)).toBeVisible()
  })

  it('s’arrête après le poids lorsque ce repère n’est pas atteint', () => {
    renderFlow()
    submitAge('25')
    submitWeight('48')
    expect(screen.getByRole('heading', { name: 'Merci d’avoir pris le temps de vérifier.' })).toBeVisible()
    expect(screen.queryByText('Votre dernier don')).not.toBeInTheDocument()
  })

  it('oriente un premier don vers une ville sans stocker les réponses', () => {
    renderFlow()
    reachLastDonation()
    fireEvent.click(screen.getByLabelText('Je n’ai jamais donné'))
    fireEvent.click(screen.getByRole('button', { name: 'Voir mon orientation' }))
    expect(screen.getByRole('heading', { name: 'Vous pouvez poursuivre votre démarche.' })).toBeVisible()

    fireEvent.click(screen.getByLabelText('Cotonou'))
    const destination = screen.getByRole('link', { name: 'Afficher les points de don' })
    expect(destination).toHaveAttribute('href', '/ou-donner?ville=cotonou')
    destination.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(destination)

    expect(sessionStorage.getItem(SELECTED_CITY_SESSION_KEY)).toBe('cotonou')
    expect(sessionStorage.getItem('age')).toBeNull()
    expect(sessionStorage.getItem('weightKg')).toBeNull()
  })

  it('n’empêche pas la navigation lorsque le stockage est bloqué', () => {
    renderFlow()
    reachLastDonation()
    fireEvent.click(screen.getByLabelText('Je n’ai jamais donné'))
    fireEvent.click(screen.getByRole('button', { name: 'Voir mon orientation' }))
    fireEvent.click(screen.getByLabelText('Porto-Novo'))

    const blockedStorage = {
      clear: vi.fn(),
      getItem: vi.fn(() => { throw new DOMException('Storage disabled', 'SecurityError') }),
      key: vi.fn(() => null),
      length: 0,
      removeItem: vi.fn(() => { throw new DOMException('Storage disabled', 'SecurityError') }),
      setItem: vi.fn(() => { throw new DOMException('Storage disabled', 'SecurityError') }),
    } satisfies Storage
    vi.stubGlobal('sessionStorage', blockedStorage)
    const destination = screen.getByRole('link', { name: 'Afficher les points de don' })
    expect(destination).toHaveAttribute('href', '/ou-donner?ville=porto-novo')
    destination.addEventListener('click', (event) => event.preventDefault())
    expect(() => fireEvent.click(destination)).not.toThrow()
  })

  it('demande conseil lorsque la date du dernier don est inconnue', () => {
    renderFlow()
    reachLastDonation()
    fireEvent.click(screen.getByLabelText('Je ne me souviens pas de la date'))
    fireEvent.click(screen.getByRole('button', { name: 'Voir mon orientation' }))
    expect(screen.getByRole('heading', { name: 'Un point de don pourra vous guider.' })).toBeVisible()
  })

  it('affiche une prochaine date et une action calendrier', () => {
    renderFlow()
    reachLastDonation()
    fireEvent.click(screen.getByLabelText('Je connais la date'))
    fireEvent.change(screen.getByLabelText('Date du dernier don'), { target: { value: '2026-06-01' } })
    fireEvent.click(screen.getByRole('button', { name: 'Voir mon orientation' }))
    expect(screen.getByRole('heading', { name: 'Une prochaine date peut être envisagée.' })).toBeVisible()
    expect(screen.getByText(/1 octobre 2026/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'Ajouter cette date au calendrier' })).toBeVisible()
  })

  it('conserve les réponses pendant la révision, sans vocabulaire de challenge', () => {
    renderFlow()
    reachLastDonation('40', '70')
    fireEvent.click(screen.getByLabelText('Je n’ai jamais donné'))
    fireEvent.click(screen.getByRole('button', { name: 'Voir mon orientation' }))
    fireEvent.click(screen.getByRole('button', { name: 'Modifier mes réponses' }))
    expect(screen.getByLabelText('Âge, en années')).toHaveValue('40')
    expect(screen.queryByText(/challenge|critères simplifiés/i)).not.toBeInTheDocument()
  })
})
