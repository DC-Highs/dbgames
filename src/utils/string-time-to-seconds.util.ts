export function stringTimeToSeconds(time: string) {
    const secondsPerMinute = 60
    const minutesPerHour = 60
    const secondsPerHour = secondsPerMinute * minutesPerHour
    const [hours, minutes, seconds] = time.split(":").map(Number)
    const totalSeconds = hours * secondsPerHour + minutes * secondsPerMinute + seconds
    return totalSeconds
}
