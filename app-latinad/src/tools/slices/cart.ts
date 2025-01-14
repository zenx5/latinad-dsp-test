import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type itemType = {
    id: number
    price_per_day: number
    price_currency: string
    lat: number
    lng: number
    latitude: number
    longitude: number
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
        addToCart: (state, action) => {
            return { ...state, items:[ ...state.items, action.payload ] }
        },
        removeItem: (state, action) => {
            const newItems = state.items.filter( item => item.id!==action.payload )
            return {
                ...state,
                items: newItems,
                itemIndex: state.itemIndex===action.payload ? 0 : state.itemIndex,
                itemSelected: state.itemIndex===action.payload ? null : state.itemSelected,
                isSelected: state.itemIndex===action.payload ? false : state.isSelected
            }
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

export const { remove, addToCart, removeItem, clearItems, setRemove, clearRemove, selectItem } = cartSlice.actions

export default cartSlice.reducer