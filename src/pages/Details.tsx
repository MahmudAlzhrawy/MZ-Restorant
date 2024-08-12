import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import {fetchdata} from "../rtl/reducers/fetchFood";
import { AppDispatch } from "../rtl/store";
import {Detail} from "../components/Detail"
interface Meals{
    id:string;
    ID:number|string;
    title: string;
    description: string;
    price: string;
    rate: string;
    url: string;
    isOffer:string,
    category:string;
    quantity:number

}
interface bolProps {
    isAuth: boolean;
}
export function Details({isAuth}:bolProps){
    const param=useParams();
    
    const dispatch=useDispatch<AppDispatch>();
   // const meals =useSelector((state :RootState) =>state.Meals)
useEffect(()=>{
dispatch(fetchdata());
},[dispatch])

    return(
        <div className="Main mt-32">
            <div className="container mx-auto ">
            
                <Detail isAuth={isAuth} id={param.mealId }/>
            
            </div>     
            
            
        </div>
    )
}