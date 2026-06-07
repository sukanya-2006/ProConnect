import React, {useEffect, useState} from 'react'
import UserLyout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import styles from "./index.module.css"
import { useDispatch, useSelector } from 'react-redux'
import {BASE_URL} from '@/config'
import { getAboutUser } from '@/config/redux/action/authAction'
import { getAllPosts } from '@/config/redux/action/postAction'
import { FaCamera, FaPen } from "react-icons/fa";
import {clientServer} from '@/config'



export default function ProfilePage() {
    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.postReducer);

    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [inputData, setInputData] = useState({company: '', position: '', years: ''});
    const handleWorkInputChange = (e) => {
           const {name, value} = e.target;
           setInputData({...inputData, [name]: value});
    }

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


const updateProfileData = async () => {
    const request = await clientServer.post("/user_update", {
        token: localStorage.getItem("token"),
        name: userProfile.userId.name,

    });

    const response = await clientServer.post("/update_profile_data", {
        token: localStorage.getItem("token"),
        bio: userProfile.bio,
        currentPost: userProfile.currentPost,
        pastWork: userProfile.pastWork,
        education: userProfile.education
    });

    dispatch(getAboutUser({token: localStorage.getItem("token")}));
}


const deleteWork = (index) => {

    const updatedWork = userProfile.pastWork.filter(
        (_, i) => i !== index
    );

    setUserProfile({
        ...userProfile,
        pastWork: updatedWork
    });
};

const editWork = (index) => {

    setInputData(userProfile.pastWork[index]);

    setEditingIndex(index);

    setIsModalOpen(true);
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



<div className={styles.container}>

    {/* Banner + Profile Section */}
    <div className={styles.bannerSection}>

        {/* Banner */}
        <div className={styles.backDropContainer}>

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

            

             <div className={styles.profileNameRow}>
             <input
                className={styles.nameEdit}
               type="text"
               value={userProfile.userId.name}
                onChange={(e) => {
              setUserProfile({
                ...userProfile,
                userId: {
                    ...userProfile.userId,
                    name: e.target.value
                }
            })
        }}
    />

    <p className={styles.username}>
        @{userProfile?.userId?.username}
    </p>
</div>

            {/* <p 
             style={{
              marginTop: "0.5rem",
             marginBottom: "2rem",
             color: "#444"
            }}
              >
                {userProfile?.bio}
            </p> */}
             <textarea 
               className={styles.textarea}
               spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
             style={{
              marginTop: "0.5rem",
             marginBottom: "2rem",
             color: "#444",
             width: "100%"
            }}  value={userProfile.bio}
                onChange={(e) => {
                    setUserProfile({...userProfile, bio: e.target.value});
                }}
                rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
            >

            </textarea>

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

                             <div className={styles.workActions}>
                             <button
                              onClick={() => editWork(index)}
                             >
                               Edit
                              </button>

                            <button
                              onClick={() => deleteWork(index)}
                            >
                             Delete
                             </button>
                           </div>
                        </div>
                    ))}
                </div>
                {/* <button
                className={styles.addWorkButton} onClick={() => {
                  setIsModalOpen(true)
                }}
                >Add Work</button> */}

                <button
                 className={styles.addWorkButton}
                      onClick={() => {

                      setEditingIndex(null);

                       setInputData({
                       company: "",
                         position: "",
                         years: ""
                        });

                     setIsModalOpen(true);
                      }}
                      >
                        Add Work
                     </button>
            </div>
            {userProfile != authState.user &&
              <div onClick={() => {
                 updateProfileData();
              }}
              className={styles.updateProfileBtn}>
                Update Profile
            </div>

            }

        </div>

        {/* Right Column */}
        <div style={{ flex: "0.4",  maxWidth: "400px" }}>

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




                              {
                                 isModalOpen  &&

                                 <div 
                                   onClick={() => {
                                    setIsModalOpen(false)
                                   }}
                                 className={styles.commentsContainer}>
                                    <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className={styles.allCommentsContainer}>

                                     <input
                                 
                                 onChange={handleWorkInputChange}
                                 value={inputData.company}
                                 name='company'
                                 className={styles.inputField}
                                 type="text"
                                 placeholder='Enter Company'
                                 />
                                   <input
                                 
                                 onChange={handleWorkInputChange}
                                 value={inputData.position}
                                 name='position'
                                 className={styles.inputField}
                                 type="text"
                                 placeholder='Enter Position'
                                 />
                                   <input
                                 
                                 onChange={handleWorkInputChange}
                                 value={inputData.years}
                                 name='years'
                                 className={styles.inputField}
                                 type="number"
                                 placeholder='Years'
                                 />

                                 {/* <div onClick= {() => {
                                    setUserProfile({...userProfile, pastWork:[...userProfile.pastWork, inputData]})
                                    setIsModalOpen(false)
                                 }}className={styles.updateProfileBtn}>Add Work</div> */}

                                 <div
onClick={() => {

    if (editingIndex !== null) {

        const updatedWork = [...userProfile.pastWork];

        updatedWork[editingIndex] = inputData;

        setUserProfile({
            ...userProfile,
            pastWork: updatedWork
        });

        setEditingIndex(null);

    } else {

        setUserProfile({
            ...userProfile,
            pastWork: [...userProfile.pastWork, inputData]
        });

    }

    setInputData({
        company: "",
        position: "",
        years: ""
    });

    setIsModalOpen(false);

}}
className={styles.updateProfileBtn}
>
    {editingIndex !== null ? "Update Work" : "Add Work"}
</div>

                                    </div>
                                 </div>
                                  }
        </DashboardLayout>
       </UserLyout>
    )
}

