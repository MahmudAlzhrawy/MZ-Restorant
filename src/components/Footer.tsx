import React from"react";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
//import { faHome } from "@fortawesome/free-solid-svg-icons";\
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export  function Footer(){
    return(
        <>
        <div className="footer overflow-x-hidden absolute buttom-0  w-full  mt-10 h-72 bg-amber-950  "> 
            <div className=" conatiner w-4/5 mx-auto border-1">

            <p className="text-xl text-white font-serif my-5">Welcom In Our Website,<br/> This website dosen't contained on Real Data </p>
            <div className=" font-semibold items-center text-center ">
                    <ul className="min-[905px]:flex grid grid-cols-2 max-[430px]:grid-cols-1 justify-between">
                    <a href="https://www.linkedin.com/in/mahmud-al-zhrawy-995401263"> <li className="w-28 pt-2 flex items-center text-xl text-amber-100 " ><span className=" pr-1  items-center  " ><FontAwesomeIcon className="bg-amber-200 p-3 border rounded-full bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700  w-10  h-10 "  icon={ faLinkedin} /></span> linkedIn</li></a>
                    <a href="https://www.facebook.com/alzahrawi.mahmoud"> <li className="w-28 flex items-center pt-2  text-xl text-amber-100 "><span className="  pr-1 items-center  inline-block" ><FontAwesomeIcon className="bg-amber-200  p-3 border rounded-full bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700  w-10  h-10 "  icon={ faFacebook} /></span>Facebook</li></a>
                    <a href="#empty"> <li className="w-28 flex pt-2 text-xl text-amber-100 items-center  " ><span className="pr-1  items-center  inline-block" ><FontAwesomeIcon className="bg-amber-200  p-3 border rounded-full bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 w-10  h-10"  icon={ faTwitter} /></span>Twitter</li></a>
                    <a href="https://wa.me/201149564002?text=Hello%20Mahmud"><li className="w-28 text-xl items-center text-amber-100 flex pt-2 "><span className=" pr-1 items-center  inline-block" ><FontAwesomeIcon className="bg-amber-200  p-3 border rounded-full bg-transparent hover:text-green-800 text-green-500 transform-cpu duration-700  w-10  h-10 "  icon={ faWhatsapp} /></span>whatsUp</li> </a>
                    </ul>
            </div>
        </div>
        <p className="fo translate-y-16 text-amber-800 text-center bg-opacity-50 italic py-2 bg-white ">&copy; 2024 zharwy. All rights are reserved.</p>
        </div>
        
        </>
    )
}