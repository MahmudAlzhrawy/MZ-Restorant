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
        <div className="Main mt-32 px-4">
    <h2 className="text-center text-3xl font-serif text-amber-900 mb-8">Orders</h2>
    {users.map((us) => (
        <div key={us.id} className="container mx-auto border-4 border-amber-800 rounded-lg shadow-lg mb-6 p-6">
            <div className="user-info flex justify-between items-start mb-6">
                <div className="info w-1/3 p-4 bg-amber-100 rounded-lg shadow-sm">
                    <h3 className="text-2xl text-amber-800 font-bold mb-3">User Information</h3>
                    <p className="text-xl font-serif text-amber-700 mb-2"><span className="font-semibold text-amber-950">Name:</span> {us.name}</p>
                    <p className="text-xl font-serif text-amber-700 mb-2"><span className="font-semibold text-amber-950">Address:</span> {us.address}</p>
                    <p className="text-xl font-serif text-amber-700 mb-2"><span className="font-semibold text-amber-950">Phone 1:</span> {us.phone_1}</p>
                    <p className="text-xl font-serif text-amber-700 mb-2"><span className="font-semibold text-amber-950">Phone 2:</span> {us.phone_2}</p>
                </div>
                <div className="orders w-2/3 ml-8">
                    <h3 className="text-2xl font-bold text-amber-800 mb-3">Orders</h3>
                    {orders.filter((or) => or.user && or.user.userId === us?.userId).map((ord) => (
                        <div key={ord.id} className="order-card bg-amber-50 p-4 mb-6 rounded-lg shadow-sm flex items-center">
                            <div className="order-image flex-shrink-0 w-32 h-32 mr-6">
                                <img className="w-full h-full rounded-full object-cover" src={ord.url} alt="Not Found" />
                            </div>
                            <div className="order-details flex flex-col">
                                <h4 className="text-xl font-semibold text-amber-700 mb-2">{ord.title}</h4>
                                <p className="text-lg text-red-600 italic mb-2">Price: <span className="text-amber-800">{ord.price}$</span></p>
                                <p className="text-lg text-red-600 italic">Quantity: <span className="text-amber-800">{ord.quantity}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => deleteuser(us.id, us.userId)} className="w-full py-3 mt-4 text-xl font-serif text-white bg-amber-700 hover:bg-amber-800 focus:outline-none rounded-lg">
                Delete User
            </button>
        </div>
    ))}
</div>

        </>
    )
}