"use client";

import { useEffect } from "react";

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
  );
}

function primaryTable(): HTMLTableElement | null {
  return document.querySelector<HTMLTableElement>("table[data-index='primary']");
}

function visibleRows(table: HTMLTableElement): HTMLTableRowElement[] {
  return [...(table.tBodies[0]?.rows ?? [])].filter((row) => !row.hidden);
}

function setCursor(table: HTMLTableElement, row: HTMLTableRowElement | null) {
  const rows = table.tBodies[0]?.rows;
  if (!rows) return;
  for (const candidate of rows) {
    if (row && candidate === row) candidate.dataset.active = "true";
    else delete candidate.dataset.active;
  }
}

function rowSearchText(row: HTMLTableRowElement): string {
  const copy = row.cloneNode(true) as HTMLElement;
  copy.querySelectorAll(".cell-label").forEach((label) => label.remove());
  return (copy.textContent ?? "").toLowerCase();
}

function applyFilter(input: HTMLInputElement) {
  const table = primaryTable();
  const body = table?.tBodies[0];
  if (!table || !body) return;
  const query = input.value.trim().toLowerCase();
  let shown = 0;
  for (const row of body.rows) {
    const text = rowSearchText(row);
    const match = query.length === 0 || text.includes(query);
    row.hidden = !match;
    if (!match) delete row.dataset.active;
    else shown += 1;
  }
  document.querySelectorAll<HTMLElement>("[data-entry]").forEach((entry) => {
    const key = entry.dataset.entry;
    if (!key) return;
    const row = table.querySelector<HTMLTableRowElement>(`tr[data-key="${CSS.escape(key)}"]`);
    if (row) entry.hidden = row.hidden;
  });
  const empty = document.getElementById("index-empty");
  if (empty) empty.hidden = shown !== 0;
  if (!table.querySelector("tbody tr[data-active='true']")) {
    const first = visibleRows(table)[0];
    if (first) first.dataset.active = "true";
  }
}

function sortTable(table: HTMLTableElement, th: HTMLTableCellElement, key: string) {
  const body = table.tBodies[0];
  if (!body) return;
  const current = th.getAttribute("aria-sort");
  const prefer = th.dataset.prefer === "descending" ? "descending" : "ascending";
  const next = current === "ascending" ? "descending" : current === "descending" ? "ascending" : prefer;
  for (const header of table.tHead?.rows[0]?.cells ?? []) {
    header.setAttribute("aria-sort", header === th ? next : "none");
  }
  const direction = next === "ascending" ? 1 : -1;
  const rows = [...body.rows].sort((a, b) => {
    const av = a.querySelector<HTMLElement>(`[data-col="${CSS.escape(key)}"]`)?.dataset.value ?? "";
    const bv = b.querySelector<HTMLElement>(`[data-col="${CSS.escape(key)}"]`)?.dataset.value ?? "";
    return av.localeCompare(bv, "en", { numeric: true, sensitivity: "base" }) * direction;
  });
  for (const row of rows) body.appendChild(row);
  const button = th.querySelector("button");
  if (button) {
    const label = (button.textContent ?? key).trim().toLowerCase();
    button.setAttribute("aria-label", `Sort by ${label}, currently ${next}`);
  }
}

export function KeyboardLayer() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (isTypingTarget(event.target)) {
        if (key === "Escape" && event.target instanceof HTMLElement) {
          event.preventDefault();
          event.target.blur();
        }
        return;
      }
      if (key === "/") {
        const filter = document.getElementById("index-filter");
        if (!(filter instanceof HTMLInputElement)) return;
        event.preventDefault();
        filter.focus();
        const end = filter.value.length;
        filter.setSelectionRange(end, end);
        return;
      }
      const table = primaryTable();
      if (!table) return;
      if (key === "j" || key === "k") {
        const rows = visibleRows(table);
        if (rows.length === 0) return;
        event.preventDefault();
        const current = rows.findIndex((row) => row.dataset.active === "true");
        const nextIndex =
          key === "j"
            ? current < 0
              ? 0
              : Math.min(rows.length - 1, current + 1)
            : current < 0
              ? rows.length - 1
              : Math.max(0, current - 1);
        const row = rows[nextIndex];
        setCursor(table, row);
        row.querySelector<HTMLElement>("a")?.focus();
        row.scrollIntoView({ block: "nearest", behavior: "auto" });
        return;
      }
      if (key === "Enter") {
        const active = document.activeElement;
        if (active instanceof HTMLAnchorElement || active instanceof HTMLButtonElement) return;
        const row = table.querySelector<HTMLTableRowElement>("tbody tr[data-active='true']");
        if (!row || row.hidden) return;
        const link = row.querySelector<HTMLAnchorElement>("a");
        if (!link) return;
        event.preventDefault();
        link.click();
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button[data-sort]");
      if (!(button instanceof HTMLButtonElement)) return;
      const th = button.closest("th");
      const table = button.closest("table");
      const sortKey = button.dataset.sort;
      if (!(th instanceof HTMLTableCellElement) || !(table instanceof HTMLTableElement) || !sortKey) return;
      sortTable(table, th, sortKey);
    };

    const onInput = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.id === "index-filter") applyFilter(target);
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const table = target.closest("table[data-index='primary']");
      if (!(table instanceof HTMLTableElement)) return;
      const row = target.closest("tr");
      if (!(row instanceof HTMLTableRowElement) || !table.tBodies[0]?.contains(row)) return;
      setCursor(table, row);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document.addEventListener("input", onInput);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.removeEventListener("input", onInput);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return null;
}
