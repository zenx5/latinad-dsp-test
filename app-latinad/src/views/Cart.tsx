import { Button, List } from "antd"
import MarkerDisplay from "../components/MarkerDisplay"
import { GoogleMap } from "@react-google-maps/api"
import { useEffect, useState } from "react"

type ItemDisplay = {
    id: number
    lat: number
    lng: number
    price: number
    name: string
}

type latLng = {
    lat: number
    lng: number
}

export default function Cart() {
    const [selected, setSelected] = useState<latLng>({ lat:0, lng:0 })
    const items = [
        { id:1, price:10, lat:7, lng:7, name:"Pantalla 1" },
        { id:2, price:5, lat:7, lng:-7, name:"Pantalla 2" },
        { id:3, price:7, lat:0, lng:7, name:"Pantalla 3" }
    ] as  ItemDisplay[]

    useEffect(()=>{
        setSelected( items[0] )
    },[])

    const handleSelect = (item:{ lat:number, lng:number }) => () => {
        setSelected({
            lat: item.lat,
            lng: item.lng
        })
    }

    const isSelected = (element:{ lat:number, lng:number }) => {
        return element.lat===selected.lat && element.lng===selected.lng
    }

    return <div className="grid grid-cols-3 gap-2">
        <List
            className="col-span-1"
            header={<h1 className="text-2xl font-bold">Titulo</h1>}
            dataSource={items}
            renderItem={ item => <List.Item>
                <Button type="link" onClick={handleSelect(item)} className="w-full flex flex-row text-lg text-left justify-between rounded-none hover:underline">
                    { item.name }
                    <span className="flex flex-row gap-1 items-center">
                        <span>{item.price}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${isSelected(item) ? '' :'opacity-0' }`} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </span>
                </Button>
            </List.Item>}
        />
        <div className="col-span-2">
            <GoogleMap
                options={{
                    disableDefaultUI: false,
                    clickableIcons: true,
                    scrollwheel: true
                }}
                zoom={7}
                center={selected}
                mapTypeId={google.maps.MapTypeId.HYBRID}
                mapContainerStyle={{ height:'894px' }}
            >
                <MarkerDisplay color="#0096F5" lat={selected.lat} lng={selected.lng} />
            </GoogleMap>
        </div>
    </div>
}