import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import CustomStorage from "./CustomStorage";
import cartReducer from "./slices/cart"



const persistConfig = {
    key:'root',
    storage: CustomStorage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    cart: cartReducer
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