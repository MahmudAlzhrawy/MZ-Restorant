import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { orderdb } from '../../firbase-config3';
import { Toast } from '../../Sweetalert';

const colluser = collection(orderdb, "users");

interface User {
    name: string;
    address: string;
    phone_1: string;
    phone_2: string;
    userId: string;
    id: string|undefined;
    count:1
}

const addus = async (us: User) => {
    try {
        await addDoc(colluser, {
            name: us.name,
            address: us.address,
            phone_1: us.phone_1,
            phone_2: us.phone_2,
            userId: us.userId,
            count:1
            
        });
        console.log("User added to Firestore: ", us);
    } catch (error) {
        console.error("Error adding user to Firestore: ", error);
        Toast.fire({
            icon: "warning",
            title: "Adding user failed"
        });
    }
};

export const getUsers = createAsyncThunk("userSlice/getUsers", async () => {
    try {
        const data = await getDocs(colluser);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[];
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
})
const userSlice = createSlice({
    name: "userSlice",
    initialState: [] as User[],
    reducers: {
        adduser: (state, action) => {
            addus(action.payload);
        },
        
        
        
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const { adduser} = userSlice.actions;
export default userSlice.reducer;
