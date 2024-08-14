import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { auth,provider } from "../../firebase-config";
import{createUserWithEmailAndPassword,signInWithPopup} from"firebase/auth"
import Swal from "sweetalert2";
import "../../sass/newprod.scss"
import { Toast } from "../../Sweetalert";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface LoginProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Signup({setAuth}:LoginProps) {
    const navigate=useNavigate();
    const userLogin=()=>{
        signInWithPopup(auth,provider).then((res)=>{
            localStorage.setItem("Auth","true");
            setAuth(true);
            Toast.fire({
                icon: "success",
                title: " Login Success "
            });
            navigate("/")
        })
        
    }
    const registerWithEmailAndPassword = async (email:string, password:string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered:', user);
            Toast.fire({
                icon: "success",
                title: " Login Success "
            });
            navigate("/");
            
        } catch (error:any) {
            console.error('Error registering user:', error.message);
        }
    };
    
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .min(3, "The username should be at least 3 characters")
                .max(8, "The username must be no longer than 8 characters"),
            email: Yup.string()
                .required('Required')
                .email("This email is not valid"),
            password: Yup.string()
                .required('Password required')
                .min(6, "Password should be at least 6 characters"),
            confirmpassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), ""], "Password confirmation must match password"),
        }),
        onSubmit: values => {
            registerWithEmailAndPassword(values.email,values.confirmpassword);
            values.username="";
            values.password="";
            values.email="";
            values.confirmpassword="";
        }
    });

    return (
        <div className="Mainac">
            <div className="frm">
                <h2 className="text-gray-700 text-3xl font-serif italic">Sign Up</h2>
            <form  onSubmit={formik.handleSubmit}>
                <div className="lb">
                <label htmlFor="username">Username</label>
                <input className="inp"
                    type="text"
                    name="username"
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {(formik.errors.username && formik.touched.username) && <div className="err">{formik.errors.username}</div>}
                </div>
                <div className="lb">

                <label htmlFor="email">Email</label>
                <input
                className="inp"
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {(formik.errors.email && formik.touched.email) && <div className="err">{formik.errors.email}</div>}
                </div>
                <div className="lb">

                <label htmlFor="password">Password</label>
                <input
                className="inp"
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {(formik.errors.password && formik.touched.password) && <div className="err">{formik.errors.password}</div>}
                </div>
                <div className="lb">

                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                className="inp"
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {(formik.errors.confirmpassword && formik.touched.confirmpassword) && <div className="err">{formik.errors.confirmpassword}</div>}
                </div>
                <button  className=" px-2 py-3 w-full text-white font-serif italic text-2xl bg-amber-800 bg-opacity-50 hover:bg-amber-700 duration-500  ease-in-out" type="submit">Sign Up</button>
                <p className="italic text-sm bg-opacity-55 text-amber-950 ">Do You have an Accout already? <span><button className="text-blue-800 " onClick={()=>{navigate("/Login")}}>Login</button></span></p>
            </form>
            <div><h1 className="text-4xl text-amber-700 font-serif italic">Or</h1></div>
            <div className="gog ">
            <div className=" relative items-center m-3   h-full rounded-lg  ">
                <div className="   rounded-md h-20 items-center justify-center flex ">
                <h2 className=" text-slate-600 font-bold " >Login with gmail</h2>
                </div>
                <div>
                <button className=" flex absolute py-2 text-yellow-50  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-52 rounded-lg bg-gradient-to-bl from-amber-800 to-amber-700 hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-800 hover:scale-110 transition-transform duration-1000 ease-in-out active:text-blue-700 " onClick={()=>{
                    userLogin()
                }} ><span><img className="w-10 h-10 rounded-full" src={require("../../assets/images/G.png")} alt="not found" /></span> <span className=" text-white font-semibold pl-1 pt-2 items-center">Login with googel</span></button>
                </div>
                </div>
            </div>
            <p className="fo text-amber-800 text-center bg-opacity-50 italic mb-2">&copy; 2024 zharwy. All rights are reserved.</p>
            </div>
        </div>
    );
}
