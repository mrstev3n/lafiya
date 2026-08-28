import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ActionLink } from '../../components/ui/ActionLink.tsx'
import { Icon } from '../../components/ui/Icon.tsx'
import { navigationGroups } from './navigation.config.ts'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { pathname } = useLocation()
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [utilityVisible, setUtilityVisible] = useState(true)
  const headerRef = useRef<HTMLElement>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileCloseRef = useRef<HTMLButtonElement>(null)
  const previousScrollY = useRef(0)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const nextScrollY = window.scrollY
      const nextPinned = nextScrollY > 38
      const delta = nextScrollY - previousScrollY.current

      setPinned(nextPinned)
      if (!nextPinned) setUtilityVisible(true)
      else if (delta > 3) setUtilityVisible(false)
      else if (delta < -3) setUtilityVisible(true)

      previousScrollY.current = nextScrollY
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenGroup(null)
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenGroup(null)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      mobileCloseRef.current?.focus()
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobileMenu()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  function closeMobileMenu() {
    setMobileOpen(false)
    window.requestAnimationFrame(() => mobileTriggerRef.current?.focus())
  }

  function cancelScheduledClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  function scheduleClose() {
    cancelScheduledClose()
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120)
  }

  return (
    <header
      className={[styles.header, pathname !== '/' ? styles.onInterior : ''].filter(Boolean).join(' ')}
      onMouseEnter={cancelScheduledClose}
      onMouseLeave={scheduleClose}
      ref={headerRef}
    >
      <div
        className={[
          styles.utilityBar,
          pinned ? styles.utilityPinned : '',
          utilityVisible ? styles.utilityVisible : '',
        ].filter(Boolean).join(' ')}
      >
        <span />
        <nav aria-label="Accès rapides" className={styles.quickLinks}>
          <a href="/comprendre">Sources</a>
          <a href="/a-propos">À propos</a>
          <a href="/contact">Contact · +229 01 90 00 00 00</a>
        </nav>
      </div>

      <div className={[
        styles.mainBarWrap,
        pinned ? styles.pinned : '',
        pinned && utilityVisible ? styles.withUtility : '',
        openGroup ? styles.menuActive : '',
      ].filter(Boolean).join(' ')}>
        <div className={styles.mainBar}>
          <a className={styles.brand} href="/" aria-label="Lafiya, retour à l’accueil">
            Lafiya<span>.</span>
          </a>
          <nav className={styles.desktopNav} aria-label="Navigation principale">
            {navigationGroups.slice(0, 1).map((group) => (
              <button
                aria-controls={`menu-${group.id}`}
                aria-expanded={openGroup === group.id}
                className={styles.navDisclosure}
                key={group.id}
                onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                onFocus={() => setOpenGroup(group.id)}
                onMouseEnter={() => setOpenGroup(group.id)}
                type="button"
              >
                {group.label}<Icon name="chevron" width="1rem" />
              </button>
            ))}
            <a href="/ou-donner">Où donner</a>
            <a href="/temoignages">Témoignages</a>
            {navigationGroups.slice(1).map((group) => (
              <button
                aria-controls={`menu-${group.id}`}
                aria-expanded={openGroup === group.id}
                className={styles.navDisclosure}
                key={group.id}
                onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                onFocus={() => setOpenGroup(group.id)}
                onMouseEnter={() => setOpenGroup(group.id)}
                type="button"
              >
                {group.label}<Icon name="chevron" width="1rem" />
              </button>
            ))}
          </nav>
          <div className={styles.actions}>
            <ActionLink className={styles.desktopCta} href="/eligibilite">Vérifier mon éligibilité</ActionLink>
            <button
              aria-controls="menu-mobile"
              aria-expanded={mobileOpen}
              aria-label="Ouvrir le menu"
              className={styles.mobileTrigger}
              onClick={() => setMobileOpen(true)}
              ref={mobileTriggerRef}
              type="button"
            >
              <Icon name="menu" width="1.35rem" />
            </button>
          </div>
        </div>
      </div>

      {navigationGroups.map((group) => (
        <div
          className={[styles.megaMenu, pinned ? styles.megaPinned : ''].filter(Boolean).join(' ')}
          hidden={openGroup !== group.id}
          id={`menu-${group.id}`}
          key={group.id}
          onMouseLeave={scheduleClose}
          onMouseEnter={() => setOpenGroup(group.id)}
        >
          <div className={styles.megaIntro}><span>Explorer</span><p>{group.description}</p></div>
          <div className={styles.megaItems}>
            {group.items.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setOpenGroup(null)}>
                <strong>{item.label}</strong><span>{item.supportingText}</span>
              </a>
            ))}
          </div>
        </div>
      ))}

      <button
        aria-hidden="true"
        className={styles.mobileBackdrop}
        data-open={mobileOpen}
        onClick={closeMobileMenu}
        tabIndex={-1}
        type="button"
      />
      <aside
        aria-hidden={!mobileOpen}
        aria-label="Menu principal"
        className={styles.mobileDialog}
        data-open={mobileOpen}
        id="menu-mobile"
        inert={!mobileOpen}
        role="dialog"
      >
        <div className={styles.mobileDialogHeader}>
          <span className={styles.brand}>Lafiya<span>.</span></span>
          <button aria-label="Fermer le menu" className={styles.mobileClose} onClick={closeMobileMenu} ref={mobileCloseRef} type="button">
            <Icon name="close" width="1.4rem" />
          </button>
        </div>
        <nav aria-label="Navigation mobile" className={styles.mobileNav}>
          <a href="/le-don" onClick={closeMobileMenu}>Le don</a>
          <a href="/ou-donner" onClick={closeMobileMenu}>Où donner</a>
          <a href="/temoignages" onClick={closeMobileMenu}>Témoignages</a>
          <a href="/besoins" onClick={closeMobileMenu}>Besoins du moment</a>
          <a href="/faq" onClick={closeMobileMenu}>Questions fréquentes</a>
        </nav>
        <nav aria-label="Accès rapides mobiles" className={styles.mobileQuickLinks}>
          <span>Accès rapides</span>
          <a href="/comprendre" onClick={closeMobileMenu}>Sources</a>
          <a href="/a-propos" onClick={closeMobileMenu}>À propos</a>
          <a href="/contact" onClick={closeMobileMenu}>Contact · +229 01 90 00 00 00</a>
        </nav>
        <ActionLink href="/eligibilite" onClick={closeMobileMenu}>Vérifier mon éligibilité</ActionLink>
      </aside>
    </header>
  )
}
