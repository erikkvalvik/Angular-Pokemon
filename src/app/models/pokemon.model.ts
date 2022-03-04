export interface Pokemon{
    // count: number;
    // next: string;
    // previous: string;
    // results: Result;
    name: string;
    url: string;
    id: string;
    sprite: string;
}
export interface Result{
    name: string;
    url: string;
}

export interface PokemonInfo{
    abilities: [Abilities];
    base_experience: number;
    forms: [Forms];
    game_indices: [GameIndices];
    height: number;
    held_items: [HeldItems];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: [Moves];
    name: string;
    order: number;
    past_types: [PastTypes];
    species: Species;
    //sprites: PokemonSprites; //Missing "other" and "versions"
    stats: [Stats];
    types: [Types];
    weight: number;
}

export interface Stats{
    base_stat: number;
    effort: number;
    stat: Stat;
}
export interface Stat{
    name: string;
    url: string;
}

export interface Species{
    name: string;
    url: string;
}

export interface PastTypes{
    generation: Generation;
    types: [Types];
}
export interface Generation{
    name: string;
    url: string;
}
export interface Types{
    slot: number;
    type: Type;
}
export interface Type{
    name: string;
    url: string;
}

export interface Moves{
    move: Move;
    version_group_details: [VersionGroupDetails];
}
export interface Move{
    name: string;
    url: string;
}
export interface VersionGroupDetails{
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
}
export interface MoveLearnMethod{
    name: string;
    url: string;
}
export interface VersionGroup{
    name: string;
    url: string;
}

export interface HeldItems{
    item: Item;
    version_details: [VersionDetails];
}

export interface Item{
    name: string;
    url: string;
}

export interface VersionDetails{
    rarity: number;
    version: Version;
}
export interface Version{
    name: string;
    url: string;
}

export interface GameIndices{
    game_index: number;
    version: Version;
}
export interface Version{
    name: string;
    url: string;
}

export interface Forms{
    name: string;
    url: string;
}

export interface PokemonSprites{
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}


export interface Abilities{
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}
export interface Ability{
    name: string;
    url: string;
}