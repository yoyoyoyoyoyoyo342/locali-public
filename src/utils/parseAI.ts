export function safeParseJSON(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    // try to extract JSON from messy response
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)

    if (match) {
      try {
        return JSON.parse(match[0])
      } catch {
        return null
      }
    }

    return null
  }
}