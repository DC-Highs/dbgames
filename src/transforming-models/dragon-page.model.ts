import { ArrayTransformer, StringTransformer, transform, TransformingModel } from "@xcrap/transformer"
import { DragonElement, DragonStaticFileUrlParser, elementSettings } from "@dchighs/dc-core"

import { stringDurationToSeconds, stringTimeToSeconds } from "../utils"
import { regexHelper } from "../helpers/regex.helper"

const attackTransformingModel = new TransformingModel({
    name: [
        transform({
            key: "name",
            transformer: StringTransformer.trim,
        }),
        transform({
            key: "name",
            condition: (value) => value === "Judo Kick",
            transformer: () => "Judo Throw",
        }),
        transform({
            key: "name",
            condition: (value) => value === "Karate Brick Break",
            transformer: () => "Brick Break",
        }),
        transform({
            key: "name",
            condition: (value) => value === "Head Butt",
            transformer: () => "Headbutt",
        }),
        transform({
            key: "name",
            condition: (value) => value === "Original Pain",
            transformer: () => "Archaic Pain",
        }),
    ],
    type: [
        transform({
            key: "element",
            transformer: StringTransformer.trim,
        }),
        transform({
            key: "type",
            transformer: StringTransformer.toLowerCase,
        }),
    ],
    element: [
        transform({
            key: "element",
            transformer: StringTransformer.trim,
        }),
        transform({
            key: "element",
            transformer: StringTransformer.toLowerCase,
        }),
        transform({
            key: "element",
            transformer: (element: DragonElement) => elementSettings[element].acronym,
        }),
    ],
    ui_damage: [
        transform({
            key: "power",
            transformer: StringTransformer.toNumber,
        }),
    ],
    training_time: [
        transform({
            key: "trainingTime",
            transformer: stringDurationToSeconds,
        }),
    ],
}).after({
    delete: ["power", "trainingTime"],
})

export const dragonPageTransformingModel = new TransformingModel({
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
    tempAttacks: [
        transform({
            key: "allAttacks",
            transformer: ArrayTransformer.slice(0, 4),
        }),
    ],
    attacks: {
        key: "tempAttacks",
        multiple: true,
        model: attackTransformingModel,
    },
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
    tempTrainableAttacks: [
        transform({
            key: "allAttacks",
            transformer: ArrayTransformer.slice(4, 8),
        }),
    ],
    trainable_attacks: {
        key: "tempTrainableAttacks",
        multiple: true,
        model: attackTransformingModel,
    },
    img_name: [
        transform({
            key: "firstImageUrl",
            condition: (value) => !!value,
            transformer: DragonStaticFileUrlParser.getImageName,
        }),
        transform({
            key: "firstImageUrl",
            condition: (value) => !value,
            transformer: () => null,
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
            condition: (value) => !!value,
            transformer: StringTransformer.replace(/,/g, ""),
        }),
        transform({
            key: "xp",
            condition: (value) => !!value,
            transformer: StringTransformer.toNumber,
        }),
        transform({
            key: "xp",
            condition: (value) => !value,
            transformer: () => null,
        }),
    ],
    starting_coins: [
        transform({
            key: "goldProductionInfo",
            condition: (value) => !!value,
            transformer: StringTransformer.extract(regexHelper.dragonStartingCoins, 1),
        }),
        transform({
            key: "starting_coins",
            condition: (value) => !!value,
            transformer: StringTransformer.toNumber,
        }),
        transform({
            key: "goldProductionInfo",
            condition: (value) => !value,
            transformer: () => null,
        }),
    ],
    coins_added: [
        transform({
            key: "goldProductionInfo",
            condition: (value) => !!value,
            transformer: StringTransformer.extract(regexHelper.dragonCoinsIncome, 1),
        }),
        transform({
            key: "coins_added",
            condition: (value) => !!value,
            transformer: StringTransformer.toNumber,
        }),
        transform({
            key: "goldProductionInfo",
            condition: (value) => !value,
            transformer: () => null,
        }),
    ],
}).after({
    delete: [
        "heading",
        "goldProductionInfo",
        "hatchingExperience",
        "xpOnHatching",
        "firstImageUrl",
        "elements",
        "tempAttacks",
        "allAttacks",
        "tempTrainableAttacks",
        "hatchingTime",
        "breedingTime",
    ],
    append: {
        group_type: "DRAGON",
    },
})
