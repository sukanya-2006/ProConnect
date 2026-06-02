


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
    
    // const [isConnectionNull, setIsConnectionNull] = useState(true);

    // const getUsersPost = async()=> {
    //     await dispatch(getAllPosts());
    //     await dispatch(getConnectionsRequest({token: localStorage.getItem("token")}));

    // }
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
        console.log(authState.connections, userProfile.userId._id)
        if(authState.connections.some(user => user.connectionId._id === userProfile.userId._id)) {
            setIsCurrentUserInConnection(true)
        }
    }, [authState.connections])

//     useEffect(() => {

//     if(
//         authState.connectionRequest?.some(
//             req => req.connectionId?._id === userProfile.userId._id
//         )
//     ){
//         setIsRequestSent(true);
//     }

// }, [
//     authState.connectionRequest,
//     userProfile.userId._id
// ]);

//     useEffect(() => {
//     getUsersPost();
//      }, [])


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

    if(found){
        setIsRequestSent(true);
    }

}, [
    authState.connectionRequest,
    userProfile.userId._id
]);

useEffect(() => {
    getUsersPost();
}, [])

    // return (
    //     <UserLayout>
    //         <DashboardLayout>

    //             <div className={styles.container}>

    //                 <div className={styles.backDropContainer}>

    //                     <img
    //                         className={styles.backDrop}
    //                         src="https://media.licdn.com/dms/image/v2/D4D12AQGRsL7h26w-Bg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711431970518?e=2147483647&v=beta&t=7MUoFdBoTt2bbPGQLIg36dcFCRHCwu1HyicK282aK6Y"
    //                         alt="banner"
    //                     />

    //                     <img
    //                         className={styles.profilePicture}
    //                         src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
    //                         alt="profile"
    //                     />

    //                 </div>

                  

    //                 <div className={styles.profileContainer_details}>
                       
    //                    <div style={{display: "flex", gap: "0.7rem"}}>
    //                        <div style={{flex:"0.8"}}>
    //                           <div  style={{
    //                              display: "flex",
    //                              alignItems: "center",
    //                              gap: "1rem"
    //                           }}>
    //                             <h2>{userProfile.userId.name}</h2>
    //                             <p style={{color: "grey"}}>@{userProfile.userId.username}</p>
    //                           </div>

    //                           {isCurrentUserInConnection ? 
    //                             <button className={styles.connectedButton}>Connected</button>
    //                             :
    //                             <button onClick={() => dispatch(sendConnectionRequest({token: localStorage.getItem("token"), userId: userProfile.userId._id}))} className={styles.connectBtn}>
    //                                 Connect
    //                             </button>
    //                           }

    //                             <div>
    //                                 <p>{userProfile.bio}</p>

    //                             </div>


    //                          </div>

    //                          <div style={{flex: "0.2"}}>
    //                             <h3>Recent Activity</h3>
    //                              {userPosts.map((post) => {
    //                                 return (
    //                                     <div key={post._id} className={styles.postContainer}>
    //                                         <div className={styles.card}> {post.content} 
    //                                         <div className={styles.card_profileContainer}>

    //                                             {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`} alt="post media" className={styles.postMedia} /> : 
    //                                             <div style={{ width: "3.4rem", height: "3.4rem"}}></div>}
    //                                         </div>

    //                                           <p>{post.body}</p>
    //                                         </div>
    //                                     </div>
    //                                 )})}

    //                          </div>
    //                        </div>
  

    //                    </div>
    //                 </div>

    //         </DashboardLayout>
    //     </UserLayout>
    // );



















//     return (
//     <UserLayout>
//         <DashboardLayout>
//             <div className={styles.container}>

//                 <div className={styles.backDropContainer}>
//          <img
//           className={styles.backDrop}
//           src="https://media.licdn.com/dms/image/v2/D4D12AQGRsL7h26w-Bg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711431970518?e=2147483647&v=beta&t=7MUoFdBoTt2bbPGQLIg36dcFCRHCwu1HyicK282aK6Y"
//           alt="banner"
//         />

//          <img
//            className={styles.profilePicture}
//            src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
//            alt="profile"
//             />
//         </div>

           

//                 <div className={styles.profileContainer_details}>
//                     <div style={{ display: "flex", gap: "1rem", marginTop: "0px", alignItems: "flex-start" }}>
                        
//                         {/* Left: profile info */}
//                         <div style={{ flex: "0.6" }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                                 <h2 style={{ margin: 0 }}>{userProfile.userId.name}</h2>
//                                 <p style={{ color: "grey", margin: 0 }}>@{userProfile.userId.username}</p>
//                             </div>

//                             <div style={{ marginTop: "0.5rem" }}>
//                                 {/* {isCurrentUserInConnection ?
//                                     <button className={styles.connectedButton}>{isConnectionNull ? "Pending": "Connected" }</button>
//                                     : 
//                                     <button onClick={() => {
//                                         dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), userId: userProfile.userId._id }));
//                                         // setIsRequestSent(true);
//                                     }} className={styles.connectBtn}>
//                                         Connect
//                                     </button>
//                                 } */}

//                                 {
//                                 isCurrentUserInConnection ? (

//                                 <button className={styles.connectedButton}>
//                                  Connected
//                                 </button>

//                                  ) : isRequestSent ? (

//                                 <button className={styles.pendingButton}>
//                                  Pending
//                                 </button>

//                                 ) : (

//                              <button
//                              onClick={() => {
//                                 console.log("Sending Request To:", userProfile.userId._id);
//                                 dispatch(
//                                 sendConnectionRequest({
//                                   token: localStorage.getItem("token"),
//                                   connectionId: userProfile.userId._id
//                                  })
//                                  );

//                                 setIsRequestSent(true);

//                               }}
//                              className={styles.connectBtn}
//                            >
//                            Connect
//                             </button>

//                               )
//                           }
//                             </div>

//                             <p style={{ marginTop: "0.5rem", color: "#444" }}>{userProfile.bio}</p>
//                         </div>

//                         {/* Right: recent activity */}
//                         <div style={{ flex: "0.4" }}>
//                             <h3>Recent Activity</h3>
//                             {userPosts.map((post) => (
//                                 <div key={post._id} className={styles.postContainer}>
//                                     <div className={styles.card}>
//                                         <p>{post.content}</p>
//                                         {post.media !== "" ?
//                                             <img src={`${BASE_URL}/${post.media}`} alt="post media" className={styles.postMedia} />
//                                             : null}
//                                         <p>{post.body}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 </div>

//                 <div className="workHistory">
//                     <h4>Work History</h4>
//                     <div className={styles.workHistoryContainer}>
//                         {
//                             userProfile.pastWork.map((work, index) => {
//                                 return (
//                                     <div key={index} className={styles.workHistoryCard}>
//                                         <p style={{fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem"}}>{work.company} - {work.position}</p>
//                                         <p>{work.years}</p>
//                                     </div>

//                                 )

//                             })
//                         }
//                     </div>
//                 </div>

//             </div>
//         </DashboardLayout>
//     </UserLayout>
// );




return (
    <UserLayout>
        <DashboardLayout>
            <div className={styles.container}>

                <div className={styles.backDropContainer}>
                    <img
                        className={styles.backDrop}
                        src="https://media.licdn.com/dms/image/v2/D4D12AQGRsL7h26w-Bg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711431970518?e=2147483647&v=beta&t=7MUoFdBoTt2bbPGQLIg36dcFCRHCwu1HyicK282aK6Y"
                        alt="banner"
                    />
                    <img
                        className={styles.profilePicture}
                        src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                        alt="profile"
                    />
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>

                    {/* Left column: name, button, bio, work history */}
                    <div style={{ flex: "0.6" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <h2 style={{ margin: 0 }}>{userProfile.userId.name}</h2>
                            <p style={{ color: "grey", margin: 0 }}>@{userProfile.userId.username}</p>
                        </div>

                        <div style={{ marginTop: "0.5rem" }}>
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
                    </div>

                    {/* Right column: recent activity */}
                    <div style={{ flex: "0.4" }}>
                        <h3>Recent Activity</h3>
                        {userPosts.map((post) => (
                            <div key={post._id} className={styles.postContainer}>
                                <div className={styles.card}>
                                    <p>{post.content}</p>
                                    {post.media !== "" ?
                                        <img src={`${BASE_URL}/${post.media}`} alt="post media" className={styles.postMedia} />
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