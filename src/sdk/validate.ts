import { Site } from "../data/sites"

export function validateSite(site: Site) {
  if (!site.name) return "missing name"
  if (!site.actions) return "missing actions"

  for (const action of site.actions) {
    if (!action.id) return "action missing id"
    if (!action.name) return "action missing name"
    if (!action.intent) return "action missing intent"
  }

  return null
}