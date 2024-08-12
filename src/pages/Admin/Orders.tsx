import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../rtl/store';
import { getOrders } from "../../rtl/reducers/orderSlice";
import {  getUsers } from "../../rtl/reducers/userSlice";
import { Button } from "@mui/material";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { orderdb } from "../../firbase-config3";

export function Orders(){
    const colluser=collection(orderdb,"users");
    const collord=collection(orderdb,"orders")
    const dispatch =useDispatch<AppDispatch>();
    const orders=useSelector((state:RootState) =>state.Orders);
    const users=useSelector((state:RootState)=>state.Users);
    const deleteuser=async(id:string|undefined,userId:string)=>{
        await deleteDoc(doc(colluser,id));
        orders.filter((ord)=>ord.user.userId=== userId ).map(async (ord)=>{
            await deleteDoc(doc(collord,ord.id));
        })
    dispatch(getOrders());
    dispatch(getUsers())
    }
    useEffect(()=>{
    dispatch(getOrders());
    dispatch(getUsers());
    },[dispatch])
    return(
        <>
        <div className="Main mt-32">
        <h2>Orders here</h2>
            {users.map((us)=>{
                return(
            <div key={us.id} className="container mx-auto border-3 border-amber-950 border-2 border-double ">
                <div className="all border mt-4 w-2/3 mx-auto">
                <div className="infor bg-amber-700 bg-opacity-20 mx-auto w-1/3 pl-3  border text-left">
                    <div className="name"><p className="text-xl font-serif italic text-amber-600 "><span className="text-amber-950 text-2xl pr-2 ">Name :</span>{us.name}</p></div>
                    <div className="address"><p className="text-xl font-serif italic text-amber-600 "><span className="text-amber-950 text-2xl pr-2 ">Address :</span>{us.address}</p></div>
                    <div className="phone"><p className="text-xl font-serif italic text-amber-600 "><span className="text-amber-950 text-2xl pr-2 ">Phone_1 :</span>{us.phone_1}</p></div>
                    <div className="phone"><p className="text-xl font-serif italic text-amber-600 "><span className="text-amber-950 text-2xl pr-2 ">Phone_2 :</span>{us.phone_2}</p></div>
                </div>
                <div className="mel ">
                {
                    orders.filter((or)=>or.user.userId===us.userId).map((ord)=>{
                        return(<>
                        <div key={ord.id} className="order h-48 w-full mb-8  ">
                            <div><h2>{ord.title}</h2></div>
                            <div className="order_card w-full mx-auto flex items-center  shadow   ">
                                <div className="im "><img className="w-32 h-32 rounded-full " src={ord.url} alt="Not Found "/></div>
                                <div className="prqu ml-8">
                                <p className=" mb-3 text-red-600 text-2xl italic">Price : <span className="inline-block ml-1 text-amber-800 font-serif">{ord.price}$</span></p>
                                <p className="mb-3 text-red-600 text-2xl italic">Quantity: <span className="inline-block ml-1 text-amber-800 font-serif">{ord.quantity}</span></p>
                                </div>
                            </div>
                        
                        </div>
                        </>)
                    })
                }
                </div>
                <button onClick={()=>{
                    deleteuser(us.id,us.userId)
                }} className="text-center font-serif w-full italic text-white leading-relaxed  text-xl bg-amber-700 hover:bg-amber-800 duration-700 focus:shadow-amber-400" >Delete</button>
            </div>
                </div>
                )
            })
            }
        </div>
        </>
    )
}