import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/userSlice'

const Store = configureStore({
    reducer:{
        user:userReducer
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store