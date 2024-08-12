import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItems } from "../rtl/reducers/cartSlice";
import { AppDispatch, RootState } from '../rtl/store';
import { auth } from "../firebase-config";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {  collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { addOrder } from "../rtl/reducers/orderSlice";
import { cartdb } from "../firebase-config2";
import "../sass/Cart.scss";
import "../sass/orderform.scss"
import * as Yup from "yup";
import { Toast } from "../Sweetalert";
import { useFormik } from "formik";
import { adduser } from "../rtl/reducers/userSlice";
//import { orderdb } from "../firbase-config3";
interface Meals{
    user:{
        userId:string;
    }
    ID:number;
    id:string;
    count:number;
    title: string;
    description: string;
    price: number;
    rate: string;
    url: string;
    isOffer:string,
    category:string;
    quantity:number;
}
interface bolprops {
isAuth: boolean;
}

interface Info {
name: string,
address: string,
phone_1: string,
phone_2: string,
userId?: string
}

export function Cart({ isAuth }: bolprops) {
const [click, setClick] = useState<boolean>();
const [totPrice, setTotPrice] = useState<number>();
const coll = collection(cartdb, "cart");
const dispatch = useDispatch<AppDispatch>();
const cartMeals = useSelector((state: RootState) => state.Cart);

const order = async () => {
const userMeals = cartMeals.filter((ml) => ml.user?.userId === auth.currentUser?.uid);
await Promise.all(userMeals.map(async (meal) => {
    try {
        //await addDoc(collection( orderdb,"orders"),{...meal})
        await dispatch(addOrder({...meal}));
    console.log(`Order added for meal: ${meal.id}`);
    } catch (error) {
    console.error(`Error adding order for meal ${meal.id}`, error);
    }
}));
};

const formik = useFormik({
initialValues: {
    name: "",
    phoneNumber: "",
    address: "",
    otherPhone: "",
},
validationSchema: Yup.object().shape({
    name: Yup.string()
    .min(3, "S short")
    .required("Requierd"),
    phoneNumber: Yup.string()
    .min(11, "must not be shortest than 11 Number")
    .max(11, "must not be longest than 11 Number")
    .required("Requiered"),
    address: Yup.string()
    .min(10, "So short address")
    .required("Requierd"),
    otherPhone: Yup.string()
    .min(11, "must not be shortest than 11 Number")
    .max(11, "must not be longest than 11 Number")
    .required("Requiered"),
}),
onSubmit: async (values) => {
    const info: Info = {
    name: values.name,
    address: values.address,
    phone_1: values.phoneNumber,
    phone_2: values.otherPhone,
    userId: auth.currentUser?.uid
    }
    try {
    console.log("Submitting order and user data", info);
    await order();
    console.log("Order submitted");
    await dispatch(adduser({...info}));
    console.log("User added");
    Toast.fire({
        icon: "success",
        title: "Completed Order"
    });
    } catch (er) {
    console.error("Error in submitting form", er);
    }
    setClick(false);
    console.log("Form Submitted");
}
});

useEffect(() => {
dispatch(cartItems());
}, [dispatch]);

const decreas = async (id: string, quantity: number) => {
const mealdoc = doc(coll, id);
if (quantity > 1) {
    const newqun = { quantity: quantity - 1 };
    try {
    await updateDoc(mealdoc, newqun);
    dispatch(cartItems());
    } catch (error) {
    console.error(`Error decreasing quantity for meal ${id}`, error);
    }
}
}

const increas = async (id: string, quantity: number) => {
const mealdoc = doc(coll, id);
if (quantity < 10) {
    const newqun = { quantity: quantity + 1 };
    try {
    await updateDoc(mealdoc, newqun);
    dispatch(cartItems());
    } catch (error) {
    console.error(`Error increasing quantity for meal ${id}`, error);
    }
}
console.log(cartMeals);
}

const del = async (id: string) => {
try {
    await deleteDoc(doc(coll, id));
    dispatch(cartItems());
} catch (error) {
    console.error(`Error deleting meal ${id}`, error);
}
}

useEffect(() => {
const totPriseForMeals: number = cartMeals.reduce((tot, meal) => {
    if (auth.currentUser && meal.user && meal.user.userId === auth.currentUser.uid) {
    tot += (meal.quantity * meal.price);
    }
    return tot;
}, 0);
setTotPrice(totPriseForMeals);
}, [cartMeals]);

return (
<div className="Maincart mt-32">
    {isAuth &&
    <div>
        <div className="p-4 bg-amber-600 bg-opacity-20 w-60 mx-auto rounded-lg">
        <h2 className="text-amber-800 text-4xl font-serif">My Cart</h2>
        </div>
        <div className="order mt-4 w-full max-w-64 border mx-auto">
        <p> Total :{totPrice} $</p>
        <Button variant="outlined" onClick={() => { setClick(ev => !ev) }} >Complete Order</Button>
        {click &&
            <div className="frm">
            <form onSubmit={formik.handleSubmit}>
                <input
                className="inp"
                name="name"
                type="text"
                placeholder="Enter your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? <div className="err">{formik.errors.name}</div> : null}
                <input
                  className="inp"
                name="address"
                type="text"
                placeholder="Enter your Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? <div className="err">{formik.errors.address}</div> : null}
                <input
                  className="inp"
                name="phoneNumber"
                type="text"
                placeholder="Enter your Phone_1"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="err">{formik.errors.phoneNumber}</div> : null}
                <input
                  className="inp"
                name="otherPhone"
                type="text"
                placeholder="Enter your Phone_2"
                value={formik.values.otherPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.otherPhone && formik.errors.otherPhone ? <div className="err">{formik.errors.otherPhone}</div> : null}
                <button  className=" px-2 py-3 w-full text-white font-serif italic text-2xl bg-amber-800 bg-opacity-75 hover:bg-amber-900 duration-500 hover:bg-opacity-50 ease-in-out" type="submit">Complete</button>
            </form>
            </div>
        }
        </div>
        
        <div className="container mt-10">
        {cartMeals.filter((mel) => mel.user?.userId === auth.currentUser?.uid).map((mel) => {
            return (
            <div key={mel.id} className="card">
                <div className="image w-1/3 mx-auto">
                <img className="h-60 w-full" src={mel.url} alt="Not Found" />
                </div>
                <div className="conten w-4/5 mx-auto">
                <div className="title"><h2>{mel.title}</h2></div>
                <div className="des"><p><span>Description : </span> <br />{mel.description}</p></div>
                <div className="prate justify-between">
                    <div className="pric">
                    <p className="text-xl font-serif text-gray-900"><span className="text-red-600 font-serif text-2xl gap-6">Price : </span>{(mel.price * mel.quantity)} $</p>
                    </div>
                    <div className="remqu ml-10 flex">
                    <div className="qunt border-2 rounded-t-md border-b-transparent border-amber-800">
                        <Button className="rounded-t-3xl text-amber-800 text-2xl font-serif" onClick={() => { decreas(mel.id, mel.quantity) }}>-</Button>
                        <span className="text-amber-800 p-2 inline-block bg-amber-400 rounded-full">{mel.quantity}</span>
                        <Button className="rounded-t-3xl text-amber-800 text-2xl font-serif"  onClick={() => { increas(mel.id, mel.quantity) }}>+</Button></div>
                    <div className="remove border-2 rounded-t-md border-b-transparent ml-2 border-amber-800">
                        <Button onClick={() => { del(mel.id) }}>
                        <DeleteIcon style={{color:"#D2691E"}}  />
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )
        })}
        </div>
    
    </div>
    }
</div>
)
}
