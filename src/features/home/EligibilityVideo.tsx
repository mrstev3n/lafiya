import { useEffect, useRef, useState } from 'react'
import styles from './EligibilityVideo.module.css'

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
  const restartTimerRef = useRef<number | null>(null)
  const clearTransitionTimerRef = useRef<number | null>(null)
  const transitionStartedRef = useRef(false)
  const [transitioning, setTransitioning] = useState(false)
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
    return () => {
      observer.disconnect()
      if (restartTimerRef.current !== null) window.clearTimeout(restartTimerRef.current)
      if (clearTransitionTimerRef.current !== null) window.clearTimeout(clearTransitionTimerRef.current)
    }
  }, [posterOnly])

  if (posterOnly) {
    return (
      <img
        className={styles.media}
        src={POSTER}
        alt="Donneuse béninoise souriante après avoir envisagé un don de sang"
      />
    )
  }

  return (
    <>
      <video
        aria-label="Donneuse béninoise souriante et rassurée"
        className={styles.media}
        muted
        onEnded={() => {
          const video = videoRef.current
          if (!video) return

          setTransitioning(true)
          restartTimerRef.current = window.setTimeout(() => {
            video.currentTime = 0
            void video.play().catch(() => {
              // Le dernier état reste visible si la reprise automatique est refusée.
            })
          }, 350)
          clearTransitionTimerRef.current = window.setTimeout(() => {
            setTransitioning(false)
            transitionStartedRef.current = false
          }, 800)
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget
          if (
            Number.isFinite(video.duration)
            && video.duration - video.currentTime <= 0.85
            && !transitionStartedRef.current
          ) {
            transitionStartedRef.current = true
            setTransitioning(true)
          }
        }}
        playsInline
        poster={POSTER}
        preload="metadata"
        ref={videoRef}
      >
        <source src="/assets/video/eligibility-donor-720.webm" type="video/webm" />
        <source src="/assets/video/eligibility-donor-720.mp4" type="video/mp4" />
      </video>
      <span
        aria-hidden="true"
        className={`${styles.transitionStripes} ${transitioning ? styles.transitionStripesActive : ''}`}
      />
    </>
  )
}
