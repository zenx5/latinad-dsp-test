import { useEffect, useState } from "react"
import { Button, List} from "antd"
import MarkerDisplay from "../components/MarkerDisplay"
import { GoogleMap } from "@react-google-maps/api"

import LocationDetail from "../components/LocationDetail"
import ItemCart from "../components/ItemCart"

export default function Cart() {
    const [removeItems, setRemoveItems] = useState<number[]>([])
    const [selected, setSelected] = useState(0)
    const items = Array(50)
        .fill({ id:1, price:10, lat:8.2628711, lng:-62.7791521, name:"Pantalla ", size:100 })
        .map( (item, index) => ({
            ...item,
            id:index+1,
            name:item.name +(index+1),
            lat: item.lat + Math.random(),
            lng: item.lng + Math.random()
        }) )

    useEffect(()=>{
        setSelected( items[0].id )
    },[])

    const handleSelect = (item:{ id:number }) => () => {
        setSelected(item.id)
    }

    const handleChangeCheck = (item:{ id:number }) => (check:boolean) => {
        console.log( item.id, check, removeItems)
        if( !check && !removeItems.includes(item.id) ){
            setRemoveItems( prev => [...prev, item.id])
        }
        if( check && removeItems.includes(item.id) ){
            setRemoveItems( prev => prev.filter( id => id!==item.id ) )
        }
    }

    const isSelected = (element:{ id:number }) => {
        return element.id===selected
    }

    const handleRemoveItems = () => {
        setRemoveItems([])
    }

    return <div className="grid grid-cols-3 gap-2 overflow-hidden" style={{ height:'-webkit-fill-available' }}>
        <div className="col-span-1 px-2 h-auto overflow-y-scroll" style={{ scrollbarWidth:'thin', scrollbarColor:'#0096f544 #0096f511' }}>
            <List
                header={<span className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Titulo</h1>
                    {removeItems.length>0 && <Button type="primary" onClick={handleRemoveItems}>Guardar</Button>}
                </span>}
                dataSource={items}
                renderItem={ item => <ItemCart name={item.name} price={item.price} onClick={handleSelect(item)} onChangeCheck={handleChangeCheck(item)} selected={isSelected(item)}/> }
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
                center={items.find( item => item.id===selected)}
                mapTypeId={google.maps.MapTypeId.HYBRID}
                mapContainerStyle={{ height:'500px' }}
            >
                <MarkerDisplay color="#0096F5" {...items.find( item => item.id===selected)}/>
            </GoogleMap>
            { selected && <LocationDetail {...items.find( item => item.id===selected)} />}
        </div>
    </div>
}