import { GoogleMap } from "@react-google-maps/api"
import './Map.css'
import { useRef } from "react"

type MapProps = {
    center: {
        lat: number,
        lng: number
    }
    onChangePosition?: (location:{ lat:number, lng:number}) => void
}

export default function Map({ center, onChangePosition }:MapProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<GoogleMap>(null)

    const handleChangePosition = async (event:google.maps.MapMouseEvent) => {
        if(onChangePosition && event.latLng) {
            onChangePosition({
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            })
        }
    }

    return <div className="map-container z-0" ref={containerRef}>
        <GoogleMap
            ref={mapRef}
            options={{
                disableDefaultUI: false,
                clickableIcons: true,
                scrollwheel: true
            }}
            zoom={9}
            center={center}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerClassName="w-full h-full border-2 border-green-500"
            mapContainerStyle={{ width:'894px', height:'894px' }}
            onClick={handleChangePosition}
        >

        </GoogleMap>
    </div>
}