import { GoogleMap } from "@react-google-maps/api"
import './Map.css'

type MapProps = {
    center: {
        lat: number,
        lng: number
    }
    onChangePosition?: (location:{ lat:number, lng:number}) => void
    children?: React.ReactElement|React.ReactElement[]
}

export default function Map({ center, onChangePosition, children }:MapProps) {
    const handleChangePosition = async (event:google.maps.MapMouseEvent) => {
        if(onChangePosition && event.latLng) {
            onChangePosition({
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            })
        }
    }

    return <div className="map-container">
        <GoogleMap
            options={{
                disableDefaultUI: false,
                clickableIcons: true,
                scrollwheel: true
            }}
            zoom={9}
            center={center}
            mapTypeId={google.maps.MapTypeId.HYBRID}
            mapContainerStyle={{ width:'894px', height:'894px' }}
            onClick={handleChangePosition}
        >
            { children }
        </GoogleMap>
    </div>
}