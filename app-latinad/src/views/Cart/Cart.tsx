import { Button, List} from "antd"
import { GoogleMap } from "@react-google-maps/api"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"

import LocationDetail from "./LocationDetail"
import ItemCart from "../../components/ItemCart"
import MarkerDisplay from "../../components/MarkerDisplay"

import { AppDispatch, RootState } from "../../tools/store"
import { setRemove, selectItem, remove } from "../../tools/slices/cart"
import { useEffect } from "react"

export default function Cart() {
    const cart = useSelector.withTypes<RootState>()( state => state.cart )
    const dispatchCart = useDispatch.withTypes<AppDispatch>()()
    const { t } = useTranslation()

    useEffect(()=>{
        if( cart.items.length>0 ) dispatchCart(selectItem(cart.items[0].id))
    },[])

    const handleSelect = (item:{ id:number }) => () => {
        dispatchCart(selectItem(item.id))
    }

    const handleChangeCheck = (item:{ id:number }) => (check:boolean) => {
        if( check!==cart.removeItems.includes(item.id)) return
        if( check ) dispatchCart( setRemove(cart.removeItems.filter( (id:number) => id!==item.id ) ) )
        else dispatchCart( setRemove([...cart.removeItems, item.id]) )
    }

    const isSelected = (id:number) => id===cart.itemIndex

    const handleRemoveItems = () => dispatchCart(remove())

    return <div className="grid grid-cols-3 gap-2 overflow-hidden" style={{ height:'-webkit-fill-available' }}>
        <div className="col-span-1 px-2 h-auto overflow-y-scroll" style={{ scrollbarWidth:'thin', scrollbarColor:'#0096f544 #0096f511' }}>
            <List
                header={<span className="flex flex-row justify-between h-8">
                    <h1 className="text-xl font-bold">{ t('cart.title') }</h1>
                    {cart.removeItems.length>0 && <Button type="primary" onClick={handleRemoveItems}>{ t('cart.remove') }</Button>}
                </span>}
                dataSource={cart.items}
                locale={{
                    emptyText: <span className="flex flex-col items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <span>{t('not_data')}</span>
                    </span>
                }}
                renderItem={ (item:itemType) => <ItemCart name={item.name} price={`${item.price_per_day} ${item.price_currency ?? 'USD'}`} isChecked={!cart.removeItems.includes(item.id)} onClick={handleSelect(item)} onChangeCheck={handleChangeCheck(item)} selected={isSelected(item.id)}/> }
            />
        </div>
        <div className="col-span-2 overflow-hidden" style={{ height:'-webkit-fill-available' }}>
            { cart.isSelected && <GoogleMap
                options={{
                    disableDefaultUI: false,
                    clickableIcons: true,
                    scrollwheel: true
                }}
                zoom={7}
                center={ { lat: cart.itemSelected?.latitude, lng: cart.itemSelected?.longitude } as { lat:number, lng:number } }
                mapTypeId={google.maps.MapTypeId.HYBRID}
                mapContainerStyle={{ height:'500px' }}
            >
                { (cart.isSelected && cart.itemSelected) && <MarkerDisplay color="#0096F5" lat={cart.itemSelected?.latitude} lng={cart.itemSelected?.longitude}  />}
            </GoogleMap> }
            <span>
                { (cart.isSelected && cart.itemSelected) && <LocationDetail
                    lat={cart.itemSelected?.lat}
                    lng={cart.itemSelected?.lng}
                    price_per_day={cart.itemSelected?.price_per_day}
                    price_currency={cart.itemSelected?.price_currency}
                    size_width={cart.itemSelected?.size_width}
                    size_height={cart.itemSelected?.size_height}
                    name={cart.itemSelected?.name}
                    formatted_address={cart.itemSelected?.formatted_address}

                 />}
            </span>
        </div>
    </div>
}