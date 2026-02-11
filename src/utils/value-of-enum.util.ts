export type ValueOfEnum<T extends string | number | bigint | boolean | null | undefined> = T | `${T}`
