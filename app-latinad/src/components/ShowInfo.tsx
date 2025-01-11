import { Typography } from "antd"

export function ShowInfo({ label, value, cols }:{ label:string, value:number|string, cols?:number[] }){
    const [ firstColumn, secondColumn ] = cols ?? [2,3]
    return <span className={`grid grid-cols-${firstColumn + secondColumn} gap-2 my-1`}>
        <Typography.Text className={`col-span-${firstColumn} text-lg font-bold border-r flex items-center`}>{label}</Typography.Text>
        <Typography.Text className={`col-span-${secondColumn} overflow-visible text-lg italic flex items-center opacity-80`}>{value}</Typography.Text>
    </span>
}