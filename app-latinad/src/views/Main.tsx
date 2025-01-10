import { useEffect, useReducer, useState } from 'react'
import FormSearch from '../components/FormSearch/FormSearch'
import Map from '../components/Map/Map'
import { useTranslation } from 'react-i18next'
import MarkerDisplay from '../components/MarkerDisplay'
import ListContainer from '../components/ListDisplay/ListContainer'
import Title from '../components/Title'

type ItemType = {
    id: number
    name: string
    latitude: number
    longitude: number
}

type stateQueryType = {
    loading: boolean
    latitude: number
    longitude: number
    dateStart: string
    dateEnd: string
}

const initialQuery = {
    loading: false,
    latitude: 0,
    longitude: 0,
    dateStart: '',
    dateEnd: ''
}

const reducerQuery = (state:stateQueryType, action:{ type:string, value?:string|number }) => {
    switch( action?.type ) {
        case 'toggle_loading':
            return {...state, loading:!state.loading}
        case 'latitude':
            if( !action?.value ) return state
            return {...state, latitude: action.value as number }
        case 'longitude':
            if( !action?.value ) return state
            return {...state, longitude: action.value as number }
        case 'from':
            if( !action?.value ) return state
            return {...state, dateStart: action.value as string }
        case 'to':
            if( !action?.value ) return state
            return {...state, dateEnd: action.value as string }
        default:
            return state
    }
}


export default function Main() {
    const [query, dispatchQuery] = useReducer(reducerQuery, initialQuery)
    const [center, setCenter] = useState({ lat: 51.505, lng:-0.09 })
    const [isWelcomeView, setIsWelcomeView] = useState(true)
    const { t } = useTranslation()
    const [items, setItems] = useState([])

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition( location => {
            setCenter({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        }  )
    },[])

    const handleSearch = async (event:any) => {
        dispatchQuery({ type:'latitude', value:event.position.lat })
        dispatchQuery({ type:'longitude', value:event.position.lng })
        dispatchQuery({ type:'from', value:event.dateStart })
        dispatchQuery({ type:'to', value:event.dateEnd })
        setIsWelcomeView( prev => !prev )
        try{
            dispatchQuery({ type:'toggle_loading' })
            const response = await fetch(`${import.meta.env.VITE_API_DISPLAY}/api/display`)
            const data = await response.json()
            setItems( data.data )
        }
        catch(e:any) {
            console.log('catch')
        }
        finally {
            dispatchQuery({ type:'toggle_loading' })
        }
    }

    const modeClass = isWelcomeView ? "sm:p-4 p-0 sm:h-fit h-full z-20" : "p:0 h-full"

    return <div className="relative w-full h-full flex flex-row items-center justify-center">
        { isWelcomeView && <div className="bg-[#075E96] w-screen m-0 p-0 max-w-4xl mx-auto z-10 opacity-50 sm:h-with-footer h-without-footer absolute">sas</div>}
        <Map center={center} onChangePosition={console.log}>
            { items.map( (item:ItemType) => <MarkerDisplay key={`marker-${item.id}`} color="#0096F5" lat={item.latitude} lng={item.longitude} /> )}
        </Map>
        <div className={`flex sm:flex-row flex-col-reverse sm:justify-between justify-start gap-20 items-start w-full ${modeClass}`}>
            <FormSearch onSearch={handleSearch} open={ !isWelcomeView } loading={query.loading}>
                <ListContainer items={items}></ListContainer>
            </FormSearch>
            { isWelcomeView && <Title title={t('title-action')} subtitle={t('copy-action')} />}
        </div>
    </div>
}