import { sites } from "../data/sites"

export type SearchResult = {
  domain: string
  action: string
  score: number
}

export function search(query: string): SearchResult[] {
  const q = query.toLowerCase()
  const results: SearchResult[] = []

  for (const [domain, site] of Object.entries(sites)) {
    for (const action of site.actions) {
      let score = 0

      // 🔥 intent matching (MOST IMPORTANT)
      for (const intent of action.intent) {
        if (q.includes(intent.toLowerCase())) {
          score += 5
        }
      }

      // name match
      if (action.name.toLowerCase().includes(q)) {
        score += 3
      }

      // description match
      if (action.description.toLowerCase().includes(q)) {
        score += 2
      }

      if (score > 0) {
        results.push({
          domain,
          action: action.id,
          score
        })
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 5)
}