import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  SELECTED_CITY_SESSION_KEY,
  cityLocatorPath,
  readSessionCity,
  writeSessionCity,
} from './cityPreference.ts'

describe('préférence de ville', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    sessionStorage.clear()
  })

  it('utilise l’URL comme destination canonique', () => {
    expect(cityLocatorPath('porto-novo')).toBe('/ou-donner?ville=porto-novo')
  })

  it('enregistre et efface une préférence de session', () => {
    expect(writeSessionCity('cotonou')).toBe(true)
    expect(readSessionCity()).toBe('cotonou')
    expect(writeSessionCity(null)).toBe(true)
    expect(sessionStorage.getItem(SELECTED_CITY_SESSION_KEY)).toBeNull()
  })

  it('reste silencieux lorsque le stockage est indisponible', () => {
    const blockedStorage = {
      clear: vi.fn(),
      getItem: vi.fn(() => { throw new DOMException('Storage disabled', 'SecurityError') }),
      key: vi.fn(() => null),
      length: 0,
      removeItem: vi.fn(() => { throw new DOMException('Storage disabled', 'SecurityError') }),
      setItem: vi.fn(() => { throw new DOMException('Storage disabled', 'SecurityError') }),
    } satisfies Storage
    vi.stubGlobal('sessionStorage', blockedStorage)

    expect(writeSessionCity('cotonou')).toBe(false)
    expect(readSessionCity()).toBeNull()
    expect(cityLocatorPath('cotonou')).toBe('/ou-donner?ville=cotonou')
  })
})
