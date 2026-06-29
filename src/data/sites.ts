// src/data/sites.ts

export type Action = {
  id: string
  name: string
  description: string
  intent: string[]
  input: {
    type: "text" | "number" | "none"
    required: boolean
  }
  run?: (input?: any) => Promise<any>
}

export type Site = {
  name: string
  content: Record<string, any>
  actions: Action[]
}

// 👇 THIS LINE FIXES "not a module" BUG
export const sites: Record<string, Site> = {}

// -----------------------
// SEED DATA
// -----------------------

sites["rejn.app"] = {
  name: "Rejn",
  content: {
    location: "Copenhagen"
  },
  actions: [
    {
      id: "weather",
      name: "weather",
      description: "Get live weather data",
      intent: ["weather", "temperature", "forecast"],
      input: {
        type: "text",
        required: false
      },
      run: async () => {
        return {
          temperature: "18°C",
          condition: "cloudy"
        }
      }
    }
  ]
}

sites["abdisbarber.com"] = {
  name: "Abdi's Barber",
  content: {
    location: "Amsterdam"
  },
  actions: [
    {
      id: "book",
      name: "book",
      description: "Book a haircut appointment",
      intent: ["book haircut", "appointment", "barber"],
      input: {
        type: "text",
        required: false
      },
      run: async () => {
        return {
          status: "booking requested"
        }
      }
    }
  ]
}

sites["locali.run"] = {
  name: "Locali",
  content: {
    description: "AI web layer"
  },
  actions: [
    {
      id: "search",
      name: "search",
      description: "Search the AI web layer",
      intent: ["search", "find", "look up"],
      input: {
        type: "text",
        required: true
      },
      run: async (input: string) => {
        return {
          query: input
        }
      }
    }
  ]
}

