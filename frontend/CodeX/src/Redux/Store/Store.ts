import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducers/Reducer';


export const Store = configureStore({
    reducer:rootReducer,
})