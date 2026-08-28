import { lazy, Suspense, useState, type CSSProperties } from 'react'
import { HeartLine } from '../../components/brand/HeartLine.tsx'
import { ActionLink } from '../../components/ui/ActionLink.tsx'
import { Icon, type IconName } from '../../components/ui/Icon.tsx'
import { content, faq, reserves } from '../../data/catalogue.ts'
import { SiteFooter } from '../footer/SiteFooter.tsx'
import { LocationsExplorer } from '../locations/LocationsExplorer.tsx'
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

  const red = (numeric >> 16) & 255
  const green = (numeric >> 8) & 255
  const blue = numeric & 255
  return `rgb(${red} ${green} ${blue} / ${alpha})`
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
  } as CSSProperties : undefined

  return (
    <main id="contenu">
      <section className={styles.hero} data-section="01" id="accueil" style={heroStyle}>
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.heroContent}>
            <h1>
              Un don.<br />
              <em>Un lien vital.</em>
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
        <div className={styles.quickJourneyInner}>
          <article>
            <span>01</span>
            <Icon name="shield" />
            <div><strong>Vérifier</strong><p>Découvrez si vous pouvez donner.</p></div>
          </article>
          <article>
            <span>02</span>
            <Icon name="pin" />
            <div><strong>Choisir</strong><p>Trouvez un point de don proche.</p></div>
          </article>
          <article>
            <span>03</span>
            <Icon name="calendar" />
            <div><strong>Préparer</strong><p>Suivez nos conseils avant de venir.</p></div>
          </article>
        </div>
      </section>

      <section className={styles.impact} data-section="03" id="pourquoi-donner">
        <div className={`${styles.shell} ${styles.impactGrid}`}>
          <div className={styles.impactIntro}>
            <p className={styles.eyebrowLight}>Pourquoi donner aujourd’hui ?</p>
            <h2>Votre don,<br />sauve des vies.</h2>
            <a href="/comprendre">Voir nos sources <Icon name="arrow" width="1rem" /></a>
          </div>
          <a className={styles.impactFact} href="https://www.ants.bj/pourquoi_donner_sang">
            <strong>3 min</strong>
            <span>La fréquence de poche de sang demandée au Bénin.</span>
          </a>
          <a className={styles.impactFact} href="https://www.ants.bj/news_detail/6">
            <strong>118 010</strong>
            <span>Poches collectées au Bénin en 2025.</span>
          </a>
          <a
            className={styles.impactFact}
            href="https://www.afro.who.int/sites/default/files/2025-08/AFR-RC75-7%20Framework%20to%20advance%20universal%20access%20to%20blood%20products.pdf"
          >
            <strong>5,2 / 1 000</strong>
            <span>Dons dans la Région africaine en 2022.</span>
          </a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.eligibility}`} data-section="04" id="eligibilite">
        <div className={`${styles.shell} ${styles.eligibilityGrid}`}>
          <div className={styles.eligibilityCopy}>
            <p className={styles.eyebrow}>Puis-je donner ?</p>
            <h2>En deux minutes vous pouvez être situé.</h2>
            <p>Quelques questions simples vous orientent avant le déplacement. L’entretien médical sur place reste l’étape qui confirme l’aptitude.</p>
            <ActionLink href="/eligibilite">Commencer le test</ActionLink>
          </div>
          <figure className={styles.eligibilityMedia}>
            <img src="/assets/images/eligibility-portrait-v2.png" alt="Portrait souriant d’une jeune femme béninoise" />
            <figcaption><Icon name="heart" /> Un premier pas, sans pression.</figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.locations}`} data-section="05" id="points-de-don">
        <div className={`${styles.shell} ${styles.locationsHeader}`}>
          <div>
            <p className={styles.eyebrow}>Points de don</p>
            <h2>Où donner près de chez vous ?</h2>
          </div>
        </div>
        <div className={`${styles.shell} ${styles.locationsGrid}`}><LocationsExplorer /></div>
      </section>

      <section className={`${styles.section} ${styles.journey}`} data-section="06" id="parcours">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Le jour du don</p>
            <h2>Un parcours simple, accompagné de bout en bout.</h2>
          </div>
          <div className={styles.journeySteps}>
            {journeySteps.map((step) => (
              <article key={step.title}>
                <img src={step.image} alt="" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.preparation} id="preparation">
            <div>
              <p className={styles.eyebrow}>Avant de venir</p>
              <h3>Trois réflexes utiles.</h3>
            </div>
            {preparationTips.map((tip) => (
              <article key={tip.title}>
                <Icon name={tip.icon} />
                <div><strong>{tip.title}</strong><p>{tip.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reserves}`} data-section="07" id="besoins">
        <div className={styles.shell}>
          <div className={styles.reservesHeader}>
            <div>
              <h2>Chaque groupe compte.</h2>
            </div>
            <p>{content.datasetLabel}</p>
          </div>
          <div className={styles.reserveGrid}>
            {reserves.map((reserve) => (
              <article className={styles.reserve} data-level={reserve.level} key={reserve.bloodGroup}>
                <strong>{reserve.bloodGroup}</strong>
                <span>{reserveLabel(reserve.label)}</span>
              </article>
            ))}
            <aside className={styles.didYouKnow}>
              <Icon name="droplet" />
              <div><span>Le saviez-vous ?</span><p>Le sang ne se fabrique pas. Un don volontaire peut faire la différence.</p></div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonials}`} data-section="08" id="temoignages">
        <div className={styles.shell}>
          <div className={styles.sectionHeadingLight}>
            <h2>Ils ont donné. Ils racontent.</h2>
            <p>Ces emplacements accueilleront les témoignages vidéo de donneuses et donneurs.</p>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article className={styles.testimonial} key={testimonial.title}>
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
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Derrière Lafiya</p>
            <h2>Une initiative portée par des expertises complémentaires.</h2>
          </div>
          <div className={styles.teamGrid}>
            {teamProfiles.map((profile) => (
              <article key={profile.role}>
                <img src={profile.image} alt="" />
                <h3>{profile.role}</h3>
                <p>{profile.profile}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faq}`} data-section="10" id="faq">
        <div className={`${styles.shell} ${styles.faqGrid}`}>
          <div className={styles.faqIntro}>
            <p className={styles.eyebrow}>Questions fréquentes</p>
            <h2>Ce qu’il faut savoir avant de se décider.</h2>
            <p>Une réponse courte aux interrogations les plus courantes.</p>
          </div>
          <div className={styles.faqList}>
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
