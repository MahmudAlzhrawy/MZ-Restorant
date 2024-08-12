import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { admauth, admprovider, orderdb } from "../../firbase-config3";
import { Toast } from "../../Sweetalert";
import { Button } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
interface admin{
    adminId:string;
    id:string
}
export function Admin(){
    const navigate=useNavigate();
    const[admin,setAdmin]=useState<admin[]>([]);
        const getAdmin = async () => {
            try {
            const data = await getDocs(collection(orderdb, "admin"));
            setAdmin(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as admin[]);
            } catch (error) {
            console.error("Error fetching admin data:", error);
            }
        };
        
        useEffect(() => {
            getAdmin();
        }, []);
        
        const userLogin = () => {
            signInWithPopup(admauth, admprovider).then((res) => {
            console.log("Sign-in response:", res);
            if (admauth.currentUser && admin.find((ad) => ad.adminId === admauth.currentUser?.uid)) {
                Toast.fire({
                icon: "success",
                title: "Login Success",
                });
                navigate("/orders");
            } else {
                Toast.fire({
                icon: "warning",
                title: "Login Failed",
                });
            }
            }).catch((error) => {
            console.error("Error during sign-in:", error);
            Toast.fire({
                icon: "error",
                title: "Login Error",
            });
            });
        };
        
    return(
        <div className="Main mt-32">

            <div className="gog mx-auto  w-full max-w-md">
                <div className=" bg-white py-9 px-3 shadow  items-center m-3  mx-auto  h-full rounded-lg  ">
                    <div className="   rounded-md h-20 items-center justify-center flex ">
                    <h2 className=" text-slate-700 text-3xl italic font-serif  " >Login with gmail</h2>
                    </div>
                    <div className="text-center w-full">
                    <button className=" flex mx-auto  py-2 text-yellow-50 justify-center  w-52 rounded-lg bg-gradient-to-bl from-amber-800 to-amber-700 hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-800 hover:scale-110 transition-transform duration-1000 ease-in-out active:text-blue-700 " onClick={()=>{
                        userLogin()
                    }} ><span><img className="w-10 h-10 rounded-full" src={require("../../assets/images/G.png")} alt="not found" /></span> <span className=" text-white font-semibold pl-1 pt-2 items-center">Login with googel</span></button>
                    </div>
                    </div>
                </div>
                <p className="fo text-amber-800 text-center bg-opacity-50 italic mb-2">&copy; 2024 zharwy. All rights are reserved.</p>
        </div>
    )
}