import { sites, Site } from "../data/sites"

export function match(query: string) {
  const matches: any[] = []

  for (const [domain, site] of Object.entries(sites) as [string, Site][]) {
    for (const action of site.actions) {
      if (
        action.intent.some((i: string) =>
          query.toLowerCase().includes(i)
        )
      ) {
        matches.push({ domain, action: action.id })
      }
    }
  }

  return matches
}