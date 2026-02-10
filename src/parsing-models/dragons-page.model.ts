import { HtmlParsingModel } from "@xcrap/parser"

import { dragonParsingModel } from "./dragon.model"

export const dragonsPageParsingModel = new HtmlParsingModel({
    dragons: {
        query: ".result-data",
        multiple: true,
        model: dragonParsingModel,
    },
})
