import { css, HtmlExtractionModel } from "@xcrap/extractor"

import { dragonExtractionModel } from "./dragon.model"

export const dragonsPageExtractionModel = new HtmlExtractionModel({
    dragons: {
        query: css(".result-data:has(.col-sm-12.rhs.text-data)"),
        multiple: true,
        model: dragonExtractionModel,
    },
})
