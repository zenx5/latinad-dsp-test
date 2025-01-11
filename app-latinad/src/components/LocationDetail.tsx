import { Typography } from "antd"
import { ShowInfo } from "./ShowInfo"

type LocationDetailProps = {
    lat:number
    lng:number
    price:number
    size:number
    name:string
}

export default function LocationDetail({ lat, lng, price, size, name }:LocationDetailProps) {

    return <div className="mt-2 p-2">
        <Typography.Title level={2}>Detalles</Typography.Title>
        <ShowInfo label="Name" value={name} />

        <span className="grid grid-cols-2 gap-2">
            <ShowInfo label="Latitud" value={lat} />
            <ShowInfo label="Longitud" value={lng} />
        </span>
        <span className="grid grid-cols-2 gap-2">
            <ShowInfo label="Size" value={size} />
            <ShowInfo label="Price" value={price} />
        </span>
    </div>
}