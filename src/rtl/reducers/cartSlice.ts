import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { cartdb } from '../../firebase-config2';
import { collection,getDocs,addDoc } from 'firebase/firestore';
import { Toast } from '../../Sweetalert';
import { auth } from '../../firebase-config';
const coll=collection(cartdb,"cart");
const Add = async(meal :Meals)=>{
    await addDoc(coll,{title:meal.title,ID:meal.ID,count:1,quantity:meal.quantity,price:meal.price,description:meal.description,rate:meal.rate,url:meal.url,user:{userName:auth.currentUser?.displayName,userId:auth.currentUser?.uid}})
    Toast.fire({
        icon: "success",
        title: "Add in successfully"
    });
}
export const cartItems= createAsyncThunk("cartSlice/cartItems", async()=>{
    try{
        const data =await getDocs(coll)
        return data.docs.map((doc)=>({...doc.data(),id:doc.id}))as Meals[];
    }catch(error)
    {
        Toast.fire({
            icon: "warning",
            title: "Failed Fetch"
        });
    }

})
interface Meals{
    user:{
        userId:string;
    }
    ID:number;
    id:string;
    count:number;
    title: string;
    description: string;
    price: number;
    rate: string;
    url: string;
    isOffer:string,
    category:string;
    quantity:number;
}
const cartSlice =createSlice({
    initialState:[] as Meals[],
    name:"cartSlice",
reducers:{
    addToCart:(state ,action)=>{
        const findmeal=state.find((meal)=>meal.ID=== action.payload.ID &&meal.user?.userId===auth.currentUser?.uid);
        if(!findmeal){
        const newMeal={...action.payload,quantity: 1}
        state.push(newMeal);
        Add(newMeal)
        }
        else{
            Toast.fire({
                icon: "info",
                title: " This meals already existed "
            });
        
        }
    }

},
extraReducers:(builder)=>{
    builder.addCase(cartItems.fulfilled,(state,action)=>{
        return action.payload
    })
}
    })
export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;