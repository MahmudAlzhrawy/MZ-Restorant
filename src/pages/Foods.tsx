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
    const[isClic,setClic]=useState<boolean>(false);
    const handlesearch=()=>{
        setClic(el =>!el);
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
        <div className={` z-10 absolute max-[400px]:w-4/5 max-[400px]:translate-x-1/4  w-1/2  rounded-r-full translate-x-1/2 duration-1000  ease-in-out  top-48  border-amber-50 `}>
        <TextField 
        id="search-field"
        label="Search"
        
        className="w-full mx-auto p-2 rounded-r-full  border-transparent bg-white"
        onChange={(ev)=>{
            setItem(ev.target.value)
        }}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end" className="rounded-r-full"  >
                <SearchIcon  className="hover:cursor-pointer rounded-r-full" sx={{ color: 'white', fontSize: '2.5rem',backgroundColor:"brown" ,height:"70px " ,width:"60px" }} />
            </InputAdornment>
            ),
                style: {
                    color: '#D2691E',
                    fontSize:"25px" // لون النص المدخل بني شوكولاتي
                }
                }}
                InputLabelProps={{
                style: {
                    color: '#A0522D',
                    fontSize:"25px" , // لون النص "Search" بني غامق
                }
                }}
                sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: 'transparent', // لون الحدود بني خشبي
                    },
                    '&:hover fieldset': {
                    borderColor: 'transparent', // لون الحدود عند التمرير بني عادي
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'transparent', // لون الحدود عند التركيز بني غامق
                    },
                    padding:"8px"
                },
        }}
    />
        </div>
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
        <div className="offer bg-amber-400 bg-opacity-10  pb-6 w-full ">
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
        meals.filter((meal:Meals)=> meal.isOffer ==="YES" && meal.category === category )
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
                            <p className="text-2xl italic font-serif text-red-600  line-through">
                            <span className="text-2xl font-serif ">oldPrice : </span>
                            {meal.oldPrice} $
                            </p>
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
                                        <div key={meal.id} className={`group pt-3 card bg-white relative overflow-hidden    duration-700 ease-in-out w-full shadow`}>
                                            
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