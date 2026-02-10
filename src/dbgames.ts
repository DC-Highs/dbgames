import { StringTransformer, Transformer } from "@xcrap/transformer"
import { extract } from "@xcrap/parser"

import { dragonsPageTransformingModel } from "./transforming-models/dragons-page.model"
import { Alphabet, DragonElement, DragonRarity, DragonstSortBy } from "./enums"
import { dragonsPageParsingModel } from "./parsing-models/dragons-page.model"
import { PreviewDragon } from "./navigables"
import { baseUrl, Client } from "./client"
import { FullDataDragon } from "./interfaces/full-data-dragon.interface"
import { dragonPageParsingModel } from "./parsing-models/dragon-page.model"

export type GetDragonsOptions = {
    elements?: DragonElement[]
    rarities?: DragonRarity[]
    alphabet?: Alphabet
    sortBy?: DragonstSortBy
    page?: number
}

const dragonKeysInOrder = [
    "id",
    "name",
    "name_key",
    "group_type",
    "hatching_time",
    "breeding_time",
    "description",
    "description_key",
    "xp",
    "starting_coins",
    "coins_added",
    "dragon_rarity",
    "attributes",
    "img_name",
]

export type GetDragonOptions = {
    slug: string
}

export class Dbgames {
    readonly client: Client

    constructor() {
        this.client = new Client()
    }

    async getDragon({ slug }: GetDragonOptions): Promise<FullDataDragon> {
        const parser = await this.client.fetch({
            path: `/dragons/${slug}`,
        })

        const data = await parser.extractFirst({ model: dragonPageParsingModel })

        return data
    }

    async getDragons({ elements, rarities, alphabet, sortBy, page }: GetDragonsOptions) {
        const parser = await this.client.fetch({
            path: "/dragons",
            params: {
                element: elements?.join(","),
                rarity: rarities?.join(","),
                startswith: alphabet,
                sortby: sortBy,
                p: page,
            },
        })

        const rawDragons = await parser.extractFirst({ model: dragonsPageParsingModel })

        const pageUrls = await parser.parseMany({
            query: ".result-data .subtitle:first-child a",
            extractor: extract("href", true),
        })

        const transformer = new Transformer(rawDragons)

        const transformedDragons = (await transformer.transform(dragonsPageTransformingModel)) as {
            dragons: Record<string, any>[]
        }

        return {
            ...transformedDragons,
            dragons: transformedDragons.dragons.map(
                (dragon, i) =>
                    new PreviewDragon(this, {
                        data: {
                            ...dragonKeysInOrder.reduce(
                                (acc, key) => {
                                    acc[key] = dragon[key]
                                    return acc
                                },
                                {} as Record<string, string | null | string[]>,
                            ),
                        },
                        meta: {
                            pageUrl: StringTransformer.resolveUrl(baseUrl)(pageUrls[i] as string),
                        },
                    } as any),
            ),
        }
    }
}

const dbgames = new Dbgames()

export default dbgames
