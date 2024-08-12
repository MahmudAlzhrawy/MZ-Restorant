import React from "react";
import"../sass/Menu.scss"
import { Link } from "react-router-dom";


export function Menu(){
    return(<>
    <div className="Main ">
        <div className="bac_ground w-full h-96 ">
            <img className="w-full h-full  " src={require("../assets/images/Menu.jpeg")} alt="Menu Not Found"/>
        </div>
        <div className="container border-2 mt-10 mx-auto p-2">
            <h2 className="">Menu</h2>
            <div className="categiories   ">
            <Link to="/Food/Grills">
                <div className={`class after:content-["Grills"] bg-red-500 h-64`}>
                    <img src={require(`../assets/Parpique/3.jpeg`)} alt="Grills Not Found now"/>
                </div>
            </Link> 
            <Link  to="/Food/seaFood">
                <div className={`class after:content-["Sea_Food"] bg-red-500 h-64`}>
                    <img src={require(`../assets/Sea Food/1.jpeg`)} alt="Not Found"/>
                </div>
            </Link>
            <Link  to="/Food/Pasta">
            <div className={`class after:content-["Pasta"] bg-red-500 h-64`}>
            <img src={require(`../assets/Pasta/1.jpeg`)}  alt="Not Found"/>
            </div>
            </Link>
            <Link  to="/Food/Pastries">
            <div className={`class after:content-["Pastries"] bg-red-500 h-64`}>
            <img  src={require(`../assets/Moajanaat/2.jpeg`)} alt="Not Found"/>
            </div>
            </Link>
            <Link  to="/Food/Drinks">
            <div className={`class after:content-["Drinks"] bg-red-500 h-64`}>
            <img src={require(`../assets/Drinks/2.jpeg`)}  alt="Not Found"/>
            </div>
            </Link>
            <Link  to="/Food/Dessert">
            <div className={`class after:content-["Desserts"] bg-red-500 h-64`}>
            <img src={require(`../assets/Dessert/1.jpeg`)}  alt="Not Found"/>
            </div>
            </Link>
            <Link  to="/offers">
            <div className={`class after:content-["Offers"] bg-red-500 h-64`}>
            <img src={require(`../assets/Dessert/1.jpeg`)}  alt="Not Found"/>
            </div>
            </Link>

            </div>
        </div>
    </div>
    </>
    )
}