import { useEffect, useReducer, useState } from 'react'
import FormSearch from '../components/FormSearch/FormSearch'
import Map from '../components/Map/Map'
import { useTranslation } from 'react-i18next'
import MarkerDisplay from '../components/MarkerDisplay'
import ListContainer from '../components/ListDisplay/ListContainer'

type ItemType = {
    id: number
    name: string
    latitude: number
    longitude: number
}

type stateMainType = {
    latitude: number
    longitude: number
    startDate: string
    endDate:string
}

const initialQuery = {
    latitude: 0,
    longitude: 0,
    startDate: '',
    dateEnd: ''
}

const reducerQuery = (state:stateMainType, action:{ type:string }) => {
    console.log(state)
    console.log( action )
    return initialQuery
}


export default function Main() {
    const [query, dispatchQuery] = useReducer(reducerQuery, initialQuery)
    const [center, setCenter] = useState({ lat: 51.505, lng:-0.09 })
    const [isWelcomeView, setIsWelcomeView] = useState(false)
    const { t } = useTranslation()
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_DISPLAY}/api/display`)
            .then( response => response.json() )
            .then( data => {
                setItems( data.data )
            } )
    },[])

    const handleSearch = (event:any) => {
        console.log('search', event)
        setIsWelcomeView(false)
    }

    const modeClass = isWelcomeView ? "sm:p-4 p-0 sm:h-fit h-full z-20" : "p:0 h-full"

    return <div className="relative w-full h-full flex flex-row items-center justify-center">
        { isWelcomeView && <div className="bg-[#075E96] w-screen m-0 p-0 max-w-4xl mx-auto z-10 opacity-50 sm:h-with-footer h-without-footer absolute">sas</div>}
        <Map center={center} onChangePosition={console.log}>
            { items.map( (item:ItemType) => <MarkerDisplay key={`marker-${item.id}`} color="#0096F5" lat={item.latitude} lng={item.longitude} /> )}
        </Map>
        <div className={`flex sm:flex-row flex-col-reverse sm:justify-between justify-start gap-20 items-start w-full ${modeClass}`}>
            <FormSearch onSearch={handleSearch} open={ !isWelcomeView }>
                <ListContainer items={items}></ListContainer>
            </FormSearch>
            { isWelcomeView && <Title title={t('title-action')} subtitle={t('copy-action')} />}
        </div>
    </div>
}

function Title({ title, subtitle }:{ title:string, subtitle:string }){

    return <div className="sm:w-1/2 w-full text-white ">
        <h1 className="text-center text-3xl font-bold mb-10">{title}</h1>
        <p className="text-xl text-center sm:text-left">{subtitle}</p>
    </div>
}