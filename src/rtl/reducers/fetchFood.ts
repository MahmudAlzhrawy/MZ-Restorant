import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../firebase-config';
import { collection,getDocs } from 'firebase/firestore';
import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
    }
});
interface Meals{
    user:{
        userId:string;
    }
    ID:number;
    id:string;
    title: string;
    description: string;
    price: string;
    rate: string;
    url: string;
    isOffer:string,
    category:string;
    createdAt?: Date;
    count:1
}
const mealcoll=collection(db,"meals");
export  const fetchdata = createAsyncThunk ("RestoSlice/fetchdata",async()=>{
    try{
        const data =await getDocs(mealcoll)
        return data.docs.map((doc)=>({...doc.data(),id:doc.id}))as Meals[];
    }catch(error)
    {
        Toast.fire({
            icon: "warning",
            title: "Failed Fetch"
        });
    }
})


const RestoSlice =createSlice({
    initialState:[] as Meals[],
    name : "RestoSlice",
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchdata.fulfilled, (state, action) => {
            return action.payload;
        });
    }
})
export default RestoSlice.reducer;