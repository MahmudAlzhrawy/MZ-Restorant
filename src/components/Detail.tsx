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
    id:number|string|undefined
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
    isOffer:string,
    category:string;
}
export function Detail({isAuth,id}:bolProps & Foodprops){
    const dispatch=useDispatch<AppDispatch>();
    const meals =useSelector((state :RootState) =>state.Meals)
    const cartMeals=useSelector((state :RootState)=>state.Cart)
    const[isLike,setLike]=useState<boolean>();
    const handleLike=()=>{
        setLike(el =>!el);
    }
useEffect(()=>{
dispatch(fetchdata());
},[dispatch])
    return(
    <div className="Main mt-10  ">
        {
        meals.length !==0 ?<>{
        meals.filter((meal:Meals)=>meal.ID == id )
            .map((meal:Meals)=>{
                return(
                <div key={meal.id} className={`group shadow-lg h-full min-h-96  card w-4/5 relative overflow-hidden flex   mx-auto   duration-700 ease-in-out  border`}>
                    
                    <div  className="w-1/2  ">
                    <div className="title overflow-hidden   group-hover:left-0 text-left z-10 ">
                        <h2>{meal.title}</h2>
                    </div>
                    <div className="w-full  mx-auto overflow-hidden hover:brightness-75 ">
                        <img className=" w-full h-full max-h-96 hover:scale-110 duration-700 ease-in-out" src={meal.url} alt="Not found"/>
                    </div>
                    </div>
                    <div className="bg-amber-50 w-1/2 overflow-hidden">
                    <div className="components text-left mt-10 ml-4">
                    <div className="desc">
                        {meal.description}
                    </div>
                    <div className="pric py-3">
                    <p className="text-2xl italic font-serif text-amber-600 "><span className="text-3xl font-serif text-red-600 ">Price : </span>{meal.price} $</p> 
                    </div>
                    </div>
                    <div className="btns absolute top-14  right-full duration-1000 ease-in-out  group-hover:right-0 p-0.5 bg-white bg-opacity-65 mr-1 h-48 rounded-xl align-middle">
                        <div className="add items-center right-2 delay-700  p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700 ">
                        <IconButton style={{color:"#D2691E"}}  aria-label="add to shopping cart" onClick={()=>{
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
                        <AddShoppingCart  sx={{fontSize:35}} />
                        </IconButton>
                        </div>
                        <div className="more p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700 ">
                        <Link   to={`/details/${meal.ID}`}>
                            <IconButton style={{color:"#D2691E"}}  aria-label="show more">
                                <Visibility  sx={{fontSize:35}} />
                            </IconButton>
                        </Link>
                        </div>
                        <div className="fav p-0.5 rounded-full hover:bg-slate-100  hover:bg-opacity-40 border-transparent duration-700">
                        <IconButton 
                            onClick={handleLike}
                            aria-label="like"
                            style={{ color: isLike ? 'red':'#D2691E'   }}
                            //className={`${isLike ? "text-red-600" : "text-gray-400"}`}
                        >
                                <Favorite  sx={{fontSize:35}} />
                        </IconButton>
                        </div>
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