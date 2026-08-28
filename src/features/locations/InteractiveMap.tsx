import { divIcon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { DonationCentre } from '../../domain/schemas.ts'
import styles from './InteractiveMap.module.css'

type InteractiveMapProps = {
  centres: DonationCentre[]
  cityLabel: string
}

const markerIcon = divIcon({
  className: styles.marker,
  html: '<span aria-hidden="true"></span>',
  iconAnchor: [15, 30],
  iconSize: [30, 30],
  popupAnchor: [0, -28],
})

export function InteractiveMap({ centres, cityLabel }: InteractiveMapProps) {
  const fallback: [number, number] = [6.3703, 2.3912]
  const center: [number, number] = centres.length
    ? [
        centres.reduce((sum, centre) => sum + centre.latitude, 0) / centres.length,
        centres.reduce((sum, centre) => sum + centre.longitude, 0) / centres.length,
      ]
    : fallback
  const zoom = centres.length > 2 ? 10 : 13

  return (
    <div className={styles.frame} aria-label={`Carte interactive des points de don à ${cityLabel}`}>
      <MapContainer center={center} className={styles.map} key={cityLabel} scrollWheelZoom zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centres.map((centre) => (
          <Marker icon={markerIcon} key={centre.id} position={[centre.latitude, centre.longitude]}>
            <Popup>
              <strong>{centre.displayName}</strong>
              <br />
              {centre.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <span className={styles.city}>{cityLabel}</span>
    </div>
  )
}
