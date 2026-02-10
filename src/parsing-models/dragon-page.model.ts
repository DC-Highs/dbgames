import { extract, HtmlParsingModel } from "@xcrap/parser"

export const dragonPageParsingModel = new HtmlParsingModel({
    heading: {
        query: ".result-data:has(.entitytabledata) .subtitle:first-child",
        extractor: extract("textContent"),
    },
    description: {
        query: ".result-data:has(.entitytabledata) .col-sm-12.rhs.text-data",
        extractor: extract("innerText"),
    },
    rarity: {
        query: ".result-data:has(.entitytabledata) .rarity .iconized-text",
        extractor: extract("innerText"),
    },
    elements: {
        query: ".result-data:has(.entitytabledata) .element",
        multiple: true,
        extractor: extract("innerText"),
    },
    hatchingTime: {
        query: ".result-data:has(.entitytabledata) tr:nth-child(4) .iconized-text",
        extractor: extract("innerText"),
    },
    breedingTime: {
        query: ".result-data:has(.entitytabledata) tr:nth-child(3) .iconized-text",
        extractor: extract("innerText"),
    },
    goldProductionInfo: {
        query: ".result-data:has(.entitytabledata) tr:nth-child(5) .iconized-text",
        default: null,
        extractor: extract("innerText"),
    },
    hatchingExperience: {
        query: ".result-data:has(.entitytabledata) tr:nth-child(6) .iconized-text",
        extractor: extract("innerText"),
        default: null,
    },
    firstImageUrl: {
        query: ".result-data:has(.entitytabledata) .col-xs-4:nth-child(1) .entityimg",
        extractor: extract("src", true),
    },
    xpOnHatching: {
        query: ".result-data:has(.entitytabledata) tr:nth-child(6) .iconized-text",
        extractor: extract("innerText"),
        default: null,
    },
    basicAttacks: {
        query: ".result-data:nth-child(2) table tbody tr",
        multiple: true,
        model: new HtmlParsingModel({
            name: {
                query: ".wauto:nth-child(1)",
                extractor: extract("innerText")
            },
            element: {
                query: ".wauto:nth-child(2)",
                extractor: extract("innerText")
            },
            trainingTime: {
                query: ".wauto:nth-child(3) .text-center",
                extractor: extract("innerText")
            },
            power: {
                query: ".wauto:nth-child(3) .text-right",
                extractor: extract("innerText")
            }
        })
    },
    trainableAttacks: {
        query: ".result-data:nth-child(2) table tbody tr",
        multiple: true,
        model: new HtmlParsingModel({
            name: {
                query: ".wauto:nth-child(1)",
                extractor: extract("innerText")
            },
            element: {
                query: ".wauto:nth-child(2)",
                extractor: extract("innerText")
            },
            trainingTime: {
                query: ".wauto:nth-child(3) .text-center",
                extractor: extract("innerText")
            },
            power: {
                query: ".wauto:nth-child(3) .text-right",
                extractor: extract("innerText")
            }
        })
    }
})
