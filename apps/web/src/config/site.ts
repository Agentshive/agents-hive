import { env } from "~/env"

export const siteConfig = {
  name: "Agentshive",
  tagline: "The Largest AI Agent Marketplace.",
  description:
    "AI SDR agents are artificial intelligence-driven tools designed to assist in sales development. They automate lead generation, engage with potential customers through personalized communication, qualify leads, and schedule appointments, allowing human sales teams to focus on closing deals and building relationships.",
  email: env.NEXT_PUBLIC_SITE_EMAIL,
  url: env.NEXT_PUBLIC_SITE_URL,

  alphabet: "abcdefghijklmnopqrstuvwxyz",
  toolsPerPage: 35,
  alternativesPerPage: 54,

  affiliateUrl: "https://go.openalternative.co",
}
