"use client";
import { useEffect, useRef, useState } from "react";
import { demoQuestions } from "@/modules/concierge/demo";
import { Icon } from "@/components/icon";

type Exchange = { question: string; answer: string };
export function DemoConcierge() {
  const [conversation, setConversation] = useState<Exchange[]>([]);
  const [draft, setDraft] = useState("");
  const transcript = useRef<HTMLDivElement>(null);
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
    return () => observer.disconnect();
  }, []);
  function addMessage(question: string) {
    const sample = demoQuestions.find(
      (item) => item.label.toLowerCase() === question.toLowerCase(),
    );
    const answer =
      sample?.answer ??
      "This scripted demonstration only answers the four sample questions. No AI is connected. No staff message, request or booking was created.";
    setConversation((previous) => [
      ...previous.slice(-9),
      { question, answer },
    ]);
    setDraft("");
  }
  return (
    <>
      <header className="conversation-heading">
        <div>
          <h1>Concierge</h1>
          <p>
            <span className="status-dot" />
            Scripted demo · Not live AI
          </p>
        </div>
        <button
          className="reset-button"
          onClick={() => {
            setConversation([]);
            setDraft("");
          }}
          disabled={conversation.length === 0 && !draft}
        >
          Reset demo
        </button>
      </header>
      <div className="conversation-columns">
        <section
          className="chat-panel"
          aria-label="Scripted concierge demonstration"
        >
          <div
            ref={transcript}
            className="chat-transcript"
            role="log"
            tabIndex={0}
            aria-label="Sample conversation"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="conversation-date">
              DEMONSTRATION · THIS SESSION ONLY
            </div>
            <div className="assistant-group">
              <span className="assistant-avatar" aria-hidden="true">
                <Icon name="chat" />
              </span>
              <div className="chat-message assistant">
                <span className="message-label">DEMO CONCIERGE</span>
                <p>
                  Hello! Try a sample question about your stay. My replies are
                  prewritten examples using fictional hotel content.
                </p>
                <p>I’m not connected to hotel staff or live services.</p>
              </div>
            </div>
            {conversation.map((exchange, index) => (
              <div className="exchange" key={index}>
                <div className="chat-message guest">
                  <span className="message-label">YOUR DEMO MESSAGE</span>
                  <p>{exchange.question}</p>
                </div>
                <div className="assistant-group">
                  <span className="assistant-avatar" aria-hidden="true">
                    <Icon name="chat" />
                  </span>
                  <div className="chat-message assistant">
                    <span className="message-label">SCRIPTED SAMPLE REPLY</span>
                    <p>{exchange.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <details className="question-picker">
            <summary>
              Try a sample question <span>4 examples</span>
            </summary>
            <div className="sample-options">
              {demoQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => addMessage(question.label)}
                >
                  {question.label}
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
          </details>
          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              if (draft.trim()) addMessage(draft.trim());
            }}
          >
            <label className="sr-only" htmlFor="demo-message">
              Message the demonstration concierge
            </label>
            <div className="composer-row">
              <input
                id="demo-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={240}
                autoComplete="off"
                placeholder="Type a demo message…"
              />
              <button
                type="submit"
                aria-label="Send demo message"
                disabled={!draft.trim()}
              >
                <Icon name="arrow" />
              </button>
            </div>
            <p>Local demo only · Don’t enter personal details</p>
          </form>
        </section>
        <aside className="demo-explainer">
          <span className="status-tag">Demonstration only</span>
          <h2>A conversation preview.</h2>
          <p>
            Try the four sample questions, or type a local demo message. Only
            the sample questions have scripted answers; other messages get a
            clear limitation reply.
          </p>
          <h3>No live services</h3>
          <p>
            Nothing is sent to staff, WhatsApp, a model or a booking system. No
            requests or reservations are created.
          </p>
          <h3>Just this session</h3>
          <p>
            Reset or reload to clear the conversation. No personal details are
            needed.
          </p>
          <span className="sample-label">Fictional hotel content</span>
        </aside>
      </div>
    </>
  );
}
