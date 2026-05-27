// import { postponeWithTracking } from "next/dist/server/app-render/dynamic-rendering";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

//     posts: [],
//     isError: false,
//     postFetched: false,
//     isLoading: false,
//     loggedIn : false,
//     message : "",
//     comments : [],
//     postId: "",
// }

// const postSlice = createSlice ( {
//     name: "post",
//     initialState,
//     reducers : {
//         reset: () => initialState,
//         resetPostId : (state) => {
//             state.postId = ""
//     },
// },

// extraReducers: (builder) => {
//     builder
//     .addCase(getAllPosts.pending, (state) => {
//         state.isLoading = true;
//         state.message = "Fetching all the Posts...  "
//     })
//     .addCase(getAllPosts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.postFetched = true;
//         state.posts = action.payload.posts
//     })
//     .addCase(getAllPosts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload
//     })
// }
// })


// export default postSlice.reducer




import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction"; // ← ADD THIS

const initialState = {
    posts: [],
    isError: false,
    postFetched: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    comments: [],
    postId: "",
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = ""
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
            state.message = "Fetching all the Posts..."
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.postFetched = true;
            state.posts = action.payload.posts.reverse()
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
})

export const { reset, resetPostId } = postSlice.actions;
export default postSlice.reducer;