const itemBase = {
    id:1,
    price_per_day:0.077247812,
    price_currency: "USD",
    lat:8.2628711,
    lng:-62.7791521,
    name:"Pantalla ",
    size_width: 900,
    size_height: 500,
    formatted_address: "Av. Sarmiento 237, M5500 ciudad, Mendoza, Argentina"
}

export const getData = () => {
    return Array(50)
        .fill(itemBase)
        .map( (item, index) => ({
            ...item,
            id:index+1,
            selected: true,
            name:item.name +(index+1),
            lat: item.lat + Math.random(),
            lng: item.lng + Math.random()
        }) )
}