# Proposed build and delivery plan

This is a starting sequence to refine after repository inspection and capacity confirmation. It does not claim implementation or test completion.

## Capacity and calendar

The earlier plan proposed 26 October 2026 to 15 January 2027 and eight Ijlal hours per week. Neither dates nor capacity are confirmed. Eight hours for 12 weeks gives 96 available hours; supplier turnaround, technical review and participating staff effort are additional. The expanded app-and-loyalty scope needs re-estimation. Confirm the presentation date, protected time, sponsor and pilot venue early. Festive workload and holidays are not accounted for by assuming uninterrupted availability.

## First Codex session: establish the project

1. Read the handoff and inspect existing files, instructions, framework and Git status.
2. Summarise understanding and reconcile any contradictions. Preserve existing work.
3. Integrate persistent project guidance into root AGENTS.md without replacing existing applicable instructions.
4. Recommend the smallest maintainable architecture, with current official documentation for version-sensitive setup.
5. Produce a milestone checklist with dependencies, estimates, acceptance and the next task.
6. Identify missing accounts/tools/access and only the questions that change the next task. Distinguish evidence from assumptions.

The output is a concrete project foundation and plan. Product feature implementation is the following task.

## Initial development sequence

| Milestone | Working outcome | Acceptance evidence |
| --- | --- | --- |
| M0: repository foundation | Runnable minimal web app, documented local setup, sample data and recoverable history | Ijlal opens it and observes a small change; build/checks recorded |
| M1: content and roles | Guest venue/offer views; authenticated staff content editing; basic database policies | One approved offer changes in guest view; guest cannot edit it |
| M2: assistant and requests | Web concierge reads approved records; creates a request; staff see/update it | One request is persisted and status returned truthfully; unknown facts handled |
| M3: WhatsApp and handover | Same services on a real separate test number; conversation ownership and staff takeover | Test message/reply, context, duplicate event and bot-pause evidence |
| M4: membership and benefit | Verified registration, member ID/QR, one benefit and staff redemption | Concurrent attempts yield one redemption; other-user access denied |
| M5: reviews and booking | Venue review links, optional feedback, booking handoff; authorised live connector if available | Correct destinations; no sentiment gate; clicks/confirmations distinguished |
| M6: invited pilot and handover | Measured trials, fixes, cost model, runbook and presentation | Critical tests pass, evidence retained, limitations and next-stage plan explicit |

M3 onboarding/access work starts during M0; it must not wait for all website features. Loyalty discovery and review differentiation also start early. Work in small complete slices within each milestone.

## Suggested 12-week allocation

| Weeks | Main focus | Parallel dependency work |
| --- | --- | --- |
| 1 | Scope, existing project audit, architecture and basic runnable app | Identify provider, test route, API entitlements, sponsor and time |
| 2-3 | Approved content, staff roles, guest interface and shared backend | Prove test WhatsApp receive/reply as early as access permits |
| 4-5 | Grounded assistant, requests, handover and WhatsApp reliability | Language reviewers; live connector documentation and sample responses |
| 6-7 | Basic membership/benefit redemption; feedback/review journey | Validate review-capture hypotheses and measure guest effort |
| 8-9 | Booking handoff; one useful live integration if available; hardening | Technical review, pilot staffing, cost/ownership checks |
| 10-11 | Invited testing, critical fixes, measurement and runbook | Presentation and backup demonstration |
| 12 | Regression, rehearsal and HIPO presentation | Record requested next-stage approvals and remaining parity gaps |

If capacity is insufficient, propose an explicit scope trade-off to Ijlal. Preserve functioning WhatsApp/web concierge, staff ownership and testing. Reduce conditional integrations or loyalty breadth rather than silently replacing real behaviour with decorative screens. A change to core scope must be recorded.

## Testing and evidence workflow

For each slice: state expected behaviour, implement, run appropriate checks, inspect the actual interface and record results with a build/commit reference. Include negative paths. Before a major change, preserve a useful version. End sessions with what changed, what was verified, what Ijlal can test and the next task.

Maintain a defect log with severity, reproduction, impact, owner and verification. Tests in this handoff begin NOT RUN. Re-run affected cases after changes and the critical suite before the pilot/presentation. Keep fictional-data demonstrations distinguishable from authenticated live results.

## Cost and operating work

Record development subscriptions/overages separately from hosting, database, guest-facing AI, WhatsApp/provider, identity messaging, integration access, technical review and ongoing support. No approved budget is known. Use measured traffic and written quotes for projections. Tool subscriptions do not establish production operating cost.

Define content owners, inbox staffing, escalation, backup/restore, deployment recovery and incident responsibility. Prepare the main-number cutover and Touchpoint retirement plans as later deliverables; the HIPO demonstration does not itself approve either.
