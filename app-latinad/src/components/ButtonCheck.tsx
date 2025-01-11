import { useState } from "react"
import { Button } from "antd"

export function ButtonCheck({onChange}:{ onChange?:(value:boolean) => void}) {
    const [check, setCheck] = useState(true)

    const handleClick = () => {
        setCheck( prev => !prev )
        if( onChange ) onChange( !check )
    }

    return <Button className="p-0 w-5 h-5" color="default" variant="outlined" onClick={handleClick}>
        { check ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>}
    </Button>
}