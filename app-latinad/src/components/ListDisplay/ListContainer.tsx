import { ButtonProps, List } from "antd"
import Item from "./Item"

type ListProps = {
    items: any[]
    onClick?: (id:number, item:any) => void
    itemProps?: ButtonProps
}

export default function ListContainer({ items, itemProps, onClick, ...props }:ListProps) {

    const handleClickItem = (item:any) => (id:number)=>{
        if(onClick) onClick( id, item)
    }


    return <List
        dataSource={items}
        renderItem={ item => <Item {...itemProps} id={item.id} name={item.name} onClick={handleClickItem(item)}/>}
        {...props}
    />
}