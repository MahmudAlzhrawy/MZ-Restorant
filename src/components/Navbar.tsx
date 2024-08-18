import React from "react";
import "../sass/Nav.scss"
import { useEffect ,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Toast } from "../Sweetalert";
import { useLocation } from "react-router-dom";
import { ChevronRight, ShoppingBag } from "@mui/icons-material";
import { RootState,AppDispatch } from "../rtl/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartItems } from "../rtl/reducers/cartSlice";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
 import HomeIcon from '@mui/icons-material/Home';
 import DashboardIcon from '@mui/icons-material/Dashboard';

interface navprop
{
setAuth:React.Dispatch<React.SetStateAction<boolean>>
}
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
export function Navbar({setAuth}:navprop){
    const[num,setNumOfMeals]=useState<number>();
    const dispatch=useDispatch<AppDispatch>();
    const cartMeals=useSelector((state :RootState)=>state.Cart)as Meals[]; 
    const location = useLocation();
    const dash=location.pathname ==="/dashbord";
    const adm =location.pathname === "/orders" || location.pathname ==="/addNew" || location.pathname==="/Edit_meals";
    const style=():React.CSSProperties=>{
        if(location.pathname ==="/"){
            if(location.pathname ==="/"){
                return{position: "relative"}
            }
            return {backgroundColor:"rgba(255, 255, 255, 0.3)"}
            
        }
        else{
            return { backgroundColor:"rgba(255, 255, 255)",top:0,position:"fixed"}
        };
        
    }
    
    const isAuth=localStorage.getItem("Auth");
    const navigate=useNavigate();
    const colors =["#D2B48C","#A52A2A","#8B4513","#654321","#3E2723","#D2691E","#DEB887","#7B3F00","#A52A2A"];
    let i=0;
    const speed=1000;
useEffect(()=>{
    const logo= document.getElementById("Log");
const interval =setInterval(()=>{
    if(logo){
    logo.style.borderColor=colors[i];
    i= (i+1) % colors.length;
}
},speed)
return ()=>clearInterval(interval);
},[])
useEffect(()=>{
    dispatch(cartItems())
    const countMealsInCart:number = cartMeals.reduce((count, meal) => {
        if (auth.currentUser &&  meal.user&& meal.user.userId === auth.currentUser.uid) {
          count += meal.count;
        }
        return count;
      }, 0);
      setNumOfMeals((countMealsInCart));
},[cartMeals])
const logout = () => {
        signOut(auth)
        .then(() => {
            localStorage.setItem("Auth","false");
            setAuth(false);
            navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول
            Toast.fire({
            icon: "success",
            title: "Logout Success"
            });
        })
        .catch((error) => {
            console.error("Error signing out: ", error);
            Toast.fire({
            icon: "error",
            title: "Logout Failed"
            });
        });
    };
    const[clicked,setClick]=useState<boolean>(false);
        return(
        <>
        <div onClick={()=>{
            setClick(el =>!el);
        }} className={ ` ${clicked?"left-32 rotate-180":"left-0"} bg-amber-500 rounded-full max-[1000px]:block min-[1001px]:hidden arrow z-50 duration-1000 ease-in-out fixed top-1/2 -translate-y-1/2 text-amber-50 ` }>< ChevronRight sx={{fontSize:60}}/></div>
        <nav style={style()} className={` ${clicked ?"max-[1000px]:-translate-x-0  ":"max-[1000px]:-translate-x-full" } duration-500 ease-in-out nav flex  z-40 border-b-2   border-b-white max-[1000px]:bg-white    h-20   w-full mt-0.5 drop-shadow-md shadow-black  `}>
            <div className="right-links items-center absolute top-1/4 right-0 min-[1024px]:-translate-x-5 ">
            <ul className="flex  items-center  max-[1000px]:mt-10 ">
                
                    {(!adm && !dash) &&<li> <Link to="admin" className="max-[1001px]:hidden">Admin</Link><Link to="admin" className="max-[1000px]:block min-[1001px]:hidden "><AdminPanelSettingsIcon sx={{ fontSize: 40 }}/></Link></li>}
                    {(adm)&&<li><Link to="dashbord"><DashboardIcon sx={{ fontSize: 40 }} /></Link></li>}
                    {(!adm && !dash) &&<li className="relative mr-2 "><Link to="cart" ><ShoppingBag sx={{ fontSize: 40 }} /><span className="absolute  -bottom-1.5 translate-x-1 left-1/2 inline-block w-5 h-6 rounded-full text-sm text-red-300 bg-white">{num}</span></Link></li>}
                    {(adm || dash) &&<li><Link to="/"> <HomeIcon style={{ fontSize: 50, color: '#D2691E' }} /></Link></li>}
                    {(!adm && !dash)&&<li className="py-2 pr-3 pl-1 border-transparent hover:bg-amber-400 bg-amber-300 "><Link className="max-[1001px]:hidden " to="signup">Signup</Link> <Link className="max-[1000px]:block min-[1001px]:hidden " to="signup"><PersonAddIcon sx={{ fontSize: 40 }}/></Link></li>}
                    {(isAuth ==="true"&& (!adm && !dash)) &&<><li className=" py-2 pr-3 pl-1 hover:bg-amber-400 border-transparent text-white bg-amber-300 max-[1001px]:hidden  ml-2" onClick={logout}>logout</li><li className="max-[1000px]:block min-[1001px]:hidden" onClick={logout}><LogoutIcon sx={{ fontSize: 40 }}/></li></>}
                    {(isAuth ==="false"&& (!adm && !dash)) &&<li className="py-2 pr-3 pl-1 hover:bg-amber-400 border-transparent text-white bg-amber-300 ml-2"><Link className=" max-[1001px]:hidden " to="Login">Login</Link><Link className="max-[1000px]:block min-[1001px]:hidden  "to="Login"><LoginIcon sx={{ fontSize: 40 }}/></Link></li>}
                </ul>
            
            </div>
            <div id="Log" className="mid-logo  absolute duration-1000 ease-in-out  rounded-full border-4  left-1/2 bg-black  -translate-x-1/2  ">
            <Link to="/">
            <img width={100} className="  rounded-full  " src={require(`../assets/images/1.png`)} alt="Logo NOT FOUND"/>
            </Link>
            </div>
            <div className="left absolute top-1/3 left-0 min-[1024px]:translate-x-14  ">
                <ul className=" flex items-center  ">
                    <li><Link to="" className=" max-[1001px]:hidden ">About</Link><Link to="" className="max-[1000px]:block min-[1001px]:hidden"><InfoIcon sx={{ fontSize: 40 }}/></Link></li>
                    <li><Link to="" className="max-[1001px]:hidden">Contact</Link><Link to="" className="max-[1000px]:block min-[1001px]:hidden "><ContactMailIcon sx={{ fontSize: 40 }}/></Link></li>
                    {!adm&&<li><Link className=" max-[1001px]:hidden " to="/menu">Menu</Link><Link className=" max-[1000px]:block min-[1001px]:hidden  " to="/menu"><MenuIcon sx={{ fontSize: 40 }}/></Link></li>}
                </ul>
            </div>
            </nav>
            
        </>
    )
}