# PROMPTS.md — journal d’usage de l’IA

Document exigé par le brief. Alimenté au fil du travail, pas reconstruit à la fin.

Convention : **prompt adressé à l’outil** = demande effectivement reçue par Codex ou Cursor. **verbatim exact** = citation mot pour mot, réservée à une formulation qui porte clairement une décision, une contrainte, un arbitrage ou une intention. **synthèse paraphrasée** = résumé fidèle lorsque le texte source est hésitant, répétitif, ambigu ou moins lisible que son sens. Aucun verbatim n’est corrigé, recomposé ou fabriqué.

## Portée du journal

`PROMPTS.md` est un journal public et sélectif des interventions IA qui produisent une décision, un artefact, une vérification ou une reprise identifiable. Il ne constitue pas une transcription exhaustive de la conversation.

Les skills et plugins ne sont mentionnés que lorsqu’ils ont influencé la méthode ou le résultat.

## Sélection des verbatims

Les entrées alternent entre synthèse et citation selon la valeur du texte source :

- conserver un verbatim exact lorsqu’il est autonome, bien structuré et utile comme preuve d’une décision, d’une contrainte ou d’un critère ;
- retenir un à trois extraits courts lorsqu’un message contient plusieurs formulations fortes ;
- préférer une reformulation fidèle lorsque le message oral, fragmentaire ou redondant gagne en clarté sans perdre son intention ;
- réserver le texte intégral aux contrats de mission dont les contraintes se perdraient par réduction.

Les citations exactes restent ponctuelles : elles donnent du poids au journal sans le transformer en transcription exhaustive.

## Outils

| Rôle | Outil | Note |
| --- | --- | --- |
| Coordinateur | Codex (GPT-Sol) | Dépouillement, plan v0, livrables HTML, registre, revue Phase 0–1, missions |
| Complément | Cursor (Grok 4.6) | Atelier Phase 0–1 ; reprises P1/P2 |

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

### 2026-08-23 — Codex — coordination de Codex et Cursor

- **Outil :** Codex / GPT-Sol
- **Objectif :** établir une coordination traçable entre l’environnement parent et l’outil complémentaire retenu, avec un support de transmission commun.
- **Extraits utiles :**

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

### 2026-08-23 — Codex — structure des branches et guide Git

- **Outil :** Codex / GPT-Sol
- **Objectif :** établir une progression stable entre les travaux courants, la prochaine version et la version stable, tout en isolant chaque tâche structurante.
- **Extraits utiles :**

  > « le main pour la version stable »

  > « une branche dev pour la construction générale »

  > « une branche upcoming [...] juste avant la version stable »

  > « créer une branche lorsque il y a des tâches structurantes »

- **Skills utiles :** `sentry-skills:create-branch` pour créer une branche typée sans perdre les changements en cours ; `sentry-skills:commit` pour séparer les changements en commits conventionnels ; `orchestrate-work` pour vérifier la topologie et le worktree avant mutation.
- **Décision appliquée :** flux local `branche de tâche → dev → upcoming → main` ; branches longues créées depuis le même état stable ; travail courant déplacé sur `meta/establish-branch-workflow`.
- **Sortie / artefacts :** `docs/GIT-WORKFLOW.md`, lien depuis le README, règles locales dans `AGENTS.md` et registre de la topologie.
- **Limite :** aucun remote, push, merge, changement de branche par défaut, protection GitHub ou déploiement n’est inclus dans cette étape locale.

### 2026-08-23 — Codex — publication et protection du workflow Git

- **Outil :** Codex / GPT-Sol
- **Objectif :** publier la structure de branches validée et empêcher les modifications directes des branches longues sans rendre le projet individuel impossible à maintenir.
- **Prompt adressé à Codex :** synthèse paraphrasée. Passer à l’opération logique suivant la validation du workflow local : configurer le dépôt distant, publier les branches et appliquer une protection proportionnée.
- **Décision appliquée :** `main`, `upcoming` et `dev` publiées sur le dépôt public ; `main` confirmée comme branche par défaut ; ruleset commun imposant pull request et résolution des conversations, interdisant suppression et force-push.
- **Ajustement au contexte :** zéro approbation obligatoire et aucun check CI requis à ce stade, afin de ne pas bloquer un projet individuel sans automatisation fiable.
- **Sortie / artefacts :** remote `origin`, branches distantes, ruleset GitHub `protect-long-lived-branches` et guide Git actualisé sur une nouvelle branche de tâche.
- **Limite :** cette opération publie l’historique documentaire et la structure Git, pas une application, une release ou un déploiement.

### 2026-08-23 — Codex — wireframe de contenu et flow pilote

- **Outil :** Codex / GPT-Sol
- **Objectif :** poursuivre depuis `dev` avec la prochaine phase logique, sans travailler directement sur la branche d’intégration ni ouvrir prématurément le build.
- **Prompt adressé à Codex :** synthèse paraphrasée. Se positionner sur `dev`, ouvrir la prochaine phase sur une branche de tâche et transformer l’architecture proposée en wireframe détaillé du contenu et du parcours « éligibilité → point de don ».
- **Skills utiles :** `orchestrate-work` pour borner le travail à un livrable de conception sans délégation ni scaffold ; `sentry-skills:create-branch` pour créer `feat/content-wireframe-pilot` depuis `dev` selon le workflow approuvé.
- **Sortie / artefacts :** `11-wireframe-contenu-flow-pilote-v1.html` ; mise à jour de la frontière locale dans `.gitignore` ; documentation du handoff dans le registre local.
- **Ajustement humain :** les dix blocs, la double navigation, la carte secondaire et Manrope + Heebo sont rendus comme hypothèses de prototype. Ils nécessitent encore un arbitrage explicite avant la planche d’interface détaillée.
- **Limite :** aucun framework, composant applicatif, modèle de données, déploiement ou publication n’est produit par cette phase.

### 2026-08-23 — Codex — sélection visuelle et proposition technique avant code

- **Outil :** Codex / GPT-Sol
- **Objectif :** conserver l’option visuelle 3 comme cible du flow pilote, puis suspendre la production afin de définir la stack, l’architecture, le modèle de données et le contrat d’exécution avant tout scaffold.
- **Prompt adressé à Codex :** synthèse paraphrasée. Ne pas lancer la conception codée immédiatement après le choix visuel ; produire d’abord une fiche technique détaillée et exploitable pour structurer l’ensemble du build.
- **Skills / méthodes utiles :** `product-design:ideate` pour générer et faire sélectionner trois cibles distinctes ; `product-design:image-to-code` interrompu avant initialisation ; analyse d’architecture React/Vite et consultation de documentations officielles pour dater les recommandations.
- **Sortie / artefacts :** option 3 retenue ; actif photographique isolé généré ; `12-proposition-technique-v1.html` créé ; aucun dossier applicatif ni dépendance initialisé.
- **Ajustement humain :** le nombre et l’ordre exacts des sections d’accueil restent révisables après le premier prototype. La validation technique précède désormais tout code.
- **Limite :** la stack et le déploiement sont des recommandations soumises à validation ; aucune production, publication ou connexion Vercel n’est engagée.

### 2026-08-23 — Codex — mission Cursor pour le socle technique

- **Outil :** Codex / GPT-Sol, mission destinée à Cursor / Grok 4.6
- **Objectif :** transformer la proposition technique validée en un premier lot d’implémentation borné et vérifiable.
- **Prompt adressé à Cursor :** reformulation fidèle. Initialiser uniquement React, TypeScript, Vite, les scripts de qualité, les styles de fondation et un test de démarrage ; préserver les changements Codex ; s’arrêter avant les features, les données, la reproduction visuelle, Git distant et le déploiement.
- **Skill utile :** `orchestrate-work` — définition de l’ownership, des préconditions Git, des exclusions, des preuves et du contrat de retour, sans délégation parallèle supplémentaire.
- **Sortie / artefact :** `missions/13-mission-cursor-socle-technique.md`, contenant le contrat complet et le prompt copiable.
- **Limite :** l’assignation ne prouve ni démarrage ni réussite ; le résultat devra porter le statut `PRÊT POUR REVUE` jusqu’au contrôle indépendant de Codex.

### 2026-08-23 — Cursor — socle technique lot 01

- **Outil :** Cursor / Grok 4.6
- **Objectif :** initialiser à la racine le lot 01 « Socle technique » : React 19.2, TypeScript 5.9, Vite 8.2, scripts de qualité, styles de fondation et un premier test observable, sans feature ni reproduction visuelle.
- **Prompt adressé à Cursor :** reformulation fidèle. Initialiser le socle à la racine sur `feat/content-wireframe-pilot` ; préserver les changements déjà présents dans `.gitignore` et `PROMPTS.md` ; n’écrire que les fichiers de scaffold autorisés ; inspecter les deux références visuelles comme fondations futures, sans les copier ni les implémenter ; s’arrêter avant landing, simulateur, répertoire, option 3, données, Git distant et déploiement.
- **Extraits utiles :**

  > « React 19.2 »

  > « TypeScript 5.9 »

  > « Vite 8.2 »

  > « s’arrête strictement au socle technique »

- **Méthode appliquée :** contrat d’orchestration préparé par Codex — préflight Git, ownership borné, exclusions explicites et revue indépendante. `orchestrate-work` relève ici du travail de coordination de Codex, pas d’un usage direct attribué à Cursor.
- **Sortie / artefacts :** `package.json`, `package-lock.json`, `.nvmrc`, `index.html`, configs Vite/TypeScript/ESLint, `src/app/App.tsx`, styles de fondation, `src/app/App.test.tsx` ; handoff `COLLAB-20260823-CURSOR-004`.
- **Contrôles :** `npm install` ; `typecheck`, `lint`, `test` et `build` sans erreur ; `npm audit --omit=dev` : 0 vulnérabilité ; `dist/` contient `index.html` et les assets compilés ; `dist/` et `node_modules/` restent ignorés.
- **Écarts :** le template officiel Vite 8.2 propose TypeScript 6.0 et oxlint ; le socle a été écrit à la racine pour conserver TypeScript 5.9 et ESLint. `@eslint/js` 10 entrait en conflit avec ESLint 9 ; la ligne 9 a été verrouillée. ESLint 9.39.5 signale une dépréciation, sans bascule silencieuse vers ESLint 10.
- **Limite :** runtime local Node 26.3.0, cible documentée Node 24 via `.nvmrc` et `engines.node`. Aucune fonte téléchargée, aucune feature, aucun commit, push, PR ou déploiement. Le handoff n’est pas une acceptation.

### 2026-08-23 — Codex — acceptation et archivage du socle technique

- **Outil :** Codex / GPT-Sol
- **Objectif :** effectuer la revue indépendante du lot 01 Cursor, arbitrer la traçabilité du skill et clôturer l’activité sans reprise disproportionnée.
- **Prompt adressé à Codex :** synthèse paraphrasée. Considérer `orchestrate-work` comme un usage de coordination propre à Codex, accepter le résultat technique déjà vérifié, marquer l’activité comme terminée et archiver son paquet de mission.
- **Skill utilisé :** `orchestrate-work` — vérification indépendante du handoff, séparation entre exécution Cursor et coordination Codex, alignement du verdict, du registre et des chemins d’archive.
- **Vérifications :** `npm ci`, type-check, lint, test et build réussis sous Node 24.15.0 ; audit npm à 0 vulnérabilité ; périmètre Git et frontières locales contrôlés.
- **Sortie / artefacts :** lot 01 accepté ; missions `13` et `15` archivées, la seconde comme supersédée ; revue finale déplacée dans `archives/14-revue-codex-socle-technique-lot-01.html` ; handoffs `COLLAB-20260823-CODEX-021` et `022`.
- **Limite :** l’archivage est local. Aucun commit, push, pull request, merge ou déploiement n’est inclus dans cette clôture.

### 2026-08-23 — Codex — commits et publication de la branche du socle

- **Outil :** Codex / GPT-Sol
- **Objectif :** transformer le jalon accepté en historique Git révisable et publier la branche de tâche avant d’ouvrir le lot suivant.
- **Prompt adressé à Codex :** synthèse paraphrasée. Préparer des commits cohérents, vérifier l’état exact committé, pousser la branche courante, puis poursuivre ici avec le prochain lot.
- **Skills utilisés :** `sentry-skills:commit` pour séparer le scaffold de la documentation publique et produire des messages conventionnels ; `orchestrate-work` pour contrôler le staging explicite, la frontière locale et la séquence de publication.
- **Sortie :** commits `9cdf1f4` pour le socle applicatif et `93f12de` pour la documentation et les frontières locales ; branche `feat/content-wireframe-pilot` publiée sur `origin` avec suivi configuré.
- **Vérifications :** type-check, lint, test et build réussis sous Node 24.15.0 sur l’état committé ; arbre public propre avant publication.
- **Limite :** le push publie une branche de travail, pas une pull request, un merge dans `dev`, une release ou un déploiement.

### 2026-08-24 — Codex — intégration du socle et lot Domaine et données

- **Outil :** Codex / GPT-Sol
- **Objectif :** intégrer le socle accepté dans `dev`, puis produire et implémenter directement le contrat du lot 02 dans Codex, sans délégation complémentaire.
- **Prompt adressé à Codex :** synthèse paraphrasée. Fusionner la branche du socle par pull request autorisée ; créer depuis `dev` une branche dédiée au domaine et aux données ; fournir une spécification HTML détaillée ; réaliser ensuite l’implémentation dans l’environnement Codex.
- **Skills utilisés :** `orchestrate-work` pour séparer intégration, spécification, implémentation et revue ; `sentry-skills:pr-writer` pour la PR `#2` ; `sentry-skills:create-branch` pour `feat/domain-data-foundation` ; `sentry-skills:code-review` pour durcir les dates, les objets stricts et les tests négatifs avant acceptation.
- **Sortie / artefacts :** PR `#2` fusionnée dans `dev` ; spécification locale `16-specification-domaine-donnees-lot-02.html` ; schémas Zod, catalogue typé, 8 centres fictifs, 8 réserves, 6 FAQ, mentions centralisées et 15 tests ; revue locale `17-revue-codex-domaine-donnees-lot-02.html`.
- **Vérifications :** `validate:data`, type-check, lint, tests et build réussis sous Node 24.15.0 ; audit npm de production à 0 vulnérabilité ; 8 candidats, 5 villes et 8 groupes uniques contrôlés.
- **Limite :** le lot 02 ne contient aucune interface, API, persistance ou donnée opérationnelle réelle. Il reste local, non committé et non publié à ce stade.

### 2026-08-27 — Codex — intégration du lot 02 et spécification du lot 03

- **Outil :** Codex / GPT-Sol
- **Objectif :** transformer le lot Domaine et données accepté en historique révisable, l’intégrer dans `dev`, puis cadrer le shell Navigation et structure avant toute nouvelle implémentation.
- **Prompt adressé à Codex :** synthèse paraphrasée. Découper les changements du lot 02 en commits cohérents, publier et fusionner la branche par pull request, repartir de `dev` sur une branche dédiée, puis produire le contrat HTML détaillé du lot 03. L’implémentation du lot 03 reste fermée jusqu’à revue humaine de cette spécification.
- **Skills utilisés :** `orchestrate-work` pour séparer la clôture Git et la conception suivante ; `sentry-skills:commit`, `sentry-skills:pr-writer` et `sentry-skills:create-branch` pour le workflow Git ; `balise-design-system` pour limiter les fondations aux usages du shell ; `better-accessibility` pour préciser sémantique, clavier, focus, dialog mobile, zoom et mouvement réduit.
- **Sortie / artefacts :** commits `5f66bd0` et `000aee7` ; PR `#3` fusionnée dans `dev` au commit `dab193a` ; branche `feat/navigation-structure` ; spécification locale `18-specification-navigation-structure-lot-03.html`.
- **Décision de lecture visuelle :** la direction 2 « Lien vital » gouverne la marque et l’atmosphère ; l’option 3 gouverne la hiérarchie fonctionnelle. Les coordonnées et données visibles dans les images ne sont pas reprises.
- **Limite :** aucune ligne de code du lot 03, aucune promotion vers `upcoming` ou `main` et aucun déploiement dans cette opération.

### 2026-08-27 — Codex — exploration de l’architecture éditoriale Lafiya

- **Outil :** Codex / GPT-Sol
- **Objectif :** enrichir la navigation, les destinations et les sections de la homepage à partir d’une référence santé appréciée, puis confronter les opportunités visuelles à des données officielles liées au don de sang.
- **Prompt adressé à Codex :** synthèse paraphrasée. Étudier la capture complète et le site Function Health pour identifier les principes transférables — header épuré, étapes, catalogue, témoignages vidéo, chiffres, équipe, comparaison, FAQ et CTA final — sans copier leur contenu. Rechercher des preuves adaptées au Bénin et à l’Afrique, puis proposer une structure Lafiya crédible, des pages futures et des mécanismes de réassurance.
- **Skills utilisés :** `orchestrate-work` pour borner une exploration sans délégation ni code ; `balise-visual-references` pour séparer observation, principe et adaptation ; `lawve-source-verification` pour conserver le périmètre, la date et les limites de chaque donnée ; navigateur interne pour inspecter Function Health et les pages officielles de l’ANTS.
- **Sortie / artefacts :** `19-exploration-architecture-editoriale-preuves-lot-03.html` ; proposition de quatre libellés principaux, cinq routes futures, neuf blocs de homepage et trois preuves chiffrées sourcées.
- **Décisions proposées :** remplacer « Avant de donner » par « Donner » et « Le don pas à pas » par « Le parcours » ; réserver dans le template quatre capsules vidéo de donneurs et une bande présentant les personnes derrière l’initiative, avec un contrat d’assets pour leur remplacement en production ; remplacer le comparatif monétaire non démontré par une comparaison entre orientation Lafiya et confirmation médicale.
- **Limite :** l’exploration reste à arbitrer et ne modifie pas encore la spécification 18. Elle n’autorise aucune implémentation, publication ni reprise d’assets de la référence.

### 2026-08-27 — Codex — système de CTA et résultats positifs du test

- **Outil :** Codex / GPT-Sol
- **Objectif :** harmoniser les menus avec les boutons d’action, approfondir les résultats du test d’éligibilité et laisser le parcours déterminer le nombre pertinent de sections d’accueil.
- **Prompt adressé à Codex :** synthèse paraphrasée. Tenir compte du CTA d’éligibilité dans le naming du header ; définir les libellés de tous les boutons importants ; produire pour chaque résultat du test une explication personnalisée, une date calculée quand elle est possible et une action positive immédiate ; placer les lieux officiels de don plus haut dans la homepage ; ne plus traiter neuf blocs comme une limite ; chercher un signal final qui détourne une phrase familière comme le fait Function Health.
- **Skills utilisés :** `orchestrate-work` pour traiter navigation, test et homepage comme un système unique ; `balise-ux-writing` pour distinguer destinations, actions, résultats, explications et voies de continuation.
- **Sortie / artefacts :** mise à jour de `19-exploration-architecture-editoriale-preuves-lot-03.html` avec un vocabulaire navigation–CTA, six modèles de résultat, une recommandation de date de naissance, onze modules proposés et un contrat de carte pour les lieux de don.
- **Décisions proposées :** navigation « Le don · Points de don · Témoignages · Comprendre » ; CTA principal « Vérifier mon éligibilité » ; CTA secondaire « Trouver où donner » ; signal final « Chaque minute compte. Chaque don aussi. ».
- **Limite :** ces décisions enrichissent l’exploration ; la spécification 18 et le code restent inchangés jusqu’à arbitrage humain.

### 2026-08-27 — Codex — gate image-first et trois homepages complètes

- **Outil :** Codex / GPT-Sol + génération d’images intégrée
- **Objectif :** mettre la spécification 18 au niveau des décisions validées, puis comparer plusieurs directions complètes avant toute implémentation du lot 03.
- **Prompt adressé à Codex :** synthèse paraphrasée. Adopter une approche image-to-code ; générer au moins trois variantes de la homepage entière, ou des groupes de sections cohérents si le plein format n’est pas exploitable ; conserver une passe complète par variante ; traiter les anciennes directions comme des indications seulement ; laisser la nouvelle structure recomposer le hero, les dispositions, le copywriting et les opportunités de vidéo de fond.
- **Skills utilisés :** `orchestrate-work` pour séparer choix de direction, extraction sectionnelle et code ; `imagegen` pour produire trois vues raster complètes ; `image-to-code` pour imposer une source visuelle avant code et réserver la génération sectionnelle à la direction retenue.
- **Sorties / artefacts :** spécification 18 mise à jour ; `20-comparatif-directions-homepage-lot-03.html` ; variantes A cinématographique humaine, B éditoriale chaleureuse et C civique orientée données dans `visual-explorations/lot-03-homepage/`.
- **Méthode retenue :** trois vues complètes servent au choix de direction ; après arbitrage, une nouvelle image lisible est générée pour chaque section ou groupe court de la direction choisie. Les vues complètes ne sont pas recadrées pour l’extraction.
- **Recommandation Codex :** variante B comme base, avec la possibilité de renforcer ensuite le motif de lien de A et la précision des modules de données de C dans une nouvelle passe visuelle.
- **Limite :** aucun code applicatif, aucune dépendance, aucun commit, aucun push et aucune publication.

### 2026-08-27 — Codex — direction Lafiya retenue et extraction sectionnelle

- **Outil :** Codex / GPT-Sol + génération d’images intégrée
- **Objectif :** transformer le choix humain en un corpus visuel sectionnel explicite, sans confondre les trois pages de comparaison avec la direction finale.
- **Prompt adressé à Codex :** synthèse paraphrasée. Partir du socle cinématique humain, reprendre seulement certaines structures plus simples des autres pistes, préserver les réinterprétations approuvées et ajuster le rythme clair/sombre. Le hero validé reste inchangé ; sa bande basse immédiate doit reprendre une liste compacte en trois actions. L’équipe et la FAQ restent sobres ; le footer reprend la composition compacte de référence et reçoit une barre légale basse.
- **Extraits utiles :**

  > « Mon choix se tourne vers A comme base. »

  > « Il y a des sections qui n'ont pas besoin d'être trop éditoriales. »

  > « La première partie du hero section avait déjà été validée. »

- **Skills utilisés :** `imagegen` pour produire des références fraîches par section ; `image-to-code` pour maintenir le gate visuel avant implémentation ; `orchestrate-work` pour séparer arbitrage, génération, revue documentaire et futur code.
- **Sorties / artefacts :** onze références dans `visual-explorations/lot-03-homepage/selected-a-plus/` ; mise à jour des spécifications 18 et 20 ; rapport `21-direction-lafiya-retenue-lot-03.html`.
- **Ajustement humain :** les lettres A/B/C sont abandonnées dans la suite opérationnelle au profit de « Cinématique humaine », « Éditoriale claire », « Civique modulaire » et « Direction Lafiya retenue ». Les témoignages réinterprétés sont conservés ; éligibilité, parcours, besoins, équipe, FAQ, above the fold et footer sont simplifiés selon les références explicitement retenues. Le bloc d’impact revient lui aussi à une bande sombre compacte : introduction et trois preuves, sans graphique, photographie ni pictogramme.
- **Limite :** le corpus reste en revue humaine finale. Aucun code applicatif, commit, push ou déploiement n’est inclus.

### 2026-08-28 — Codex — implémentation et calibration de la homepage Lafiya

- **Outil :** Codex / GPT-Sol
- **Objectif :** transformer la direction sectionnelle acceptée en expérience responsive navigable, puis intégrer durablement les réglages visuels validés pendant la calibration.
- **Prompt adressé à Codex :** synthèse paraphrasée. Implémenter la homepage et ses pages liées dans l’environnement principal ; appliquer les retours annotés sur la navigation, la carte, les contenus, les médias et les comportements responsive ; utiliser DialKit seulement comme surface temporaire d’ajustement ; inscrire toute valeur acceptée dans les styles de production sans laisser le tuner devenir la source de vérité.
- **Ajustements humains déterminants :** maintien de la composition visuelle retenue ; hero fixé à une échelle de `1` et une position `68% 86%` ; voile de lecture figé par quatre points de gradient ; suppression des mentions de démonstration inutiles dans l’interface ; navigation mobile regroupée ; carte interactive ; accordéon FAQ exclusif.
- **Sortie / artefacts :** homepage en onze sections, routes éditoriales, header responsive avec mega menus, carte Leaflet, quatre lieux ANTS sourcés, médias sélectionnés et outil de calibration chargé uniquement en développement.
- **Vérifications :** type-check, lint, 17 tests et build de production sous Node 24.15.0 ; validation structurée des provenances et données du catalogue.
- **Limite :** DialKit reste temporairement installé pour les prochaines calibrations mais ses valeurs validées sont déjà permanentes dans le CSS. Aucun merge vers `dev`, promotion, déploiement ou publication stable n’est inclus dans cette étape.

### 2026-08-28 — Codex + Magnific — exploration vidéo de la section d’éligibilité

- **Outil :** Codex / GPT-Sol + Magnific MCP.
- **Objectif :** remplacer à terme le portrait statique de « Puis-je donner ? » par une scène courte où la même femme s’approche en plan continu, lève le pouce et sourit, tout en contrôlant la fluidité et la dépense de crédits avant intégration.
- **Extraits utiles :**

  > « Magnific MCP, Kling 3.0, 1080p, Sound/Music OFF »

  > « Je suis prêt à dépenser des crédits, mais pas énormément quand même. »

- **Prompt adressé à Codex :** synthèse paraphrasée. Auditer le cadre actuel et le compte Magnific ; recommander une durée ; préparer un start frame plus éloigné qui conserve l’identité ; produire un seul clip silencieux où la femme avance jusqu’à un plan moyen, se stabilise, lève le pouce et sourit ; contrôler le résultat avant toute nouvelle génération ou intégration.
- **Skill utilisé :** `balise-motion-graphic` pour définir le beat sheet, la durée, le vocabulaire de caméra, le contrôle des assets et les gates de qualité ; `orchestrate-work` pour isoler l’audit sans coût, l’image préparatoire et la génération vidéo payante.
- **Sorties / artefacts :** `27-exploration-video-eligibilite-kling-lot-04.html` ; start frame carré Nano Banana Pro ; master Kling 3.0 de 6,04 s ; planche de dix-huit images dans `visual-explorations/lot-04-video-eligibility/`.
- **Coût observé :** 75 crédits pour le start frame et 540 pour le clip, soit 615 crédits au total ; solde restant observé après génération : 41 066 crédits.
- **Vérifications :** master H.264 de 1440 × 1440, 24 i/s, 145 images et sans piste audio ; décodage complet réussi ; identité, progression, main et pouce inspectés sur des planches temporelles.
- **Arbitrage et intégration :** le sourire final, plus franc que demandé, a été accepté. La section « Puis-je donner ? » utilise des dérivés web MP4/WebM de 720 × 720, sans audio, lus une seule fois à l’entrée dans le viewport ; le poster reste statique en cas de réduction des mouvements ou d’économie de données. Le master de 11,6 Mo demeure hors du bundle public.

### 2026-08-29 — Codex — consolidation de la homepage et reprise sélective du test d’éligibilité

- **Outil :** Codex / GPT-Sol, avec audit indépendant de la lane Cursor.
- **Objectif :** intégrer la homepage stabilisée dans `dev`, préserver les sauvegardes existantes, puis reprendre uniquement les éléments fiables du prototype d’éligibilité sans restaurer ses régressions de carte ou de contenu.
- **Prompt adressé à Codex :** synthèse paraphrasée. Fusionner et nettoyer les travaux pour repartir d’un socle propre ; confronter le résultat Cursor aux décisions produit déjà validées ; conserver la carte statique et rendre le test immédiatement visible, crédible, positif et accessible.
- **Skills utilisés :** `orchestrate-work` pour borner la récupération Git et séquencer les preuves ; `balise-trustworthy-flows` et `balise-ux-writing` pour distinguer orientation, confirmation médicale et voies de continuation ; `mobile-responsiveness` et `better-accessibility` pour contrôler le premier écran, les focus et les champs ; navigateur interne pour vérifier les parcours rendus.
- **Sortie / artefacts :** PR `#5` fusionnée dans `dev` au commit `baf9638` ; branche `feat/eligibility-flow-v2` ; moteur de règles pur, parcours en trois étapes, résultat mineur positif, rappel calendrier et transfert explicite de ville vers la carte OpenStreetMap statique.
- **Vérifications :** type-check, lint, 47 tests et build de production réussis sous Node 24.15.0 ; parcours mineur et complet vérifiés dans le navigateur ; question et action visibles au premier écran à 390 × 844, 768 × 900 et 1440 × 900 ; aucune réintroduction de Leaflet ni erreur console.
- **Limite :** la branche d’éligibilité n’est pas encore fusionnée dans `dev` au moment de cette entrée. Les stashes de sauvegarde restent intacts jusqu’à la preuve finale de récupération et aucun déploiement n’est inclus.
