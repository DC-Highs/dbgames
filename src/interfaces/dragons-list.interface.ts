import { Alphabet, DragonElement, DragonRarity, DragonstSortBy, OrderBy } from "../enums"
import { PreviewDragon } from "./preview-dragon.interface"
import { ValueOfEnum } from "../utils/value-of-enum.util"
import { GetDragonsOptions } from "../dbgames"

export interface DragonsListMeta {
    elements?: ValueOfEnum<DragonElement>[]
    rarities?: ValueOfEnum<DragonRarity>[]
    startsWith?: ValueOfEnum<Alphabet>
    sortBy?: ValueOfEnum<DragonstSortBy>
    orderBy?: ValueOfEnum<OrderBy>
    description?: string
    name?: string
    totalEstimated: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
}

export interface DragonsList {
    data: PreviewDragon[]
    meta: DragonsListMeta
    params: GetDragonsOptions
}
