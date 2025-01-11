import { useEffect, useState } from "react"
import { List, Button } from "antd"

type ItemCartProps = {
    name: string
    price: string
    selected: boolean
    isChecked: boolean
    onClick: VoidFunction
    onChangeCheck: (value:boolean) => void
}

export default function ItemCart({ name, price, onClick, onChangeCheck, selected, isChecked }:ItemCartProps){
    const [checked, setChecked] = useState( true )

    useEffect(()=>{
        setChecked( isChecked )
    },[isChecked])

    const handleCheck = () => {
        setChecked( prev => !prev )
        if( onChangeCheck ) onChangeCheck( !checked )
    }

    return <List.Item className={`${checked ? 'opacity-100' : 'opacity-20'}`}>
        <Button className="p-0 w-5 h-5" color="default" variant="outlined" onClick={handleCheck}>
            { checked ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>}
        </Button>
        <Button type="link" onClick={onClick} className="w-full flex flex-row text-lg text-left justify-between rounded-none group">
            <span className="flex flex-col">
                <span className="group-hover:underline">{ name }</span>
                <small className="text-sm opacity-30 text-slate-500">{ price }</small>
            </span>
            <span className="flex flex-row gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${selected ? '' :'opacity-0' }`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </span>
        </Button>
    </List.Item>
}