import { useState } from "react"
import { List, Button } from "antd"
import { ButtonCheck } from "./ButtonCheck"

type ItemCartProps = {
    name: string
    price: number
    selected: boolean
    onClick: VoidFunction
    onChangeCheck: (value:boolean) => void
}

export default function ItemCart({ name, price, onClick, onChangeCheck, selected }:ItemCartProps){
    const [checked, setChecked] = useState(true)

    const handleCheck = (value:boolean) => {
        setChecked( value )
        if( onChangeCheck ) onChangeCheck( value)
    }

    return <List.Item className={`${checked ? 'opacity-100' : 'opacity-20'}`}>
        <ButtonCheck onChange={handleCheck}/>
        <Button type="link" onClick={onClick} className="w-full flex flex-row text-lg text-left justify-between rounded-none hover:underline">
            { name }
            <span className="flex flex-row gap-1 items-center">
                <span>{price}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${selected ? '' :'opacity-0' }`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </span>
        </Button>
    </List.Item>
}