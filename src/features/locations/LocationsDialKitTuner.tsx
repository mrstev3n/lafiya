import { useEffect, useRef } from 'react'
import { DialRoot, useDialKitController } from 'dialkit'
import 'dialkit/styles.css'
import type { LocationsTuning } from './locationsTuning.ts'

export default function LocationsDialKitTuner({ onChange }: { onChange: (value: LocationsTuning) => void }) {
  const resetRef = useRef<() => void>(() => undefined)
  const dial = useDialKitController('Carte — Où donner', {
    resetLocations: { type: 'action', label: 'Réinitialiser les réglages' },
    Focus: {
      "Zoom vue d'ensemble": [1, 1, 1.4, 0.01],
      'Zoom localisation': [1.5, 1, 2.2, 0.01],
      'Position horizontale': [50, 35, 75, 1],
      'Position verticale': [40, 25, 70, 1],
    },
    Fondus: {
      'Type de voile': {
        type: 'select',
        options: [
          { value: 'linear', label: 'Linéaire' },
          { value: 'radial', label: 'Radial · arc' },
        ],
        default: 'radial',
      },
      Couleur: '#f7f4f2',
      'Opacité gauche': [0.96, 0, 1, 0.01],
      'Fin du fondu gauche': [0, 0, 45, 1],
      'Fondu haut et bas': [0, 0, 30, 1],
      'Fondu droit': [0, 0, 30, 1],
      'Centre horizontal de l’arc': [85, 0, 140, 1],
      'Centre vertical de l’arc': [52, 0, 100, 1],
      'Ouverture de l’arc': [48, 12, 100, 1],
      'Douceur de l’arc': [18, 4, 55, 1],
      'Opacité hors arc': [1, 0, 1, 0.01],
    },
  }, {
    id: 'lafiya-locations-v4',
    persist: true,
    onAction: (path) => {
      if (path === 'resetLocations') resetRef.current()
    },
  })
  const tuning = dial.values

  useEffect(() => {
    resetRef.current = dial.resetValues
    return () => { resetRef.current = () => undefined }
  }, [dial.resetValues])

  const focus = tuning.Focus
  const fade = tuning.Fondus
  const overviewZoom = focus["Zoom vue d'ensemble"]
  const activeZoom = focus['Zoom localisation']
  const x = focus['Position horizontale']
  const y = focus['Position verticale']
  const mode = fade['Type de voile'] as LocationsTuning['fade']['mode']
  const color = fade.Couleur
  const leftOpacity = fade['Opacité gauche']
  const leftEnd = fade['Fin du fondu gauche']
  const verticalEnd = fade['Fondu haut et bas']
  const rightEnd = fade['Fondu droit']
  const radialX = fade['Centre horizontal de l’arc']
  const radialY = fade['Centre vertical de l’arc']
  const radialOpening = fade['Ouverture de l’arc']
  const radialSoftness = fade['Douceur de l’arc']
  const radialOpacity = fade['Opacité hors arc']

  useEffect(() => {
    onChange({
      focus: { overviewZoom, activeZoom, x, y },
      fade: {
        mode,
        color,
        leftOpacity,
        leftEnd,
        verticalEnd,
        rightEnd,
        radialX,
        radialY,
        radialOpening,
        radialSoftness,
        radialOpacity,
      },
    })
  }, [activeZoom, color, leftEnd, leftOpacity, mode, onChange, overviewZoom, radialOpening, radialOpacity, radialSoftness, radialX, radialY, rightEnd, verticalEnd, x, y])

  return <DialRoot defaultOpen={false} position="bottom-right" theme="dark" />
}
