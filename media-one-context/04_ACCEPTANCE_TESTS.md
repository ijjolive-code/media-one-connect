# Initial acceptance and evidence plan

All cases start NOT RUN. These are proposed requirements, not completed tests or measured results. Refine with approved content, actual roles, provider details and the selected pilot.

For every execution record: test ID; date; build/commit; environment; tester; expected and actual outcome; pass/fail/blocked; evidence; and defect reference. Use fictional identities and benefits unless authorised otherwise.

| ID | Area and scenario | Expected outcome |
| --- | --- | --- |
| A01 | Open the guest app on a phone and laptop | Core navigation, reading and forms usable; no layout-blocking issues |
| A02 | Known venue question | Answer matches current approved source and venue |
| A03 | Missing/conflicting information | Clarifies or offers assistance; no invented policy, price or benefit |
| A04 | Staff changes an approved offer | Updated offer appears on web and in subsequent chatbot lookups |
| A05 | Expired/not-yet-valid offer | Correct validity shown; not presented as currently available |
| A06 | Arabic/Russian question and language switch | Fluent reviewer confirms meaning, dates, amounts and conditions; unsupported quality stated |
| A07 | Tomorrow, midnight and ambiguous dates | Dubai-relative date interpreted; ambiguity clarified |
| A08 | Real message on project WhatsApp number | Message reaches shared backend and a relevant reply returns |
| A09 | Replay inbound message/action | No duplicate request, redemption or unintended repeated business action |
| A10 | Guest requests human help; staff takes over | Staff sees context and bot stops responding during human ownership |
| A11 | Staff ends handover | Bot resumes only under the defined explicit rule |
| A12 | Unstaffed queue / after-hours request | Truthful hours and route; no false promise of immediate response |
| A13 | Guest submits request; staff updates status | One persistent request, authorised assignment and truthful guest status |
| A14 | Failed request save or external timeout | No success claim; actionable fallback and logged failure |
| A15 | Guest opens staff page or API | Server/database denies unauthorised access |
| A16 | Guest attempts another member's records | No private record disclosure or unauthorised modification |
| A17 | Input asks for secrets or unauthorised action | No credential disclosure; backend rejects actions outside authority |
| A18 | Guest registers and verifies contact | One valid membership; invalid/expired verification rejected |
| A19 | Membership versus marketing choices | Preferences stored distinctly; marketing signup is not silently imposed |
| A20 | Member QR shared or modified | No unrestricted redemption/write access or private-data exposure |
| A21 | Authorised staff redeems eligible benefit | Eligibility checked; one redemption with actor, time, venue and entitlement |
| A22 | Two simultaneous redemption attempts | Exactly one succeeds for a single-use entitlement; result persisted atomically |
| A23 | Expired, ineligible, already-used benefit | Correct rejection; no balance/history corruption |
| A24 | Open public review route for each pilot venue | Correct destination without mandatory membership or private feedback |
| A25 | Negative versus positive private feedback | Same public review opportunity; private feedback can create a service task |
| A26 | Review link click with no public submission | Recorded as click only; no fabricated published review or staff attribution |
| A27 | Open room/dining booking handoff | Correct destination and context where supported; no claim of confirmation |
| A28 | Live room search: occupancy, fees, restrictions | Matches authorised source; full conditions and timestamp preserved |
| A29 | Unavailable inventory or failed live lookup | Correct unavailable/error state; no fake live fallback |
| A30 | Review reply approval and publishing | Correct venue/signatory; authorised mode; confirmed posting or explicit failure |
| A31 | Review sync repeated/partial | Correct provenance, no duplication, known coverage/freshness limitations visible |
| A32 | Logs, exports and recovery | Necessary audit evidence available without leaking secrets; restore/recovery exercised |

## Proposed pilot conditions

- Zero unresolved critical defects, including guest-data exposure, false booking confirmation, duplicate redemption or loss of staff takeover.
- At least 90% correct on an agreed core answer set, judged by a human reviewer. All release-critical prices, dates and conditions must be correct. These are proposed thresholds to confirm, not measured performance.
- Functional staff ownership, approved pilot data and an operationally reviewed test route.
- Aim for 10-15 invited testers and at least 50 recorded scenarios; report actual sample size if smaller.
- Report functional/connected/simulated status separately. Blocked live tests remain blocked.

## Management evidence

Present coherent journeys, test results, staff/user feedback, actual software/message costs and remaining work. Compare like-for-like baseline and pilot handling effort where samples exist. Do not turn link clicks into bookings/revenue or a small pilot into guaranteed annual savings. A successful invited pilot is not automatic permission for the hotel number or supplier retirement.
