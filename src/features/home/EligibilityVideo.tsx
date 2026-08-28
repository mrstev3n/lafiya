import { useEffect, useRef } from 'react'

const POSTER = '/assets/video/eligibility-donor-poster.webp'

function shouldKeepPoster() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true

  const reducedMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection

  return reducedMotion || connection?.saveData === true
}

export function EligibilityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const posterOnly = shouldKeepPoster()

  useEffect(() => {
    const video = videoRef.current
    if (!video || posterOnly || !('IntersectionObserver' in window)) return

    let hasPlayed = false
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry?.isIntersecting || hasPlayed) return

      hasPlayed = true
      observer.disconnect()
      void video.play().catch(() => {
        // Le poster reste visible si la politique du navigateur refuse l’autoplay.
      })
    }, { threshold: 0.45 })

    observer.observe(video)
    return () => observer.disconnect()
  }, [posterOnly])

  if (posterOnly) {
    return <img src={POSTER} alt="Donneuse béninoise souriante après avoir envisagé un don de sang" />
  }

  return (
    <video
      aria-label="Donneuse béninoise souriante et rassurée"
      muted
      playsInline
      poster={POSTER}
      preload="metadata"
      ref={videoRef}
    >
      <source src="/assets/video/eligibility-donor-720.webm" type="video/webm" />
      <source src="/assets/video/eligibility-donor-720.mp4" type="video/mp4" />
    </video>
  )
}
