type itemType = {
    id: number
    price_per_day: number
    price_currency: string
    lat: number
    lng: number
    name: string
    size_width: number
    size_height: number
    formatted_address: string
}

type cartType = {
    items: itemType[],
    removeItems: number[]
    itemSelected: number
}