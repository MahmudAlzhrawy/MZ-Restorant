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
                <div key={meal.id} className={`group card pt-3 bg-white relative overflow-hidden    duration-700 ease-in-out w-full shadow`}>
                    
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
                        <div className="add items-center right-2 delay-700  p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700 ">
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
                                
                                
                                }} >
                        <AddShoppingCart />
                        </IconButton>
                        </div>
                        <div className="more p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700 ">
                        <Link to={`/details/${meal.ID}`}>
                            <IconButton color="primary" aria-label="show more">
                                <Visibility  />
                            </IconButton>
                        </Link>
                        </div>
                        <div className="fav p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700">
                        <IconButton 
                            onClick={handleLike}
                            aria-label="like"
                            style={{ color: isLike ? 'red':'white'   }}
                            //className={`${isLike ? "text-red-600" : "text-gray-400"}`}
                        >
                                <Favorite  />
                        </IconButton>
                        </div>
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