export interface IPreviewDragon {
    data: {
        id: number
        name: string
        name_key: string
        group_type: string
        hatching_time: number
        breeding_time: number
        description: string
        description_key: string
        xp: number
        starting_coins: number
        coins_added: number
        dragon_rarity: string
        attributes: Array<string>
        img_name: string
    }
    meta: {
        pageUrl: string
    }
}
