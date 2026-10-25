"use client";
import { useState } from "react";
import { demoQuestions } from "@/modules/concierge/demo";
import { Icon } from "@/components/icon";

type Question = (typeof demoQuestions)[number];
export function DemoConcierge() {
  const [conversation, setConversation] = useState<Question[]>([]);
  return <div className="concierge-layout">
    <section className="chat-panel" aria-label="Scripted concierge demonstration"><div className="chat-header"><span className="icon-tile lilac"><Icon name="spark" /></span><div><h2>One little conversation.</h2><p>Scripted demo · Not live AI</p></div><button className="reset-button" onClick={() => setConversation([])} disabled={conversation.length === 0}>Reset demo</button></div>
      <div className="chat-transcript" role="log" aria-label="Sample conversation" aria-live="polite" aria-relevant="additions"><div className="chat-message assistant"><span className="message-label">DEMO CONCIERGE</span><p>Welcome to this fictional Media One Hotel experience. I can show you sample replies to the questions below. I’m not connected to hotel staff or live services.</p></div>{conversation.map((question, index) => <div className="exchange" key={`${question.id}-${index}`}><div className="chat-message guest"><span className="message-label">YOUR SAMPLE QUESTION</span><p>{question.label}</p></div><div className="chat-message assistant"><span className="message-label">SCRIPTED SAMPLE REPLY</span><p>{question.answer}</p></div></div>)}</div>
      <div className="question-picker"><p>CHOOSE A SAMPLE QUESTION</p><div>{demoQuestions.map(question => <button key={question.id} onClick={() => setConversation(previous => [...previous.slice(-9), question])}>{question.label}<Icon name="arrow" style={{ transform: "rotate(-45deg)", width: 14, height: 14 }} /></button>)}</div><small>Demo history stays in this page only and clears when you reload. No personal details needed.</small></div>
    </section><aside className="demo-explainer"><span className="status-tag">Demonstration only</span><h2>A preview of the idea.</h2><p>These replies are prewritten examples using fictional content. No model, WhatsApp account or hotel system is connected.</p><h3>What works here</h3><p>Choose a question, read its sample reply and reset the conversation.</p><h3>What comes later</h3><p>Free-text AI conversations, approved hotel knowledge, saved requests and staff handover.</p><div className="note-rule">Choosing “speak to the team” does not send a message or create a service request.</div></aside>
  </div>;
}
