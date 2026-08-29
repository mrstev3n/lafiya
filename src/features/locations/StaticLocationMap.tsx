import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import type { DonationCentre } from '../../domain/schemas.ts'
import styles from './StaticLocationMap.module.css'
import type { LocationsTuning } from './locationsTuning.ts'

type StaticLocationMapProps = {
  activeCentre: DonationCentre
  centres: DonationCentre[]
  focus: 'all' | DonationCentre['cityId']
  onSelect: (centre: DonationCentre) => void
  tuning: LocationsTuning
}

type MapLayout = {
  height: number
  left: number
  top: number
  translateX: number
  translateY: number
  width: number
}

const MAP_ASPECT = 3204 / 2008
const MAP_OVERSCAN = 1.45

const markerPositions: Record<DonationCentre['id'], { x: number; y: number }> = {
  'ants-49': { x: 45.12, y: 34.87 },
  'ants-50': { x: 48.25, y: 43.57 },
  'ants-51': { x: 49.47, y: 42.98 },
  'ants-52': { x: 57.66, y: 32.91 },
}

const cityLabels: Record<DonationCentre['cityId'], string> = {
  'abomey-calavi': 'Abomey-Calavi',
  cotonou: 'Cotonou',
  'porto-novo': 'Porto-Novo',
}

function colorWithAlpha(hex: string, alpha: number) {
  const normalized = hex.replace('#', '')
  const expanded = normalized.length === 3
    ? normalized.split('').map((character) => character.repeat(2)).join('')
    : normalized.slice(0, 6)
  const numeric = Number.parseInt(expanded, 16)
  if (!Number.isFinite(numeric)) return `rgb(247 244 242 / ${alpha})`
  return `rgb(${(numeric >> 16) & 255} ${(numeric >> 8) & 255} ${numeric & 255} / ${alpha})`
}

export function StaticLocationMap({ activeCentre, centres, focus, onSelect, tuning }: StaticLocationMapProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<MapLayout>({ height: 0, left: 0, top: 0, translateX: 0, translateY: 0, width: 0 })
  const activePosition = markerPositions[activeCentre.id]
  const zoom = focus === 'all' ? tuning.focus.overviewZoom : tuning.focus.activeZoom

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateLayout = () => {
      const viewportWidth = viewport.clientWidth
      const viewportHeight = viewport.clientHeight
      const coverWidth = Math.max(viewportWidth, viewportHeight * MAP_ASPECT)
      const width = coverWidth * MAP_OVERSCAN
      const height = width / MAP_ASPECT
      const left = (viewportWidth - width) / 2
      const top = (viewportHeight - height) / 2
      const markerX = width * activePosition.x / 100
      const markerY = height * activePosition.y / 100
      setLayout({
        width,
        height,
        left,
        top,
        translateX: viewportWidth * tuning.focus.x / 100 - (left + markerX),
        translateY: viewportHeight * tuning.focus.y / 100 - (top + markerY),
      })
    }

    updateLayout()
    if (!('ResizeObserver' in window)) return
    const resizeObserver = new ResizeObserver(updateLayout)
    resizeObserver.observe(viewport)
    return () => resizeObserver.disconnect()
  }, [activePosition.x, activePosition.y, tuning.focus.x, tuning.focus.y])

  const stageStyle = {
    height: `${layout.height}px`,
    left: `${layout.left}px`,
    top: `${layout.top}px`,
    transform: `translate3d(${layout.translateX}px, ${layout.translateY}px, 0) scale(${zoom})`,
    transformOrigin: `${activePosition.x}% ${activePosition.y}%`,
    width: `${layout.width}px`,
  }
  const viewportStyle = {
    '--map-fade-color': colorWithAlpha(tuning.fade.color, tuning.fade.leftOpacity),
    '--map-radial-color': colorWithAlpha(tuning.fade.color, tuning.fade.radialOpacity),
    '--map-fade-left-end': `${tuning.fade.leftEnd}%`,
    '--map-fade-vertical-end': `${tuning.fade.verticalEnd}%`,
    '--map-fade-right-end': `${tuning.fade.rightEnd}%`,
    '--map-radial-x': `${tuning.fade.radialX}%`,
    '--map-radial-y': `${tuning.fade.radialY}%`,
    '--map-radial-opening': `${tuning.fade.radialOpening}%`,
    '--map-radial-softness': `${tuning.fade.radialOpening + tuning.fade.radialSoftness}%`,
    '--map-focus-x': `${tuning.focus.x}%`,
    '--map-focus-y': `${tuning.focus.y}%`,
  } as CSSProperties

  return (
    <div
      aria-label={`Carte statique centrée sur ${focus === 'all' ? 'le Grand Nokoué' : cityLabels[focus]}`}
      className={styles.viewport}
      data-focus={focus}
      ref={viewportRef}
      style={viewportStyle}
    >
      <div className={styles.mapStage} style={stageStyle}>
        <img alt="" aria-hidden="true" className={styles.mapImage} src="/assets/images/grand-nokoue-static-map-wide.png" />
      </div>
      <div className={tuning.fade.mode === 'radial' ? styles.fadeRadial : styles.fadeLeft} />
      <div className={styles.fadeEdges} />
      <div className={styles.markerStage} style={stageStyle}>
        {centres.map((centre) => {
          const position = markerPositions[centre.id]
          const active = centre.id === activeCentre.id
          return (
            <button
              aria-label={`${centre.displayName}, ${cityLabels[centre.cityId]}`}
              aria-pressed={active}
              className={styles.marker}
              key={centre.id}
              onClick={() => onSelect(centre)}
              style={{ '--marker-x': `${position.x}%`, '--marker-y': `${position.y}%` } as CSSProperties}
              type="button"
            >
              <span aria-hidden="true" />
            </button>
          )
        })}
      </div>
      <div className={styles.activeLabel}>
        <strong>{activeCentre.displayName}</strong>
        <span>{activeCentre.address}</span>
      </div>
      <a className={styles.attribution} href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>
    </div>
  )
}
