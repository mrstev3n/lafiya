import { lazy, Suspense, useLayoutEffect, useState, type CSSProperties } from 'react'
import { HeartLine } from '../../components/brand/HeartLine.tsx'
import { ActionLink } from '../../components/ui/ActionLink.tsx'
import { Icon, type IconName } from '../../components/ui/Icon.tsx'
import { content, faq, reserves } from '../../data/catalogue.ts'
import { SiteFooter } from '../footer/SiteFooter.tsx'
import { LocationsExplorer } from '../locations/LocationsExplorer.tsx'
import { EligibilityVideo } from './EligibilityVideo.tsx'
import styles from './HomePage.module.css'
import type { HeroTuning } from './heroTuning.ts'

const HeroDialKitTuner = import.meta.env.DEV && import.meta.env.MODE !== 'test'
  ? lazy(() => import('./HeroDialKitTuner.tsx'))
  : null

const journeySteps: Array<{ title: string; text: string; image: string }> = [
  { title: 'Accueil', text: 'Quelques repères pour commencer.', image: '/assets/images/journey-welcome.png' },
  { title: 'Entretien', text: 'Un échange confidentiel.', image: '/assets/images/journey-interview.png' },
  { title: 'Prélèvement', text: 'Le don, accompagné par l’équipe.', image: '/assets/images/journey-donation-v4.png' },
  { title: 'Pause', text: 'Un temps calme pour récupérer.', image: '/assets/images/journey-rest-v4.png' },
  { title: 'Retour', text: 'Des conseils simples pour la suite.', image: '/assets/images/journey-return-v4.png' },
]

const preparationTips: Array<{ title: string; text: string; icon: IconName }> = [
  { title: 'Dormez suffisamment', text: 'Prévoyez une nuit reposante la veille.', icon: 'clock' },
  { title: 'Buvez de l’eau', text: 'Hydratez-vous avant et après le don.', icon: 'droplet' },
  { title: 'Mangez léger', text: 'Évitez de venir à jeun.', icon: 'heart' },
]

const testimonials = [
  {
    image: '/assets/images/testimonial-first-donor-v2.png',
    eyebrow: 'Première expérience',
    title: 'Est-ce que ça fait mal ?',
  },
  {
    image: '/assets/images/testimonial-returning-donor-v2.png',
    eyebrow: 'Après une pause',
    title: 'Reprendre sans appréhension.',
  },
  {
    image: '/assets/images/testimonial-regular-donor-v2.png',
    eyebrow: 'Don régulier',
    title: 'Pourquoi je reviens donner.',
  },
  {
    image: '/assets/images/testimonial-young-donor-v2.png',
    eyebrow: 'Jeune donneur',
    title: 'Le déclic pour se lancer.',
  },
]

const teamProfiles = [
  { image: '/assets/images/team-medical-director-v2.png', role: 'Référente médicale', profile: 'Médecin spécialiste en santé publique' },
  { image: '/assets/images/team-collection-coordinator-v2.png', role: 'Coordination des collectes', profile: 'Pilotage des campagnes et partenaires' },
  { image: '/assets/images/team-field-coordinator-v2.png', role: 'Mobilisation terrain', profile: 'Animation communautaire et proximité' },
  { image: '/assets/images/team-communications-v2.png', role: 'Information et contenus', profile: 'Pédagogie, médias et expérience éditoriale' },
  { image: '/assets/images/team-logistics-v2.png', role: 'Logistique', profile: 'Organisation des équipes et du matériel' },
]

function colorWithAlpha(hex: string, alpha: number) {
  const normalized = hex.replace('#', '')
  const expanded = normalized.length === 3
    ? normalized.split('').map((character) => character.repeat(2)).join('')
    : normalized.slice(0, 6)
  const numeric = Number.parseInt(expanded, 16)
  if (!Number.isFinite(numeric)) return `rgb(0 14 32 / ${alpha})`
  return `rgb(${(numeric >> 16) & 255} ${(numeric >> 8) & 255} ${numeric & 255} / ${alpha})`
}

function reserveLabel(label: string) {
  return label.replace(/\s+—\s+démonstration$/i, '')
}

export function HomePage() {
  const [heroTuning, setHeroTuning] = useState<HeroTuning | null>(null)
  const heroStyle = import.meta.env.DEV && heroTuning ? {
    '--hero-scale': heroTuning.photo.scale,
    '--hero-x': `${heroTuning.photo.x}%`,
    '--hero-y': `${heroTuning.photo.y}%`,
    '--hero-shade-start': colorWithAlpha(heroTuning.shade.startColor, heroTuning.shade.startOpacity),
    '--hero-shade-solid-end': `${heroTuning.shade.solidEnd}%`,
    '--hero-shade-mid': colorWithAlpha(heroTuning.shade.midColor, heroTuning.shade.midOpacity),
    '--hero-shade-mid-position': `${heroTuning.shade.midPosition}%`,
    '--hero-shade-soft': colorWithAlpha(heroTuning.shade.softColor, heroTuning.shade.softOpacity),
    '--hero-shade-soft-position': `${heroTuning.shade.softPosition}%`,
    '--hero-shade-end': `${heroTuning.shade.end}%`,
    '--hero-content-x': `${heroTuning.composition.x}px`,
    '--hero-content-y': `${heroTuning.composition.y}px`,
    '--hero-signature-x': `${heroTuning.signature.x}px`,
    '--hero-signature-y': `${heroTuning.signature.y}px`,
    '--signature-stroke': heroTuning.signature.stroke,
    '--hero-tablet-scale': heroTuning.tablet.photoScale,
    '--hero-tablet-x': `${heroTuning.tablet.photoX}%`,
    '--hero-tablet-y': `${heroTuning.tablet.photoY}%`,
    '--hero-tablet-shade-start': colorWithAlpha(heroTuning.tablet.shadeColor, heroTuning.tablet.shadeStartOpacity),
    '--hero-tablet-shade-end': colorWithAlpha(heroTuning.tablet.shadeColor, heroTuning.tablet.shadeEndOpacity),
    '--hero-tablet-content-x': `${heroTuning.tablet.compositionX}px`,
    '--hero-tablet-content-y': `${heroTuning.tablet.compositionY}px`,
    '--hero-tablet-signature-x': `${heroTuning.tablet.signatureX}px`,
    '--hero-tablet-signature-y': `${heroTuning.tablet.signatureY}px`,
    '--hero-tablet-signature-stroke': heroTuning.tablet.signatureStroke,
    '--hero-mobile-scale': heroTuning.mobile.photoScale,
    '--hero-mobile-x': `${heroTuning.mobile.photoX}%`,
    '--hero-mobile-y': `${heroTuning.mobile.photoY}%`,
    '--hero-mobile-shade-start': colorWithAlpha(heroTuning.mobile.shadeColor, heroTuning.mobile.shadeStartOpacity),
    '--hero-mobile-shade-end': colorWithAlpha(heroTuning.mobile.shadeColor, heroTuning.mobile.shadeEndOpacity),
    '--hero-content-mobile-x': `${heroTuning.mobile.compositionX}px`,
    '--hero-content-mobile-y': `${heroTuning.mobile.compositionY}px`,
    '--hero-signature-mobile-x': `${heroTuning.mobile.signatureX}px`,
    '--hero-signature-mobile-top': `${heroTuning.mobile.signatureY}px`,
    '--signature-stroke-mobile': heroTuning.mobile.signatureStroke,
  } as CSSProperties : undefined

  useLayoutEffect(() => {
    const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-motion-group], [data-signature-group]'))
    if (!groups.length) return

    const prefersReducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      groups.forEach((group) => { group.dataset.motionState = 'visible' })
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const group = entry.target as HTMLElement
        group.dataset.motionState = 'visible'
        observer.unobserve(group)
      })
    }, { rootMargin: '0px 0px -10%', threshold: 0.16 })

    groups.forEach((group) => {
      group.dataset.motionReady = 'true'
      observer.observe(group)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <main id="contenu">
      <section className={styles.hero} data-section="01" id="accueil" style={heroStyle}>
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.heroContent}>
            <h1>
              <span className={styles.heroTitleLine}>Un don.</span>
              <span className={styles.heroTitleLine}><em>Un lien vital.</em></span>
            </h1>
            <p>Faites un don volontaire de sang dans votre région, et sauvez des vies</p>
            <div className={styles.heroActions}>
              <ActionLink href="/eligibilite">Vérifier mon éligibilité</ActionLink>
              <ActionLink href="/ou-donner" tone="light">
                Trouver où donner
              </ActionLink>
            </div>
          </div>
        </div>
        <HeartLine className={styles.heroHeartLine} />
      </section>
      {HeroDialKitTuner ? (
        <Suspense fallback={null}>
          <HeroDialKitTuner onChange={setHeroTuning} />
        </Suspense>
      ) : null}

      <section aria-label="Donner simplement" className={styles.quickJourney} data-section="02">
        <div className={styles.quickJourneyInner} data-motion-group data-motion-stagger>
          <article data-motion-item data-motion-origin="right">
            <span>01</span>
            <Icon name="shield" />
            <div><strong>Vérifier</strong><p>Découvrez si vous pouvez donner.</p></div>
          </article>
          <article data-motion-item data-motion-origin="right">
            <span>02</span>
            <Icon name="pin" />
            <div><strong>Choisir</strong><p>Trouvez un point de don proche.</p></div>
          </article>
          <article data-motion-item data-motion-origin="right">
            <span>03</span>
            <Icon name="calendar" />
            <div><strong>Préparer</strong><p>Suivez nos conseils avant de venir.</p></div>
          </article>
        </div>
      </section>

      <section className={styles.impact} data-section="03" id="pourquoi-donner">
        <div className={`${styles.shell} ${styles.impactGrid}`} data-motion-group data-motion-stagger>
          <div className={styles.impactIntro} data-motion-item data-motion-origin="left">
            <p className={styles.eyebrowLight}>Pourquoi donner aujourd’hui ?</p>
            <h2>Votre don,<br />sauve des vies.</h2>
            <a href="/comprendre">Voir nos sources <Icon name="arrow" width="1rem" /></a>
          </div>
          <a className={styles.impactFact} data-motion-item data-motion-origin="bottom" href="https://www.ants.bj/pourquoi_donner_sang">
            <strong>3 min</strong>
            <span>La fréquence de poche de sang demandée au Bénin.</span>
          </a>
          <a className={styles.impactFact} data-motion-item data-motion-origin="bottom" href="https://www.ants.bj/news_detail/6">
            <strong>118 010</strong>
            <span>Poches collectées au Bénin en 2025.</span>
          </a>
          <a
            className={styles.impactFact}
            data-motion-item
            data-motion-origin="bottom"
            href="https://www.afro.who.int/sites/default/files/2025-08/AFR-RC75-7%20Framework%20to%20advance%20universal%20access%20to%20blood%20products.pdf"
          >
            <strong>5,2 / 1 000</strong>
            <span>Dons dans la Région africaine en 2022.</span>
          </a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.eligibility}`} data-section="04" id="eligibilite">
        <div className={`${styles.shell} ${styles.eligibilityGrid}`} data-motion-group data-motion-stagger>
          <div className={styles.eligibilityCopy} data-motion-item data-motion-origin="left">
            <p className={styles.eyebrow}>Puis-je donner ?</p>
            <h2>En deux minutes vous pouvez être situé.</h2>
            <p>Quelques questions simples vous orientent avant le déplacement. L’entretien médical sur place reste l’étape qui confirme l’aptitude.</p>
            <ActionLink href="/eligibilite">Commencer le test</ActionLink>
          </div>
          <figure className={styles.eligibilityMedia} data-motion-item data-motion-origin="right">
            <EligibilityVideo />
            <figcaption><Icon name="heart" /> Un premier pas, sans pression.</figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.locations}`} data-section="05" id="points-de-don">
        <LocationsExplorer
          heading={<h2>Où donner<br />près de chez vous.</h2>}
          intro="Repérez un point de don et préparez votre déplacement."
        />
      </section>

      <section className={`${styles.section} ${styles.journey}`} data-section="06" id="parcours">
        <div className={styles.shell}>
          <div className={styles.sectionHeading} data-motion-group>
            <div data-motion-item data-motion-origin="left">
            <p className={styles.eyebrow}>Le jour du don</p>
            <h2>Un parcours simple, accompagné de bout en bout.</h2>
            </div>
          </div>
          <div className={styles.journeySteps} data-motion-group data-motion-stagger>
            {journeySteps.map((step) => (
              <article data-motion-item data-motion-origin="bottom" key={step.title}>
                <img src={step.image} alt="" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.preparation} data-motion-group data-motion-stagger id="preparation">
            <div data-motion-item data-motion-origin="left">
              <p className={styles.eyebrow}>Avant de venir</p>
              <h3>Trois réflexes utiles.</h3>
            </div>
            {preparationTips.map((tip) => (
              <article data-motion-item data-motion-origin="right" key={tip.title}>
                <Icon name={tip.icon} />
                <div><strong>{tip.title}</strong><p>{tip.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reserves}`} data-section="07" id="besoins">
        <div className={styles.shell}>
          <div className={styles.reservesHeader} data-motion-group data-motion-stagger>
            <div data-motion-item data-motion-origin="left">
              <h2>Chaque groupe compte.</h2>
            </div>
            <p data-motion-item data-motion-origin="fade">{content.datasetLabel}</p>
          </div>
          <div className={styles.reserveGrid} data-motion-group data-motion-stagger>
            {reserves.map((reserve) => (
              <article className={styles.reserve} data-level={reserve.level} data-motion-item data-motion-origin="fade" key={reserve.bloodGroup}>
                <strong>{reserve.bloodGroup}</strong>
                <span>{reserveLabel(reserve.label)}</span>
              </article>
            ))}
            <aside className={styles.didYouKnow} data-motion-item data-motion-origin="left">
              <Icon name="droplet" />
              <div><span>Le saviez-vous ?</span><p>Le sang ne se fabrique pas. Un don volontaire peut faire la différence.</p></div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonials}`} data-section="08" id="temoignages">
        <div className={styles.shell}>
          <div className={styles.sectionHeadingLight} data-motion-group>
            <div data-motion-item data-motion-origin="left">
            <h2>Ils ont donné. Ils racontent.</h2>
            <p>Ces emplacements accueilleront les témoignages vidéo de donneuses et donneurs.</p>
            </div>
          </div>
          <div className={styles.testimonialGrid} data-motion-group data-motion-stagger>
            {testimonials.map((testimonial) => (
              <article className={styles.testimonial} data-motion-item data-motion-origin="bottom" key={testimonial.title}>
                <img src={testimonial.image} alt="" />
                <div className={styles.testimonialShade} />
                <span className={styles.play} aria-hidden="true">▶</span>
                <div className={styles.testimonialCopy}>
                  <span>{testimonial.eyebrow}</span>
                  <h3>{testimonial.title}</h3>
                  <p>Témoignage à venir</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.team}`} data-section="09" id="a-propos">
        <div className={styles.shell}>
          <div className={styles.sectionHeading} data-motion-group>
            <div data-motion-item data-motion-origin="left">
            <p className={styles.eyebrow}>Derrière Lafiya</p>
            <h2>Une initiative portée par des expertises complémentaires.</h2>
            </div>
          </div>
          <div className={styles.teamGrid} data-motion-group data-motion-stagger>
            {teamProfiles.map((profile) => (
              <article data-motion-item data-motion-origin="bottom" key={profile.role}>
                <img src={profile.image} alt="" />
                <h3>{profile.role}</h3>
                <p>{profile.profile}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faq}`} data-section="10" id="faq">
        <div className={`${styles.shell} ${styles.faqGrid}`} data-motion-group data-motion-stagger>
          <div className={styles.faqIntro} data-motion-item data-motion-origin="left">
            <p className={styles.eyebrow}>Questions fréquentes</p>
            <h2>Ce qu’il faut savoir avant de se décider.</h2>
            <p>Une réponse courte aux interrogations les plus courantes.</p>
          </div>
          <div className={styles.faqList} data-motion-item data-motion-origin="right">
            {faq.map((item) => (
              <details id={item.id} key={item.id} name="faq-accueil">
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
