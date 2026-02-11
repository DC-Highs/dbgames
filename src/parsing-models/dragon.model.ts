import { css, extract, HtmlExtractionModel } from "@xcrap/extractor"

export const dragonExtractionModel = new HtmlExtractionModel({
    heading: {
        query: css(".subtitle:first-child"),
        extractor: extract("textContent"),
    },
    description: {
        query: css(".col-sm-12.rhs.text-data"),
        extractor: extract("innerText"),
    },
    rarity: {
        query: css(".rarity .iconized-text"),
        extractor: extract("innerText"),
    },
    elements: {
        query: css(".element"),
        multiple: true,
        extractor: extract("innerText"),
    },
    hatchingTime: {
        query: css("tr:nth-child(4) .iconized-text"),
        extractor: extract("innerText"),
    },
    breedingTime: {
        query: css("tr:nth-child(3) .iconized-text"),
        extractor: extract("innerText"),
    },
    goldProductionInfo: {
        query: css("tr:nth-child(5) .iconized-text"),
        default: null,
        extractor: extract("innerText"),
    },
    hatchingExperience: {
        query: css("tr:nth-child(6) .iconized-text"),
        extractor: extract("innerText"),
        default: null,
    },
    firstImageUrl: {
        query: css(".col-xs-4:nth-child(1) .entityimg"),
        extractor: extract("src"),
        default: null,
    },
    xpOnHatching: {
        query: css("tr:nth-child(6) .iconized-text"),
        extractor: extract("innerText"),
        default: null,
    },
})
