import React from"react";
import { Link } from "react-router-dom";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export  function Footer(){
    return(
        <>
        <div className="footer mt-32 "> 
        <div className=" main max-[300px]:grid-cols-1 max-[845px]:grid-cols-2 max-[990px]:grid-cols-3  mt-6 grid  text-left grid-cols-4 w-full  bg-amber-500 bg-opacity-10 pt-3 pl-3 "  > 
        <div className=" Linkes ">
            <h2>Links</h2>
            <ul className="text-1xl font-semibold">
                <li className="hover:text-amber-600 hover:cursor-pointer"><Link to="/about"/>About</li>
                <li className="hover:text-amber-600 hover:cursor-pointer"><  Link to="/" />Home</li>
                <li className="hover:text-amber-600 hover:cursor-pointer"><Link to="/menu"/>Menu</li>
                <li className="hover:text-amber-600 hover:cursor-pointer"><Link to="/cart"/>Cart</li>
            </ul>
        </div>
        <div className="technology w-10">
            <h2 className=" tracking-tighter">Technologeies</h2>
        <ul className="text-1xl font-semibold">
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
        <div className=" Contact text-1xl font-semibold ">
        <h2>Contact Us</h2>
            <ul>
                <li className="w-28 ">email: <a className="" href="mailto:mahmudnagi192003@gmail.com?subject=Hello&body=Hi%20Mahmud" >@MahmudNagi</a></li>
                <li> <FontAwesomeIcon icon={faWhatsapp} style={{ marginLeft: '8px' }} /><a href="https://wa.me/201149564002?text=Hello%20Mahmud">
                +201149564002
            </a>
            </li>
                <li> Countery : Egypt </li>
            </ul>
        </div>
        <div className="text-1xl font-semibold">
        <h2>Social</h2>
                <ul>
                    <li className="w-28 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800 " ><span className=" pr-1  items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faLinkedin} /></span> linkedIn</li>
                    <li className="w-28 pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800 "><span className="  pr-1 items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faFacebook} /></span>Facebook</li>
                    <li className="w-28 pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800 " ><span className="pr-1  items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faTwitter} /></span>Twitter</li>
                    <li className="w-28 pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-amber-800"><span className=" pr-1 items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-green-800 text-green-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faWhatsapp} /></span>Whatsap</li>
                </ul>
        </div>
        </div>
        <div className="bg-amber-500 text-center">&copy;all Rigthes are resavived  by zahrwy  </div>
        </div>
        
        </>
    )
}