// Cuvinte comune care vor fi ignorate în matching
const STOP_WORDS = new Set([
  // Romanian
  "și",
  "sau",
  "dar",
  "că",
  "de",
  "la",
  "în",
  "cu",
  "pe",
  "pentru",
  "prin",
  "din",
  "către",
  "asupra",
  "este",
  "sunt",
  "era",
  "erau",
  "va",
  "vor",
  "ar",
  "poate",
  "trebuie",
  "poate",
  "foarte",
  "mai",
  "cel",
  "cea",
  "cei",
  "cele",
  "un",
  "una",
  "unei",
  "unor",
  "al",
  "a",
  "ai",
  "ale",
  "o",
  "i",
  "se",
  "să",
  "nu",
  "ne",
  "le",
  "îi",
  "îl",
  "ea",
  "el",
  "ei",
  "ele",
  "noi",
  "voi",
  "lor",
  "acest",
  "această",
  "acești",
  "aceste",
  "acel",
  "acea",
  "acei",
  "acele",
  "care",
  "ce",
  "când",
  "unde",
  "cum",
  "de",
  "ce",
  "cine",
  "cui",
  "cărei",
  "căror",
  "al",
  "căruia",
  "căreia",

  // English
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "up",
  "about",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "between",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "must",
  "can",
  "shall",
  "very",
  "more",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "my",
  "your",
  "his",
  "her",
  "its",
  "our",
  "their",
  "which",
  "what",
  "when",
  "where",
  "why",
  "how",
  "who",
  "whom",
  "whose",
  "if",
  "unless",
  "until",
  "while",
])

// Funcție pentru normalizarea textului
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Înlocuiește punctuația cu spații
    .replace(/\s+/g, " ") // Înlocuiește spațiile multiple cu unul singur
    .trim()
}

// Extrage cuvintele cheie dintr-un text
function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text)
  const words = normalized.split(" ")

  return words
    .filter((word) => word.length > 2) // Ignoră cuvintele foarte scurte
    .filter((word) => !STOP_WORDS.has(word)) // Ignoră cuvintele comune
    .filter((word) => !/^\d+$/.test(word)) // Ignoră numerele pure (păstrează cuvintele cu numere)
}

// Calculează similaritatea între două seturi de cuvinte
function calculateSimilarity(keywords1: string[], keywords2: string[]): number {
  if (keywords1.length === 0 || keywords2.length === 0) {
    return 0
  }

  const set1 = new Set(keywords1)
  const set2 = new Set(keywords2)

  // Calculează intersecția
  const intersection = new Set([...set1].filter((x) => set2.has(x)))

  // Calculează uniunea
  const union = new Set([...set1, ...set2])

  // Jaccard similarity
  return intersection.size / union.size
}

// Verifică dacă răspunsul utilizatorului se potrivește cu răspunsul corect
export function matchAnswer(
  userAnswer: string,
  correctAnswer: string,
  threshold = 0.4,
): {
  isMatch: boolean
  score: number
  matchedKeywords: string[]
  missedKeywords: string[]
} {
  const userKeywords = extractKeywords(userAnswer)
  const correctKeywords = extractKeywords(correctAnswer)

  const userSet = new Set(userKeywords)
  const correctSet = new Set(correctKeywords)

  const matchedKeywords = [...correctSet].filter((keyword) => userSet.has(keyword))
  const missedKeywords = [...correctSet].filter((keyword) => !userSet.has(keyword))

  // Calculează scorul bazat pe câte cuvinte cheie importante au fost prinse
  const score = correctKeywords.length > 0 ? matchedKeywords.length / correctKeywords.length : 0

  return {
    isMatch: score >= threshold,
    score: Math.round(score * 100),
    matchedKeywords,
    missedKeywords,
  }
}

// Oferă sugestii pentru îmbunătățirea răspunsului
export function getAnswerHints(userAnswer: string, correctAnswer: string): string[] {
  const result = matchAnswer(userAnswer, correctAnswer)
  const hints: string[] = []

  if (result.missedKeywords.length > 0) {
    hints.push(`Cuvinte cheie lipsă: ${result.missedKeywords.slice(0, 3).join(", ")}`)
  }

  if (result.score < 30) {
    hints.push("Încearcă să incluzi mai multe concepte tehnice din domeniu")
  } else if (result.score < 60) {
    hints.push("Bun început! Adaugă mai multe detalii specifice")
  }

  return hints
}
