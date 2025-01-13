export const initialQuery = {
    loading: false,
    latitude: 0,
    longitude: 0,
    dateStart: '',
    dateEnd: ''
}

export const reducerQuery = (state:stateQueryType, action:{ type:string, value?:string|number }) => {
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