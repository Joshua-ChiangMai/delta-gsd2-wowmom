type ArtifactGroup = {
  step: string;
  title: string;
  description: string;
  items: string[];
  source: string;
};

type EvaluationSection = {
  title: string;
  summary: string;
};

const flow = ["Specification", "Analysis", "Artifacts", "Evaluation"];

const artifactGroups: ArtifactGroup[] = [
  {
    step: "Step 1",
    title: "Analysis Artifacts",
    description:
      "Established the initial vocabulary for the WOW Mom prototype and separated confirmed context from assumptions.",
    source: "/artifacts/01-04",
    items: [
      "Core entities",
      "User roles",
      "Workflows",
      "Business relationships",
    ],
  },
  {
    step: "Step 2",
    title: "Generated Specification Artifacts",
    description:
      "Translated the analysis model into implementation-facing specs for data, API, UI, permissions, and architecture.",
    source: "/artifacts/05-11",
    items: [
      "Database schema",
      "Backend API structure",
      "Workflow state transitions",
      "Frontend screen structure",
      "Role permissions matrix",
      "Architecture notes",
      "Developer documentation",
    ],
  },
  {
    step: "Step 3",
    title: "Evaluation",
    description:
      "Reviewed consistency, usefulness, risks, and production readiness of the generated artifact chain.",
    source: "/docs/evaluation.md",
    items: [
      "Context consistency",
      "Artifact quality",
      "Workflow understanding",
      "Specification coverage",
      "Strengths of gsd-2",
      "Weaknesses and limitations",
      "Overall conclusion",
    ],
  },
];

const evaluationSections: EvaluationSection[] = [
  {
    title: "Context Consistency",
    summary:
      "The artifact chain stayed mostly aligned around a household-centered model spanning entities, schema, API routes, screens, state transitions, and permissions.",
  },
  {
    title: "Artifact Quality",
    summary:
      "The most useful outputs were the database schema, API structure, state transitions, permissions matrix, and developer documentation.",
  },
  {
    title: "Workflow Understanding",
    summary:
      "The workflows form a plausible family care coordination process, but they still need validation against a formal WOW Mom product spec.",
  },
  {
    title: "Specification Coverage",
    summary:
      "Household roles, child profiles, tasks, routines, support requests, notes, and notifications were covered well for a prototype.",
  },
  {
    title: "Production Readiness",
    summary:
      "The artifacts are useful planning material, not final implementation contracts. Privacy, authorization, UX, and data rules need review.",
  },
];

const keyFindings = [
  "gsd-2 was useful for early planning and artifact generation.",
  "The generated artifact chain was internally coherent.",
  "The missing formal WOW Mom spec means some domain details are assumption-based.",
  "Product and engineering validation are still required.",
];

const sourceFiles = [
  "01-core-entities.md",
  "02-user-roles.md",
  "03-workflows.md",
  "04-business-relationships.md",
  "05-database-schema.md",
  "06-backend-api-structure.md",
  "07-workflow-state-transitions.md",
  "08-frontend-screen-structure.md",
  "09-role-permissions-matrix.md",
  "10-architecture-notes.md",
  "11-developer-documentation.md",
  "docs/evaluation.md",
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="eyebrow">Project Delta demo dashboard</div>
        <h1 id="page-title">
          Project Delta: gsd-2 Specification-Driven Development Evaluation
        </h1>
        <p>
          A lightweight meeting view for showing how the WOW Mom prototype moved
          from an initial specification prompt into analysis, generated
          engineering artifacts, and a realistic evaluation.
        </p>
      </section>

      <section className="section" aria-labelledby="flow-title">
        <div className="section-heading">
          <span>Experiment Flow</span>
          <h2 id="flow-title">Specification to Evaluation</h2>
        </div>
        <ol className="flow">
          {flow.map((item) => (
            <li key={item}>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="artifacts-title">
        <div className="section-heading">
          <span>Generated Outputs</span>
          <h2 id="artifacts-title">Artifact Groups</h2>
        </div>
        <div className="card-grid">
          {artifactGroups.map((group) => (
            <article className="card artifact-card" key={group.title}>
              <div className="card-kicker">{group.step}</div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="source-label">{group.source}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column" aria-labelledby="findings-title">
        <article className="panel">
          <div className="section-heading compact">
            <span>Meeting Takeaways</span>
            <h2 id="findings-title">Key Findings</h2>
          </div>
          <ul className="finding-list">
            {keyFindings.map((finding) => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading compact">
            <span>Prototype Scope</span>
            <h2>Demo Summary</h2>
          </div>
          <p>
            This prototype evaluates whether AI can generate consistent
            development artifacts from a large application specification. It is
            not a production WOW Mom app; the value is in the reviewable
            artifact chain and the engineering feedback loop it enables.
          </p>
        </article>
      </section>

      <section className="section" aria-labelledby="evaluation-title">
        <div className="section-heading">
          <span>Evaluation Results</span>
          <h2 id="evaluation-title">What The Review Found</h2>
        </div>
        <div className="evaluation-grid">
          {evaluationSections.map((section) => (
            <article className="mini-card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="sources-title">
        <div className="section-heading">
          <span>Source Material</span>
          <h2 id="sources-title">Markdown Files Summarized</h2>
        </div>
        <div className="source-list">
          {sourceFiles.map((file) => (
            <span key={file}>{file}</span>
          ))}
        </div>
      </section>
    </main>
  );
}

export { App };
