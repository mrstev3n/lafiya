import { HeartLine } from '../../components/brand/HeartLine.tsx'
import { ActionLink } from '../../components/ui/ActionLink.tsx'
import styles from './SiteFooter.module.css'

type SiteFooterProps = {
  projectNote?: string
  withCta?: boolean
}

export function SiteFooter({
  projectNote = '© 2026 Lafiya · Projet fictif du Figma to Code Challenge',
  withCta = true,
}: SiteFooterProps) {
  return (
    <section className={styles.section}>
      {withCta ? (
        <div className={styles.cta} data-signature-group>
          <img src="/assets/images/final-donor-v2.png" alt="Donneuse de sang béninoise pendant une collecte" />
          <div className={styles.overlay} />
          <div className={`${styles.shell} ${styles.content}`} data-motion-group data-motion-stagger>
            <h2 data-motion-item data-motion-origin="left">Chaque minute compte.<br />Chaque don aussi.</h2>
            <div data-motion-item data-motion-origin="bottom">
              <ActionLink href="/eligibilite">Vérifier mon éligibilité</ActionLink>
              <ActionLink href="/ou-donner" tone="light">Trouver où donner</ActionLink>
            </div>
          </div>
          <HeartLine className={styles.heartLine} variant="wave" />
        </div>
      ) : null}
      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.grid}`} data-motion-group data-motion-stagger>
          <div className={styles.brand} data-motion-item data-motion-origin="bottom">
            <a href="/">Lafiya<span>.</span></a>
            <p>Le don de sang volontaire au service de la vie.</p>
          </div>
          <nav aria-label="Découvrir" data-motion-item data-motion-origin="bottom">
            <strong>Découvrir</strong>
            <a href="/le-don">Le don</a>
            <a href="/ou-donner">Points de don</a>
            <a href="/temoignages">Témoignages</a>
          </nav>
          <nav aria-label="À propos" data-motion-item data-motion-origin="bottom">
            <strong>À propos</strong>
            <a href="/a-propos">Notre équipe</a>
            <a href="/comprendre">Transparence</a>
            <a href="/faq">Questions fréquentes</a>
          </nav>
          <div data-motion-item data-motion-origin="bottom">
            <strong>Nous contacter</strong>
            <a href="tel:+2290190000000">+229 01 90 00 00 00</a>
            <a href="mailto:bonjour@lafiya.bj">bonjour@lafiya.bj</a>
            <span>Cotonou, Bénin</span>
          </div>
        </div>
        <div className={`${styles.shell} ${styles.legal}`}>
          <p>{projectNote}</p>
          <nav aria-label="Informations légales">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/confidentialite">Confidentialité</a>
            <a href="/conditions-utilisation">Conditions d’utilisation</a>
          </nav>
        </div>
      </footer>
    </section>
  )
}
