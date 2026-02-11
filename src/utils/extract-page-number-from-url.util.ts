import { baseUrl } from "../client"

export function extractPageNumberFromUrl(url: string | null): number | null {
    if (!url) return null

    try {
        const urlObj = new URL(url, baseUrl)
        const p = urlObj.searchParams.get("p")
        return p ? parseInt(p, 10) : null
    } catch {
        return null
    }
}
