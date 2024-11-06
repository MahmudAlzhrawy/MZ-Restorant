import React from "react";
import { useParams } from "react-router-dom";
import { Food } from "../components/FoodCard";
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
import { useEffect,useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination , EffectCoverflow} from 'swiper/modules';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import { Footer } from "./Footer";
interface bolProps {
isAuth: boolean;
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
oldPrice?:string;
}
interface bolProps {
isAuth: boolean;
}
export function Foods( {isAuth}:bolProps ){
const[item,setItem]=useState<string>("");
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
const params= useParams();
const category =params.cat;
const searchFilter= meals.filter((meal)=>meal.title.toLocaleLowerCase().includes(item.toLocaleLowerCase())&&meal.category===category && meal.isOffer ==="NO")
return(<>

<div style={{height:"700px"}} className="group back w-full relative  overflow-x-hidden  ">
<h1 className="  py-5 px-14 bg-amber-400  rounded-xl hover:bg-amber-400 hover:scale-105 duration-700 ease-in-out bg-opacity-20  absolute top-1/2 z-10 left-1/2 text-6xl -translate-x-1/2 -translate-y-1/2 italic text-white text-opacity-80 font-serif mt-3">{category}</h1>

    {
        category==="Grills"? <img  className="w-full h-full"src={require(`../assets/Parpique/3.jpeg`)} alt="Grills Not Found now"/>:
        category ==="seaFood"?<img className="w-full h-full" src={require(`../assets/Sea Food/1.jpeg`)} alt="Not Found"/>:
        category==="Pasta"?<img className="w-full h-full" src={require(`../assets/Pasta/1.jpeg`)}  alt="Not Found"/>:
        category==="Pastries"? <img className="w-full h-full" src={require(`../assets/Moajanaat/2.jpeg`)} alt="Not Found"/>:
        category==="Drinks"?<img className="w-full h-full" src={require(`../assets/Drinks/2.jpeg`)}  alt="Not Found"/>:
        category==="Dessert"?<img className="w-full h-full" src={require(`../assets/Dessert/1.jpeg`)}  alt="Not Found"/>:
        <img className="w-full h-full" src={require(`../assets/ofer.jpeg`)}  alt="Not Found"/>

    }
</div>
<div className="Main  mt-5  overflow-x-hidden ">
<div className="offers flex px-2 w-[96%] mx-auto bg-amber-100 rounded-lg shadow-lg">
<div className="img pt-5 w-[35%]">
<img className="h-[80%] w-full rounded-lg object-cover" src={require('../assets/ofer.jpeg')} alt="Offer" />
</div>
<div className="swip h-[70%] w-[65%] flex-grow px-4">
<h1 className="text-center text-amber-700 mt-3 text-3xl font-serif">OFFERS</h1>
<Swiper
effect={'coverflow'}
grabCursor={true}
centeredSlides={true}
slidesPerView={2}
coverflowEffect={{
rotate: 40,
stretch: 0,
depth: 80,
modifier: 1,
slideShadows: true,
}}
navigation={true}
autoplay={{
delay: 2500,
disableOnInteraction: false,
}}
pagination={{
dynamicBullets: true,
}}
modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
className="mySwiper h-4/5 mx-auto"
>
{meals
.filter((meal: Meals) => meal.isOffer === "YES" && meal.category === category)
.map((meal: Meals) => (
    <SwiperSlide key={meal.id}>
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
        <p className="text-red-500 text-md line-through">
            <span className="font-semibold">Old Price:</span> ${meal.oldPrice}
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
    </SwiperSlide>
))}
</Swiper>
</div>
</div>

<div className="relative z-50 mt-10 w-full max-w-md mx-auto">
            <TextField
                id="search-field"
                label="Search"
                variant="outlined"
                onChange={(ev) => {
                    setItem(ev.target.value);
                }}
                className="w-full"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon
                                sx={{
                                    color: 'white',
                                    fontSize: '2.5rem',
                                    backgroundColor: 'brown',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    cursor: 'pointer'
                                }}
                            />
                        </InputAdornment>
                    ),
                    style: {
                        color: '#D2691E',
                        fontSize: '20px',
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: '#A0522D',
                        fontSize: '20px',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent',
                            borderRadius: '25px',
                        },
                        '&:hover fieldset': {
                            borderColor: '#A0522D',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D2691E',
                        },
                        backgroundColor: 'white',
                        paddingRight: '8px',
                        paddingLeft: '8px',
                    },
                    width: '100%',
                    maxWidth: '400px',
                }}
            />
        </div>
<div className="bg-amber-100">

    <div className="container mx-auto   mt-10 ">
        <h2>Meals</h2>
        <div className="cards z-10 relative m-4 ">
            <div>{
                (item==='')?
                    <Food isAuth={isAuth} category={category} />:
                    <>
                    <div className="Main  grid grid-cols-3    max-[550px]:grid-cols-2  max-[320px]:grid-cols-1 gap-2   ">
                        {
                        searchFilter.length !==0 ?<>{
                            searchFilter
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
        }</>:<div className="mt-10"><span className=" inline-block w-4/5 mx-auto absolute top-3/4 left-1/2 " >
            </span>
            <div className="text-center absolute top-1/2 -translate-x-5 -translate-y-10 left-1/2 font-serif text-2xl h-8  ">not found results  <span className="dots "></span><span className="dots  transform-cpu delay-500"></span><span className="dots"></span> </div>
            </div>
        

}
    </div>
                            </>
                        }
                    </div>
                </div>
            </div> 
            </div>   
        </div>
                </>
    )
}