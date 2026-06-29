import { sites, Site, Action } from "../data/sites"

export async function resolveAction(
  domain: string,
  actionId: string,
  input?: any
) {
  const site = sites[domain]

  if (!site) throw new Error("site not found")

  const action = site.actions.find(
    (a: Action) => a.id === actionId
  )

  if (!action) throw new Error("action not found")
  if (!action.run) throw new Error("action not executable")

  const data = await action.run(input)

  return {
    site: site.name,
    domain,
    action: action.id,
    data
  }
}