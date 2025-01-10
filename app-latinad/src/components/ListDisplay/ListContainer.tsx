import { ButtonProps, List } from "antd"
import Item from "./Item"

type ListProps = {
    items:any[]
    itemProps?: ButtonProps
}

export default function ListContainer({ items, itemProps, ...props }:ListProps) {

    const handleClickItem = (item:any) => (id:number, ev:React.MouseEvent) => {
        console.log( id, item, ev)
    }


    return <List
        dataSource={items}
        renderItem={ item => <Item {...itemProps} id={item.id} name={item.name} onClick={handleClickItem(item)}/>}
        {...props}
    />
}