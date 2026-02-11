export function extractDragonPageSlug(pageUrl: string) {
    const slug = pageUrl.split("/").pop()

    if (!slug) {
        throw new Error(`Not found dragon page slug at: ${pageUrl}`)
    }

    return slug
}
