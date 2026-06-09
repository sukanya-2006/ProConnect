import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getAllPosts , createPost, deletePost, incrementPostLike, getAllComments, postComment} from "@/config/redux/action/postAction"
import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction"
import { resetPostId } from "@/config/redux/reducer/postReducer";
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import styles from "./index.module.css"
import { BASE_URL } from "@/config/index";

export default function Dashboard() {


    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth)
    const postState = useSelector((state) => state.postReducer)

    useEffect(() => {
        if (authState.isTokenThere) {
            dispatch(getAllPosts())
            dispatch(getAboutUser())
        }

        if(!authState.all_profiles_fetched) {
           dispatch(getAllUsers());
        }
    }, [authState.isTokenThere])

    const [postContent, setPostContent] = useState("");
    const [fileContent, setFileContent] = useState();
    const [commentText, setCommentText] = useState("")
    
    const handleUpload = async () => {

    console.log("BUTTON CLICKED");
    console.log(fileContent);
    console.log(postContent);

    const response = await dispatch(
        createPost({
            file: fileContent,
            body: postContent
        })
    );
     setPostContent("");
     setFileContent(null);
     dispatch(getAllPosts());

    console.log(response);
}

    if (authState.user) {

    

    return (
        <UserLayout>
        <DashboardLayout>
            <div className={styles.scrollComponent}>
            <div className={styles.wrapper}>
              <div className={styles.createPostContainer}>
                
           {
  authState?.userId?.profilePicture &&
  authState?.userId?.profilePicture !== "default.jpg" ? (

    <img
      className={styles.userProfile}
      src={`${BASE_URL}/${authState.user.userId.profilePicture}`}
      alt="profile"
    />

  ) : (

    <div className={styles.emptyProfilePicture}>
      {authState?.user?.userId?.name?.charAt(0)?.toUpperCase()}
    </div>

  )
}
            

            <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} placeholder={"What's on your mind?"} className={styles.textAreaOfContent} id="postContent"></textarea>
            <label htmlFor="fileUpload">
            <div className={styles.Fab}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </div>
            </label>
            <input onChange={(e) => setFileContent(e.target.files[0])} type="file" hidden id='fileUpload' />
            {postContent.length > 0 &&
            <button onClick={handleUpload} className={styles.uploadButton}>
               Post
            </button>
            }
              </div>

              <div className={styles.postsContainer}>
                 {postState.posts.map((post) => {
                    const currentUserId = authState.user.userId._id;

                    const hasLiked = post.likes?.some(
                    id => id.toString() === currentUserId
                    );
console.log("POST ID:", post._id);
console.log("LIKES ARRAY:", post.likes);
console.log("CURRENT USER:", currentUserId);
console.log("HAS LIKED:", hasLiked);
                    return (
                        <div key={post._id} className={styles.singleCard}>
                            <div className={styles.singleCard_profileContainer}>
                                


                            {
  post.userId.profilePicture &&
  post.userId.profilePicture !== "default.jpg" ? (

    <img
      className={styles.userProfile}
      src={`${BASE_URL}/${post.userId.profilePicture}`}
      alt="User Profile"
    />

  ) : (

    <div className={styles.emptyProfilePicture}>
      {post.userId.name?.charAt(0)?.toUpperCase()}
    </div>

  )
}
                            <div>
                                <div style={{display: "flex",  gap: "1.2rem", justifyContent: "space-between", }}>
                                    <p style={{ fontWeight: 'bold' }}>{post.userId.name}</p> 

                                    {
                                        post.userId._id === authState.user.userId._id &&
                                        <div  onClick={async () => {
                                           await dispatch(deletePost({post_id: post._id}))
                                           await dispatch(getAllPosts())
                                        }}
                                        style={{cursor: "pointer"}}>
                                        <svg style={{height: "1.4em", color: "red"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                       </svg>
                                       </div>
                                    }

                             </div>
                                
                                <p style={{ color: 'grey' }}>@{post.userId.username}</p>
                                <p style={{paddingTop: "1.3rem"}}>{post.body}</p>

                               

                                 {
                               post.media?.trim() && (
                               <div className={styles.singleCard_image}>
                                <img
                                 src={`${BASE_URL}/uploads/${post.media}`}
                                 alt="Post Media"
                                     />
                               </div>
                               )
                             }

                                 <div className={styles.optionsContainer}>
                                     <div onClick={ async() => {
                                        // await dispatch(incrementPostLike({post_id: post._id}))
                                        await dispatch(
                                     incrementPostLike({
                                      post_id: post._id,
                                     token: localStorage.getItem("token")
                                       })
                                     );
                                        dispatch(getAllPosts())
                                     }} className={styles.singleOption__optionsContainer}>
                                      
                                        {hasLiked ? (

   // FILLED THUMB

   <svg
      style={{
         width: "1.6rem",
         color: "#0A66C2"
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      fill="currentColor"
   >
      <path d="M144 224C161.7 224 176 238.3 176 256L176 512C176 529.7 161.7 544 144 544L96 544C78.3 544 64 529.7 64 512L64 256C64 238.3 78.3 224 96 224L144 224zM334.6 80C361.9 80 384 102.1 384 129.4L384 133.6C384 140.4 382.7 147.2 380.2 153.5L352 224L512 224C538.5 224 560 245.5 560 272C560 291.7 548.1 308.6 531.1 316C548.1 323.4 560 340.3 560 360C560 383.4 543.2 402.9 521 407.1C525.4 414.4 528 422.9 528 432C528 454.2 513 472.8 492.6 478.3C494.8 483.8 496 489.8 496 496C496 522.5 474.5 544 448 544L360.1 544C323.8 544 288.5 531.6 260.2 508.9L248 499.2C232.8 487.1 224 468.7 224 449.2L224 262.6C224 247.7 227.5 233 234.1 219.7L290.3 107.3C298.7 90.6 315.8 80 334.6 80z"/>
   </svg>

) : (

   // OUTLINE THUMB

   <svg
      style={{
         width: "1.6rem"
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      fill="currentColor"
   >
      <path d="M235.5 102.8C256.3 68 300.5 54 338 71.6L345.2 75.4C380 96.3 394 140.5 376.4 178L376.4 178L362.3 208L472 208L479.4 208.4C515.7 212.1 544 242.8 544 280C544 293.2 540.4 305.4 534.2 316C540.3 326.6 543.9 338.8 544 352C544 370.3 537.1 386.8 526 399.5C527.3 404.8 528 410.3 528 416C528 441.1 515.1 463 495.8 475.9C493.9 511.4 466.4 540.1 431.4 543.6L424 544L319.9 544C301.9 544 284 540.6 267.3 534.1L260.2 531.1L259.5 530.8L252.9 527.6L252.2 527.3L240 520.8C227.7 514.3 216.7 506.1 207.1 496.7C203 523.6 179.8 544.1 151.8 544.1L119.8 544.1C88.9 544.1 63.8 519 63.8 488.1L64 264C64 233.1 89.1 208 120 208L152 208C162.8 208 172.9 211.1 181.5 216.5L231.6 110L232.2 108.8L234.9 103.8L235.5 102.9z"/>
   </svg> 
   
)}
                                        {/* <p>{post.likes}</p> */}
                                        <p>{post.likes?.length || 0}</p>

                                     </div>
                                      <div onClick={() => {
                                        dispatch(getAllComments({post_id: post._id}))
                                      }}className={styles.singleOption__optionsContainer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                        </svg>
                                        <p>{post.comments}</p>

                                     </div>
                                     <div onClick={() => {
                                        const text = encodeURIComponent(post.body)
                                        const url = encodeURIComponent("apnacollege.in");

                                        const twitterURL = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                                        window.open(twitterURL, '_blank');
                                     }} className={styles.singleOption__optionsContainer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>

                                     </div>
                                 </div>
                                    {
                                 postState.postId !== "" &&

                                 <div 
                                   onClick={() => {
                                    dispatch(resetPostId())
                                   }}
                                 className={styles.commentsContainer}>
                                    <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className={styles.allCommentsContainer}>

                                        {postState.comments.length === 0 && 
                                          <h2>No comments yet</h2>}

                                          {postState.comments.length !== 0 &&
                                          
                                          
                                             <div>
                                               {/* {postState.comments.map((comment, index) => { */}
                                                {postState.comments
.filter(comment => comment?.userId)
.map((comment, index) => {
                                                   return (
                                                       <div className={styles.singleComment} key={comment._id}>
                                                        <div className="singleComment_profileContainer">
                                                            {/* <img src={`${BASE_URL}/${comment.userId.profilePicture}`} alt="" /> */}
                                                            {
                                                               comment?.userId?.profilePicture &&
                                                               comment?.userId?.profilePicture !== "default.jpg" ? (

    <img
      src={`${BASE_URL}/${comment.userId.profilePicture}`}
      alt=""
    />

  ) : (

    <div className={styles.emptyCommentProfile}>
      {comment?.userId?.name?.charAt(0)?.toUpperCase()}
    </div>

  )
}
                                                            <div>
                                                                <p style={{ fontWeight: "bold", fontSize: "1.2rem"}}>{comment?.userId?.name}</p>
                                                                <p>@{comment?.userId?.username}</p>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            {comment.body}
                                                        </p>
                                                       </div>

                                                   )
                                               })}
                                               
                                            </div>
                                          }

                                        <div className={styles.postCommentContainer}>
                                            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Comment" />
                                            <div onClick={async () => {
                                                 await dispatch(postComment({
                                                    post_id: postState.postId,
                                                    comment: commentText
                                                 }))
                                                 await dispatch(getAllComments({post_id: postState.postId}))
                                            }}className={styles.postCommentContainer__commentBtn}>
                                            <p>Comment</p>
                                            </div>
                                        </div>  

                                    </div>
                                 </div>
                                  }
                            </div>
                            </div>
                        </div>
                    )
                 })}
              </div>
            </div>
            </div>
           
           
        </DashboardLayout>
          
        </UserLayout>
    )
} else {
    return (
        <UserLayout>
        <DashboardLayout>
            <div className={styles.scrollComponent}>
                <h1>Loading...</h1>
            </div>
        </DashboardLayout>
        </UserLayout>
    )
}
}