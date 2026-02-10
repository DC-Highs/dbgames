import { DragonElement, DragonRarity, Alphabet, DragonstSortBy } from "./enums"
import dbgames from "./dbgames"

;(async () => {
    // const result = await dbgames.getDragons({
    //     rarities: [DragonRarity.Common],
    //     page: 1,
    // })



    // console.dir(result.dragons, { depth: null })

    // for (const dragon of result.dragons) {
    //     console.log(dragon.data)
    // }

    const result = await dbgames.getDragon({ slug: "Karl_Dragon" })

    console.log(result)
})()
