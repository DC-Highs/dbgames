export function stringDurationToSeconds(input: string): number {
    const [valueStr, unit] = input.split(" ")
    const value = Number(valueStr)

    const unitMap: Record<string, number> = {
        second: 1,
        seconds: 1,
        minute: 60,
        minutes: 60,
        hour: 3600,
        hours: 3600,
        day: 86400,
        days: 86400,
    }

    const multiplier = unitMap[unit.toLowerCase()]

    if (!multiplier) {
        throw new Error(`Invalid time unit: ${unit}`)
    }

    return value * multiplier
}
