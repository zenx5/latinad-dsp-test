import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import CustomStorage from "./CustomStorage";
import cartReducer from "./slices/cart"
import generalReducer from "./slices/general"
import queryReducer from "./slices/query"



const persistConfig = {
    key:'root',
    storage: CustomStorage,
    blacklist: ['query']
}



const persistedReducer = persistReducer(persistConfig, combineReducers({
    general: generalReducer,
    cart: cartReducer,
    query: queryReducer
}))





const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware=>getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: true
        }
    })
})

const persistor = persistStore(store)

export { store, persistor }

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store