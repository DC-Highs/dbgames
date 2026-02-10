import { IPreviewDragon } from "../interfaces/preview-dragon.interface"
import { Dbgames } from "../dbgames"
import { extractDragonPageSlug } from "../utils"

export class PreviewDragon {
    readonly data: IPreviewDragon["data"]
    readonly meta: IPreviewDragon["meta"]

    constructor(
        private readonly dbgames: Dbgames,
        raw: IPreviewDragon,
    ) {
        this.data = raw.data
        this.meta = raw.meta
    }

    async getFullData() {
        const parser = await this.dbgames.getDragon({
            slug: extractDragonPageSlug(this.meta.pageUrl)
        })

        return parser
    }
}
