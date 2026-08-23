# PROMPTS.md — journal d’usage de l’IA

Document exigé par le brief. Alimenté au fil du travail, pas reconstruit à la fin.

Convention : **prompt exact** = texte utilisateur ou mission recopié. **reconstruction paraphrasée** = résumé fidèle quand le verbatim n’est pas conservé ailleurs comme source unique. Aucun verbatim n’est fabriqué.

## Outils

| Rôle | Outil | Note |
| --- | --- | --- |
| Coordinateur | Codex (GPT-Sol) | Dépouillement, plan v0, livrables HTML, registre, revue Phase 0–1, missions |
| Complément | Cursor (Grok 4.6) | Atelier Phase 0–1 ; reprises P1/P2 |
| Complément | Open Code (OX Alpha) | Lane non démarrée |

La coordination opérationnelle est dans `REGISTRE-COLLABORATION.md`, distinct de ce journal.

---

### 2026-08-22 — Cursor — prise de connaissance et atelier Phase 0–1

- **Outil :** Cursor / Grok 4.6
- **Objectif de la demande :** lire le dépouillement et le plan, entamer les premières activités, annoncer chaque fichier touché pour audit Codex.
- **Prompt :** reconstruction paraphrasée. Demande d’agir en complément de Codex sur le challenge déjà entamé ; de prendre connaissance des fichiers de dépouillement et de plans ; d’annoncer chaque fichier touché.
- **Sortie / artefacts :** `03-atelier-phase-0-1.md` ; amorce de ce journal ; mises à jour de `MEMORY.md` (passage antérieur).
- **Ajustement humain :** territoire Cotonou / Bénin ; données hybrides ; public 25–40 ans ; frein = peur de l’aiguille.
- **Limite :** `REGISTRE-COLLABORATION.md` n’existait pas encore ou n’a pas été lu. `lieu_sang` non extractible. Attribution trop courte du décret 2014-787 (« désignation ANTS ») — reprise ultérieure.

### 2026-08-22 — Cursor — choix de territoire, données et persona

- **Outil :** Cursor / Grok 4.6
- **Objectif :** verrouiller le cadre géographique, le régime de données et le public.
- **Prompt :** reconstruction paraphrasée. Réponses humaines : « Nous sommes au Benin, à cotonou » ; données hybrides ; persona peur de l’aiguille.
- **Sortie / artefacts :** consignes intégrées dans `03-atelier-phase-0-1.md`.
- **Ajustement humain :** les trois choix ci-dessus.
- **Limite :** traités comme propositions, pas comme acceptation Codex.

### 2026-08-23 — Cursor — choix de promesse et de villes

- **Outil :** Cursor / Grok 4.6
- **Objectif :** choisir la promesse éditoriale et l’extension hors Cotonou.
- **Prompt :** reconstruction paraphrasée. Promesse mix C+A ; répertoire limité au Grand Nokoué (Cotonou, Abomey-Calavi, Porto-Novo, Ouidah, Sèmè-Kpodji).
- **Sortie / artefacts :** mise à jour de l’atelier ; pas de mini-brief HTML.
- **Ajustement humain :** mix C+A et Grand Nokoué seulement.
- **Limite :** Phase 2 non ouverte ; huit fiches nominatives absentes à ce stade.

### 2026-08-23 — Cursor — noter le registre de collaboration

- **Outil :** Cursor / Grok 4.6
- **Objectif :** consigner l’existence du registre canonique.
- **Prompt exact :** « Il faudra noter qu'il existe un registre de collaboration. »
- **Sortie / artefacts :** mentions dans `MEMORY.md` (passage antérieur), `03-atelier-phase-0-1.md`, ce journal ; handoff `COLLAB-20260823-CURSOR-002`.
- **Ajustement humain :** rappel que le registre existe et doit être lu en premier.
- **Limite :** le premier passage Cursor n’avait pas lu le registre. Mini-brief HTML toujours non produit.

### 2026-08-23 — Codex — revue et mission de reprise (contexte, hors exécution Cursor)

- **Outil :** Codex / GPT-Sol
- **Objectif :** revoir la lane Cursor et assigner les reprises P1/P2.
- **Prompt :** reconstruction paraphrasée côté Cursor (texte Codex non recopié ici en entier). Artefacts observés : `04-revue-codex-phase-0-1.html`, `missions/05-mission-cursor-reprises-phase-0-1.md`, handoffs `CODEX-002` et `CODEX-003`.
- **Sortie / artefacts :** verdict ACCEPTÉ AVEC RÉSERVES ; Phase 2 fermée.
- **Ajustement humain :** l’utilisateur a collé dans Cursor le prompt de mission prévu par Codex.
- **Limite :** journal Cursor ; ne prétend pas documenter tous les prompts internes Codex.

### 2026-08-23 — Cursor — reprises Phase 0–1 (mission 05)

- **Outil :** Cursor / Grok 4.6
- **Objectif :** traiter uniquement les reprises de la revue Codex ; s’arrêter avant mini-brief, architecture, visuel et code.
- **Prompt exact :** le message utilisateur de cette session, recopié depuis `missions/05-mission-cursor-reprises-phase-0-1.md` (section « PROMPT À COPIER DANS CURSOR »), demandant de lire le registre, MEMORY, la revue, l’atelier, PROMPTS et la mission ; de modifier seulement `03-atelier-phase-0-1.md`, `PROMPTS.md`, le handoff du registre et de créer `06-matrice-sources-centres.md` ; de corriger le décret 2014-787 via https://sgg.gouv.bj/documentheque/decrets/253/ ; de remplacer « Décisions verrouillées » ; d’ajouter un glossaire SDTS/STS/PTS/BS ; de créer ≥ 8 fiches candidates sans inventer de données opérationnelles ; de distinguer prompts exacts et reconstructions ; d’ajouter `COLLAB-20260823-CURSOR-003` en `PRÊT POUR REVUE`.
- **Sortie / artefacts :** `03-atelier-phase-0-1.md` corrigé ; `06-matrice-sources-centres.md` créé ; ce journal complété ; handoff `COLLAB-20260823-CURSOR-003`.
- **Ajustement humain :** aucun arbitrage produit nouveau dans cette reprise ; les choix C+A / Grand Nokoué restent des propositions.
- **Limite :** catalogue SGG `/documentheque/decrets/253/` n’isole pas le décret dans le HTML extrait ; fiche utile : https://sgg.gouv.bj/doc/decret-2014-787/. `lieu_sang` reste dynamique. Zéro centre nommé prouvé. Fetch de `ants.bj/contact` bloqué par le contrôle automatique ; non utilisé.

### 2026-08-23 — Codex — choix du nom et création du dépôt de travail

- **Outil :** Codex / GPT-Sol
- **Objectif :** appliquer la décision humaine de retenir `Lafiya` pour le challenge fictif et préparer le dépôt GitHub public requis par le brief.
- **Prompt exact :** « Étant donné qu'on est dans un projet fictif, c'est pas bien grave. On peut partir sans crainte sur le nom Lafiya, créer même notre identité visuelle et tout ce qu'on veut. [...] passer à la phase importante du dépôt Github ».
- **Sortie attendue :** nom adopté pour le challenge ; dépôt public distant `mrstev3n/lafiya` ; aucun commit, push ou publication déduite de la seule création du remote.
- **Ajustement humain :** la disponibilité commerciale, juridique et externe du nom est hors périmètre de ce projet d’entraînement.
- **Limite :** le brief exige aussi un README et une URL de déploiement ; ils ne sont pas encore livrés par cette étape et le contenu local n’est pas encore poussé.

### 2026-08-23 — Codex — frontière public/local et initialisation du dépôt

- **Outil :** Codex / GPT-Sol
- **Objectif :** distinguer les fichiers destinés au dépôt public des documents de coordination locaux, puis préparer un premier commit minimal et vérifiable.
- **Prompt exact :** « [...] il faudrait qu'on identifie clairement quelles sont les choses qui doivent aller en ligne et quelles sont les choses qui doivent rester vraiment locales à notre niveau. Produire un bon .gitignore et organiser convenablement les choses. On aura très certainement besoin d'un readme classique au début et à la fin on le structurera beaucoup mieux. »
- **Décision appliquée :** le dépôt public contient par défaut l’application, les assets sûrs, les données de démonstration étiquetées, `README.md` et `PROMPTS.md`. `MEMORY.md`, `REGISTRE-COLLABORATION.md`, `missions/`, `archives/` et les rapports de recherche restent locaux.
- **Sortie :** `.gitignore` et un README initial créés ; dépôt local initialisé sur `main` ; paquet de premier commit limité à `.gitignore`, `README.md` et `PROMPTS.md`.
- **Contrôles :** les chemins internes sont effectivement ignorés ; le scan des deux documents publics ne trouve ni chemin local absolu ni marqueur de secret ; aucun remote local n’a été configuré et aucun push n’a été effectué.
- **Limite :** la stack, le code applicatif, les données finales, le déploiement et la version finale du README restent à produire et à vérifier.
