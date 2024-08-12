import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { orderdb } from '../../firbase-config3';
import { Toast } from '../../Sweetalert';

interface Meals {
    user: {
        userId: string;
    };
    ID: number;
    id: string|undefined;
    count: number;
    title: string;
    description: string;
    price: number;
    rate: string;
    url: string;
    isOffer: string;
    category: string;
    quantity: number;
}

const collorder = collection(orderdb, "orders");

const addOrd = async (meals: Meals) => {
    try {
        await addDoc(collorder, {
            ID: meals.ID,
            title: meals.title,
            url: meals.url,
            description: meals.description,
            price: meals.price,
            quantity: meals.quantity,
            count: meals.count,
            user: { userId: meals.user.userId }
        });
        console.log("Order added to Firestore: ", meals);
    } catch (error) {
        console.error("Error adding order to Firestore: ", error);
        Toast.fire({
            icon: "warning",
            title: "Add order failed"
        });
    }
};

export const getOrders = createAsyncThunk("orderSlice/getOrders", async () => {
    try {
        const data = await getDocs(collorder);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Meals[];
    } catch (error) {
        console.error("Error fetching orders: ", error);
    }
});

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: [] as Meals[],
    reducers: {
        addOrder: (state, action) => {
            addOrd(action.payload);
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
