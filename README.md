# Lafiya

Lafiya is a fictitious blood-donation experience created for the **Figma to Code Challenge — Edition 4**.

The project is an intentional training exercise. It is not an official service, is not affiliated with the Agence Nationale pour la Transfusion Sanguine (ANTS), and must not be treated as medical advice.

## Status

The first complete homepage implementation is available on the current task branch. It translates the selected Lafiya direction into eleven responsive sections, a desktop mega-menu, a mobile navigation panel, reusable UI primitives and a typed catalogue combining sourced donation locations with simulated reserve data.

The eligibility simulator, final testimonials and confirmed team profiles remain separate follow-up lots. The current map is interactive and exposes an initial set of four public ANTS locations; expanding the directory to the eight-location challenge requirement remains open. The current visual assets provide the intended production structure and will be replaced or confirmed before a final release.

The intended experience is a calm, informative landing page for first-time blood donors in the Grand Nokoué area of Benin. The final challenge implementation is expected to work from 390 px to 1440 px, remain keyboard-accessible and make its simulated data explicit.

## Planned experience

- explain why blood donation matters;
- make eligibility easier to understand without replacing a medical consultation;
- show what the donation process feels like;
- help a visitor find a relevant donation location;
- represent centre and blood-stock information as dated demonstration data when it cannot be publicly verified;
- answer common questions and reduce fear of the needle through clear, concrete content.

## Repository boundary

This public repository is for the challenge deliverable and its reproducible, non-sensitive inputs.

Public by design:

- application source code and public assets;
- safe, clearly labelled demonstration data;
- this README;
- `PROMPTS.md`, which documents the AI tools, significant prompts, human adjustments and observed limits as required by the brief.

Local by default:

- project memory and coordination files (`MEMORY.md`, `REGISTRE-COLLABORATION.md`);
- active missions and archived mission packets;
- internal brief analysis, source reviews, naming research and working drafts;
- credentials, environment files, personal paths and tool state.

The `.gitignore` encodes this initial boundary. Every new file must still be reviewed before a commit; an ignored path can be deliberately included only after an explicit public-safety check.

## Development

The application uses React 19, TypeScript, Vite and Zod. Node.js 24 is required; the repository pins the expected major through `.nvmrc`.

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

The local homepage has been verified at 390 px, 768 px and 1440 px without horizontal overflow.

The repository follows a staged branch workflow: task branches feed `dev`, validated milestones move to `upcoming`, and only accepted stable work reaches `main`. See [`docs/GIT-WORKFLOW.md`](./docs/GIT-WORKFLOW.md) for branch roles, naming, promotion gates and hotfix handling.

## Method and AI usage

See [`PROMPTS.md`](./PROMPTS.md) for the project’s collaboration record across Codex, Cursor and Open Code. The log distinguishes observed prompts, reconstructed summaries, human decisions and limitations; it does not expose private chain-of-thought.

## Data and responsibility

Donation locations are included only when their public source and observation date are recorded. Opening states, appointments and blood-stock values used in the prototype may still be simulated for the challenge; they must remain dated and distinguishable from sourced facts. The eligibility helper is an educational interface only; on-site medical assessment remains authoritative.

## License

No open-source license has been selected yet. Until one is added, the repository should be treated as a challenge submission and not as a grant of reuse rights.
