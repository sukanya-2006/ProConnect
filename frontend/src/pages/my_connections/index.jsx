import React from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {getConnectionsRequest,AcceptConnection} from '@/config/redux/action/authAction';
import styles from "./index.module.css"
import { BASE_URL } from '@/config'
import { useRouter } from 'next/router'


export default function MyConnections() {
const dispatch= useDispatch();
const authState = useSelector((state) => state.auth);
const router = useRouter();

useEffect(() => {
  dispatch(getConnectionsRequest({
    token: localStorage.getItem("token")
  }));
}, [])



useEffect(() => {
   if (authState.connectionRequest.length != 0)
    console.log("authState.connectionRequest")
}, [authState.connectionRequest])
  return (
    <UserLayout>
      <DashboardLayout>
      
<div>
    {!Array.isArray(authState.connections) || authState.connections.length === 0 ? (
        <div>
            <h1>No Connection Requests Pending</h1>
            
        </div>

    ) : (

        <>
            <h1>My Connections</h1>

          {Array.isArray(authState.connections) && authState.connections.filter((connection) => connection.status_accepted === null).map((user, index) => {
    return (
        <div
        
            onClick={() => {
                router.push(`/view_profile/${user.userId.username}`);
            }}
            className={styles.userCard}
            key={index}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                   

                }}
            >

                {/* Left Side */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem"
                    }}
                >
                    <div className={styles.profilePicture}>
                        <img
                            src={`${BASE_URL}/${user.userId.profilePicture}`}
                            alt=""
                        />
                    </div>

                    <div className={styles.userInfo}>
                        <h3>{user.userId.name}</h3>
                        <p>@{user.userId.username}</p>
                    </div>
                </div>

                {/* Right Side Buttons */}
                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            dispatch(
                                AcceptConnection({
                                    token: localStorage.getItem("token"),
                                    connectionId: user._id,
                                    action: "accept"
                                })
                            );
                        }}
                        className={styles.connectedButton}
                    >
                        Accept
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            console.log("Reject clicked");
                        }}
                        className={styles.rejectButton}
                    >
                        Reject
                    </button>
                </div>

            </div>

        </div>
    );
})}
        </>

    )}
</div>
<h2 className={styles.networkHeading}>My Network</h2>
{Array.isArray(authState.connections) && authState.connections.filter((connection) => connection.status_accepted !== null).map((user, index) =>{
const currentUserId = authState.user?.userId?._id;

const profile =
    user.userId._id === currentUserId
        ? user.connectionId
        : user.userId;
return (
<div

           
            onClick={() => {
                router.push(`/view_profile/${profile.username}`);
            }}
            className={styles.userCard}
            key={index}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"
                }}
            >

                {/* Left Side */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem"
                    }}
                >
                    <div className={styles.profilePicture}>
                        <img
                            src={`${BASE_URL}/${profile.profilePicture}`}
                            alt=""
                        />
                    </div>

                    <div className={styles.userInfo}>
                        <h3>{profile.name}</h3>
                        <p>@{profile.username}</p>
                    </div>
                </div>

                {/* Right Side Buttons */}
                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >  
                </div>

            </div>

        </div>
)    
               
})}
        
        
        </DashboardLayout>
          
    </UserLayout>
  )
}


