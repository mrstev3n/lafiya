# PROMPTS.md — journal d’usage de l’IA

Document exigé par le brief. Alimenté au fil du travail, pas reconstruit à la fin.

Convention : **prompt adressé à l’outil** = demande effectivement reçue par Codex, Cursor ou Open Code. **extraits utiles** = fragments exacts conservés parce qu’ils éclairent une décision ou une contrainte. **synthèse paraphrasée** = résumé fidèle lorsque le texte exact n’est pas disponible ou n’apporte rien de plus. Aucun verbatim n’est fabriqué.

## Portée du journal

`PROMPTS.md` est un journal public et sélectif des interventions IA qui produisent une décision, un artefact, une vérification ou une reprise identifiable. Il ne constitue pas une transcription exhaustive de la conversation.

Les prompts peuvent être représentés par une synthèse fidèle, un ou plusieurs extraits exacts ou, exceptionnellement, le texte intégral lorsqu’il constitue un contrat de mission. Les skills et plugins ne sont mentionnés que lorsqu’ils ont influencé la méthode ou le résultat.

## Outils

| Rôle | Outil | Note |
| --- | --- | --- |
| Coordinateur | Codex (GPT-Sol) | Dépouillement, plan v0, livrables HTML, registre, revue Phase 0–1, missions |
| Complément | Cursor (Grok 4.6) | Atelier Phase 0–1 ; reprises P1/P2 |
| Complément | Open Code (OX Alpha) | Lane non démarrée |

La coordination opérationnelle est dans `REGISTRE-COLLABORATION.md`, distinct de ce journal.

---

### 2026-08-22 — Codex — ouverture du challenge et lecture du brief

- **Outil :** Codex / GPT-Sol
- **Objectif :** créer le projet dans la catégorie `Challenges`, isoler cette participation des autres activités, puis prendre connaissance du brief avant de le dépouiller.
- **Extraits utiles :**

  > « créer un nouveau dossier de catégorie challenge »

  > « centraliser les activités qu'on va faire autour de ce challenge-ci »

  > « prendre connaissance du brief afin qu'on le dépouille/etudie correctement »

- **Source fournie :** brief Google Docs « Figma to Code Challenge — Édition 4 ».
- **Sortie / artefacts :** dossier projet dédié ; `01-depouillement-du-brief.html` et sa source Markdown ; première base de contraintes, livrables et critères de réussite.
- **Ajustement humain :** le projet est explicitement un exercice de challenge, distinct d’un produit commercial définitif.
- **Limite :** le brief est une source de cadrage ; ses noms d’exemple et ses données ne doivent pas être traités comme des décisions produit ou des données opérationnelles vérifiées.

### 2026-08-22 — Codex — format des livrables et périmètre de lecture

- **Outil :** Codex / GPT-Sol
- **Objectif :** fixer le format des rapports et plans produits pendant l’exploration.
- **Extraits utiles :**

  > « ce livrable, rapport ou plan [...] doit être un fichier HTML »

  > « c'est juste pour la lecture rapide ici sur ordinateur »

- **Décision appliquée :** les rapports de synthèse et plans sont produits en HTML autonome, détaillé et optimisé pour une lecture desktop ; cette préférence ne modifie pas l’exigence responsive du site du challenge.
- **Sortie / artefacts :** `02-plan-de-travail-v0.html` et sa source Markdown ; maintien de la contrainte responsive 390–1440 px pour le produit final.
- **Limite :** la non-priorité mobile concerne les documents de lecture, pas l’interface Lafiya à construire.

### 2026-08-23 — Codex — coordination de Codex, Cursor et Open Code

- **Outil :** Codex / GPT-Sol
- **Objectif :** établir une coordination traçable entre l’environnement parent et les deux outils complémentaires, avec un support de transmission commun.
- **Extraits utiles :**

  > « conjointement entre trois outils différents »

  > « Codex [...] l'environnement parent principal »

  > « un fichier MD comme source canonique »

  > « qu'il puisse venir faire un rapport à ce niveau-là »

- **Décision appliquée :** `REGISTRE-COLLABORATION.md` devient la source canonique des handoffs ; `missions/` formalise les tâches bornées ; `archives/` conserve les missions acceptées ; `PROMPTS.md` conserve la traçabilité publique de l’usage de l’IA.
- **Sortie / artefacts :** registre, modèle de mission, première mission Cursor et règles de séparation des responsabilités.
- **Skill utilisé :** `orchestrate-work` — choix d’une coordination séquentielle, ownership explicite, vérification indépendante et absence de délégation non autorisée.
- **Limite :** le registre décrit les résultats observables ; il ne remplace ni la mémoire durable, ni les livrables HTML, ni une transcription de raisonnement privé.

---

### 2026-08-22 — Cursor — prise de connaissance et atelier Phase 0–1

- **Outil :** Cursor / Grok 4.6
- **Objectif de la demande :** lire le dépouillement et le plan, entamer les premières activités, annoncer chaque fichier touché pour audit Codex.
- **Prompt adressé à Cursor :** synthèse paraphrasée. Lire le dépouillement et le plan du challenge, prendre en charge un premier atelier borné et annoncer chaque fichier touché.
- **Sortie / artefacts :** `03-atelier-phase-0-1.md` ; amorce de ce journal ; mises à jour de `MEMORY.md` (passage antérieur).
- **Ajustement humain :** territoire Cotonou / Bénin ; données hybrides ; public 25–40 ans ; frein = peur de l’aiguille.
- **Limite :** `REGISTRE-COLLABORATION.md` n’existait pas encore ou n’a pas été lu. `lieu_sang` non extractible. Attribution trop courte du décret 2014-787 (« désignation ANTS ») — reprise ultérieure.

### 2026-08-22 — Cursor — choix de territoire, données et persona

- **Outil :** Cursor / Grok 4.6
- **Objectif :** verrouiller le cadre géographique, le régime de données et le public.
- **Prompt adressé à Cursor :** éléments de cadrage adressés directement à Cursor : Bénin / Cotonou, données hybrides et persona novice freiné par la peur de l’aiguille.
- **Sortie / artefacts :** consignes intégrées dans `03-atelier-phase-0-1.md`.
- **Ajustement humain :** les trois choix ci-dessus.
- **Limite :** traités comme propositions, pas comme acceptation Codex.

### 2026-08-23 — Cursor — choix de promesse et de villes

- **Outil :** Cursor / Grok 4.6
- **Objectif :** choisir la promesse éditoriale et l’extension hors Cotonou.
- **Prompt adressé à Cursor :** choix adressés directement à Cursor : promesse mix C+A et répertoire limité au Grand Nokoué (Cotonou, Abomey-Calavi, Porto-Novo, Ouidah, Sèmè-Kpodji).
- **Sortie / artefacts :** mise à jour de l’atelier ; pas de mini-brief HTML.
- **Ajustement humain :** mix C+A et Grand Nokoué seulement.
- **Limite :** Phase 2 non ouverte ; huit fiches nominatives absentes à ce stade.

### 2026-08-23 — Cursor — noter le registre de collaboration

- **Outil :** Cursor / Grok 4.6
- **Objectif :** consigner l’existence du registre canonique.
- **Prompt adressé à Cursor — extrait exact :** « Il faudra noter qu'il existe un registre de collaboration. »
- **Sortie / artefacts :** mentions dans `MEMORY.md` (passage antérieur), `03-atelier-phase-0-1.md`, ce journal ; handoff `COLLAB-20260823-CURSOR-002`.
- **Ajustement humain :** rappel que le registre existe et doit être lu en premier.
- **Limite :** le premier passage Cursor n’avait pas lu le registre. Mini-brief HTML toujours non produit.

### 2026-08-23 — Codex — revue de la lane Cursor

- **Outil :** Codex / GPT-Sol
- **Objectif :** revoir la lane Cursor et assigner les reprises P1/P2.
- **Prompt adressé à Codex :** synthèse paraphrasée. Revoir la lane Cursor, distinguer les propositions des décisions et définir les reprises nécessaires avant l’ouverture de la Phase 2. Artefacts concernés : `04-revue-codex-phase-0-1.html`, la mission de reprise et les handoffs `CODEX-002` / `CODEX-003`.
- **Sortie / artefacts :** verdict ACCEPTÉ AVEC RÉSERVES ; Phase 2 fermée.
- **Skill utilisé :** `orchestrate-work` — préflight de la tâche multi-outils, séparation des responsabilités, contrat de mission et exigence de revue indépendante ; aucun sous-agent supplémentaire n’a été lancé par cette étape.
- **Ajustement humain :** le périmètre de reprise a été maintenu comme une tâche bornée, sans ouverture de la Phase 2.
- **Limite :** la revue ne vaut pas acceptation des choix produit ; la préparation interne de la suite n’est pas détaillée ici.

### 2026-08-23 — Cursor — reprise du cadrage Phase 0–1

- **Outil :** Cursor / Grok 4.6
- **Objectif :** traiter uniquement les reprises de la revue Codex ; s’arrêter avant mini-brief, architecture, visuel et code.
- **Prompt adressé à Cursor :** reformulation fidèle d’une tâche de reprise. Corriger le cadrage juridique du décret 2014-787 ; remplacer « Décisions verrouillées » ; ajouter le glossaire SDTS / STS / PTS / BS ; produire une matrice d’au moins huit fiches candidates sans inventer de données opérationnelles ; distinguer les prompts exacts des synthèses ; documenter les changements et les limites pour revue indépendante.
- **Sortie / artefacts :** `03-atelier-phase-0-1.md` corrigé ; `06-matrice-sources-centres.md` créé ; journal complété ; rapport de fin transmis pour revue.
- **Ajustement humain :** aucun arbitrage produit nouveau dans cette reprise ; les choix C+A / Grand Nokoué restent des propositions.
- **Limite :** catalogue SGG `/documentheque/decrets/253/` n’isole pas le décret dans le HTML extrait ; fiche utile : https://sgg.gouv.bj/doc/decret-2014-787/. `lieu_sang` reste dynamique. Zéro centre nommé prouvé. Fetch de `ants.bj/contact` bloqué par le contrôle automatique ; non utilisé.

### 2026-08-23 — Codex — exploration de naming béninois

- **Outil :** Codex / GPT-Sol
- **Objectif :** explorer des noms courts avec une proximité fon, yoruba ou haoussa avant l’arbitrage humain.
- **Prompt adressé à Codex :** synthèse paraphrasée. Explorer des mots courts liés au Bénin, les comparer avec prudence et préparer une base pour le choix du nom et du dépôt.
- **Extraits utiles :**

  > « quelque chose de court, simple, avec une proximité au Bénin »

  > « quelque chose proche du fon, du yoruba ou du haoussa »

  > « chercher des noms, des mots qu'on pourrait exploiter »

- **Skills / méthodes utiles :** `balise-brand-naming` — structuration de l’exploration, distinction entre pistes linguistiques, sens attesté, connotation et disponibilité non vérifiée ; recherche Web et traductions machine utilisées comme points de départ, jamais comme certification linguistique ou juridique.
- **Sortie / artefacts :** `07-exploration-naming-v0.html` et `08-exploration-naming-langues-v1.html`, puis shortlist comprenant notamment `Kwabɔ`, `Ìtọ́jú`, `Agbé` et `Lafiya`.
- **Ajustement humain :** l’utilisateur a ensuite retenu `Lafiya` pour le challenge fictif.
- **Limite :** aucune disponibilité de domaine, collision d’entreprise, marque ou validation par locuteur n’a été déduite de cette exploration.

### 2026-08-23 — Codex — choix du nom et création du dépôt de travail

- **Outil :** Codex / GPT-Sol
- **Objectif :** appliquer la décision humaine de retenir `Lafiya` pour le challenge fictif et préparer le dépôt GitHub public requis par le brief.
- **Extraits utiles :**

  > « On peut partir sans crainte sur le nom **Lafiya** »

  > « Nous sommes dans un contexte de challenge, donc c'est complètement assumé »

  > « passer à la phase importante du dépôt Github »

- **Sortie attendue :** nom adopté pour le challenge ; dépôt public distant `mrstev3n/lafiya` ; aucun commit, push ou publication déduite de la seule création du remote.
- **Ajustement humain :** la disponibilité commerciale, juridique et externe du nom est hors périmètre de ce projet d’entraînement.
- **Limite :** le brief exige aussi un README et une URL de déploiement ; ils ne sont pas encore livrés par cette étape et le contenu local n’est pas encore poussé.

### 2026-08-23 — Codex — frontière public/local et initialisation du dépôt

- **Outil :** Codex / GPT-Sol
- **Objectif :** distinguer les fichiers destinés au dépôt public des documents de coordination locaux, puis préparer un premier commit minimal et vérifiable.
- **Extraits utiles :**

  > « identifier clairement quelles sont les choses qui doivent aller en ligne et [...] rester vraiment locales »

  > « Produire un bon .gitignore et organiser convenablement les choses »

  > « besoin d'un readme classique au début et à la fin »
- **Décision appliquée :** le dépôt public contient par défaut l’application, les assets sûrs, les données de démonstration étiquetées, `README.md` et `PROMPTS.md`. `MEMORY.md`, `REGISTRE-COLLABORATION.md`, `missions/`, `archives/` et les rapports de recherche restent locaux.
- **Sortie :** `.gitignore` et un README initial créés ; dépôt local initialisé sur `main` ; paquet de premier commit limité à `.gitignore`, `README.md` et `PROMPTS.md`.
- **Contrôles :** les chemins internes sont effectivement ignorés ; le scan des deux documents publics ne trouve ni chemin local absolu ni marqueur de secret ; aucun remote local n’a été configuré et aucun push n’a été effectué.
- **Limite :** la stack, le code applicatif, les données finales, le déploiement et la version finale du README restent à produire et à vérifier.

### 2026-08-23 — Codex — sélection visuelle, architecture et fondations candidates

- **Outil :** Codex / GPT-Sol
- **Objectif :** partir de la direction visuelle 2 choisie par l’utilisateur, définir l’architecture de la landing page, identifier les opportunités visuelles utiles et préparer des fondations cohérentes avant tout build.
- **Prompt adressé à Codex :** synthèse paraphrasée. Retenir la direction 2 comme base à ajuster après définition de l’arborescence ; rechercher des références de sections pertinentes ; construire des primitives à partir des couleurs dominantes du visuel ; explorer une paire typographique proche de Heebo ; documenter le résultat en HTML.
- **Skills / méthodes utiles :** `balise-visual-references` pour séparer observations, principes transférables et limites ; `font-mcp-advisor` puis `google-fonts-typography` pour la recherche de familles libres ; `ux-design-systems` et `balise-design-system` pour cadrer un kit local proportionné, distinguer primitives et rôles sémantiques, et sélectionner un flow pilote avant canonisation.
- **Sortie / artefacts :** `10-architecture-references-systeme-visuel-v1.html` ; proposition d’une landing page à ancres en dix blocs, dont l’avis de démonstration ; recommandation Manrope + Heebo ; ancres colorimétriques extraites de la direction 2 ; rôles sémantiques et tranche pilote « éligibilité → lieu ».
- **Ajustement humain :** la direction 2 est un choix humain ; l’architecture, la paire typographique et les tokens proposés doivent encore être validés après lecture et rendu.
- **Limites :** le MCP Landingfolio annoncé par le service exige un jeton personnel et n’était pas configuré ; les références ont été inspectées via le catalogue public. Le scan local proposé par `font-mcp` a été refusé par la protection de confidentialité ; aucun contenu du projet n’a été transmis pour cette analyse. Aucun code, scaffold, push ou déploiement n’a été réalisé.

### 2026-08-23 — Codex — hiérarchie des CTA et navigation

- **Outil :** Codex / GPT-Sol
- **Objectif :** faire émerger dès le hero les deux tâches principales — évaluer sa situation et localiser un point de don — puis structurer la navigation sans transformer tous ses libellés en questions.
- **Prompt adressé à Codex :** synthèse paraphrasée. Placer dans le hero deux accès vers le test d’éligibilité et la recherche d’un point de don ; regrouper les contenus de navigation — initialement formulé comme « burger menu », puis corrigé en « mega menu » — ; préférer des noms de destinations clairs aux formulations interrogatives répétées.
- **Source de contrainte :** la capture du brief confirme que le test d’éligibilité (C3) et la localisation des centres (C6) sont des contenus obligatoires. Elle a été utilisée comme preuve documentaire, distincte de la demande de conception.
- **Skills utiles :** `balise-ux-writing` pour distinguer actions, destinations et promesses fonctionnelles ; `better-writing` pour retenir des boutons verb-first et une terminologie française stable.
- **Interprétation initiale, corrigée ensuite :** « Faire le test d’éligibilité » et « Trouver un point de don » dans le hero ; première proposition de navigation regroupée dans un burger. La recherche Navbar Gallery documentée plus bas remplace ce dernier point par un header à deux niveaux et des mega menus.
- **Sortie / artefacts :** architecture et gates amendés dans `10-architecture-references-systeme-visuel-v1.html` ; décision durable et handoff mis à jour.
- **Limite :** aucune géolocalisation automatique n’est promise ; l’accessibilité et le comportement responsive du menu devront être prouvés dans le prototype.

### 2026-08-23 — Codex — exploration Navbar Gallery et mega menu

- **Outil :** Codex / GPT-Sol
- **Objectif :** corriger l’interprétation antérieure du burger menu, explorer des références de mega menus et produire une catégorisation plus utile des menus, sous-menus et items de dropdown.
- **Prompt adressé à Codex :** synthèse paraphrasée. Explorer Navbar Gallery avec `balise-visual-references`, étudier les structures de navigation et identifier des opportunités fonctionnelles pour un header Lafiya à deux niveaux.
- **Références inspectées :** Function, Chesapeake Plywood, AccessGrid et Cloudflare dans la collection Mega Menu de Navbar Gallery.
- **Skill utile :** `balise-visual-references` pour sélectionner des exemples complémentaires, distinguer structure et décoration, puis documenter observations, principes transférables, applications et limites.
- **Décision proposée :** barre utilitaire pour les accès rapides ; navigation principale limitée à deux mega menus — « Avant de donner » et « Comprendre » —, un accès direct au parcours et le CTA d’éligibilité.
- **Opportunités retenues pour prototype :** accès profond avec focus, fraîcheur des données, carte « Première fois ? » et mémoire temporaire du filtre ville. Recherche globale écartée ; numéro de téléphone conditionné à une source publique vérifiée.
- **Sortie / artefacts :** taxonomie, références et gates ajoutées au rapport HTML ; mémoire et registre amendés.
- **Limite :** cette recherche visuelle n’établit pas le comportement accessible ou responsive des références ; la proposition Lafiya reste à rendre et valider.
