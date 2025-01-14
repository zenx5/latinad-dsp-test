import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import './type.d'
import './List.css'

import { AppDispatch, RootState } from '../../tools/store'

import FormSearch from '../../components/FormSearch/FormSearch'
import Map from '../../components/Map/Map'
import MarkerDisplay from '../../components/MarkerDisplay'
import Title from '../../components/Title'


import { loadingOff, loadingOn, setFrom, setLatitude, setLongitude, setResult, setTo } from '../../tools/slices/query'
import { addToCart, removeItem } from '../../tools/slices/cart'
import { List } from 'antd'
import Item from '../../components/ListDisplay/Item'




export default function Main() {
    const { query, cart } = useSelector.withTypes<RootState>()( state => state )
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const { t } = useTranslation()
    const [currentLocation, setCurrentLocation] = useState(-1)
    const [center, setCenter] = useState({ lat: 0, lng:0 })
    const [isWelcomeView, setIsWelcomeView] = useState(query.items.length===0)

    useEffect(()=>{
        setIsWelcomeView( query.items.length===0 )
    },[cart.items])

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition( location => {
            setCenter({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        }  )
    },[])

    const handleSearch = async (event:any) => {
        dispatch(setLatitude(event.position.lat ))
        dispatch(setLongitude(event.position.lng ))
        dispatch(setFrom(event.dateStart ))
        dispatch(setTo(event.dateEnd ))
        setIsWelcomeView( false )
        try{
            dispatch(loadingOn())
            const deltaCoor = Number(import.meta.env.VITE_DELTA_COOR ?? 0.2 )
            const searchParams = new URLSearchParams()
            searchParams.set("date_from", query.dateStart)
            searchParams.set("date_to", query.dateEnd)
            searchParams.set("lat_sw", String( query.latitude - deltaCoor ) )
            searchParams.set("lng_sw", String( query.longitude - deltaCoor ) )
            searchParams.set("lat_ne", String( query.latitude + deltaCoor ) )
            searchParams.set("lng_ne", String( query.longitude + deltaCoor ) )
            const response = await fetch(`${import.meta.env.VITE_API_DISPLAY}/api/display?${searchParams.toString()}`)
            const data = await response.json()
            dispatch(setResult(data.data))
        }
        catch(e:any) {
            dispatch(setResult([]))
        }
        finally {
            dispatch(loadingOff())
        }
    }

    const handleSelectLocation = (id:number) => {
        setCurrentLocation(id)
        const itemFind = query.items.find( (item:{id:number}) => item.id===id ) as { latitude:number, longitude:number }|undefined
        if( itemFind ){
            setCenter({
                lat: itemFind.latitude,
                lng: itemFind.longitude
            })
        }
    }

    const intoCart = (id:number) => {
        return !!cart.items.find( item => item.id === id )
    }

    const getColorMarker = (id:number) => {
        if( id === currentLocation ) return "#FFFF00"
        return intoCart(id) ? "#00ffaa" : "#0096F5"
    }

    const AddToCart = (id:number) => {
        if( !intoCart(id) ) {
            const item = query.items.find( (item:{ id:number }) => item.id===id )
            if( item ) {
                dispatch(addToCart({
                    ...item as ItemType,
                    dateStart:query.dateStart,
                    dateEnd:query.dateEnd
                }))
            }
        }
        else {
            dispatch(removeItem(id))
        }
    }

    const modeClass = isWelcomeView ? "sm:p-4 p-0 sm:h-fit h-full z-20" : "p:0 h-full"

    return <div className="relative w-full h-full flex flex-row items-center justify-center">
        { isWelcomeView && <div className="bg-[#075E96] w-screen m-0 p-0 max-w-4xl mx-auto z-10 opacity-50 sm:h-with-footer h-without-footer absolute"></div>}
        <Map center={center} onChangePosition={console.log}>
            { query.items.map( (item:ItemType) => <MarkerDisplay key={`marker-${item.id}`} color={ getColorMarker(item.id)} lat={item.latitude} lng={item.longitude} /> )}
        </Map>
        <div className={`flex sm:flex-row flex-col-reverse sm:justify-between justify-start gap-20 items-start w-full ${modeClass}`}>
            <FormSearch label={t('send')} onSearch={handleSearch} open={ !isWelcomeView } loading={query.loading}>
                <List
                    dataSource={query.items}
                    locale={{
                        emptyText: <span className="flex flex-col items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            <span>{t('not_data')}</span>
                        </span>
                    }}
                    renderItem={ (item:{ id:number, name:string }) =>
                        <Item
                            className={ item.id===currentLocation ? 'item-selected' : 'item-non-selected' }
                            name={item.name}
                            isCart={intoCart(item.id)}
                            onClick={()=>handleSelectLocation(item.id)}
                            onCart={()=>AddToCart(item.id)}
                    /> }
                />
            </FormSearch>
            { isWelcomeView && <Title title={t('title-action')} subtitle={t('copy-action')} />}
        </div>
    </div>
}