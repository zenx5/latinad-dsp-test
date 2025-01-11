import { Typography } from "antd"

export function ShowInfo({ label, value }:{ label:string, value:number|string }){
    return <span className="grid grid-cols-3 gap-2">
        <Typography.Text className="col-span-1 text-lg font-bold">{label}</Typography.Text>
        <Typography.Text className="col-span-2 text-lg italic opacity-80">{value}</Typography.Text>
    </span>
}