import { ChangeEvent, useState } from "react";
import { Input } from "antd";
import { Autocomplete } from "@react-google-maps/api";

type InputLocationProps = {
    onPlaceChanged: (place:google.maps.places.PlaceResult) => void
}

export default function InputLocation({ onPlaceChanged }:InputLocationProps) {
    const [name, setName] = useState("")
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>()

    const handleChangeName = (ev:ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value)
    }

    const handlePlaceChanged = () => {
        if( !autocomplete ) return;
        const place = autocomplete?.getPlace()
        if (!place?.geometry) {
            return;
        }
        const [ location ] = place.address_components as google.maps.GeocoderAddressComponent[]
        if( location ) setName(location.long_name)
        if( onPlaceChanged ) onPlaceChanged( place )
    }

    const handleLoad = (loadedAuto:google.maps.places.Autocomplete) => {
        console.log( loadedAuto )
        loadedAuto.setOptions({ strictBounds: false })
        loadedAuto.setFields(["address_components", "geometry"])
        setAutocomplete( loadedAuto )
    }

    return <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged} className="w-11/12">
        <Input size="large" prefix={<IconLocation />} value={name} onChange={handleChangeName}/>
    </Autocomplete>
}

const IconLocation = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>