import { useEffect, useReducer } from "react"
import { Button, List} from "antd"
import { GoogleMap } from "@react-google-maps/api"
import { useTranslation } from "react-i18next"

import "./type.d"

import LocationDetail from "./LocationDetail"
import ItemCart from "../../components/ItemCart"
import MarkerDisplay from "../../components/MarkerDisplay"

import { reducerCart, initialCart } from "./reducer"

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

export default function Cart() {
    const { t } = useTranslation()
    const [cart, dispatchCart] = useReducer(reducerCart, initialCart)

    useEffect(()=>{
        const mockup = Array(50)
        .fill(itemBase)
        .map( (item, index) => ({
            ...item,
            id:index+1,
            selected: true,
            name:item.name +(index+1),
            lat: item.lat + Math.random(),
            lng: item.lng + Math.random()
        }) )
        dispatchCart({ type:'set_items', payload:mockup })
        dispatchCart({ type:'select_item', payload:mockup[0].id })
    },[])

    const handleSelect = (item:{ id:number }) => () => {
        dispatchCart({ type:'select_item', payload:item.id })
    }

    const handleChangeCheck = (item:{ id:number }) => (check:boolean) => {
        if( check!==cart.removeItems.includes(item.id)) return
        if( check ) dispatchCart({ type:'set_remove', payload:cart.removeItems.filter( (id:number) => id!==item.id ) })
        else dispatchCart({ type:'set_remove', payload:[...cart.removeItems, item.id] })
    }

    const isSelected = (element:{ id:number }) => element.id===cart.itemSelected

    const handleRemoveItems = () => dispatchCart({ type:'remove' })

    return <div className="grid grid-cols-3 gap-2 overflow-hidden" style={{ height:'-webkit-fill-available' }}>
        <div className="col-span-1 px-2 h-auto overflow-y-scroll" style={{ scrollbarWidth:'thin', scrollbarColor:'#0096f544 #0096f511' }}>
            <List
                header={<span className="flex flex-row justify-between h-8">
                    <h1 className="text-xl font-bold">{ t('cart.title') }</h1>
                    {cart.removeItems.length>0 && <Button type="primary" onClick={handleRemoveItems}>{ t('cart.remove') }</Button>}
                </span>}
                dataSource={cart.items}
                renderItem={ (item:itemType) => <ItemCart name={item.name} price={`${item.price_per_day} ${item.price_currency}`} isChecked={!cart.removeItems.includes(item.id)} onClick={handleSelect(item)} onChangeCheck={handleChangeCheck(item)} selected={isSelected(item)}/> }
            />
        </div>
        <div className="col-span-2 overflow-hidden" style={{ height:'-webkit-fill-available' }}>
            <GoogleMap
                options={{
                    disableDefaultUI: false,
                    clickableIcons: true,
                    scrollwheel: true
                }}
                zoom={7}
                center={cart.items.find( (item:itemType) => item.id===cart.itemSelected)}
                mapTypeId={google.maps.MapTypeId.HYBRID}
                mapContainerStyle={{ height:'500px' }}
            >
                { cart.itemSelected!==0 && <MarkerDisplay color="#0096F5" {...cart.items.find( (item:itemType) => item.id===cart.itemSelected)}/>}
            </GoogleMap>
            <span>
                { cart.itemSelected!==0 && <LocationDetail {...cart.items.find( (item:itemType) => item.id===cart.itemSelected)} />}
            </span>
        </div>
    </div>
}