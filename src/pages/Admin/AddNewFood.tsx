import React, { useState,useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { storage, db } from '../../firebase-config';
import { Toast } from "../../Sweetalert";
import { useNavigate } from "react-router-dom";
import "../../sass/newprod.scss";
import { Button } from "@mui/material";

interface Meal {
    ID: number;
    title: string;
    description: string;
    price: string;
    rate: string;
    url?: string;
    isOffer: string;
    category: string;
    count:1,
    oldPrice?:string
}

export function AddNewFood() {
    const prodcol = collection(db, "meals");
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null | undefined>(undefined);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const getLastMealId = async (): Promise<number> => {
        const docRef = doc(db, "settings", "lastMealId");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().lastId;
        } else {
            // If document does not exist, create it with an initial value of 0
            await setDoc(docRef, { lastId: 1 });
            return 0;
        }
    };

    const updateLastMealId = async (newId: number) => {
        const docRef = doc(db, "settings", "lastMealId");
        await updateDoc(docRef, { lastId: newId });
    };

    const uploadImageAndSaveMeals = async (meal: Meal, file: File | null | undefined) => {
        let url = '';
        if (file) {
            const storageRef = ref(storage, `meals/${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                url = await getDownloadURL(storageRef);
                console.log("File uploaded successfully, URL:", url);
            } catch (error) {
                console.log("Error uploading file:", error);
                Toast.fire({
                    icon: "error",
                    title: "Failed  to upload Image  "
                });
                return;
            }
        }

        try {
            const mealRef = await addDoc(prodcol, {
                ...meal,
                url,
            });
            Toast.fire({
                icon: "success",
                title: `Added Successfully ${mealRef.id} `
            });
            await updateLastMealId(meal.ID);
        } catch (error) {
            console.log("Error saving meal data:", error);
            Toast.fire({
                icon: "error",
                title: " Failed to save meal data. "
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            price: "",
            description: "",
            rate: "",
            category: "",
            isOffer: "",
            oldPrice:""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .min(4, "*Should not be lower than 4 letters")
                .required("*You must  write Title"),
            price: Yup.string().required("*please enter price"),
            rate: Yup.string().required("*Required write rate"),
            category: Yup.string().required("*you must select one"),
            isOffer: Yup.string().required("*You must select YES or NO "),
            oldPrice: Yup.string()
            .test(
                'isOfferRequired',
                '*Required Old price',
                function (value) {
                    const { isOffer } = this.parent;
                    return isOffer === 'YES' ? !!value : true;
                }
            ),


        }),
        onSubmit: async (values) => {
            console.log("Form Submitted");
            try {
                const lastId = await getLastMealId();
                const newId = lastId + 1;
                const meal: Meal = {
                    count:1,
                    ID: newId,
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    rate: values.rate,
                    category: values.category,
                    isOffer: values.isOffer,
                    oldPrice:values.oldPrice,
                };
                await uploadImageAndSaveMeals(meal, file);
                setFile(null);
                navigate(`/dashbord`);
            } catch (error) {
                console.log("Error in form submission:", error);
                Toast.fire({
                    icon: "warning",
                    title: "Failed Add meal  "
                });
            }
        }
    });
    useEffect(() => {
        if (formik.values.isOffer !== "YES") {
            formik.setFieldValue("oldPrice", ""); // Reset oldPrice if isOffer is not "YES"
        }
    }, [formik.values.isOffer]);
    return (
        <div className="Mainac  ">
            <div className="frm">
            <h1 className="font-serif text-2xl text-gray-700 italic">Add New Meal</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="lb">
                        <label htmlFor="tit">Title</label>
                        <input
                            className="inp"
                            type="text"
                            name="title"
                            id="tit"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                            {formik.errors.title && formik.touched.title && <p className="err">{formik.errors.title}</p>}
                        </div>
                    <div className="lb">
                        <label htmlFor="img">Image</label>
                    
                        <input  className="inp" type="file" name="image" id="img" onChange={handleFileChange} required />
                    </div>
                    <div className="lb">
                        <label htmlFor="des">Description</label>
                    
                        <textarea  className="inp"
                            name="description"
                            id="des"
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                    {formik.errors.description && formik.touched.description && <p className="err">{formik.errors.description}</p>}
                    </div>
                    <div className="lb">
                        <label htmlFor="pc">Price</label>
                    
                        <input
                            className="inp"
                            type="number"
                            name="price"
                            id="pc"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    {formik.errors.price && formik.touched.price && <p className="err">{formik.errors.price}</p>}
                    </div>
                    <div className="lb">
                        <label htmlFor="rt">Rate</label>
                    
                        <input
                            className="inp"
                            type="text"
                            name="rate"
                            id="rt"
                            value={formik.values.rate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    {formik.errors.rate && formik.touched.rate && <p className="err">{formik.errors.rate}</p>}
                    </div>
                    <div className="lb">
                        <label htmlFor="cat">Category</label>
                    
                        
                        <select  className="inp"
                            name="category"
                            id="cat"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select Category</option>
                            <option value="Grills">Grills</option>
                            <option value="seaFood">SeaFood</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Pastries">Pastries</option>
                        </select>
                    {formik.errors.category && formik.touched.category && <p className="err">{formik.errors.category}</p>}
                    </div>
                    <div className="lb">
                        <label htmlFor="if">Is Offer?</label>
                        <select className="inp"
                            name="isOffer"
                            id="if"
                            value={formik.values.isOffer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">isOffer ?</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    {formik.errors.isOffer && formik.touched.isOffer && <p className="err">{formik.errors.isOffer}</p>}
                    </div>
                    {
                        (formik.values.isOffer==="YES")&&
                    <div className="lb">
                        <label htmlFor="ol">Old Price</label>
                        <input className="inp"
                            placeholder="...$"
                            type="text"
                            name="oldPrice"
                            id="ol"
                            value={formik.values.oldPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    {formik.errors.oldPrice && formik.touched.oldPrice && <p className="err">{formik.errors.oldPrice}</p>}
                    </div>}
                    <Button className="w-full font-serif" variant="contained" type="submit">Add Meal</Button>
                </form>
            </div>
        </div>
    );
}
