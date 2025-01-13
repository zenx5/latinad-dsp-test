import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VIEW_WELCOME = 1
type VIEW_QUERY = 2
type VIEW_CART = 3

export const VIEWS = {
    WELCOME : 1,
    QUERY : 2,
    CART : 3
}


type generalType = {
    fetching: boolean
    viewIndex: VIEW_WELCOME|VIEW_QUERY|VIEW_CART
}

export const generalSlice = createSlice({
    name:'general',
    initialState: {
        fetching: false,
        viewIndex: VIEWS.WELCOME,
    } as generalType,
    reducers:{
        toggleFetching: (state) => ({...state, fetching: !state.fetching }),
        changeView: (state, action) => ({ ...state, viewIndex:action.payload })
    },
})

export const { changeView } = generalSlice.actions

export default generalSlice.reducer