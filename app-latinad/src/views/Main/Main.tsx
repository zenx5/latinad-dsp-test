import { useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'

import './type.d'

import FormSearch from '../../components/FormSearch/FormSearch'
import Map from '../../components/Map/Map'
import MarkerDisplay from '../../components/MarkerDisplay'
import ListContainer from '../../components/ListDisplay/ListContainer'
import Title from '../../components/Title'

import { initialQuery, reducerQuery } from './reducer'




export default function Main() {
    const { t } = useTranslation()
    const [query, dispatchQuery] = useReducer(reducerQuery, initialQuery)
    const [center, setCenter] = useState({ lat: 0, lng:0 })
    const [isWelcomeView, setIsWelcomeView] = useState(true)
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

    const handleSelectLocation = (id:string|number, item:{ latitude:number, longitude:number }) => {
        setCenter({
            lat: item.latitude,
            lng: item.longitude
        })
    }

    const modeClass = isWelcomeView ? "sm:p-4 p-0 sm:h-fit h-full z-20" : "p:0 h-full"

    return <div className="relative w-full h-full flex flex-row items-center justify-center">
        { isWelcomeView && <div className="bg-[#075E96] w-screen m-0 p-0 max-w-4xl mx-auto z-10 opacity-50 sm:h-with-footer h-without-footer absolute"></div>}
        <Map center={center} onChangePosition={console.log}>
            { items.map( (item:ItemType) => <MarkerDisplay key={`marker-${item.id}`} color="#0096F5" lat={item.latitude} lng={item.longitude} /> )}
        </Map>
        <div className={`flex sm:flex-row flex-col-reverse sm:justify-between justify-start gap-20 items-start w-full ${modeClass}`}>
            <FormSearch onSearch={handleSearch} open={ !isWelcomeView } loading={query.loading}>
                <ListContainer items={items} onClick={handleSelectLocation}/>
            </FormSearch>
            { isWelcomeView && <Title title={t('title-action')} subtitle={t('copy-action')} />}
        </div>
    </div>
}