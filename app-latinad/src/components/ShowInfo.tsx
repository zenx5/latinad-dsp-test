import { Typography } from "antd"

export function ShowInfo({ label, value }:{ label:string, value:number|string }){
    return <span className="flex flex-row gap-4 items-center">
        <Typography.Text className="text-lg font-bold">{label}</Typography.Text>
        <Typography.Text className="text-lg">{value}</Typography.Text>
    </span>
}