import FormSearch from '../components/FormSearch/FormSearch'
import MapBase from '../components/Map/MapBase'
import Map from '../components/Map/Map'
import '../translates/i18n'
import { useTranslation } from 'react-i18next'

export default function Main() {
    const { t } = useTranslation()

    return <div className="relative w-full h-full flex flex-row items-center justify-center bg-[#075E96]">
        <div className="z-10 flex sm:flex-row sm:p-4 p-0 flex-col-reverse sm:justify-between justify-start gap-20 items-start sm:h-fit h-full w-full">
            <FormSearch />
            <div className="sm:w-1/2 w-full text-white ">
                <h1 className="text-center text-3xl font-bold mb-10">{t('title-action')}</h1>
                <p className="text-xl text-center sm:text-left">{t('copy-action')}</p>
            </div>
        </div>
        <Map center={{ lat: 51.505, lng:-0.09 }} onChangePosition={console.log}/>
    </div>
}