import localFont from "next/font/local";

export const commitMono = localFont({
  src: [
    { path: "../fonts/CommitMono-400-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/CommitMono-700-Regular.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Courier New", "monospace"],
});
