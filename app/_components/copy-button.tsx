"use client";

import { useEffect, useState } from "react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <span className="copy">
      <button type="button" onClick={copy}>
        {label}
      </button>
      <span className="copy-state" role="status">
        {state === "copied" ? "Copied" : state === "failed" ? "Select and copy manually" : ""}
      </span>
    </span>
  );
}
