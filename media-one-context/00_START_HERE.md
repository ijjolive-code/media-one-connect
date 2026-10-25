# Media One Connect: start here

Prepared for Ijlal Zeeshan on 25 October 2026. Working product name; branding is not approved.

This is a product and engineering handoff, not an implemented application. It gives the new Codex session the context of the planning conversation. It does not transfer the original chat's memory, credentials or connected accounts.

## For Ijlal

1. Extract the ZIP. Keep the `media-one-context` folder together.
2. Put that folder inside the project folder you opened in Codex. If you cannot find the project folder, ask Codex to identify it first. This is a context folder, not a runnable app.
3. Start a Codex chat in that project and paste the instruction below.
4. Let Codex inspect any existing work before it changes files. The first response should establish the project and its plan; it should not generate an entire super app in one pass.

## First instruction to paste into Codex

Read every Markdown file in `media-one-context`, starting with `00_START_HERE.md`. Treat these as the handoff from our planning conversation. My name is Ijlal; I am a non-coder leading Media One Hotel's 12-week HIPO project.

Inspect the existing project and its instructions before changing anything. Preserve existing code and do not overwrite existing documentation. Reconcile this brief with what is already present. Adapt the persistent working rules in `media-one-context/AGENTS.md` into the project's root `AGENTS.md`, preserving existing applicable instructions and using correct document paths. This context folder's AGENTS file is a template; putting it in a subfolder alone does not apply it to the whole repository.

For this first task, establish context and produce a concrete implementation plan rather than building product features. Summarise the complete vision, the 12-week working pilot, the external dependencies and the decisions still open. Recommend a simple maintainable architecture, explain the trade-offs in plain English, and propose a build sequence with demonstrable acceptance criteria. Identify which parts can work now and which require external accounts or access. Keep code development tools separate from the guest-facing AI service.

Record the resulting architecture, decisions, open questions and next task in the repository so future sessions can continue. Ask only the few questions that materially affect the next step. Do not interpret this brief as permission to publish, use the main hotel WhatsApp number, contact suppliers or change production systems.

## Document map

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Template for concise persistent development instructions |
| `01_PROJECT_BRIEF.md` | Business context, users, product vision, pilot scope and architecture direction |
| `02_BUILD_PLAN.md` | Proposed delivery order, first tasks, evidence and capacity decisions |
| `03_INTEGRATIONS_AND_TOUCHPOINT_PARITY.md` | System access, provider questions and replacement acceptance |
| `04_ACCEPTANCE_TESTS.md` | Initial test scenarios and release conditions |
| `05_DECISIONS_AND_PROGRESS.md` | Initial decision register, unknowns and handoff state |

## Keep the handoff current

Use the brief for intended behaviour, a decision log for changes, and test evidence for what actually works. After implementation begins, update progress with a date, build or commit reference, verification and remaining blockers. Do not label suggested features or untested connectors as complete.

The earlier Word plan and Excel tracker were prepared on 24 October 2026 with a narrower chatbot scope. They do not yet reflect all the subsequent guest-app, loyalty and Codex-first decisions. If those files are supplied later, reconcile their scope and task IDs explicitly; do not silently treat the old tool choices as current or overwrite their recorded results.
