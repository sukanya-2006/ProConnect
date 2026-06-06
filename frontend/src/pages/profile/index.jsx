import React, {useEffect, useState} from 'react'
import UserLyout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import styles from "./index.module.css"
import { useDispatch, useSelector } from 'react-redux'
import {BASE_URL} from '@/config'
import { getAboutUser } from '@/config/redux/action/authAction'
import { getAllPosts } from '@/config/redux/action/postAction'
// import { FaCamera } from "react-icons/fa";
// import { FaPen } from "react-icons/fa";
import { FaCamera, FaPen } from "react-icons/fa";
// import { headers } from 'next/headers'
import {clientServer} from '@/config'



export default function ProfilePage() {
    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.postReducer);

    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);


    useEffect(() => {
    dispatch(getAboutUser({token: localStorage.getItem("token")}))
    dispatch(getAllPosts())
}, [])

 useEffect(() => {
   setUserProfile(authState.user)

   if (authState.user) {
    let post = postReducer.posts.filter((post) => {
    return post.userId.username === authState.user.userId.username
    })
    
    setUserPosts(post);  
   }
   

    
}, [authState.user, postReducer.posts])


const updateProfilePicture = async (file) => {
    const formData = new FormData();

    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    await clientServer.post(
        "/update_profile_picture",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    dispatch(
        getAboutUser({
            token: localStorage.getItem("token"),
        })
    );
};




const updateBannerPicture = async (file) => {
    const formData = new FormData();

    formData.append("banner_picture", file);
    formData.append("token", localStorage.getItem("token"));

    await clientServer.post(
        "/update_banner_picture",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    dispatch(
        getAboutUser({
            token: localStorage.getItem("token"),
        })
    );
};

// const updatePicture = async (file) => {
//     const formData = new FormData();
//     formData.append("profile_picture", file);
//     formData.append("token", localStorage.getItem("token"));

//     const response = await clientServer.post("/update_profile_picture", formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });

//     dispatch(getAboutUser({token: localStorage.getItem("token")}));
// }

    return (
       <UserLyout>
        <DashboardLayout>
            {authState.user && userProfile?.userId &&

//             <div className={styles.container}>
              
//                <div className={styles.bannerSection}>

//     {/* Banner */}
//     <div className={styles.backDropContainer}>

//         <img
//             className={styles.backDrop}
//             src="https://media.licdn.com/dms/image/v2/D4D12AQGRsL7h26w-Bg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711431970518?e=2147483647&v=beta&t=7MUoFdBoTt2bbPGQLIg36dcFCRHCwu1HyicK282aK6Y"
//             alt="banner"
//         />

//         <div className={styles.backdropOverlay}>
//             <div className={styles.bannerEditButton}>
//                 <FaPen />
//                 <span>Edit Cover</span>
//             </div>
//         </div>

//     </div>

//     {/* Profile Picture */}
//     <div className={styles.profileWrapper}>

//         <img
//             className={styles.profilePicture}
//             src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
//             alt="profile"
//         />

//         <div className={styles.profileOverlay}>
//             <FaCamera />
//         </div>

//     </div>

//   </div>
//                 </div>

//                 <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>

//                     {/* Left column: name, button, bio, work history */}
//                     <div style={{ flex: "0.6" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                             <h2 style={{ margin: 0 }}>{userProfile.userId.name}</h2>
//                             <p style={{ color: "grey", margin: 0 }}>@{userProfile.userId.username}</p>
//                         </div>

          

//                         <p style={{ marginTop: "0.5rem", color: "#444" }}>{userProfile.bio}</p>

//                         <div className={styles.workHistory}>
//                             <h4>Work History</h4>
//                             <div className={styles.workHistoryContainer}>
//                                 {userProfile.pastWork.map((work, index) => (
//                                     <div key={index} className={styles.workHistoryCard}>
//                                         <p style={{ fontWeight: "bold" }}>{work.company} - {work.position}</p>
//                                         <p>{work.years}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right column: recent activity */}
//                     <div style={{ flex: "0.4" }}>
//                         <h3>Recent Activity</h3>
//                         {userPosts.map((post) => (
//                             <div key={post._id} className={styles.postContainer}>
//                                 <div className={styles.card}>
//                                     <p>{post.content}</p>
//                                     {post.media !== "" ?
//                                         <img src={`${BASE_URL}/${post.media}`} alt="post media" className={styles.postMedia} />
//                                         : null}
//                                     <p>{post.body}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>

//             </div>

<div className={styles.container}>

    {/* Banner + Profile Section */}
    <div className={styles.bannerSection}>

        {/* Banner */}
        <div className={styles.backDropContainer}>
{/* 
            <img
                className={styles.backDrop}
                src="https://media.licdn.com/dms/image/v2/D4D12AQGRsL7h26w-Bg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711431970518?e=2147483647&v=beta&t=7MUoFdBoTt2bbPGQLIg36dcFCRHCwu1HyicK282aK6Y"
                alt="banner"
            /> */}
            {/* <img
              className={styles.backDrop}
                src={
                userProfile?.bannerPicture
              ? `${BASE_URL}/${userProfile.bannerPicture}`
               : "https://media.licdn.com/dms/image/v2/D4D12AQGRsL7h26w-Bg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711431970518?e=2147483647&v=beta&t=7MUoFdBoTt2bbPGQLIg36dcFCRHCwu1HyicK282aK6Y"
             }
              alt="banner"
            /> */}
            <img
                    className={styles.backDrop}
                   src={
                   userProfile?.userId?.bannerPicture
                  ? `${BASE_URL}/${userProfile.userId.bannerPicture}`
                  : "default-banner-url"
                  }
                  alt="banner"
                />

            <label htmlFor='ProfileBannerUpload' className={styles.backdropOverlay}>
                <div  className={styles.bannerEditButton}>
                    <FaPen />
                    <span>Edit Cover</span>
                </div>
                

            </label>
            <input 
            onChange={(e) => {
            updateBannerPicture(e.target.files[0]);
            }}
             type="file"
                    id="ProfileBannerUpload"
                    style={{ display: "none" }}
            
            />

        </div>

        {/* Profile Picture */}
        <div className={styles.profileWrapper}>

            <img
                className={styles.profilePicture}
                src={`${BASE_URL}/${userProfile?.userId?.profilePicture}`}
                alt="profile"
            />

            {/* <label htmlFor='profilePictureUpload' className={styles.profileOverlay}>
                <FaCamera />
            </label>
            <input type="file" id='profilePictureUpload' /> */}
            <label htmlFor="profilePictureUpload" className={styles.profileOverlay}>
            <FaCamera />
             </label>

                  <input
                 onChange={(e) => {
                updateProfilePicture(e.target.files[0]);
                }}
                    type="file"
                    id="profilePictureUpload"
                    style={{ display: "none" }}
                />

        </div>

    </div>

    {/* Main Content */}
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>

        {/* Left Column */}
        <div style={{ flex: "0.6" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <h2 style={{ margin: 0 }}>
                    {userProfile?.userId?.name}
                </h2>

                <p style={{ color: "grey", margin: 0 }}>
                    @{userProfile?.userId?.username}
                </p>
            </div>

            <p 
             style={{
              marginTop: "0.5rem",
             marginBottom: "2rem",
             color: "#444"
            }}
              >
                {userProfile?.bio}
            </p>

            <div className={styles.workHistory}>
                <h4>Work History</h4>

                <div className={styles.workHistoryContainer}>
                    {userProfile?.pastWork?.map((work, index) => (
                        <div
                            key={index}
                            className={styles.workHistoryCard}
                        >
                            <p style={{ fontWeight: "bold" }}>
                                {work.company} - {work.position}
                            </p>

                            <p>{work.years}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* Right Column */}
        <div style={{ flex: "0.4" }}>

            <h3>Recent Activity</h3>

            {userPosts.map((post) => (
                <div
                    key={post._id}
                    className={styles.postContainer}
                >
                    <div className={styles.card}>

                        <p>{post.content}</p>

                        {post.media !== "" && (
                            <img
                                src={`${BASE_URL}/${post.media}`}
                                alt="post media"
                                className={styles.postMedia}
                            />
                        )}

                        <p>{post.body}</p>

                    </div>
                </div>
            ))}

        </div>

    </div>

</div>
}
        </DashboardLayout>
       </UserLyout>
    )
}

