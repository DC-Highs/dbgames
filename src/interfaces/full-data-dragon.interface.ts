type Attack<Aggregate extends boolean> = {
    name: string
    type: string
    element: string
    ui_damage: number
    training_time: number
} & (Aggregate extends true
    ? {
          id: number | null
          name_key: string
      }
    : {})

export interface FullDataDragon<Aggregate extends boolean> {
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
        attacks: Attack<Aggregate>[]
        trainable_attacks: Attack<Aggregate>[]
    }
    meta: {
        pageUrl: string
    }
}
