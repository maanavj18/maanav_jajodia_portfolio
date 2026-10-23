// Headlines are cut from the first bullet of an entry, never written fresh.
// The lead clause becomes the headline and the remainder becomes the deck,
// so every word on the page still traces back to content/site.md.

const MIN_HEAD_WORDS = 4;

function participleIndex(words: string[]): number {
  for (let i = MIN_HEAD_WORDS; i < words.length; i++) {
    if (/^[a-z]+ing$/.test(words[i])) return i;
  }
  return -1;
}

export function splitLead(sentence: string): { head: string; deck?: string } {
  const text = sentence.trim();
  const cuts: number[] = [];

  const comma = text.indexOf(", ");
  if (comma > 0) cuts.push(comma);

  const via = text.indexOf(" via ");
  if (via > 0) cuts.push(via);

  const words = text.split(" ");
  const participle = participleIndex(words);
  if (participle > 0) cuts.push(words.slice(0, participle).join(" ").length);

  const valid = cuts.filter((cut) => text.slice(0, cut).split(" ").length >= MIN_HEAD_WORDS);
  if (valid.length === 0) return { head: text.replace(/\.$/, "") };

  const cut = Math.min(...valid);
  const rest = text.slice(cut).replace(/^[,:\s]+/, "");
  return {
    head: text.slice(0, cut).replace(/[,\s]+$/, ""),
    deck: rest.charAt(0).toUpperCase() + rest.slice(1),
  };
}