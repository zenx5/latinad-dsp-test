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
        <Typography.Title level={3}>Detalles</Typography.Title>
        <ShowInfo label="Name" value={name} />

        <span className="flex flex-row gap-2 justify-between mt-2">
            <ShowInfo label="Latitud" value={lat} />
            <ShowInfo label="Longitud" value={lng} />
        </span>
        <span className="flex flex-row gap-2 justify-between mt-2">
            <ShowInfo label="Size" value={size} />
            <ShowInfo label="Price" value={price} />
        </span>
    </div>
}