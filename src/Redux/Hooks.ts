import {RootState, AppDispatch } from './Store'
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux'

export const useAppState:TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()