import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { auth ,provider} from "../../firebase-config";
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { Toast } from "../../Sweetalert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../../sass/newprod.scss"
interface LoginProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Login({setAuth}:LoginProps){
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
    const loginWithEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in:', user);
            localStorage.setItem("Auth", "true");
            setAuth(true);
            Toast.fire({
                icon: "success",
                title: " Login Success "
            });
            navigate("/");
        } catch (error:any) {
            Toast.fire({
                icon: "warning",
                title: "Login Failed "
            });
            console.error('Error signing in user:', error.message);
        }
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('*Required')
                .email("*This Email is not valid"),
            password: Yup.string()
                .required('*Password Required')
                .min(6, "*Password should be at least 6 characters"),
        }),
        onSubmit: values => {
            loginWithEmailAndPassword(values.email,values.password);
            values.email="";
            values.password="";
        }
    });

    return (
        <div className="Mainac" >
            <div className="frm">
            <h1 className="text-3xl italic text-gray-700 font-serif mb-8">Login</h1>
            <form onSubmit={formik.handleSubmit}>
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
                <input className="inp"
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {(formik.errors.password && formik.touched.password) && <div className="err">{formik.errors.password}</div>}
                
                </div>
                <button  className=" px-2 py-3 w-full text-white font-serif italic text-2xl bg-amber-800 bg-opacity-50 hover:bg-amber-900 duration-500 hover:bg-opacity-50 ease-in-out" type="submit">Sign In</button>
                <p className="italic text-sm bg-opacity-55 text-amber-950 ">Don't  have an Accout ? <span><button className="text-blue-800 " onClick={()=>{navigate("/signup")}}>Sign Up</button></span></p>
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
