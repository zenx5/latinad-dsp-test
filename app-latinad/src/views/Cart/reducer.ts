export const initialCart = {
    items: [],
    removeItems: [],
    itemSelected: 0
}

export const reducerCart = (state:cartType, action:any) => {
    switch( action.type ){
        case 'remove':
            const newItems = state.items.filter( ({ id }:{ id:number }) => !state.removeItems.includes(id) )
            return { ...state, items:newItems, removeItems:[] }
        case 'set_items':
            return { ...state, items: action.payload }
        case 'clear_items':
            return { ...state, items: [] }
        case 'set_remove':
            return { ...state, removeItems: action.payload }
        case 'clear_remove':
            return { ...state, removeItems: [] }
        case 'select_item':
            return { ...state, itemSelected: action.payload }
        default:
            return state
    }
}