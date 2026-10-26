"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { venues } from "@/modules/knowledge/types";
import { MAX_HISTORY_CHARS, MAX_HISTORY_TURNS, hasPrivateDetails, type ConversationTurn } from "@/modules/concierge/context";
import type { Evidence } from "@/modules/concierge/answer-core";
type Reply = {
  kind: string;
  message: string;
  facts?: Evidence[];
  incomplete?: boolean;
  notice?: string;
};
type Exchange = { question: string; reply?: Reply; pending?: boolean };
const prompts = [
  "Where is the hotel?",
  "What is the cancellation policy?",
  "What published gym membership prices can I check?",
  "What fictional demo offers are published?",
];
export function DemoConcierge({
  configuration,
}: {
  configuration: "key_missing" | "disabled" | "configured";
}) {
  const [conversation, setConversation] = useState<Exchange[]>([]);
  const [draft, setDraft] = useState("");
  const [venue, setVenue] = useState<string>(venues[0].slug);
  const [pending, setPending] = useState(false);
  const [connected, setConnected] = useState(false);
  const transcript = useRef<HTMLDivElement>(null),
    requestId = useRef(0),
    controller = useRef<AbortController | null>(null);
  useEffect(() => {
    if (transcript.current)
      transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [conversation]);
  useEffect(() => {
    const log = transcript.current;
    if (!log) return;
    const observer = new ResizeObserver(() => {
      log.scrollTop = log.scrollHeight;
    });
    observer.observe(log);
    return () => {
      observer.disconnect();
      controller.current?.abort();
    };
  }, []);
  function reset() {
    requestId.current++;
    controller.current?.abort();
    setPending(false);
    setConversation([]);
    setConnected(false);
    setDraft("");
  }
  async function send(question: string) {
    if (pending) return;
    const id = ++requestId.current;
    const abort = new AbortController();
    controller.current = abort;
    setPending(true);
    setDraft("");
    setConversation((p) => [...p.slice(-9), { question, pending: true }]);
    try {
      const history: ConversationTurn[] = [];
      let size = 0;
      const previous = conversation.flatMap(m => m.reply?.kind === "model_grounded" ? [{role: "user" as const, text: m.question}, {role: "assistant" as const, text: m.reply.message}] : []);
      for (const turn of previous.slice(-MAX_HISTORY_TURNS).reverse()) {
        if (size + turn.text.length > MAX_HISTORY_CHARS) break;
        history.unshift({ ...turn, text: hasPrivateDetails(turn.text) ? "[Private detail omitted]" : turn.text });
        size += turn.text.length;
      }
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, venue, history }),
        signal: abort.signal,
      });
      const reply = (await response.json()) as Reply;
      if (id !== requestId.current) return;
      setConnected(reply.kind === "model_grounded");
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
                    message:
                      "The concierge could not be reached. No answer or action was produced.",
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
    <>
      <header className="conversation-heading">
        <div>
          <h1>Concierge</h1>
          <p>
            <span className="status-dot" />
            {connected
              ? "AI concierge · connected"
              : configuration === "configured"
                ? "AI configured · not yet checked"
                : "AI not connected · setup required"}
          </p>
        </div>
        <button
          className="reset-button"
          onClick={reset}
          disabled={!conversation.length && !draft}
        >
          Reset conversation
        </button>
      </header>
      <div className="conversation-columns">
        <section
          className="chat-panel ai-chat"
          aria-label="Source-grounded concierge"
          aria-busy={pending}
        >
          <label className="concierge-venue">
            Venue
            <select
              aria-label="Concierge venue"
              value={venue}
              onChange={(e) => {
                reset();
                setVenue(e.target.value);
              }}
            >
              {venues.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <div
            ref={transcript}
            className="chat-transcript"
            role="log"
            tabIndex={0}
            aria-label="Concierge conversation"
            aria-live="polite"
          >
            <div className="conversation-date">
              PRIVATE PROTOTYPE · SOURCED FACTS ARE PROVISIONAL
            </div>
            <div className="assistant-group">
              <span className="assistant-avatar" aria-hidden="true">
                <Icon name="chat" />
              </span>
              <div className="chat-message assistant">
                <span className="message-label">HOTEL CONCIERGE</span>
                <p>
                  Hi! What can I help you with? Choose a venue above if you’re asking about a restaurant.
                </p>
                <p>
                  {configuration === "configured"
                    ? "I can help with hotel information. I can’t make bookings or send requests to the team here yet."
                    : "The AI connection isn’t enabled here yet. You can still browse the hotel information below."}
                </p>
                <Link
                  className="text-link"
                  href={"/hotel/knowledge?venue=" + venue}
                >
                  Browse published knowledge
                </Link>
              </div>
            </div>
            {conversation.map((exchange, index) => (
              <div className="exchange" key={index}>
                <div className="chat-message guest">
                  <span className="message-label">YOUR QUESTION</span>
                  <p>{exchange.question}</p>
                </div>
                <div className="assistant-group">
                  <span className="assistant-avatar" aria-hidden="true">
                    <Icon name="chat" />
                  </span>
                  <div className="chat-message assistant">
                    <span className="message-label">
                      {exchange.pending
                        ? "CHECKING YOUR QUESTION"
                        : exchange.reply?.kind === "model_grounded"
                          ? "AI CONCIERGE"
                          : "NO MODEL ANSWER"}
                    </span>
                    <p>
                      {exchange.pending
                        ? "Checking the current published information…"
                        : exchange.reply?.message}
                    </p>
                    {!!exchange.reply?.facts?.length && (
                      <>
                        <p className="answer-qualification">{exchange.reply.facts.some(f => /fictional/i.test(f.label)) ? "Includes fictional test content. " : ""}{exchange.reply.facts.some(f => /provisional/i.test(f.label)) ? "Provisional information for this private prototype." : "Reviewed for this private prototype."}</p>
                        <details className="answer-sources">
                          <summary>Sources and conditions</summary>
                          {exchange.reply.facts.map(f => (
                            <article className="answer-evidence" key={f.id}>
                              <span className="status-tag">{f.label}</span>
                              <p>{f.text}</p>
                              <small>{f.key} · {f.sources.map(s => s.id).join(", ")}{f.reviewDue ? " · Review before " + f.reviewDue : ""}</small>
                            </article>
                          ))}
                        </details>
                      </>
                    )}
                    {exchange.reply?.incomplete && <p className="answer-notice">Some details aren’t confirmed. No request or booking was made.</p>}
                    {exchange.reply?.notice && (
                      <p className="answer-notice">{exchange.reply.notice}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <details className="question-picker">
            <summary>
              Try a question <span>Free-text AI</span>
            </summary>
            <div className="sample-options">
              {prompts.map((p) => (
                <button key={p} disabled={pending} onClick={() => send(p)}>
                  {p}
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
          </details>
          <form
            className="composer"
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) void send(draft.trim());
            }}
          >
            <label className="sr-only" htmlFor="concierge-message">
              Message the concierge
            </label>
            <div className="composer-row">
              <input
                id="concierge-message"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={1000}
                autoComplete="off"
                placeholder="Ask about your hotel…"
              />
              <button
                type="submit"
                aria-label="Send concierge question"
                disabled={pending || !draft.trim()}
              >
                <Icon name="arrow" />
              </button>
            </div>
            <p>Private test · No contact, stay or payment details</p>
          </form>
        </section>
        <aside className="demo-explainer">
          <span className="status-tag">Sourced information is provisional</span>
          <h2>Answers with evidence.</h2>
          <p>
            The AI uses recent conversation to understand follow ups and reads current eligible knowledge for each answer. Sources stay available below a reply. Protected prices and conditions are retained.
          </p>
          <h3>Separate content labels</h3>
          <p>
            Provisional hotel facts await review. Staff-reviewed prototype
            information and fictional test offers have distinct labels.
          </p>
          <h3>No operational actions</h3>
          <p>
            No request, staff message or reservation can be created here.
            Missing sources and provider failures produce an honest limitation,
            not a scripted substitute.
          </p>
          <h3>Trial limits</h3>
          <p>
            USD 5 total authorised trial; no automatic reset or increase.
            Per-session, concurrency and daily limits also apply.
          </p>
        </aside>
      </div>
    </>
  );
}
