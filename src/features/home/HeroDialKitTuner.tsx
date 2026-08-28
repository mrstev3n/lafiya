import { useEffect, useRef } from 'react'
import { DialRoot, useDialKitController } from 'dialkit'
import 'dialkit/styles.css'
import type { HeroTuning } from './heroTuning.ts'

export default function HeroDialKitTuner({ onChange }: { onChange: (value: HeroTuning) => void }) {
  const resetRef = useRef<() => void>(() => undefined)
  const dial = useDialKitController('Hero Lafiya', {
    resetHero: { type: 'action', label: 'Réinitialiser les réglages' },
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
    Composition: {
      'Décalage horizontal': [0, -240, 240, 1],
      'Décalage vertical': [-64, -240, 160, 1],
    },
    Signature: {
      'Position horizontale': [0, -320, 320, 1],
      'Position verticale': [-8, -160, 100, 1],
      'Épaisseur du trait': [3, 1, 8, 0.1],
    },
    Tablette: {
      'Zoom photo': [1, 0.78, 1.25, 0.01],
      'Photo horizontale': [62, 0, 100, 1],
      'Photo verticale': [50, 0, 100, 1],
      'Couleur du voile': '#000e20',
      'Opacité gauche': [0.94, 0, 1, 0.01],
      'Opacité droite': [0.4, 0, 1, 0.01],
      'Composition horizontale': [0, -160, 160, 1],
      'Composition verticale': [-192, -240, 160, 1],
      'Signature horizontale': [0, -240, 240, 1],
      'Signature verticale': [132, -160, 160, 1],
      'Épaisseur signature': [3, 1, 8, 0.1],
    },
    Mobile: {
      'Zoom photo': [1, 0.78, 1.4, 0.01],
      'Photo horizontale': [62, 0, 100, 1],
      'Photo verticale': [50, 0, 100, 1],
      'Couleur du voile': '#000e20',
      'Opacité gauche': [0.95, 0, 1, 0.01],
      'Opacité droite': [0.54, 0, 1, 0.01],
      'Composition horizontale': [0, -120, 120, 1],
      'Composition verticale': [0, -240, 160, 1],
      'Signature horizontale': [0, -180, 180, 1],
      'Signature depuis le haut': [70, -80, 360, 1],
      'Épaisseur signature': [2.5, 1, 8, 0.1],
    },
  }, {
    id: 'lafiya-hero-v7-responsive',
    persist: true,
    onAction: (path) => {
      if (path === 'resetHero') resetRef.current()
    },
  })
  const tuning = dial.values

  useEffect(() => {
    resetRef.current = dial.resetValues
    return () => { resetRef.current = () => undefined }
  }, [dial.resetValues])
  const photo = tuning.Photo
  const shade = tuning['Voile de lecture']
  const composition = tuning.Composition
  const signature = tuning.Signature
  const tablet = tuning.Tablette
  const mobile = tuning.Mobile
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
  const compositionX = composition['Décalage horizontal']
  const compositionY = composition['Décalage vertical']
  const signatureX = signature['Position horizontale']
  const signatureY = signature['Position verticale']
  const signatureStroke = signature['Épaisseur du trait']
  const tabletPhotoScale = tablet['Zoom photo']
  const tabletPhotoX = tablet['Photo horizontale']
  const tabletPhotoY = tablet['Photo verticale']
  const tabletShadeColor = tablet['Couleur du voile']
  const tabletShadeStartOpacity = tablet['Opacité gauche']
  const tabletShadeEndOpacity = tablet['Opacité droite']
  const tabletCompositionX = tablet['Composition horizontale']
  const tabletCompositionY = tablet['Composition verticale']
  const tabletSignatureX = tablet['Signature horizontale']
  const tabletSignatureY = tablet['Signature verticale']
  const tabletSignatureStroke = tablet['Épaisseur signature']
  const mobilePhotoScale = mobile['Zoom photo']
  const mobilePhotoX = mobile['Photo horizontale']
  const mobilePhotoY = mobile['Photo verticale']
  const mobileShadeColor = mobile['Couleur du voile']
  const mobileShadeStartOpacity = mobile['Opacité gauche']
  const mobileShadeEndOpacity = mobile['Opacité droite']
  const mobileCompositionX = mobile['Composition horizontale']
  const mobileCompositionY = mobile['Composition verticale']
  const mobileSignatureX = mobile['Signature horizontale']
  const mobileSignatureY = mobile['Signature depuis le haut']
  const mobileSignatureStroke = mobile['Épaisseur signature']

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
      composition: {
        x: compositionX,
        y: compositionY,
      },
      signature: {
        x: signatureX,
        y: signatureY,
        stroke: signatureStroke,
      },
      tablet: {
        photoScale: tabletPhotoScale,
        photoX: tabletPhotoX,
        photoY: tabletPhotoY,
        shadeColor: tabletShadeColor,
        shadeStartOpacity: tabletShadeStartOpacity,
        shadeEndOpacity: tabletShadeEndOpacity,
        compositionX: tabletCompositionX,
        compositionY: tabletCompositionY,
        signatureX: tabletSignatureX,
        signatureY: tabletSignatureY,
        signatureStroke: tabletSignatureStroke,
      },
      mobile: {
        photoScale: mobilePhotoScale,
        photoX: mobilePhotoX,
        photoY: mobilePhotoY,
        shadeColor: mobileShadeColor,
        shadeStartOpacity: mobileShadeStartOpacity,
        shadeEndOpacity: mobileShadeEndOpacity,
        compositionX: mobileCompositionX,
        compositionY: mobileCompositionY,
        signatureX: mobileSignatureX,
        signatureY: mobileSignatureY,
        signatureStroke: mobileSignatureStroke,
      },
    })
  }, [
    compositionX,
    compositionY,
    end,
    midColor,
    midOpacity,
    midPosition,
    mobileCompositionX,
    mobileCompositionY,
    mobilePhotoScale,
    mobilePhotoX,
    mobilePhotoY,
    mobileShadeColor,
    mobileShadeEndOpacity,
    mobileShadeStartOpacity,
    mobileSignatureStroke,
    mobileSignatureX,
    mobileSignatureY,
    onChange,
    scale,
    softColor,
    softOpacity,
    softPosition,
    solidEnd,
    startColor,
    startOpacity,
    signatureStroke,
    signatureX,
    signatureY,
    tabletCompositionX,
    tabletCompositionY,
    tabletPhotoScale,
    tabletPhotoX,
    tabletPhotoY,
    tabletShadeColor,
    tabletShadeEndOpacity,
    tabletShadeStartOpacity,
    tabletSignatureStroke,
    tabletSignatureX,
    tabletSignatureY,
    x,
    y,
  ])

  return <DialRoot defaultOpen={false} position="bottom-right" theme="dark" />
}
