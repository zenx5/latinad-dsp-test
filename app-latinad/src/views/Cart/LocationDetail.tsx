import { Typography } from "antd"
import { ShowInfo } from "../../components/ShowInfo"
import { useTranslation } from "react-i18next"

type LocationDetailProps = {
    lat:number
    lng:number
    price_per_day:number
    price_currency:string
    size_width:number
    size_height:number
    name:string
    formatted_address:string
}

export default function LocationDetail({ lat, lng, price_per_day, price_currency, size_width, size_height, name, formatted_address }:LocationDetailProps) {
    const { t } = useTranslation()

    return <div className="mt-2 p-2">
        <Typography.Title level={2}>{ t('cart.details') }</Typography.Title>
        <ShowInfo label={ t('cart.name') } value={name} cols={[1,4]}/>

        <span className="grid grid-cols-2 gap-4 border-t">
            <ShowInfo label={ t('cart.latitude') } value={lat} />
            <ShowInfo label={ t('cart.longitude') } value={lng} />
        </span>
        <span className="grid grid-cols-2 gap-4 border-t">
            <ShowInfo label={ t('cart.resolution') } value={`${size_width} x ${size_height}`} />
            <ShowInfo label={ t('cart.price') } value={`${price_per_day} ${price_currency} ${t('cart.per_day')}`} />
        </span>
        <span className="grid grid-cols-5 gap-2 my-1 border-t py-1">
            <span className="col-span-1 font-bold border-r">{t('cart.address') }</span>
            <span className="col-span-4 w-full">{formatted_address}</span>
        </span>
    </div>
}