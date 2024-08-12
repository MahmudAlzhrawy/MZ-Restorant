import React from "react";
import "../sass/Home.scss";
import { Navbar } from "../components/Navbar";
interface HAuth {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export  function Home({setAuth}:HAuth){
    return ( 
    <div className="Mainhom   w-screen h-screen py-10">
        <div className="container  mx-auto w-full  relative   bg-gradient-to-r from-gray-200 to-gary-100 shadow-lg shadow-gray-600  ">
            <Navbar setAuth={setAuth} />
            <div className={`cont w-full  relative h-full `}>
                
            </div>
        </div> 
    </div>
    )
    
}
