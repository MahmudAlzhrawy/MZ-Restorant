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
        <div className="Main  mt-32  ">
        <TextField className=" w-1/2 translate-x-1/2  border-amber-700 "
        id="search-field"
        label="Search"
        variant="outlined"
        onChange={(ev)=>{
            setItem(ev.target.value)
        }}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                <SearchIcon  sx={{ color: '#8B4513', fontSize: '1.5rem' }} />
            </InputAdornment>
            ),
                style: {
                    color: '#D2691E', // لون النص المدخل بني شوكولاتي
                }
                }}
                InputLabelProps={{
                style: {
                    color: '#A0522D', // لون النص "Search" بني غامق
                }
                }}
                sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: '#CD853F', // لون الحدود بني خشبي
                    },
                    '&:hover fieldset': {
                    borderColor: '#8B4513', // لون الحدود عند التمرير بني عادي
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: '#A0522D', // لون الحدود عند التركيز بني غامق
                    },
                },
        }}
    />
            <div className="container mx-auto   mt-10 ">
            <h1 className="text-4xl italic text-amber-900 text-opacity-35 font-serif mt-3">{category}</h1>
                <div className="cards m-4 ">
                    <div>{
                        (item==='')?
                            <Food isAuth={isAuth} category={category} />:
                            <>
                            <div className="Main grid grid-cols-3   max-[550px]:grid-cols-2  max-[320px]:grid-cols-1 gap-2   ">
                                {
                                searchFilter.length !==0 ?<>{
                                    searchFilter
                                    .map((meal:Meals)=>{
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
        }</>:<><span className=" inline-block w-4/5 mx-auto absolute top-1/2 left-1/2 " >
            </span>
            <div className="text-center absolute top-2/3 -translate-x-5 -translate-y-10 left-1/2 font-serif text-2xl h-8  ">not found results  <span className="dots "></span><span className="dots  transform-cpu delay-500"></span><span className="dots"></span> </div>
            </>
        

}
    </div>
                            </>
                        }
                    </div>
                </div>
            </div>    
        <div className="offer bg-amber-400 bg-opacity-10 mt-32 pb-6 w-full ">
            <div className="mb-6 py-2 font-serif text-4xl italic text-amber-800 text-opacity-60 bg-opacity-60"><h1>offers</h1></div>
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
                modules={[Pagination,Autoplay,Navigation,EffectCoverflow]}
                className="mySwiper w-2/3 mx-auto shadow"
        >
        
        {
        meals.filter((meal:Meals)=> meal.isOffer ==="YES"&& meal.category === category )
                    .map((meal:Meals)=>{
                        return(
                            <SwiperSlide >
                        <div key={meal.id} className={`group h-4/5 card relative overflow-hidden   bg-gray-100 duration-700 ease-in-out w-full `}>
                            <div className="title group-hover:left-0 z-10 ">
                                <h2>{meal.title}</h2>
                            </div>
                            <div className=" overflow-hidden hover:brightness-75 ">
                                <img className="w-full h-96 hover:scale-110 duration-700 ease-in-out" src={meal.url} alt="Not found"/>
                            </div>
                            <div className="desc py-3">
                            <p className="text-2xl italic font-serif text-amber-600 "><span className="text-3xl font-serif text-red-600 ">Price : </span>{meal.price} $</p> 
                            </div>
                            
                            <div className="btns absolute top-14  right-full duration-1000 ease-in-out  group-hover:right-0 p-0.5 bg-white bg-opacity-65 mr-1 h-48 rounded-xl align-middle">
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
                        </SwiperSlide>)
                    }) }
                </Swiper>
                </div>
        </div>
                </>
    )
}