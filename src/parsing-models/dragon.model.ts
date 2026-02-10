import { extract, HtmlParsingModel } from "@xcrap/parser"

export const dragonParsingModel = new HtmlParsingModel({
    heading: {
        query: ".subtitle:first-child",
        extractor: extract("textContent"),
    },
    description: {
        query: ".col-sm-12.rhs.text-data",
        extractor: extract("innerText"),
    },
    rarity: {
        query: ".rarity .iconized-text",
        extractor: extract("innerText"),
    },
    elements: {
        query: ".element",
        multiple: true,
        extractor: extract("innerText"),
    },
    hatchingTime: {
        query: "tr:nth-child(4) .iconized-text",
        extractor: extract("innerText"),
    },
    breedingTime: {
        query: "tr:nth-child(3) .iconized-text",
        extractor: extract("innerText"),
    },
    goldProductionInfo: {
        query: "tr:nth-child(5) .iconized-text",
        default: null,
        extractor: extract("innerText"),
    },
    hatchingExperience: {
        query: "tr:nth-child(6) .iconized-text",
        extractor: extract("innerText"),
        default: null,
    },
    firstImageUrl: {
        query: ".col-xs-4:nth-child(1) .entityimg",
        extractor: extract("src", true),
    },
    xpOnHatching: {
        query: "tr:nth-child(6) .iconized-text",
        extractor: extract("innerText"),
        default: null,
    },
})
