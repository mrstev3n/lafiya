# Git workflow

Purpose: maintenir une progression lisible entre travail actif, future version stable et version stable de Lafiya.

Last reviewed: 2026-08-23

## Hiérarchie

```text
branche de tâche → dev → upcoming → main
```

| Branche | Rôle | État attendu | Reçoit normalement |
| --- | --- | --- | --- |
| `main` | Version stable | Livrable validé et publiable | Promotions depuis `upcoming` |
| `upcoming` | Prochaine version stable | Fonctionnalités retenues, en stabilisation | Promotions depuis `dev` et correctifs de stabilisation |
| `dev` | Intégration générale | Construction courante cohérente | Branches de tâche revues |
| `<type>/<description>` | Travail borné | Une tâche structurante et vérifiable | Création depuis la branche de base appropriée |

La stabilité décrit ici le niveau de validation dans Git. Elle ne prouve ni déploiement, ni publication, ni disponibilité publique.

## Flux normal

1. Mettre `dev` à jour localement.
2. Créer une branche de tâche depuis `dev`.
3. Produire des commits cohérents et indépendamment révisables.
4. Vérifier le diff complet et les contrôles proportionnés au changement.
5. Intégrer la branche de tâche dans `dev` après revue favorable.
6. Promouvoir un jalon cohérent de `dev` vers `upcoming`.
7. Stabiliser `upcoming`, sans y ajouter de nouveau périmètre.
8. Promouvoir `upcoming` vers `main` lorsque le jalon est accepté comme version stable.

Les commits directs sur `main`, `upcoming` et `dev` sont interdits par convention, sauf autorisation humaine explicite et cas documenté.

## Nommage des branches de tâche

Utiliser `<type>/<description-courte>` en ASCII, kebab-case et trois à six mots lorsque possible.

| Préfixe | Usage |
| --- | --- |
| `feat/` | Nouvelle fonctionnalité ou nouveau parcours |
| `fix/` | Correction d’un comportement cassé |
| `ref/` | Restructuration sans changement fonctionnel |
| `docs/` | Documentation uniquement |
| `style/` | Présentation ou formatage sans logique |
| `test/` | Tests uniquement |
| `build/` | Build ou dépendances de construction |
| `ci/` | Automatisation CI/CD |
| `meta/` | Métadonnées et organisation du dépôt |
| `chore/` | Maintenance générale |

Exemples :

- `feat/eligibility-flow`
- `feat/donation-point-locator`
- `ref/content-architecture`
- `docs/finalize-challenge-readme`
- `meta/establish-branch-workflow`

## Stabilisation et correctifs

- Un défaut trouvé dans `upcoming` se corrige sur une branche `fix/*` créée depuis `upcoming`.
- Après validation, le correctif rejoint `upcoming`, puis est réintégré dans `dev` afin d’éviter une divergence.
- Un correctif urgent de la version stable se crée depuis `main`, rejoint `main` après validation, puis est reporté dans `upcoming` et `dev`.
- Une branche de stabilisation ne reçoit pas de fonctionnalité nouvelle sans retour explicite vers `dev`.

## Commits

Utiliser le format Conventional Commits :

```text
<type>(<scope optionnel>): <sujet impératif>
```

- garder le sujet à 70 caractères maximum et sans point final ;
- limiter chaque commit à un changement cohérent ;
- utiliser un corps lorsque la motivation ou la limite n’est pas évidente ;
- ne jamais inclure de secret, donnée personnelle ou chemin local privé ;
- vérifier la branche courante, le diff indexé et les contrôles avant de committer.

## Portes de promotion

### Branche de tâche → `dev`

- périmètre terminé ;
- diff relu ;
- contrôles pertinents réussis ;
- limites documentées ;
- revue indépendante lorsque le risque le justifie.

### `dev` → `upcoming`

- jalon produit cohérent ;
- pas de travail partiellement intégré ;
- critères d’acceptation observables ;
- documentation et données de démonstration alignées.

### `upcoming` → `main`

- stabilisation terminée ;
- vérifications de release réussies ;
- aucun blocage connu accepté silencieusement ;
- décision humaine explicite de considérer le jalon comme stable.

## Publication distante

La création locale d’une branche, un commit, un push, une pull request, un merge et un déploiement sont des états distincts. Aucun push, changement de branche par défaut ou règle de protection GitHub ne doit être déduit de ce guide.

Lorsque le remote sera configuré et que la publication sera autorisée, protéger `main`, `upcoming` et `dev`, désactiver les pushes directs et exiger les contrôles pertinents avant merge.

## Règle de mise à jour

Modifier ce guide uniquement lorsqu’un rôle de branche, une porte de promotion ou une convention Git durable change. Ne pas y consigner l’historique quotidien des branches.
