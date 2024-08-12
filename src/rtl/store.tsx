import { configureStore } from '@reduxjs/toolkit';
import RestoSlice from "./reducers/fetchFood";
import cartSlice from "./reducers/cartSlice"
import addUsers from './reducers/userSlice';
import orderSlice from './reducers/orderSlice';
export const store = configureStore({
reducer:{
    Meals:RestoSlice,
    Cart:cartSlice,
    Users:addUsers,
    Orders:orderSlice
},
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;