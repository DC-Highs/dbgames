import { css, extract, HtmlExtractionModel } from "@xcrap/extractor"

export const dragonPageExtractionModel = new HtmlExtractionModel({
    heading: {
        query: css(".result-data:has(.entitytabledata) .subtitle:first-child"),
        extractor: extract("textContent"),
    },
    description: {
        query: css(".result-data:has(.entitytabledata) .col-sm-12.rhs.text-data"),
        extractor: extract("innerText"),
    },
    rarity: {
        query: css(".result-data:has(.entitytabledata) .rarity .iconized-text"),
        extractor: extract("innerText"),
    },
    elements: {
        query: css(".result-data:has(.entitytabledata) .element"),
        multiple: true,
        extractor: extract("innerText"),
    },
    hatchingTime: {
        query: css(".result-data:has(.entitytabledata) tr:nth-child(4) .iconized-text"),
        extractor: extract("innerText"),
    },
    breedingTime: {
        query: css(".result-data:has(.entitytabledata) tr:nth-child(3) .iconized-text"),
        extractor: extract("innerText"),
    },
    goldProductionInfo: {
        query: css(".result-data:has(.entitytabledata) tr:nth-child(5) .iconized-text"),
        default: null,
        extractor: extract("innerText"),
    },
    hatchingExperience: {
        query: css(".result-data:has(.entitytabledata) tr:nth-child(6) .iconized-text"),
        extractor: extract("innerText"),
        default: null,
    },
    firstImageUrl: {
        query: css(".result-data:has(.entitytabledata) .col-xs-4:nth-child(1) .entityimg"),
        extractor: extract("src"),
        default: null,
    },
    xpOnHatching: {
        query: css(".result-data:has(.entitytabledata) tr:nth-child(6) .iconized-text"),
        extractor: extract("innerText"),
        default: null,
    },
    allAttacks: {
        query: css(".result-data:has(.text-right) > .row > .col-sm-12 > table > tbody > tr:not(:has(.subtitle))"),
        multiple: true,
        model: new HtmlExtractionModel({
            name: {
                query: css("td:nth-child(1)"),
                extractor: extract("innerText"),
            },
            element: {
                query: css("td:nth-child(2) a"),
                extractor: extract("innerText"),
            },
            trainingTime: {
                query: css("td:nth-child(3) .text-center"),
                extractor: extract("innerText"),
            },
            power: {
                query: css("td:nth-child(3) .text-right"),
                extractor: extract("innerText"),
            },
        }),
    },
})
