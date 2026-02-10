import { ArrayTransformer, StringTransformer, transform, TransformingModel } from "@xcrap/transformer"
import { DragonElement, DragonStaticFileUrlParser, elementSettings } from "@dchighs/dc-core"

import { regexHelper } from "../helpers/regex.helper"
import { stringTimeToSeconds } from "../utils"

export const dragonTransformingModel = new TransformingModel({
    id: [
        transform({
            key: "heading",
            transformer: StringTransformer.extract(regexHelper.dragonId, 1),
        }),
        transform({
            key: "id",
            transformer: StringTransformer.toNumber,
        }),
    ],
    name: [
        transform({
            key: "heading",
            transformer: StringTransformer.extract(regexHelper.dragonName, 1),
        }),
    ],
    name_key: [
        transform({
            key: "id",
            transformer: (id: number) => `tid_unit_${id}_name`,
        }),
    ],
    description: [
        transform({
            key: "description",
            transformer: StringTransformer.trim,
        }),
    ],
    description_key: [
        transform({
            key: "id",
            transformer: (id: number) => `tid_unit_${id}_description`,
        }),
    ],
    dragon_rarity: [
        transform({
            key: "rarity",
            transformer: StringTransformer.toUpperCase,
        }),
        transform({
            key: "dragon_rarity",
            transformer: StringTransformer.substr(0, 1),
        }),
    ],
    attributes: [
        transform({
            key: "elements",
            transformer: ArrayTransformer.map(StringTransformer.toLowerCase),
        }),
        transform({
            key: "attributes",
            transformer: (elements: DragonElement[]) => {
                return elements.map((element) => elementSettings[element].acronym)
            },
        }),
    ],
    img_name: [
        transform({
            key: "firstImageUrl",
            transformer: DragonStaticFileUrlParser.getImageName,
        }),
    ],
    hatching_time: [
        transform({
            key: "hatchingTime",
            condition: (value) => value !== null,
            transformer: StringTransformer.trim,
        }),
        transform({
            key: "hatching_time",
            condition: (value) => value !== null,
            transformer: stringTimeToSeconds,
        }),
    ],
    breeding_time: [
        transform({
            key: "breedingTime",
            condition: (value) => value !== null,
            transformer: StringTransformer.trim,
        }),
        transform({
            key: "breeding_time",
            condition: (value) => value !== null,
            transformer: stringTimeToSeconds,
        }),
    ],
    xp: [
        transform({
            key: "xpOnHatching",
            condition: (value) => value !== null,
            transformer: StringTransformer.replace(/,/g, ""),
        }),
        transform({
            key: "xp",
            condition: (value) => value !== null,
            transformer: StringTransformer.toNumber,
        }),
    ],
    starting_coins: [
        transform({
            key: "goldProductionInfo",
            condition: (value) => value !== null,
            transformer: StringTransformer.extract(regexHelper.dragonStartingCoins, 1),
        }),
        transform({
            key: "starting_coins",
            condition: (value) => value !== null,
            transformer: StringTransformer.toNumber,
        }),
    ],
    coins_added: [
        transform({
            key: "goldProductionInfo",
            condition: (value) => value !== null,
            transformer: StringTransformer.extract(regexHelper.dragonCoinsIncome, 1),
        }),
        transform({
            key: "coins_added",
            condition: (value) => value !== null,
            transformer: StringTransformer.toNumber,
        }),
    ],
}).after({
    delete: ["heading", "goldProductionInfo", "hatchingExperience", "xpOnHatching", "firstImageUrl", "elements"],
    append: {
        group_type: "DRAGON",
    },
})
