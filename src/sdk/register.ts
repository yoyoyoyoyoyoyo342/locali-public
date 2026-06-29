import { sites, Site } from "../data/sites"
import { validateSite } from "./validate"
import { discovery } from "../data/discovery"

export function registerSite(domain: string, site: Site) {
  if (sites[domain]) {
    throw new Error("Site already exists")
  }

  const error = validateSite(site)

  if (error) {
    throw new Error(error)
  }

  sites[domain] = site

  discovery.latest.unshift(domain)

  return {
    success: true,
    domain,
    message: "LAWP site registered"
  }
}