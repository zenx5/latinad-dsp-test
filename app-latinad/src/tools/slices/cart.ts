import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type itemType = {
    id: number
    price_per_day: number
    price_currency: string
    lat: number
    lng: number
    name: string
    size_width: number
    size_height: number
    formatted_address: string
}

type cartType = {
    items: itemType[],
    removeItems: number[]
    itemSelected: itemType|null
    itemIndex: number
    isSelected: boolean
}

export const cartSlice = createSlice({
    name:'cart',
    initialState: {
        items: [],
        itemSelected: null,
        itemIndex: 0,
        isSelected: false,
        removeItems: []
    } as cartType,
    reducers:{
        setItems: (state, action:PayloadAction<any[]>) => {
            console.log( 'setItems')
            if( action.payload.length>0 ) return { ...state, items:action.payload, itemIndex:action.payload[0].id, itemSelected:action.payload[0], isSelected:true }
            return { ...state, items:[], itemIndex:0, itemSelected:null, isSelected:false }
        },
        clearItems: (state) => ({ ...state, items:[], itemIndex:0, itemSelected:null, isSelected:false }),
        selectItem: (state, action:PayloadAction<number>) => {
            const item = state.items.find( ({ id }) => id===action.payload )
            if( item ) return { ...state, itemSelected:item, itemIndex: action.payload, isSelected:true }
            return { ...state, itemSelected:null, itemIndex: 0, isSelected:false }
        },
        remove: (state) => {
            const newItems = state.items.filter( ({ id }:{ id:number }) => !state.removeItems.includes(id) )
            if( newItems.length>0 ) return { ...state, items:newItems, removeItems:[], itemIndex:newItems[0].id, itemSelected:newItems[0], isSelected:true }
            return { ...state, items:newItems, removeItems:[], itemIndex:0, itemSelected:null, isSelected:false }
        },
        setRemove: (state, action:PayloadAction<number[]>) => ({ ...state, removeItems: action.payload }),
        clearRemove: (state) => ({ ...state, removeItems: [] })
    }

})

export const { remove, setItems, clearItems, setRemove, clearRemove, selectItem } = cartSlice.actions

export default cartSlice.reducer