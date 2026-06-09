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
    const [educationInput, setEducationInput] = useState({
    school: "",
    degree: "",
    fieldOfStudy: ""
});

const [educationEditingIndex, setEducationEditingIndex] =
    useState(null);

const [educationModalOpen, setEducationModalOpen] =
    useState(false);

    useEffect(() => {
    dispatch(getAboutUser({token: localStorage.getItem("token")}))
    dispatch(getAllPosts())
}, [])

const [skillInput, setSkillInput] = useState("");
const [skillsModalOpen, setSkillsModalOpen] = useState(false);

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
        education: userProfile.education,
        skills: userProfile.skills
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


const deleteEducation = (index) => {

    const updatedEducation =
        userProfile.education.filter(
            (_, i) => i !== index
        );

    setUserProfile({
        ...userProfile,
        education: updatedEducation
    });
};

const editEducation = (index) => {

    setEducationInput(
        userProfile.education[index]
    );

    setEducationEditingIndex(index);

    setEducationModalOpen(true);
};

const handleEducationInputChange = (e) => {

    const { name, value } = e.target;

    setEducationInput({
        ...educationInput,
        [name]: value
    });
};


const addSkill = () => {

    if (!skillInput.trim()) return;

    setUserProfile({
        ...userProfile,
        skills: [
            ...(userProfile.skills || []),
            skillInput
        ]
    });

    setSkillInput("");
    setSkillsModalOpen(false);
};

const deleteSkill = (index) => {

    const updatedSkills =
        userProfile.skills.filter(
            (_, i) => i !== index
        );

    setUserProfile({
        ...userProfile,
        skills: updatedSkills
    });
};


    return (
       <UserLyout>
        <DashboardLayout>
            {authState.user && userProfile?.userId &&



<div className={styles.container}>

    {/* Banner + Profile Section */}
    <div className={styles.bannerSection}>

        {/* Banner */}
        <div className={styles.backDropContainer}>

           

                {
       userProfile?.userId?.bannerPicture ? (

<img
 className={styles.backDrop}
//  src={`${BASE_URL}/${userProfile.userId.bannerPicture}`}
src={userProfile.userId.bannerPicture}
 alt="banner"
/>

) : (

<div className={styles.emptyBanner}>
    <FaCamera />
    <h3>Add a Cover Photo</h3>
    <p>Make your profile stand out.</p>
</div>

)
}

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

            

            {
// userProfile?.userId?.profilePicture ?
userProfile?.userId?.profilePicture &&
userProfile?.userId?.profilePicture !== "default.jpg" ?
 (

<img
 className={styles.profilePicture}
//  src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
src={userProfile.userId.profilePicture}
 alt="profile"
/>

) : (

<div className={styles.emptyProfilePicture}>
     <FaCamera />
</div>

)
}

          
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
  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" ,  width: "100%"}}>

        {/* Left Column */}
        {/* <div style={{ flex: "0.6" }}> */}
        <div style={{ flex: "1 1 280px", minWidth: "0", width: "100%" }}>

            

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

            

            {
!userProfile?.bio?.trim() && (

<div className={styles.profileTip}>
   ✨ Add a bio to tell others about yourself
</div>

)
}
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

                    {
userProfile?.pastWork?.length === 0 && (

<div className={styles.emptySection}>
   <h4>No Work Experience Added</h4>
   <p>Add your internships, jobs or freelance work.</p>
</div>

)
}
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



            <div className={styles.workHistory}>

    <h4>Education History</h4>

    <div className={styles.workHistoryContainer}>

        {userProfile?.education?.map(
            (edu, index) => (

            <div
                key={index}
                className={styles.workHistoryCard}
            >

                <p style={{fontWeight:"bold"}}>
                    {edu.school}
                </p>

                <p>{edu.degree}</p>

                <p>{edu.fieldOfStudy}</p>

                <div className={styles.workActions}>

                    <button
                        onClick={() =>
                            editEducation(index)
                        }
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            deleteEducation(index)
                        }
                    >
                        Delete
                    </button>

                </div>

            </div>
        ))}

        {
userProfile?.education?.length === 0 && (

<div className={styles.emptySection}>
   <h4>No Education Added</h4>
   <p>Add your school, college or degree.</p>
</div>

)
}
    </div>

    <button
        className={styles.addWorkButton}
        onClick={() => {

            setEducationEditingIndex(null);

            setEducationInput({
                school: "",
                degree: "",
                fieldOfStudy: ""
            });

            setEducationModalOpen(true);

        }}
    >
        Add Education
    </button>

</div>

<div className={styles.workHistory}>

    <h4>Skills</h4>

    <div className={styles.skillsContainer}>

        {userProfile.skills?.map(
            (skill, index) => (

            <div
                key={index}
                className={styles.skillBadge}
            >
                {skill}

                <span
                    onClick={() =>
                        deleteSkill(index)
                    }
                    className={styles.skillDelete}
                >
                    ×
                </span>

            </div>
        ))}

        {
userProfile?.skills?.length === 0 && (

<div className={styles.emptySection}>
   <h4>No Skills Added</h4>
   <p>Add technologies and skills you know.</p>
</div>

)
}
    </div>

    <button
        className={styles.addWorkButton}
        onClick={() =>
            setSkillsModalOpen(true)
        }
    >
        Add Skill
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
        {/* <div style={{ flex: "0.4",  maxWidth: "400px" }}> */}
        {/* <div style={{ flex: "0.4", maxWidth: "400px", minWidth: "280px" }}> */}
        <div style={{  flex: "1 1 280px", minWidth: "0", width: "100%" }}>
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
                                // src={`${BASE_URL}/${post.media}`}
                                src={post.media}
                                alt="post media"
                                className={styles.postMedia}
                            />
                        )}

                        <p>{post.body}</p>

                    </div>
                </div>
            ))}
            {
userPosts.length === 0 && (

<div className={styles.emptySection}>
   <h4>No Posts Yet</h4>
   <p>Your posts and updates will appear here.</p>
</div>

)
}

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

{
educationModalOpen &&

<div
    onClick={() =>
        setEducationModalOpen(false)
    }
    className={styles.commentsContainer}
>

<div
    onClick={(e) =>
        e.stopPropagation()
    }
    className={styles.allCommentsContainer}
>

<input
    name="school"
    value={educationInput.school}
    onChange={
      handleEducationInputChange
    }
    className={styles.inputField}
    placeholder="School / College"
/>

<input
    name="degree"
    value={educationInput.degree}
    onChange={
      handleEducationInputChange
    }
    className={styles.inputField}
    placeholder="Degree"
/>

<input
    name="fieldOfStudy"
    value={educationInput.fieldOfStudy}
    onChange={
      handleEducationInputChange
    }
    className={styles.inputField}
    placeholder="Field of Study"
/>

<div
className={styles.updateProfileBtn}
onClick={() => {

    if (
      educationEditingIndex !== null
    ) {

        const updatedEducation = [
            ...userProfile.education
        ];

        updatedEducation[
            educationEditingIndex
        ] = educationInput;

        setUserProfile({
            ...userProfile,
            education:
                updatedEducation
        });

    } else {

        setUserProfile({
            ...userProfile,
            education: [
                ...userProfile.education,
                educationInput
            ]
        });
    }

    setEducationInput({
        school: "",
        degree: "",
        fieldOfStudy: ""
    });

    setEducationEditingIndex(null);

    setEducationModalOpen(false);
}}
>
{educationEditingIndex !== null
 ? "Update Education"
 : "Add Education"}
</div>

</div>
</div>
}

{
skillsModalOpen &&

<div
    className={styles.commentsContainer}
    onClick={() =>
        setSkillsModalOpen(false)
    }
>

<div
    className={styles.allCommentsContainer}
    onClick={(e) =>
        e.stopPropagation()
    }
>

<input
    className={styles.inputField}
    placeholder="Enter Skill"
    value={skillInput}
    onChange={(e) =>
        setSkillInput(e.target.value)
    }
/>

<div
    className={styles.updateProfileBtn}
    onClick={addSkill}
>
    Add Skill
</div>

</div>

</div>
}


        </DashboardLayout>
       </UserLyout>
    )
}

