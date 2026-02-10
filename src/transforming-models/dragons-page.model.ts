import { TransformingModel } from "@xcrap/transformer"

import { dragonTransformingModel } from "./dragon.model"

export const dragonsPageTransformingModel = new TransformingModel({
    dragons: {
        key: "dragons",
        multiple: true,
        model: dragonTransformingModel,
    },
})
