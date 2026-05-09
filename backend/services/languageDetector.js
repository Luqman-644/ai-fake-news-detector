const URDU_REGEX = /[\u0600-\u06FF]/;

export function detectLanguage(text, selected = 'auto') {
  if (selected && selected !== 'auto') return selected.toLowerCase();
  return URDU_REGEX.test(text) ? 'urdu' : 'english';
}
