"use client";
import { useSyncExternalStore } from "react";
import type { Evidence } from "@/modules/concierge/answer-core";
import { FactList } from "./fact-list";
// A small per-tab memory store. Reload clears it; no URL, browser storage or profile writes.
const queries = new Map<string, string>();
const listeners = new Set<() => void>();
const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};
export function KnowledgeBrowser({
  facts,
  scope,
}: {
  facts: Evidence[];
  scope: string;
}) {
  const query = useSyncExternalStore(
    subscribe,
    () => queries.get(scope) || "",
    () => "",
  );
  const setQuery = (value: string) => {
    queries.set(scope, value);
    listeners.forEach((fn) => fn());
  };
  const matches = facts.filter((f) =>
    (f.question + " " + f.text)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <label className="search-field">
        <span>Find an answer</span>
        <input
          type="search"
          value={query}
          maxLength={120}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try check out or getting here"
        />
      </label>
      <p className="result-count" role="status">
        {query
          ? `${matches.length} ${matches.length === 1 ? "answer" : "answers"} found`
          : `${facts.length} helpful answers`}
      </p>
      {matches.length ? (
        <FactList facts={matches} />
      ) : (
        <div className="inline-empty">
          <h2>Try another question.</h2>
          <p>No matching information was found. You can also ask Concierge.</p>
          <button className="text-link" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
