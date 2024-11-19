import React, { useEffect, useState } from "react";
import { fetchdata } from "../rtl/reducers/fetchFood";
import { cartItems, addToCart } from "../rtl/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../rtl/store";
import { Toast } from "../Sweetalert";
import { Link } from "react-router-dom";
import "../sass/Foodcard.scss";
import { AddShoppingCart, Visibility, Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { auth } from "../firebase-config";

interface bolProps {
    isAuth: boolean;
}
interface Foodprops {
    id: number | string | undefined;
}
interface Meals {
    user: {
        userId: string;
    };
    id: string;
    ID: number;
    title: string;
    description: string;
    price: string;
    rate: string;
    url: string;
    isOffer: string;
    category: string;
}

export function Detail({ isAuth, id }: bolProps & Foodprops) {
    const dispatch = useDispatch<AppDispatch>();
    const meals = useSelector((state: RootState) => state.Meals);
    const cartMeals = useSelector((state: RootState) => state.Cart);
    const [isLike, setLike] = useState<boolean>();
    const handleLike = () => {
        setLike(el => !el);
    };

    useEffect(() => {
        dispatch(fetchdata());
    }, [dispatch]);

    return (
        <div className="Main mt-10 flex flex-col items-center bg-gray-100 p-6 min-h-screen">
            {meals.length !== 0 ? (
                <>
                    {meals
                        .filter((meal: Meals) => meal.ID == id)
                        .map((meal: Meals) => (
                            <div key={meal.id} className="group shadow-lg rounded-lg bg-white w-full max-w-4xl relative overflow-hidden p-4 mx-auto border border-gray-200">
                                <div className="w-full flex flex-col md:flex-row">
                                    {/* Title */}
                                    <div className="title bg-opacity-90 bg-gray-200 p-4 rounded-lg z-10 absolute top-4 left-4 text-left transition-all duration-500 group-hover:left-0">
                                        <h2 className="text-xl font-bold text-amber-900">{meal.title}</h2>
                                    </div>
                                    
                                    {/* Image Section */}
                                    <div className="w-full md:w-1/2 h-96 overflow-hidden hover:brightness-75">
                                        <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" src={meal.url} alt="Not found" />
                                    </div>

                                    {/* Details Section */}
                                    <div className="w-full md:w-1/2 bg-amber-50 p-6 flex flex-col justify-between">
                                        <div>
                                            <p className="text-amber-800 italic text-md font-serif mb-4">
                                                <span className="text-red-700 text-2xl font-serif"></span>{meal.description}
                                            </p>
                                            <p className="text-amber-600 text-2xl font-semibold">
                                                <span className="text-red-600 text-3xl"> </span>${meal.price}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-around mt-6">
                                            <IconButton
                                                style={{ color: "#D2691E" }}
                                                aria-label="add to shopping cart"
                                                onClick={() => {
                                                    dispatch(cartItems());
                                                    const findprod = cartMeals.find((mel) => mel.ID === meal.ID && meal.user?.userId === auth.currentUser?.uid);
                                                    if (isAuth) {
                                                        if (!findprod) {
                                                            dispatch(addToCart(meal));
                                                        } else {
                                                            Toast.fire({
                                                                icon: "info",
                                                                title: "This Meal is already in the Cart"
                                                            });
                                                        }
                                                    } else {
                                                        Toast.fire({
                                                            icon: "warning",
                                                            title: "Please login first"
                                                        });
                                                    }
                                                }}
                                            >
                                                <AddShoppingCart sx={{ fontSize: 30 }} />
                                            </IconButton>


                                            <IconButton
                                                onClick={handleLike}
                                                aria-label="like"
                                                style={{ color: isLike ? "red" : "#D2691E" }}
                                            >
                                                <Favorite sx={{ fontSize: 30 }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="border-t-4 border-blue-900 rounded-full w-14 h-14 animate-spin mb-4"></div>
                    <p className="text-2xl font-serif text-gray-700">Loading<span className="animate-pulse">...</span></p>
                </div>
            )}
        </div>
    );
}
