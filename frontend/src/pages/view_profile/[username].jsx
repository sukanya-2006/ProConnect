


import { clientServer, BASE_URL } from '@/config';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useSearchParams } from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter} from 'next/router';
import { getConnectionsRequest,getMyConnectionsRequest, sendConnectionRequest} from '@/config/redux/action/authAction';
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
               
export default function ViewProfilePage({ userProfile }) {

    // const searchParamers = useSearchParams();
    const router = useRouter();
    const postReducer = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth)
    
    console.log("Received Requests:", authState.connections);
    console.log("Sent Requests:", authState.connectionRequest);
    const [userPosts, setUserPosts] = useState([]);

    const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false); 
    
    
    const getUsersPost = async()=> {

    await dispatch(getAllPosts());

    await dispatch(
        getConnectionsRequest({
            token: localStorage.getItem("token")
        })
    );

    await dispatch(
        getMyConnectionsRequest({
            token: localStorage.getItem("token")
        })
    );
}


    useEffect(() => {
        let post = postReducer.posts.filter((post) => {
           return post.userId.username === router.query.username
        })

        setUserPosts(post);  
    },   [postReducer.posts])



useEffect(() => {
    if (!authState.connections || !Array.isArray(authState.connections)) return;

    const connectedUser = authState.connections.find((connection) => {
        const senderId = typeof connection.userId === "object" ? connection.userId._id : connection.userId;
        const receiverId = typeof connection.connectionId === "object" ? connection.connectionId._id : connection.connectionId;
        return (
            connection.status_accepted === true &&
            (senderId === userProfile.userId._id || receiverId === userProfile.userId._id)
        );
    });

    setIsCurrentUserInConnection(!!connectedUser);
}, [authState.connections, userProfile.userId._id]);




   useEffect(() => {

    console.log(
        "Sent Requests:",
        authState.connectionRequest
    );

    console.log(
        "Current Profile:",
        userProfile.userId._id
    );

    const found = authState.connectionRequest?.some(
        req => req.connectionId?._id === userProfile.userId._id
    );

    console.log("FOUND =", found);

    
    setIsRequestSent(found);

}, [
    authState.connectionRequest,
    userProfile.userId._id
]);

useEffect(() => {
    getUsersPost();
}, [])

console.log("USER PROFILE", userProfile);
console.log("BANNER", userProfile?.userId?.bannerPicture);

return (
    <UserLayout>
        <DashboardLayout>
           
            <div className={styles.container}>

                <div className={styles.backDropContainer}>
                  
                    

                     {
userProfile?.userId?.bannerPicture ? (

    <img
        className={styles.backDrop}
        src={userProfile.userId.bannerPicture}
        alt="banner"
    />

) : (

    <div className={styles.emptyBanner}>
        
        <p>This user hasn't uploaded a banner yet.</p>
    </div>

)
}
                   
                    {
userProfile?.userId?.profilePicture &&
userProfile?.userId?.profilePicture !== "default.jpg" ? (

    <img
        className={styles.profilePicture}
        src={userProfile.userId.profilePicture}
        alt="profile"
    />

) : (

    <div className={styles.emptyProfilePicture}>
         {userProfile?.userId?.name?.charAt(0)?.toUpperCase()}
    </div>

)
}
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>

                    {/* Left column: name, button, bio, work history */}
                    <div style={{ flex: "0.6" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <h2 style={{ margin: 0 }}>{userProfile.userId.name}</h2>
                            <p style={{ color: "grey", margin: 0 }}>@{userProfile.userId.username}</p>
                        </div>

                        <div style={{ display: "flex", marginTop: "0.5rem", alignItems: "center", gap: "1.2rem" }}>
                            {isCurrentUserInConnection ? (
                                <button className={styles.connectedButton}>Connected</button>
                            ) : isRequestSent ? (
                                <button className={styles.pendingButton}>Pending</button>
                            ) : (
                                <button
                                    onClick={() => {
                                        dispatch(sendConnectionRequest({
                                            token: localStorage.getItem("token"),
                                            connectionId: userProfile.userId._id
                                        }));
                                        setIsRequestSent(true);
                                    }}
                                    className={styles.connectBtn}
                                >
                                    Connect
                                </button>
                            )}
                            {/* <div onClick={async () => {
    const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
    const link = document.createElement('a');
    link.href = response.data.message;
    link.download = `${userProfile.userId.name}_resume.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}} style={ {cursor: "pointer"}}> */}
{/* <div onClick={async () => {
    const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
    const pdfUrl = response.data.message.replace('/upload/', '/upload/fl_attachment/');
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${userProfile.userId.name}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}} style={{cursor: "pointer"}}> */}
<div onClick={async () => {
    const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
    const pdfUrl = response.data.message;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', `${userProfile.userId.name}_resume.pdf`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}} style={{cursor: "pointer"}}>
                                <svg style={{width: "1.2em"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>

                             </div>
                        </div>

                        <p style={{ marginTop: "0.5rem", color: "#444" }}>{userProfile.bio}</p>

                        <div className={styles.workHistory}>
                            <h4>Work History</h4>
                            <div className={styles.workHistoryContainer}>
                                {userProfile.pastWork.map((work, index) => (
                                    <div key={index} className={styles.workHistoryCard}>
                                        <p style={{ fontWeight: "bold" }}>{work.company} - {work.position}</p>
                                        <p>{work.years}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.workHistory}>
    <h4>Education History</h4>

    <div className={styles.workHistoryContainer}>
        {userProfile.education?.map((edu, index) => (
            <div
                key={index}
                className={styles.workHistoryCard}
            >
                <p style={{ fontWeight: "bold" }}>
                    {edu.school}
                </p>

                <p>{edu.degree}</p>

                <p>{edu.fieldOfStudy}</p>
            </div>
        ))}
    </div>
</div>


<div className={styles.workHistory}>
    <h4>Skills</h4>

    <div
        style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "1rem"
        }}
    >
        {userProfile.skills?.map((skill, index) => (
            <div
                key={index}
                style={{
                    padding: "8px 16px",
                    background: "#eef3f8",
                    color: "#0a66c2",
                    borderRadius: "20px",
                    fontSize: "0.95rem",
                    fontWeight: "500"
                }}
            >
                {skill}
            </div>
        ))}
    </div>
</div>
                    </div>

                    {/* Right column: recent activity */}
                    <div style={{ flex: "0.4" }}>
                        <h3>Recent Activity</h3>
                        {userPosts.map((post) => (
                            <div key={post._id} className={styles.postContainer}>
                                <div className={styles.card}>
                                    <p>{post.content}</p>
                                    {post.media !== "" ?
                                        <img src={post.media} alt="post media" className={styles.postMedia} />
                                        : null}
                                    <p>{post.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </DashboardLayout>
    </UserLayout>
);
}

export async function getServerSideProps(context) {

    const request = await clientServer.get(
        "/user/get_profile_based_on_username",
        {
            params: {
                username: context.query.username
            }
        }
    );

    return {
        props: {
            userProfile: request.data.profile
        }
    };
}