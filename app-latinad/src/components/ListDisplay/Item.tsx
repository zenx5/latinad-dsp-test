import { Button } from "antd";

type ItemProps = {
    id:number
    name: string
    onClick?: (id:number, ev:React.MouseEvent) => void
}

export default function Item({ id, name, onClick }:ItemProps) {

    const handleClick = (ev:React.MouseEvent) => {
        if(onClick) onClick(id, ev)
    }

    return <Button type="link" onClick={handleClick}>{ name }</Button>
}