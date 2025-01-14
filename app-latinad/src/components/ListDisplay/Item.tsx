import { Button, List, ListProps } from "antd";
import React from "react";

type ItemProps = {
    name: string
    isCart: boolean
    onClick?: (ev:React.MouseEvent) => void
    onCart: () => void
} & ListProps<ItemProps>

export default function Item({ name, onClick, isCart, onCart, ...props }:ItemProps) {


    return <List.Item className="!p-0"  onClick={onClick} {...props}>
        <Button type="link" className="w-full">{ name }</Button>
        <Button type="link" className="w-fit p-0 m-0" onClick={onCart}>
            { !isCart ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-0 p-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-0 p-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>}
        </Button>
    </List.Item>
}