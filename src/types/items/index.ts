export interface Sticker {
    url: string;
    name: string;
}
export interface Pageable {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
  }
  
export enum WearType {
    FN = "Factory New",
    MW = "Minimal Wear",
    FT = "Field Tested",
    WW = "Well Worn",
    BS = "Battle Scarred",
    NONE = "‎"
}
export function valueOf(key: string): string | undefined {
    return WearType[key as keyof typeof WearType];
}

export interface Item {
    id: string;
    displayName: string;
    modified: string | null;
    group: string;
    name: string;
    addedPercentage: number | undefined;
    hidden: boolean | undefined;
    itemType: string;
    price: number;
    color: string;
    borderColor: string;
    rarity: string;
    quality: string;
    image: string;
    tradeable: boolean;
    inspectLink: string;
    wear: string;
    marketTradeableRestriction: number;
    stickerList: Sticker[];
}
