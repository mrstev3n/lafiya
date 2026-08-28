import { ActionLink } from '../../components/ui/ActionLink.tsx'
import { faq, reserves } from '../../data/catalogue.ts'
import { SiteFooter } from '../footer/SiteFooter.tsx'
import { LocationsExplorer } from '../locations/LocationsExplorer.tsx'
import styles from './SitePages.module.css'

type PageSection = { title: string; text: string }

const pageContent: Record<string, { eyebrow: string; title: string; intro: string; sections: PageSection[] }> = {
  don: {
    eyebrow: 'Comprendre le don',
    title: 'Un geste simple, une utilité immédiate.',
    intro: 'Le don de sang suit un parcours encadré, de l’accueil au temps de repos. Voici les repères essentiels avant de vous décider.',
    sections: [
      { title: 'Pourquoi donner', text: 'Les produits sanguins sont indispensables aux urgences, aux interventions et à de nombreux traitements. Ils ne peuvent pas être fabriqués artificiellement.' },
      { title: 'Un parcours accompagné', text: 'Accueil, entretien confidentiel, prélèvement et collation : chaque étape est guidée par une équipe de santé.' },
      { title: 'Un temps court', text: 'Le prélèvement lui-même est bref. Prévoyez surtout du temps pour l’entretien et la récupération.' },
    ],
  },
  parcours: {
    eyebrow: 'Le jour du don', title: 'Votre parcours, étape par étape.',
    intro: 'Vous savez où vous allez et ce qui vous attend, depuis votre arrivée jusqu’à votre retour.',
    sections: [
      { title: 'Accueil', text: 'L’équipe vous reçoit, vérifie les premiers éléments et vous explique le déroulement.' },
      { title: 'Entretien', text: 'Un professionnel de santé échange avec vous en toute confidentialité.' },
      { title: 'Prélèvement et pause', text: 'Le don est surveillé, puis une collation et un temps de repos vous sont proposés.' },
    ],
  },
  preparation: {
    eyebrow: 'Avant de venir', title: 'Trois réflexes pour arriver sereinement.',
    intro: 'Une bonne préparation contribue à rendre l’expérience plus confortable.',
    sections: [
      { title: 'Dormez suffisamment', text: 'Prévoyez une nuit reposante la veille du don.' },
      { title: 'Hydratez-vous', text: 'Buvez régulièrement avant votre déplacement et après le prélèvement.' },
      { title: 'Mangez normalement', text: 'Ne venez pas à jeun. Préférez un repas léger et équilibré.' },
    ],
  },
  temoignages: {
    eyebrow: 'Ils racontent', title: 'Les questions que l’on se pose, racontées par ceux qui ont donné.',
    intro: 'Cette page accueillera des capsules vidéo réelles : première expérience, douleur ressentie, retour après une pause et raisons de revenir.',
    sections: [
      { title: 'Première fois', text: 'Un témoignage pour comprendre comment se passe l’arrivée et ce qui rassure au premier don.' },
      { title: 'La sensation', text: 'Une réponse directe aux inquiétudes autour de l’aiguille, de la douleur et du temps de récupération.' },
      { title: 'Pourquoi revenir', text: 'Des donneurs réguliers expliquent ce qui les motive et comment ils intègrent ce geste à leur quotidien.' },
    ],
  },
  comprendre: {
    eyebrow: 'Repères et sources', title: 'Comprendre avant d’agir.',
    intro: 'Lafiya rassemble des informations utiles, relie les données à leurs sources et rappelle quand elles ont été mises à jour.',
    sections: [
      { title: 'Lieux de don', text: 'Les structures affichées proviennent de la carte publique des lieux de don de l’ANTS.' },
      { title: 'Éligibilité', text: 'Le test donne une orientation. Seul l’entretien avec un professionnel confirme l’aptitude au don.' },
      { title: 'Données évolutives', text: 'Les réserves et disponibilités sont conçues pour être alimentées par une source administrée et horodatée.' },
    ],
  },
  apropos: {
    eyebrow: 'Derrière Lafiya', title: 'Une initiative pensée autour du passage à l’action.',
    intro: 'Le produit réunit expertise médicale, coordination des collectes, mobilisation terrain, information et logistique.',
    sections: [
      { title: 'Référence médicale', text: 'Garantir la justesse des informations de santé et des parcours proposés.' },
      { title: 'Mobilisation', text: 'Relier les besoins, les collectivités et les futurs donneurs.' },
      { title: 'Produit et contenus', text: 'Transformer une information complexe en décisions simples et accessibles.' },
    ],
  },
  contact: {
    eyebrow: 'Nous contacter', title: 'Une question avant de vous déplacer ?',
    intro: 'L’équipe Lafiya vous oriente vers les bons interlocuteurs et les informations utiles.',
    sections: [
      { title: 'Téléphone', text: '+229 01 90 00 00 00' },
      { title: 'Courriel', text: 'bonjour@lafiya.bj' },
      { title: 'Localisation', text: 'Cotonou, Bénin' },
    ],
  },
}

export function ContentPage({ page }: { page: keyof typeof pageContent }) {
  const content = pageContent[page]
  return (
    <main id="contenu" className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.shell}>
          <p>{content.eyebrow}</p><h1>{content.title}</h1><span>{content.intro}</span>
        </div>
      </header>
      <section className={`${styles.shell} ${styles.cards}`}>
        {content.sections.map((section) => <article key={section.title}><h2>{section.title}</h2><p>{section.text}</p></article>)}
      </section>
      <section className={`${styles.shell} ${styles.pageCta}`}>
        <h2>Prêt à faire le premier pas ?</h2>
        <div><ActionLink href="/eligibilite">Vérifier mon éligibilité</ActionLink><ActionLink href="/ou-donner" tone="secondary">Trouver où donner</ActionLink></div>
      </section>
      <SiteFooter withCta={false} />
    </main>
  )
}

export function DonationLocationsPage() {
  return (
    <main id="contenu" className={styles.page}>
      <header className={styles.hero}><div className={styles.shell}><p>Points de don</p><h1>Trouver où donner.</h1><span>Choisissez votre ville, consultez les structures officielles et explorez la carte.</span></div></header>
      <section className={`${styles.shell} ${styles.explorer}`}><LocationsExplorer /></section>
      <SiteFooter />
    </main>
  )
}

export function NeedsPage() {
  return (
    <main id="contenu" className={styles.page}>
      <header className={styles.hero}><div className={styles.shell}><p>Besoins du moment</p><h1>Chaque groupe compte.</h1><span>Une lecture rapide des niveaux de réserve, conçue pour évoluer avec les données disponibles.</span></div></header>
      <section className={`${styles.shell} ${styles.reserveGrid}`}>
        {reserves.map((item) => <article data-level={item.level} key={item.bloodGroup}><strong>{item.bloodGroup}</strong><span>{item.label.replace(/\s+—\s+démonstration$/i, '')}</span></article>)}
      </section>
      <SiteFooter />
    </main>
  )
}

export function FaqPage() {
  return (
    <main id="contenu" className={styles.page}>
      <header className={styles.hero}><div className={styles.shell}><p>Questions fréquentes</p><h1>Des réponses simples avant de décider.</h1></div></header>
      <section className={`${styles.shell} ${styles.faq}`}>
        {faq.map((item) => <details key={item.id}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
      </section>
      <SiteFooter />
    </main>
  )
}

export function EligibilityPage() {
  return (
    <main id="contenu" className={styles.page}>
      <header className={styles.hero}><div className={styles.shell}><p>Test d’éligibilité</p><h1>Une réponse utile, quelle que soit votre situation.</h1><span>Le parcours explique le résultat, valorise votre démarche et vous indique quand ou comment poursuivre.</span></div></header>
      <section className={`${styles.shell} ${styles.cards}`}>
        <article><h2>Vous pouvez probablement donner</h2><p>Nous vous indiquons le prochain point de don. L’entretien médical sur place reste la confirmation finale.</p></article>
        <article><h2>Il faut patienter</h2><p>Nous expliquons précisément le délai et calculons la date à laquelle vous pourrez réessayer.</p></article>
        <article><h2>Ce n’est pas possible aujourd’hui</h2><p>Votre intention compte. Vous recevez une explication claire et d’autres façons de soutenir le don volontaire.</p></article>
      </section>
      <SiteFooter />
    </main>
  )
}

const legalContent = {
  mentions: { title: 'Mentions légales', sections: [
    ['Nature du projet', 'Lafiya est un projet fictif réalisé dans le cadre du Figma to Code Challenge. Il ne constitue pas un service officiel de santé.'],
    ['Édition', 'Le prototype est édité sous le nom Lafiya pour démontrer une expérience numérique autour du don de sang au Bénin.'],
    ['Sources', 'Les lieux de don affichés sont issus de la publication publique de l’Agence nationale pour la transfusion sanguine.'],
  ] },
  confidentialite: { title: 'Politique de confidentialité', sections: [
    ['Données du test', 'La version présentée n’enregistre aucune réponse au test d’éligibilité et ne transmet aucune donnée de santé.'],
    ['Mesure d’audience', 'Aucun outil de suivi publicitaire n’est activé dans ce prototype.'],
    ['Évolution prévue', 'Toute version connectée devra définir une durée de conservation, une base légale et des droits d’accès explicites.'],
  ] },
  conditions: { title: 'Conditions d’utilisation', sections: [
    ['Information générale', 'Les contenus facilitent l’orientation et ne remplacent jamais un avis ou un entretien médical.'],
    ['Données évolutives', 'Les lieux, horaires et niveaux de réserve doivent être confirmés auprès des structures concernées.'],
    ['Disponibilité', 'Le prototype peut évoluer sans préavis pendant le challenge.'],
  ] },
} as const

export function LegalPage({ type }: { type: keyof typeof legalContent }) {
  const content = legalContent[type]
  return (
    <main id="contenu" className={styles.page}>
      <header className={styles.hero}><div className={styles.shell}><p>Informations</p><h1>{content.title}</h1><span>Dernière mise à jour : 28 août 2026</span></div></header>
      <section className={`${styles.shell} ${styles.legalContent}`}>
        {content.sections.map(([title, text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}
      </section>
      <SiteFooter withCta={false} />
    </main>
  )
}

export function NotFoundPage() {
  return <main id="contenu" className={styles.page}><header className={styles.hero}><div className={styles.shell}><p>Erreur 404</p><h1>Cette page n’existe pas.</h1><ActionLink href="/">Revenir à l’accueil</ActionLink></div></header><SiteFooter withCta={false} /></main>
}
