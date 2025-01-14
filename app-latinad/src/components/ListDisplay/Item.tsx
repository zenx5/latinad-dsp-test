import { Button, List, ListProps } from "antd";
import React from "react";

type ItemProps = {
    name: string
    isCart: boolean
    onClick?: (ev:React.MouseEvent) => void
    onCart: () => void
} & ListProps<ItemProps>

export default function Item({ name, onClick, isCart, onCart, ...props }:ItemProps) {


    return <List.Item onClick={onClick} {...props}>
        <span className="w-full flex flex-row items-center !p-0 h-full">
            <span className="w-3/4 text-sm py-1 px-0 m-0 text-primary pl-2 cursor-pointer">{ name }</span>
            <Button type="link" className="w-1/4 p-0 m-0" onClick={onCart}>
                { !isCart ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-0 p-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-0 p-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>}
            </Button>
        </span>
    </List.Item>
}