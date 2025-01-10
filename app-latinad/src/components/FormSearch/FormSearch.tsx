import { useState } from "react";
import { Button, DatePicker } from "antd";
import "./FormSearch.css"
import InputLocation from "../InputLocation/InputLocation";

type latLngType = {
    lat: number,
    lng: number
}

type customEventSearch = {
    position: latLngType
    dateStart: string
    dateEnd: string
}

type FormSearchProps = {
    onSearch?: (event:customEventSearch) => void
    loading?: boolean
    open?: boolean
    children?: React.ReactElement
}

export default function FormSearch({ onSearch, loading, open, children }:FormSearchProps) {
    const [dateStart, setDateStart] = useState('2019-09-03')
    const [dateEnd, setDateEnd] = useState('2019-09-03')
    const [position, setPosition] = useState<latLngType>({ lat:0, lng:0 })

    const handleChangeStart = (_:never, value:string|string[]) => {
        setDateStart( value as string )
    }

    const handleChangeEnd = (_:never, value:string|string[]) => {
        setDateEnd( value as string )
    }

    const handleChangePlace = (place:google.maps.places.PlaceResult) => {
        const { lat, lng } = place.geometry?.location?.toJSON() as { lat:number, lng:number }
        console.log( lat, lng )
        setPosition({ lat, lng })
    }

    const handleSearch = () => {
        if( onSearch ) onSearch({ position, dateEnd, dateStart })
    }

    const openClass = open ? "h-full rounded-none px-1 border-2 border-primary w-1/4" : "h-[0%] min-h-fit sm:rounded-tl-xl sm:rounded-br-xl rounded-none px-4 corners w-full sm:w-1/2 md:w-1/3"

    return <form className={`relative flex flex-col items-center gap-2 sm:gap-5 py-8 bg-white bottom-0 ${openClass}`}>
        <InputLocation onPlaceChanged={handleChangePlace} />
        <DatePicker className="w-11/12" size="large" onChange={handleChangeStart} suffixIcon={<IconDate />} />
        <DatePicker className="w-11/12" size="large" onChange={handleChangeEnd} suffixIcon={<IconDate />} />
        <Button onClick={handleSearch} loading={loading} className="bg-primary hover:!text-primary text-white py-2 items-center flex flex-row text-lg align-loader">Consultar</Button>
        { open && children }
    </form>
}


const IconDate = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>