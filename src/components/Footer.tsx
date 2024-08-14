import React from"react";
import { Link } from "react-router-dom";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
//import { faHome } from "@fortawesome/free-solid-svg-icons";\
import "../sass/Footer.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export  function Footer(){
    return(
        <>
        <div className="footer absolute w-full  mt-32 bg-amber-300 bg-opacity-90 "> 
            <div className="conatiner w-4/5 mx-auto border-1">
        <div className=" mainf mx-auto max-[300px]:grid-cols-1 max-[845px]:grid-cols-2 max-[990px]:grid-cols-3  mt-6 grid  text-left grid-cols-3 w-full   pt-3 pl-3 "  > 
        <div className=" Linkes ">
            <h2>Links</h2>
            <ul className=" font-semibold">
                <li className="hover:text-amber-600 hover:cursor-pointer"><Link to="/about"/>About</li>
                <li className="hover:text-amber-600 hover:cursor-pointer"><  Link to="/" />Home</li>
                <li className="hover:text-amber-600 hover:cursor-pointer"><Link to="/menu"/>Menu</li>
                <li className="hover:text-amber-600 hover:cursor-pointer"><Link to="/cart"/>Cart</li>
            </ul>
        </div>
        <div className="technology w-10">
            <h2 className=" tracking-tighter">Technologeies</h2>
        <ul className=" font-semibold">
                <li>HTML</li>
                <li>CSS</li>
                <li>Ts</li>
                <li>React</li>
                <li>Redux ToolKit</li>
                <li>TaillwindCss</li>
                <li>Firebase Auth</li>
                <li>Firestore</li>
            </ul>
        </div>
        
        <div className=" font-semibold">
        <h2>Social</h2>
                <ul>
                <a href="https://www.linkedin.com/in/mahmud-al-zhrawy-995401263"> <li className="w-28 flex relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800 " ><span className=" pr-1  items-center  " ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7  h-7 "  icon={ faLinkedin} /></span> linkedIn</li></a>
                <a href="https://www.facebook.com/alzahrawi.mahmoud"> <li className="w-28 flex pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800 "><span className="  pr-1 items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faFacebook} /></span>Facebook</li></a>
                <a href="#"> <li className="w-28 flex pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800 " ><span className="pr-1  items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faTwitter} /></span>Twitter</li></a>
                <a href="https://wa.me/201149564002?text=Hello%20Mahmud"><li className="w-28 flex pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800"><span className=" pr-1 items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-green-800 text-green-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faWhatsapp} /></span>whatsUp</li> </a>
                </ul>
        </div>
        </div>
        </div>
        <p className="fo bottom-0  text-amber-800 text-center bg-opacity-50 italic py-2 bg-white mb-2">&copy; 2024 zharwy. All rights are reserved.</p>
        
            </div>
        </>
    )
}