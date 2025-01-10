import { MarkerF } from "@react-google-maps/api"
type MarkerDisplayProps =  {
    lat: number
    lng: number
    color: string
}


export default function MarkerDisplay({ lat, lng, color }:MarkerDisplayProps ) {

    return <MarkerF
        icon={{
            path: "M1.5 0.5H46.5V25H29.5V28H40.5V31.5H11.5V28H24.5V25H4.5V4.5L1.5 0.5Z",
            fillColor: color,
            fillOpacity: 0.6,
            strokeWeight: 0.5,
            rotation: 0,
            scale: 1,
            anchor: new google.maps.Point(0, 0)
            }}
        position={{ lat, lng }} />
}