import { useEffect } from 'react'
import { DialRoot, useDialKit } from 'dialkit'
import 'dialkit/styles.css'
import type { HeroTuning } from './heroTuning.ts'

export default function HeroDialKitTuner({ onChange }: { onChange: (value: HeroTuning) => void }) {
  const tuning = useDialKit('Hero Lafiya', {
    Photo: {
      Zoom: [1, 0.78, 1.25, 0.01],
      'Position horizontale': [68, 0, 100, 1],
      'Position verticale': [86, 0, 100, 1],
    },
    'Voile de lecture': {
      'Couleur gauche': '#000e20',
      'Opacité gauche': [0.98, 0, 1, 0.01],
      'Fin de la zone pleine': [19, 0, 50, 1],
      'Couleur centrale': '#001b35',
      'Opacité centrale': [0.74, 0, 1, 0.01],
      'Position centrale': [43, 15, 75, 1],
      'Couleur douce': '#002848',
      'Opacité douce': [0.38, 0, 1, 0.01],
      'Position douce': [59, 30, 90, 1],
      'Fin du voile': [86, 55, 100, 1],
    },
  }, {
    id: 'lafiya-hero-v2',
    persist: true,
  })
  const photo = tuning.Photo
  const shade = tuning['Voile de lecture']
  const scale = photo.Zoom
  const x = photo['Position horizontale']
  const y = photo['Position verticale']
  const startColor = shade['Couleur gauche']
  const startOpacity = shade['Opacité gauche']
  const solidEnd = shade['Fin de la zone pleine']
  const midColor = shade['Couleur centrale']
  const midOpacity = shade['Opacité centrale']
  const midPosition = shade['Position centrale']
  const softColor = shade['Couleur douce']
  const softOpacity = shade['Opacité douce']
  const softPosition = shade['Position douce']
  const end = shade['Fin du voile']

  useEffect(() => {
    onChange({
      photo: {
        scale,
        x,
        y,
      },
      shade: {
        startColor,
        startOpacity,
        solidEnd,
        midColor,
        midOpacity,
        midPosition,
        softColor,
        softOpacity,
        softPosition,
        end,
      },
    })
  }, [
    end,
    midColor,
    midOpacity,
    midPosition,
    onChange,
    scale,
    softColor,
    softOpacity,
    softPosition,
    solidEnd,
    startColor,
    startOpacity,
    x,
    y,
  ])

  return <DialRoot defaultOpen position="bottom-right" theme="dark" />
}
