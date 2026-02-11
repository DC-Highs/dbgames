export function pickKeys<T extends Record<string, any>, const K extends readonly (keyof T)[]>(
    obj: T,
    keys: K,
): Pick<T, K[number]> {
    const out = {} as Pick<T, K[number]>

    for (const key of keys) {
        out[key] = obj[key]
    }

    return out
}
