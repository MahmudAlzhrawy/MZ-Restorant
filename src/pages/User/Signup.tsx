import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { auth } from "../../firebase-config";
import{createUserWithEmailAndPassword} from"firebase/auth"
import Swal from "sweetalert2";
import "../../sass/newprod.scss"
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function Signup() {
    const navigate=useNavigate();
    const registerWithEmailAndPassword = async (email:string, password:string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered:', user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Loggedin success",
                showConfirmButton: false,
                timer: 800
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
                <button  className=" px-2 py-3 w-full text-white font-serif italic text-2xl bg-amber-800 bg-opacity-50 hover:bg-amber-900 duration-500 hover:bg-opacity-50 ease-in-out" type="submit">Sign Up</button>
                <p className="italic text-sm bg-opacity-55 text-amber-950 ">Do You have an Accout already? <span><button className="text-blue-800 " onClick={()=>{navigate("/Login")}}>Login</button></span></p>
            </form>
            <p className="fo text-amber-800 text-center bg-opacity-50 italic mb-2">&copy; 2024 zharwy. All rights are reserved.</p>
            </div>
        </div>
    );
}
