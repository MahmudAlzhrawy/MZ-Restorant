import React, { useEffect } from "react";
import {fetchdata} from "../../rtl/reducers/fetchFood";
import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../../rtl/store";

import "../../sass/Foodcard.scss"
import { IconButton } from '@mui/material';
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
interface Meals{
    user:{
        userId:string
    }
    id:string;
    ID:number;
    title: string;
    description: string;
    price: string;
    rate: string;
    url: string;
    isOffer:string;
    category:string;
}
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: true,
    timer:50000,
    timerProgressBar:true,
    didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
    }
});
export function Editfoods(){
    const coll=collection(db,"meals");
    const dispatch=useDispatch<AppDispatch>();
    const meals =useSelector((state :RootState) =>state.Meals)
    const del = async (id: string) => {
        Toast.fire({
            icon: "info",
            title: "Do You want To Delete this Meal ? "
        });
        try {
            await deleteDoc(doc(coll, id));
            dispatch(fetchdata());
        } catch (error) {
            console.error(`Error deleting meal ${id}`, error);
        }
        }
useEffect(()=>{
dispatch(fetchdata());
},[dispatch])
    return(
    <div className="Main grid grid-cols-3   max-[550px]:grid-cols-2  max-[320px]:grid-cols-1 gap-2   ">
        {
        meals.length !==0 ?<>{
        meals.map((meal:Meals)=>{
                return(
                <div key={meal.id} className={`group card relative overflow-hidden    duration-700 ease-in-out w-full shadow`}>
                    
                    <div className="title group-hover:left-0 z-10 ">
                        <h2>{meal.title}</h2>
                    </div>
                    <div className="w-full max-w-sm mx-auto overflow-hidden hover:brightness-75 ">
                        <img className=" w-full h-72 hover:scale-110 duration-700 ease-in-out" src={meal.url} alt="Not found"/>
                    </div>
                    <div className="desc py-3">
                    <p className="text-2xl italic font-serif text-amber-600 "><span className="text-3xl font-serif text-red-600 ">Price : </span>{meal.price} $</p> 
                    </div>
                    
                    <div className="btns absolute top-14  right-full duration-1000 ease-in-out  group-hover:right-0 p-0.5 bg-amber-600 bg-opacity-65 mr-1 h-48 rounded-xl align-middle">
                        <div className="Edit p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700 ">
                        <button onClick={()=>{
                            del(meal.id);
                        }} >
                            <IconButton color="primary" aria-label="show more">
                                Delete
                            </IconButton>
                        </button>
                        </div>
                        </div>
                            
                </div>
                )
            })
        }</>:<><span className=" inline-block w-4/5 mx-auto absolute top-1/2 left-1/2 " >
            <div className="border-spacing-x-1 bg-transparent   animate-spin items-center text-center border-solid shadow-inner shadow-blue-500  border-r-transparent  border-blue-900 h-14 w-14 rounded-full "></div>
            </span>
            
            <div className="text-center absolute top-2/3 -translate-x-5 -translate-y-10 left-1/2 font-serif text-2xl h-8  ">Loading <span className="dots "></span><span className="dots  transform-cpu delay-500"></span><span className="dots"></span> </div>
            </>
        

}
    </div>
    )

}