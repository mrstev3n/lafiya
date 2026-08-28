import { useMemo, useState } from 'react'
import { Icon } from '../../components/ui/Icon.tsx'
import { centres } from '../../data/catalogue.ts'
import type { DonationCentre } from '../../domain/schemas.ts'
import { InteractiveMap } from './InteractiveMap.tsx'
import styles from './LocationsExplorer.module.css'

const cityLabels: Record<DonationCentre['cityId'], string> = {
  'abomey-calavi': 'Abomey-Calavi',
  cotonou: 'Cotonou',
  'porto-novo': 'Porto-Novo',
}

export function LocationsExplorer() {
  const [selectedCity, setSelectedCity] = useState<'all' | DonationCentre['cityId']>('all')
  const filteredCentres = useMemo(
    () => selectedCity === 'all' ? centres : centres.filter((centre) => centre.cityId === selectedCity),
    [selectedCity],
  )

  return (
    <div className={styles.grid}>
      <div className={styles.list} aria-live="polite">
        <label className={styles.citySelect}>
          <span>Choisir une ville</span>
          <select
            onChange={(event) => setSelectedCity(event.target.value as 'all' | DonationCentre['cityId'])}
            value={selectedCity}
          >
            <option value="all">Tous les lieux</option>
            {Object.entries(cityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <p className={styles.sourceDate}>Lieux publiés par l’ANTS · mise à jour du 25 novembre 2025</p>
        {filteredCentres.map((centre) => (
          <article className={styles.centre} id={centre.id} key={centre.id}>
            <div className={styles.marker}><Icon name="pin" /></div>
            <div>
              <h3>{centre.displayName}</h3>
              <p>{centre.address}</p>
              <span>
                {cityLabels[centre.cityId]} · {centre.latitude.toFixed(4)}, {centre.longitude.toFixed(4)}
              </span>
            </div>
            <a href={centre.sourceUrl} aria-label={`Consulter la source de ${centre.displayName}`}>
              <Icon name="arrow" />
            </a>
          </article>
        ))}
      </div>
      <InteractiveMap
        centres={filteredCentres}
        cityLabel={selectedCity === 'all' ? 'Sud du Bénin' : cityLabels[selectedCity]}
      />
    </div>
  )
}
