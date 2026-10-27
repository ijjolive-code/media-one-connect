"use client";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/icon";
import { Sheet } from "@/components/sheet";
import { venues } from "@/modules/knowledge/types";
import {
  MAX_HISTORY_CHARS,
  MAX_HISTORY_TURNS,
  hasPrivateDetails,
  type ConversationTurn,
} from "@/modules/concierge/context";
import type { Evidence } from "@/modules/concierge/answer-core";
type Reply = {
  kind: string;
  message: string;
  facts?: Evidence[];
  incomplete?: boolean;
};
type Exchange = { question: string; reply?: Reply; pending?: boolean };
const prompts = [
  "Where is the hotel?",
  "Help me choose a restaurant",
  "What time is check out?",
];
function errorCopy(kind: string) {
  switch (kind) {
    case "unavailable_offer":
      return "Current offer details aren’t available here. Please check directly with the venue.";
    case "not_connected":
      return "Concierge isn’t available right now. You can still browse the hotel guide.";
    case "usage_limited":
      return "Concierge can’t take another question right now. You can still browse the hotel guide.";
    case "private_details":
      return "Please leave contact, room and payment details out of this chat. I can help with hotel information.";
    case "context_limit":
    case "invalid_context":
      return "This conversation is a little long. Start a new chat and ask again.";
    case "knowledge_changed":
      return "The information changed while answering. Please ask again for the latest details.";
    default:
      return "Your message couldn’t be answered right now. Please try later or browse the hotel guide.";
  }
}
export function DemoConcierge({ active }: { active: boolean }) {
  const [conversation, setConversation] = useState<Exchange[]>([]),
    [draft, setDraft] = useState(""),
    [venue, setVenue] = useState<string>(venues[0].slug),
    [pending, setPending] = useState(false),
    [venueOpen, setVenueOpen] = useState(false),
    [resetOpen, setResetOpen] = useState(false),
    [unread, setUnread] = useState(false);
  const log = useRef<HTMLDivElement>(null),
    content = useRef<HTMLDivElement>(null),
    input = useRef<HTMLTextAreaElement>(null),
    requestId = useRef(0),
    controller = useRef<AbortController | null>(null),
    pinned = useRef(true),
    savedScroll = useRef(0),
    anchorTop = useRef(0),
    isActive = useRef(active);
  const appliedRoute = useRef("");
  const selected = venues.find((v) => v.slug === venue) || venues[0];
  useEffect(() => {
    isActive.current = active;
  }, [active]);
  // Scroll events may arrive after ResizeObserver in WebKit. Compare the actual
  // position with our last anchor before following, allowing for native clamping.
  const capturePosition = useCallback(() => {
    const element = log.current;
    if (!element) return;
    const maximum = Math.max(0, element.scrollHeight - element.clientHeight);
    const expected = Math.min(anchorTop.current, maximum);
    const nearBottom = maximum - element.scrollTop < 64;
    if (nearBottom) pinned.current = true;
    else if (Math.abs(element.scrollTop - expected) > 2) pinned.current = false;
    savedScroll.current = element.scrollTop;
    anchorTop.current = element.scrollTop;
  }, []);
  const placeTranscript = useCallback((top: number) => {
    if (!log.current) return;
    log.current.scrollTop = top;
    savedScroll.current = log.current.scrollTop;
    anchorTop.current = log.current.scrollTop;
  }, []);
  useLayoutEffect(() => {
    if (!active || !log.current) return;
    capturePosition();
    if (pinned.current) {
      placeTranscript(log.current.scrollHeight);
      setUnread(false);
    } else placeTranscript(savedScroll.current);
  }, [conversation, active, capturePosition, placeTranscript]);
  useEffect(() => {
    const element = content.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      if (!isActive.current || !log.current) return;
      capturePosition();
      if (pinned.current) placeTranscript(log.current.scrollHeight);
    });
    observer.observe(element);
    if (log.current) observer.observe(log.current);
    return () => {
      observer.disconnect();
      controller.current?.abort();
    };
  }, [capturePosition, placeTranscript]);
  function reset() {
    requestId.current++;
    controller.current?.abort();
    setPending(false);
    setConversation([]);
    setDraft("");
    setUnread(false);
    pinned.current = true;
    savedScroll.current = 0;
    setResetOpen(false);
  }
  // A venue deep link explicitly starts a different conversation. Ordinary tab navigation retains it.
  useEffect(() => {
    if (!active) {
      appliedRoute.current = "";
      return;
    }
    const route = window.location.search;
    if (appliedRoute.current === route) return;
    appliedRoute.current = route;
    const requested = new URLSearchParams(route).get("venue");
    if (
      requested &&
      venues.some((v) => v.slug === requested) &&
      requested !== venue
    ) {
      const frame = requestAnimationFrame(() => {
        reset();
        setVenue(requested);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [active, venue]);
  async function send(question: string) {
    if (pending || !question.trim()) return;
    const id = ++requestId.current;
    const abort = new AbortController();
    controller.current = abort;
    pinned.current = true;
    setUnread(false);
    setPending(true);
    setDraft("");
    setConversation((p) => [...p.slice(-9), { question, pending: true }]);
    try {
      const history: ConversationTurn[] = [];
      let size = 0;
      const prior = conversation.flatMap((m) =>
        m.reply?.kind === "model_grounded"
          ? [
              { role: "user" as const, text: m.question },
              { role: "assistant" as const, text: m.reply.message },
            ]
          : [],
      );
      for (const turn of prior.slice(-MAX_HISTORY_TURNS).reverse()) {
        if (size + turn.text.length > MAX_HISTORY_CHARS) break;
        history.unshift({
          ...turn,
          text: hasPrivateDetails(turn.text)
            ? "[Private detail omitted]"
            : turn.text,
        });
        size += turn.text.length;
      }
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, venue, history }),
        signal: abort.signal,
      });
      const data = (await response.json()) as Reply;
      const fictionalOffer = data.facts?.some(
        (f) =>
          f.key === "FICTIONAL-OFFER" ||
          (/^offer-/.test(f.id) && /fictional/i.test(f.label)),
      );
      const reply = fictionalOffer
        ? { kind: "unavailable_offer", message: errorCopy("unavailable_offer") }
        : data.kind === "model_grounded"
          ? data
          : { kind: data.kind || "unavailable", message: errorCopy(data.kind) };
      if (id !== requestId.current) return;
      capturePosition();
      if (!pinned.current) setUnread(true);
      setConversation((p) =>
        p.map((m, i) => (i === p.length - 1 ? { question, reply } : m)),
      );
    } catch {
      if (id === requestId.current)
        setConversation((p) =>
          p.map((m, i) =>
            i === p.length - 1
              ? {
                  question,
                  reply: {
                    kind: "network_error",
                    message: errorCopy("network_error"),
                  },
                }
              : m,
          ),
        );
    } finally {
      if (id === requestId.current) setPending(false);
    }
  }
  return (
    <section className="conversation-page" aria-label="AI concierge">
      <header className="conversation-heading">
        <div>
          <h1>Concierge</h1>
          <span>Media One’s AI concierge</span>
        </div>
        <div className="conversation-tools">
          <button
            className="venue-select-button"
            onClick={() => setVenueOpen(true)}
          >
            {selected.name}
            <span aria-hidden="true">⌄</span>
          </button>
          <button
            className="round-link"
            onClick={() => setResetOpen(true)}
            aria-label="New conversation"
            disabled={!conversation.length && !draft}
          >
            <Icon name="request" />
          </button>
        </div>
      </header>
      <div className="chat-layout">
        <div className="chat-main">
          <div
            ref={log}
            className="chat-transcript"
            role="log"
            aria-label="Concierge conversation"
            aria-live="polite"
            tabIndex={0}
            onScroll={() => {
              capturePosition();
              if (pinned.current) setUnread(false);
            }}
          >
            <div ref={content} className="transcript-content">
              <div className="chat-welcome">
                <span className="chat-brand-symbol">
                  <Icon name="chat" />
                </span>
                <h2>A little local knowledge.</h2>
                <p>
                  Ask about the hotel, explore a venue or find your next stop.
                </p>
                <Link
                  className="text-link"
                  href={`/hotel/knowledge?venue=${venue}`}
                >
                  Browse the guide <Icon name="arrow" />
                </Link>
                <small>
                  Information is provisional. Please confirm important details
                  with the hotel.
                </small>
              </div>
              {conversation.map((m, i) => (
                <div className="exchange" key={i}>
                  <div className="message guest-message">
                    <span className="sr-only">You: </span>
                    <p>{m.question}</p>
                  </div>
                  <div
                    className={`message assistant-message ${m.reply && m.reply.kind !== "model_grounded" ? "message-error" : ""}`}
                  >
                    <span className="sr-only">AI Concierge: </span>
                    {m.pending ? (
                      <span
                        className="typing-indicator"
                        role="status"
                        aria-label="Concierge is replying"
                      >
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      <>
                        <p>{m.reply?.message}</p>
                        {m.reply?.incomplete && (
                          <small className="reply-qualification">
                            Some details couldn’t be confirmed.
                          </small>
                        )}
                        {m.reply?.facts?.some((f) =>
                          /fictional/i.test(f.label),
                        ) && (
                          <small className="content-label">
                            Fictional test content
                          </small>
                        )}
                        {!!m.reply?.facts?.length && (
                          <details className="answer-sources">
                            <summary
                              onClick={() => {
                                pinned.current = false;
                              }}
                            >
                              Sources and conditions
                            </summary>
                            {m.reply.facts.map((f) => (
                              <article className="source-item" key={f.id}>
                                <p>{f.text}</p>
                                <small>
                                  {f.label.replaceAll(" — ", " · ")}
                                  <br />
                                  {f.key} ·{" "}
                                  {f.sources.map((s) => s.id).join(", ")}
                                  {f.reviewDue
                                    ? " · Review before " + f.reviewDue
                                    : ""}
                                </small>
                              </article>
                            ))}
                          </details>
                        )}
                        {m.reply?.kind !== "model_grounded" && (
                          <div className="message-actions">
                            <Link href={`/hotel/knowledge?venue=${venue}`}>
                              Hotel guide
                            </Link>
                            <button
                              onClick={() => {
                                setDraft(m.question);
                                input.current?.focus();
                              }}
                            >
                              Edit message
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {unread && (
            <button
              className="new-reply"
              onClick={() => {
                pinned.current = true;
                if (log.current)
                  log.current.scrollTop = log.current.scrollHeight;
                setUnread(false);
              }}
            >
              New reply ↓
            </button>
          )}
          <div
            className="suggested-questions"
            aria-label="Suggested questions"
            hidden={conversation.length > 0}
          >
            {prompts.map((p) => (
              <button key={p} onClick={() => void send(p)} disabled={pending}>
                {p}
                <Icon name="arrow" />
              </button>
            ))}
          </div>
          <form
            className="composer"
            onSubmit={(e) => {
              e.preventDefault();
              void send(draft.trim());
            }}
          >
            <label className="sr-only" htmlFor="concierge-message">
              Message the concierge
            </label>
            <div className="composer-row">
              <textarea
                ref={input}
                id="concierge-message"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={1}
                maxLength={1000}
                autoComplete="off"
                placeholder="What would you like to know?"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing
                  ) {
                    e.preventDefault();
                    void send(draft.trim());
                  }
                }}
              />
              <button
                type="submit"
                aria-label="Send concierge question"
                disabled={pending || !draft.trim()}
              >
                <Icon name="arrow" />
              </button>
            </div>
            <p>Please don’t share personal or payment details.</p>
          </form>
        </div>
        <aside className="chat-companion">
          <div className="chat-companion-image" aria-hidden="true" />
          <h2>
            Good company.
            <br />
            Local knowledge.
          </h2>
          <p>Find out more about the places that make Media One.</p>
          <Link className="text-link" href="/explore">
            Explore our venues <Icon name="arrow" />
          </Link>
          <p className="action-note">
            I can share information. Bookings and requests are handled directly
            with the hotel or venue.
          </p>
        </aside>
      </div>
      <Sheet
        open={venueOpen}
        onClose={() => setVenueOpen(false)}
        title="Where are we exploring?"
      >
        <p className="section-description">
          Changing venue starts a new conversation.
        </p>
        <div className="venue-choices">
          {venues.map((v) => (
            <button
              key={v.slug}
              aria-pressed={venue === v.slug}
              onClick={() => {
                if (venue !== v.slug) {
                  reset();
                  setVenue(v.slug);
                }
                setVenueOpen(false);
              }}
            >
              {v.name}
              <span aria-hidden="true">
                {venue === v.slug ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                ) : (
                  <Icon name="arrow" />
                )}
              </span>
            </button>
          ))}
        </div>
      </Sheet>
      <Sheet
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Start a new conversation?"
      >
        <p>Your current messages and draft will be cleared.</p>
        <div className="button-row">
          <button className="button primary" onClick={reset}>
            Clear conversation
          </button>
          <button className="button" onClick={() => setResetOpen(false)}>
            Keep chatting
          </button>
        </div>
      </Sheet>
    </section>
  );
}
