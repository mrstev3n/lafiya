export type NavigationGroup = {
  id: string
  label: string
  description: string
  items: Array<{ label: string; href: string; supportingText: string }>
}

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'don',
    label: 'Le don',
    description: 'Comprendre et préparer chaque étape.',
    items: [
      {
        label: 'Pourquoi donner',
        href: '/le-don',
        supportingText: 'Mesurer l’utilité concrète de chaque don.',
      },
      {
        label: 'Le parcours',
        href: '/le-don/parcours',
        supportingText: 'Voir comment se déroule une collecte.',
      },
      {
        label: 'Se préparer',
        href: '/le-don/preparation',
        supportingText: 'Retrouver les réflexes utiles avant de venir.',
      },
    ],
  },
  {
    id: 'comprendre',
    label: 'Comprendre',
    description: 'Des repères simples pour décider sereinement.',
    items: [
      {
        label: 'Besoins du moment',
        href: '/besoins',
        supportingText: 'Consulter les niveaux de réserve et leur mise à jour.',
      },
      {
        label: 'Ils racontent',
        href: '/temoignages',
        supportingText: 'Écouter les expériences des donneuses et donneurs.',
      },
      {
        label: 'Questions fréquentes',
        href: '/faq',
        supportingText: 'Lever les interrogations les plus courantes.',
      },
    ],
  },
]
