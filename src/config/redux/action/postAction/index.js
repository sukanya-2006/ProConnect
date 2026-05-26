import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";


const clientServer = axios.create({
    baseURL: "http://localhost:9090"
})

export const getAllPosts = createAsyncThunk (
    "post/getAllPosts",
    async (_, thunkAPI) => {
       try {

        const response = await clientServer.get('/posts')
        
        return thunkAPI.fulfillWithValue(response.data)
       }  catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
       }

    } )


   