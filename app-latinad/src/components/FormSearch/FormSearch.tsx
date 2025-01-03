import { useState } from "react";
import { Button, DatePicker } from "antd";
import "./FormSearch.css"
import InputLocation from "../InputLocation/InputLocation";

export default function FormSearch() {
    const [, setDateStart] = useState('2019-09-03')
    const [, setDateEnd] = useState('2019-09-03')

    const handleChangeStart = (_:never, value:string|string[]) => {
        setDateStart( value as string )
    }

    const handleChangeEnd = (_:never, value:string|string[]) => {
        setDateEnd( value as string )
    }

    const handleChangePlace = (place:google.maps.places.PlaceResult) => {
        const { lat, lng } = place.geometry?.location?.toJSON() as { lat:number, lng:number }
        console.log( lat, lng )
    }

    return <form className="corners relative flex flex-col items-center gap-2 sm:gap-5 h-fit w-full sm:w-1/2 md:w-1/3 py-8 px-4 bg-white sm:rounded-tl-xl sm:rounded-br-xl rounded-none bottom-0">
        <InputLocation onPlaceChanged={handleChangePlace} />
        <DatePicker className="w-11/12" size="large" onChange={handleChangeStart} suffixIcon={<IconDate />} />
        <DatePicker className="w-11/12" size="large" onChange={handleChangeEnd} suffixIcon={<IconDate />} />
        <Button className="bg-primary hover:!text-primary text-white py-2 text-lg">Consultar</Button>
    </form>
}


const IconDate = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>