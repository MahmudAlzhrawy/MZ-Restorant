import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../../sass/Dashbord.scss"
import { AppDispatch } from '../../rtl/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../rtl/store';
import {fetchdata} from "../../rtl/reducers/fetchFood";
import { getOrders } from '../../rtl/reducers/orderSlice';
import { getUsers } from '../../rtl/reducers/userSlice';

export function Dashbord(){
    const dispatch=useDispatch<AppDispatch>();
    const meals =useSelector((state :RootState) =>state.Meals);
    const orders=useSelector((state:RootState) =>state.Orders);
    const users =useSelector((state:RootState)=>state.Users)
    const[orodersNum,setOrders]=useState<number>()
    const[mealsNum,setmeals]=useState<number>()
    const[drinksNum,setDrinks]=useState<number>()
    const[grillsNum,setmGrills]=useState<number>()
    const[pastasNum,setPasta]=useState<number>()
    const[seafoodsNum,setSeafoods]=useState<number>()
    const[dessertsNum,setDesserts]=useState<number>()
    const[pastiersNum,setPastiers]=useState<number>()
    const[offerssNum,setOffers]=useState<number>()
    useEffect(()=>{
        const mealsNum : number=meals.reduce((count,meal)=>{
            count +=meal.count;
            return count;
        },0)
        setmeals(mealsNum)

        const ordersNum: number=users.reduce((count,ord)=>{
            count += ord.count
            return count;
        },0)
        setOrders(ordersNum);
        const drinksNum : number=meals.reduce((count,meal)=>{
            if(meal.category==="Drinks" &&meal.isOffer==="NO"){
                count +=meal.count;
            }
            return count;
        },0)
        setDrinks(drinksNum)
        const GrillsNum : number=meals.reduce((count,meal)=>{
            if(meal.category==="Grills" &&meal.isOffer==="NO"){
                count +=meal.count;
            }
            return count;
        },0)
        setmGrills(GrillsNum)
        const pastasNum : number=meals.reduce((count,meal)=>{
            if(meal.category==="Pasta" &&meal.isOffer==="NO"){
                count +=meal.count;
            }
            return count;
        },0)
        setPasta(pastasNum)
        const pastiersNum : number=meals.reduce((count,meal)=>{
            if(meal.category==="Pastries"&&meal.isOffer==="NO"){
                count +=meal.count;
            }
            return count;
        },0)
        setPastiers(pastiersNum)
        const seafoodsNum : number=meals.reduce((count,meal)=>{
            if(meal.category==="seaFood"&&meal.isOffer==="NO"){
                count +=meal.count;
            }
            return count;
        },0)
        setSeafoods(seafoodsNum)
        const dessertsNum : number=meals.reduce((count,meal)=>{
            if(meal.category==="Dessert"&&meal.isOffer==="NO"){
                count +=meal.count;
            }
            return count;
        },0)
        setDesserts(dessertsNum)
        const offersNum : number=meals.reduce((count,meal)=>{
            if(meal.isOffer==="YES"){
                count +=meal.count;
            }
            return count;
        },0)
        setOffers(offersNum)

        dispatch(fetchdata());
        dispatch(getOrders());
        dispatch(getUsers());
    },[meals,orders])
    return(<>
            <div className="main mt-32 ">
            <div className="container w-3/4 mx-auto p-5 ">
                <div className="dash  shadow">
                    <h2>Dashbord</h2>
                    <div className='navlin mb-5' >
                    <NavLink className='navl' to="/orders">orders</NavLink>
                    <NavLink className='navl' to="/addNew">Add New</NavLink>
                    <NavLink className='navl' to="/Edit_meals">Delete</NavLink>
                    </div>
                    <div className="detail grid grid-cols-3">
                        <div className="orders"> 
                            <h3>Total Oreders</h3>
                            <p>{orodersNum}</p>
                        </div>
                        <div className="melas"> 
                            <h3>Total Meals</h3>
                            <p>{mealsNum}</p>
                        </div>
                        <div className="Grills">
                        <h3>Total Grills</h3>
                        <p>{grillsNum}</p>
                        </div>
                        <div className="Drinks">
                        <h3>Total Drinks</h3>
                        <p>{drinksNum}</p>
                        </div>
                        <div className="Pastiers">
                        <h3>Total Pastires</h3>
                        <p>{pastiersNum}</p>
                        </div>
                        <div className="Pasta">
                        <h3>Total Pasta</h3>
                        <p>{pastasNum}</p>
                        </div>
                        <div className="Dessert">
                        <h3>Total Desserts</h3>
                        <p>{dessertsNum}</p>
                        </div>
                        <div className="SeaFood">
                        <h3>Total SeaFoods</h3>
                        <p>{seafoodsNum}</p>
                        </div>
                        <div className="SeaFood">
                        <h3>Total Offers</h3>
                        <p>{offerssNum}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </>)
}