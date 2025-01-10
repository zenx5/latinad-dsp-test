import { Button, List } from "antd";

type ItemProps = {
    id:number
    name: string
    onClick?: (id:number, ev:React.MouseEvent) => void
}

export default function Item({ id, name, onClick }:ItemProps) {

    const handleClick = (ev:React.MouseEvent) => {
        if(onClick) onClick(id, ev)
    }

    return <List.Item className="!p-0"  onClick={handleClick}>
        <Button type="link">{ name }</Button>
    </List.Item>
}