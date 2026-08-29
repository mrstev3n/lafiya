import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon.tsx'
import { centres } from '../../data/catalogue.ts'
import { CITY_LABELS, parseCityId } from '../../domain/location.ts'
import type { DonationCentre } from '../../domain/schemas.ts'
import { readSessionCity, writeSessionCity } from './cityPreference.ts'
import { StaticLocationMap } from './StaticLocationMap.tsx'
import styles from './LocationsExplorer.module.css'
import { defaultLocationsTuning } from './locationsTuning.ts'

function initialCity(searchParams: URLSearchParams): 'all' | DonationCentre['cityId'] {
  return parseCityId(searchParams.get('ville')) ?? readSessionCity() ?? 'all'
}

type LocationsExplorerProps = {
  heading?: ReactNode
  intro?: string
}

export function LocationsExplorer({ heading, intro }: LocationsExplorerProps) {
  const [searchParams] = useSearchParams()
  const initialSelection = initialCity(searchParams)
  const [selectedCity, setSelectedCity] = useState<'all' | DonationCentre['cityId']>(initialSelection)
  const [selectedCentreId, setSelectedCentreId] = useState(() => {
    const matchingCentres = initialSelection === 'all'
      ? centres
      : centres.filter((centre) => centre.cityId === initialSelection)
    return matchingCentres[0].id
  })
  const [mapView, setMapView] = useState<'overview' | 'centre'>(
    initialSelection === 'all' ? 'overview' : 'centre',
  )
  const filteredCentres = useMemo(
    () => selectedCity === 'all' ? centres : centres.filter((centre) => centre.cityId === selectedCity),
    [selectedCity],
  )
  const activeCentre = centres.find((centre) => centre.id === selectedCentreId) ?? filteredCentres[0]

  function selectCity(city: 'all' | DonationCentre['cityId']) {
    setSelectedCity(city)
    writeSessionCity(city === 'all' ? null : city)
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
            {Object.entries(CITY_LABELS).map(([value, label]) => (
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
                <small>{CITY_LABELS[centre.cityId]}</small>
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
