import { SiteFooter } from '../footer/SiteFooter.tsx'
import { EligibilityFlow } from './EligibilityFlow.tsx'
import styles from './EligibilityPage.module.css'

export function EligibilityPage() {
  return (
    <main className={styles.page} id="contenu">
      <header className={styles.intro}>
        <div className={styles.shell}>
          <div>
            <p className={styles.eyebrow}>Avant de donner</p>
            <h1>Faisons le point, simplement.</h1>
          </div>
          <div className={styles.introCopy}>
            <p>Trois repères vous aident à préparer la suite : votre âge, votre poids et la date de votre dernier don.</p>
            <span>Vos réponses ne sont ni enregistrées ni transmises.</span>
          </div>
        </div>
      </header>
      <section aria-label="Questionnaire d’orientation" className={`${styles.shell} ${styles.flowSection}`}>
        <EligibilityFlow />
      </section>
      <SiteFooter
        projectNote="© 2026 Lafiya · Information et orientation avant le don"
        withCta={false}
      />
    </main>
  )
}
