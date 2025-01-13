import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: 'query',
    initialState: {
        loading: false,
        latitude: 0,
        longitude: 0,
        dateStart: '',
        dateEnd: '',
        items: []
    },
    reducers: {
        loadingOn: (state) => ({...state, loading: true }),
        loadingOff: (state) => ({...state, loading: false }),
        setLatitude: (state, action) => ({...state, latitude:action.payload}),
        setLongitude: (state, action) => ({...state, longitude:action.payload}),
        setFrom: (state, action) => ({...state, dateStart:action.payload}),
        setTo: (state, action) => ({...state, dateEnd:action.payload}),
        setResult: (state, action) => ({...state, items:action.payload}),
        clearResult: (state) => ({...state, items:[]}),
    }
})

export const {
    loadingOn,
    loadingOff,
    setLatitude,
    setLongitude,
    setFrom,
    setTo,
    setResult,
    clearResult
} = querySlice.actions

export default querySlice.reducer