import { StringTransformer, Transformer } from "@xcrap/transformer"
import type { Localization } from "@dchighs/dc-localization"
import { css, xpath, extract } from "@xcrap/extractor"

import { ValueOfEnum, pickKeys, extractAttackIdFromNameKey, extractPageNumberFromUrl } from "./utils"
import { Alphabet, DragonElement, DragonRarity, DragonstSortBy, OrderBy } from "./enums"
import { dragonsPageTransformingModel } from "./transforming-models/dragons-page.model"
import { dragonPageTransformingModel } from "./transforming-models/dragon-page.model"
import { dragonsPageExtractionModel } from "./parsing-models/dragons-page.model"
import { dragonPageExtractionModel } from "./parsing-models/dragon-page.model"
import { FullDataDragon, DragonsList } from "./interfaces"
import { baseUrl, Client } from "./client"

const previewDragonKeysInOrder = [
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
] as const

const fullDataDragonKeysInOrder = [
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
    "attacks",
    "attributes",
    "trainable_attacks",
    "img_name",
] as const

export type DbgamesOptions = {
    localization: Localization
}

export type GetDragonsOptions = {
    elements?: ValueOfEnum<DragonElement>[]
    rarities?: ValueOfEnum<DragonRarity>[]
    startsWith?: ValueOfEnum<Alphabet>
    sortBy?: ValueOfEnum<DragonstSortBy>
    orderBy?: ValueOfEnum<OrderBy>
    description?: string
    page?: number
    name?: string
}

export type GetDragonOptions = {
    slug: string
}

export class Dbgames {
    readonly client: Client
    readonly localization: Localization

    constructor({ localization }: DbgamesOptions) {
        this.client = new Client()
        this.localization = localization
    }

    async getDragon({ slug }: GetDragonOptions): Promise<FullDataDragon<true>> {
        const parser = await this.client.fetch({
            path: `/dragons/${slug}`,
        })

        const rawDragon = await parser.extractModel({ model: dragonPageExtractionModel })

        const transformer = new Transformer(rawDragon)

        const transformedDragonData = (await transformer.transform(
            dragonPageTransformingModel,
        )) as FullDataDragon<false>["data"]

        const transformedAggregated: FullDataDragon<true> = {
            data: {
                ...transformedDragonData,
                attacks: transformedDragonData.attacks.map((attack) => {
                    const attackNameKey = this.localization.getKeyFromValue(attack.name)

                    if (!attackNameKey) {
                        throw new Error(`Not found attack name key from: ${attack.name}`)
                    }

                    return {
                        id: extractAttackIdFromNameKey(attackNameKey),
                        name: attack.name,
                        name_key: attackNameKey,
                        type: attack.type,
                        element: attack.element,
                        training_time: attack.training_time,
                        ui_damage: attack.ui_damage,
                    }
                }),
                trainable_attacks: transformedDragonData.trainable_attacks.map((attack) => {
                    const attackNameKey = this.localization.getKeyFromValue(attack.name)

                    if (!attackNameKey) {
                        throw new Error(`Not found attack name key from: ${attack.name}`)
                    }

                    return {
                        id: extractAttackIdFromNameKey(attackNameKey),
                        name: attack.name,
                        name_key: attackNameKey,
                        type: attack.type,
                        element: attack.element,
                        training_time: attack.training_time,
                        ui_damage: attack.ui_damage,
                    }
                }),
            },
            meta: {
                pageUrl: `${baseUrl}/dragons/${slug}`,
            },
        }

        return {
            data: pickKeys(transformedAggregated.data, fullDataDragonKeysInOrder),
            meta: transformedAggregated.meta,
        }
    }

    async getDragons({
        elements,
        rarities,
        startsWith,
        sortBy,
        page,
        name,
        orderBy,
        description,
    }: GetDragonsOptions): Promise<DragonsList> {
        const parser = await this.client.fetch({
            path: "/dragons",
            params: {
                name: name,
                element: elements?.join(","),
                rarity: rarities?.join(","),
                startswith: startsWith,
                sortby: sortBy,
                sortorder: orderBy,
                description: description,
                p: page,
            },
        })

        const rawDragons = await parser.extractModel({ model: dragonsPageExtractionModel })

        const pageUrls = await parser.extractValues({
            query: css(".result-data .subtitle:first-child a"),
            extractor: extract("href"),
        })

        const nextPageUrl = await parser.extractValue({
            query: xpath("//a[text()='Next >']"),
            extractor: extract("href"),
            default: null,
        })

        const lastPageUrl = await parser.extractValue({
            query: xpath("//a[contains(text(), 'Last')]"),
            extractor: extract("href"),
            default: null,
        })

        const previousPageUrl = await parser.extractValue({
            query: xpath("//a[contains(text(), '< Prev')]"),
            extractor: extract("href"),
            default: null,
        })

        const currentPageUrl = await parser.extractValue({
            query: css("a.active"),
            extractor: extract("href"),
        })

        const nextPageNumber = extractPageNumberFromUrl(nextPageUrl)
        const lastPageNumber = extractPageNumberFromUrl(lastPageUrl)
        const currentPageNumber =
            extractPageNumberFromUrl(currentPageUrl) ?? (page && !isNaN(Number(page)) ? Number(page) : 1)
        const previousPageNumber = extractPageNumberFromUrl(previousPageUrl)

        const transformer = new Transformer(rawDragons)

        const transformedDragons = (await transformer.transform(dragonsPageTransformingModel)) as {
            dragons: Record<string, any>[]
        }

        const lastPage = lastPageNumber ?? currentPageNumber
        const itemsPerPage = 10

        return {
            data: transformedDragons.dragons.map((dragon, i) => ({
                data: pickKeys(dragon, previewDragonKeysInOrder),
                meta: {
                    pageUrl: StringTransformer.resolveUrl(baseUrl)(pageUrls[i] as string),
                },
            })) as DragonsList["data"],
            meta: {
                totalEstimated: itemsPerPage * lastPage,
                lastPage: lastPage,
                currentPage: currentPageNumber,
                perPage: itemsPerPage,
                prev: previousPageNumber,
                next: nextPageNumber,
            },
            params: {
                elements: elements,
                rarities: rarities,
                startsWith: startsWith,
                sortBy: sortBy,
                orderBy: orderBy,
                description: description,
                name: name,
            },
        }
    }
}
