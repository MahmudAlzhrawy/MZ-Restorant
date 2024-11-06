import React, { useEffect, useState } from "react";
import {fetchdata} from "../rtl/reducers/fetchFood";
import { cartItems } from "../rtl/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../rtl/store";
import { addToCart } from "../rtl/reducers/cartSlice";
import { Toast } from "../Sweetalert";
import { Link } from "react-router-dom";
import "../sass/Foodcard.scss"
import { AddShoppingCart,Visibility,Favorite  } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { auth } from "../firebase-config";
interface bolProps {
    isAuth: boolean;
}
interface Foodprops{
    category:string|undefined
}
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
export function Food({isAuth,category}:bolProps & Foodprops){
    const dispatch=useDispatch<AppDispatch>();
    const meals =useSelector((state :RootState) =>state.Meals)
    const cartMeals=useSelector((state :RootState)=>state.Cart)
    const[isLike,setLike]=useState<boolean>(false);
    const handleLike=()=>{
        setLike(el =>!el);
    }
useEffect(()=>{
dispatch(fetchdata());
},[dispatch])
    return(
    <div className="Main grid grid-cols-3   max-[550px]:grid-cols-2  max-[320px]:grid-cols-1 gap-2   ">
        {
        meals.length !==0 ?<>{
        meals.filter((meal:Meals)=>meal.category === category && meal.isOffer ==="NO")
            .map((meal:Meals)=>{
                return(
                    <div className="group h-full card relative overflow-hidden bg-white shadow-lg rounded-lg">
                        <div className="title absolute top-2 left-[-100%] w-full bg-opacity-70 bg-gray-100 p-2 rounded-lg z-10 transition-all duration-500 group-hover:left-0">
                        <h2 className="text-amber-900 text-center">{meal.title}</h2>
                        </div>
                    <div className="overflow-hidden hover:brightness-75">
                    <img className="w-full h-60 object-cover hover:scale-110 transition-transform duration-700" src={meal.url} alt="Not found" />
                    </div>
                    <div className="desc py-3 text-center">
                    <p className="text-amber-700 text-lg font-semibold">
                        <span className="text-red-600 font-bold">Price:</span> ${meal.price}
                    </p>
                    
                    </div>
                    <div className="btns absolute top-12 right-0 flex flex-col items-center space-y-2 p-1 bg-opacity-70 bg-white rounded-xl shadow-lg transform translate-x-full transition-transform duration-700 group-hover:translate-x-0">
                    
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>{
                    dispatch(cartItems())
                    const findprod =cartMeals.find((mel)=>mel.ID === meal.ID && meal.user?.userId===auth.currentUser?.uid)
                        if( isAuth) {
                            if(!findprod){
                            dispatch(addToCart(meal));
                        }
                            else{
                                Toast.fire({
                                    icon: "info",
                                    title: "This Meal is Find in Cart "
                                });
                            }
                        }
                        else{
                            Toast.fire({
                                icon: "warning",
                                title: " You Must Login First "
                            });
                        }
                            
                            
                            }}>
                        <AddShoppingCart />
                    </IconButton>
                    <Link to={`/details/${meal.ID}`}>
                        <IconButton color="primary" aria-label="show more">
                        <Visibility />
                        </IconButton>
                    </Link>
                    <IconButton onClick={handleLike} aria-label="like" style={{ color: isLike ? 'red' : 'gray' }}>
                        <Favorite />
                    </IconButton>
                    </div>
                </div>
                            
                
                )
            })
        }</>:<div className="mt-14">
            
            <div className="text-center absolute top-2/3 -translate-x-5 -translate-y-10 left-1/2 font-serif text-2xl h-8  "> <span className="dots "></span><span className="dots  transform-cpu delay-500"></span><span className="dots"></span> </div>
            
            </div>
        

}
    </div>
    )

}