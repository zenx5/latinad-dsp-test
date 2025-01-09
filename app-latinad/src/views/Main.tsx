import { useState } from 'react'
import FormSearch from '../components/FormSearch/FormSearch'
import Map from '../components/Map/Map'
import '../translates/i18n'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { MarkerF } from '@react-google-maps/api'
import { responseAd as response } from '../tools/mockup'


export default function Main() {
    const [center, setCenter] = useState({ lat: 51.505, lng:-0.09 })
    const [isWelcomeView, setIsWelcomeView] = useState(false)
    const { t } = useTranslation()

    const handleSearch = (event:any) => {
        console.log('search', event)
        setIsWelcomeView(false)
    }

    const modeClass = isWelcomeView ? "sm:p-4 p-0 sm:h-fit h-full z-20" : "p:0 h-full"

    return <div className="relative w-full h-full flex flex-row items-center justify-center">
        { isWelcomeView && <div className="bg-[#075E96] w-screen m-0 p-0 max-w-4xl mx-auto z-10 opacity-50 sm:h-with-footer h-without-footer absolute">sas</div>}
        <Map center={center} onChangePosition={console.log}>
            { response.data.map( item => <MarkerF
                icon={{
                    path: "M1.5 0.5H46.5V25H29.5V28H40.5V31.5H11.5V28H24.5V25H4.5V4.5L1.5 0.5Z",
                    fillColor: "#0096F5",
                    fillOpacity: 0.6,
                    strokeWeight: 0.5,
                    rotation: 0,
                    scale: 1,
                    anchor: new google.maps.Point(0, 0)
                  }}
                position={{ lat:item.latitude, lng:item.longitude }} />)}

        </Map>
        <div className={`flex sm:flex-row flex-col-reverse sm:justify-between justify-start gap-20 items-start w-full ${modeClass}`}>
            <FormSearch onSearch={handleSearch} open={ !isWelcomeView }>
                <ul className="w-full divide-y border-y">
                    { response.data.map( item => <li className="w-full px-2 py-1">
                        <Button type="link" onClick={()=>setCenter({ lat:item.latitude, lng:item.longitude })} className="w-full">{ item.name }</Button>
                    </li> ) }
                </ul>
            </FormSearch>
            { isWelcomeView && <div className="sm:w-1/2 w-full text-white ">
                <h1 className="text-center text-3xl font-bold mb-10">{t('title-action')}</h1>
                <p className="text-xl text-center sm:text-left">{t('copy-action')}</p>
            </div>}
        </div>
    </div>
}