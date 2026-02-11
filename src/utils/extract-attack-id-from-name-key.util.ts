import { regexHelper } from "../helpers/regex.helper"

export function extractAttackIdFromNameKey(nameKey: string): number | null {
    const match = nameKey.match(regexHelper.dragonAttackId)

    if (!match?.groups?.id) {
        if (nameKey && nameKey.length > 1) {
            return null
        }

        throw new Error(`Attack id not found at: ${nameKey}`)
    }

    return Number(match.groups.id)
}
