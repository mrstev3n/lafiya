import { useMemo, useState, type ReactNode } from 'react'
import { Icon } from '../../components/ui/Icon.tsx'
import { centres } from '../../data/catalogue.ts'
import type { DonationCentre } from '../../domain/schemas.ts'
import { StaticLocationMap } from './StaticLocationMap.tsx'
import styles from './LocationsExplorer.module.css'
import { defaultLocationsTuning } from './locationsTuning.ts'

const cityLabels: Record<DonationCentre['cityId'], string> = {
  'abomey-calavi': 'Abomey-Calavi',
  cotonou: 'Cotonou',
  'porto-novo': 'Porto-Novo',
}

type LocationsExplorerProps = {
  heading?: ReactNode
  intro?: string
}

export function LocationsExplorer({ heading, intro }: LocationsExplorerProps) {
  const [selectedCity, setSelectedCity] = useState<'all' | DonationCentre['cityId']>('all')
  const [selectedCentreId, setSelectedCentreId] = useState(centres[0].id)
  const [mapView, setMapView] = useState<'overview' | 'centre'>('overview')
  const filteredCentres = useMemo(
    () => selectedCity === 'all' ? centres : centres.filter((centre) => centre.cityId === selectedCity),
    [selectedCity],
  )
  const activeCentre = centres.find((centre) => centre.id === selectedCentreId) ?? filteredCentres[0]

  function selectCity(city: 'all' | DonationCentre['cityId']) {
    setSelectedCity(city)
    const nextCentres = city === 'all' ? centres : centres.filter((centre) => centre.cityId === city)
    setSelectedCentreId(nextCentres[0].id)
    setMapView(city === 'all' ? 'overview' : 'centre')
  }

  function selectCentre(centre: DonationCentre) {
    setSelectedCentreId(centre.id)
    setMapView('centre')
  }

  return (
    <div className={styles.grid} data-motion-group data-motion-stagger>
      <div className={styles.list} data-motion-item data-motion-origin="left" aria-live="polite">
        {heading ? <div className={styles.heading}>{heading}{intro ? <p>{intro}</p> : null}</div> : null}
        <label className={styles.citySelect}>
          <span>Ville ou zone</span>
          <select
            onChange={(event) => selectCity(event.target.value as 'all' | DonationCentre['cityId'])}
            value={selectedCity}
          >
            <option value="all">Grand Nokoué</option>
            {Object.entries(cityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <p className={styles.sourceDate}>Lieux publiés par l’ANTS · mise à jour du 25 novembre 2025</p>
        <div className={styles.centreList}>
          {filteredCentres.map((centre) => (
            <button
              aria-pressed={activeCentre.id === centre.id}
              className={styles.centre}
              key={centre.id}
              onClick={() => selectCentre(centre)}
              type="button"
            >
              <span className={styles.marker}><Icon name="pin" /></span>
              <span className={styles.centreCopy}>
                <strong>{centre.displayName}</strong>
                <span>{centre.address}</span>
                <small>{cityLabels[centre.cityId]}</small>
              </span>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
        <a className={styles.allLocations} href="/ou-donner">Voir tous les points de don <Icon name="arrow" /></a>
      </div>
      <div className={styles.map} data-motion-item data-motion-origin="right">
        <StaticLocationMap
          activeCentre={activeCentre}
          centres={centres}
          focus={mapView === 'overview' ? 'all' : activeCentre.cityId}
          onSelect={selectCentre}
          tuning={defaultLocationsTuning}
        />
      </div>
    </div>
  )
}
