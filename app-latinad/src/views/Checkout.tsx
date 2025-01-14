import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../tools/store"
import { List } from "antd"
import { useEffect, useState } from "react"
import { clearItems } from "../tools/slices/cart"
import { useNavigate } from "react-router"
import { ROUTES } from "../tools/constants"


type ItemTypeCustom = ItemType & {
    price_per_day: number
}

export default function Checkout() {
    const navigate = useNavigate()
    const [items, setItems] = useState<ItemTypeCustom[]>([])
    const cart = useSelector.withTypes<RootState>()( state => state.cart )
    const dispatch = useDispatch.withTypes<AppDispatch>()()

    useEffect(()=>{
        if( cart.items.length === 0 ) {
            navigate(ROUTES.HOME)
            return
        }
        setItems( cart.items )
        dispatch( clearItems() )
    },[])

    return <div className="mt-10 w-2/3 mx-auto">
        <h1 className="font-bold text-3xl text-center mb-2">Checkout</h1>
        <List
            dataSource={items}
            renderItem={item => <List.Item className="flex flex-row justify-between text-lg">
                <span className="flex flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm flex flex-col ml-4 italic">
                        <span>Lat: {item.latitude}</span>
                        <span>Lng: {item.longitude}</span>
                    </span>
                </span>
                <span>{Number(item.price_per_day.toFixed(2))*10} USD</span>
            </List.Item>}
        />
        <span className="flex flex-row justify-end mt-2 pt-2 border-t border-black font-bold text-xl">
            { items.map( item => item.price_per_day*10 ).reduce( (sum, price)=>sum+price,0).toFixed(2) } USD
        </span>
    </div>
}