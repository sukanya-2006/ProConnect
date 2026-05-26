
import axios from "axios"
import { createAsyncThunk} from "@reduxjs/toolkit";


// ✅ add this line at the top
const clientServer = axios.create({
    baseURL: "http://localhost:9090"
})

export const loginUser = createAsyncThunk(
    "user/login",
    async( user, thunkAPI) => {
        try{
          const response = await clientServer.post("/login", {
            
           email: user.email,
           password: user.password

          });
           
          if(response.data.token) {
            localStorage.setItem("token", response.data.token)
          } else {
            return thunkAPI.rejectWithValue({
                message: "token not provided"
            })
          }

          return thunkAPI.fulfillWithValue(response.data)

         

        // localStorage.setItem("token", response.data.token)


        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async(user, thunkAPI) => {
    
        try {
           const request = await clientServer.post("/register", {
                  username: user.username,
                  password: user.password,
                  email: user.email,
                  name: user.name
           })
              
            return thunkAPI.fulfillWithValue(request.data); 
           } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)





export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token")
            console.log("getAboutUser called, token:", token)  // add this
            const response = await clientServer.get("/get_user_and_profile", {
               params: {
                token: token
               }
            })
            console.log("getAboutUser response:", response.data)  // add this
            return thunkAPI.fulfillWithValue(response.data)
        } catch (err) {
            console.log("getAboutUser error:", err)  // add this
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

// export const getAboutUser = createAsyncThunk(
//     "user/getAboutUser",
//     async (_, thunkAPI) => {
//         try {
             
//             const response = await clientServer.get("/get_user_and_profile", {
//                params : {
//                 token : user.token
//                }
//             })

//             return thunkAPI.fulfillWithValue(response.data)
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data)
//         }
//     }
// )


export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get("/user/get_all_users");
            return thunkAPI.fulfillWithValue(response.data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);