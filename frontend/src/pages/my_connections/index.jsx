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

// const pendingRequests = Array.isArray(authState.connections) 
//     ? authState.connections.filter((c) => c.status_accepted === null)
//     : [];
const pendingRequests = Array.isArray(authState.connections)
    ? authState.connections.filter(
          (c) =>
              c.status_accepted === null &&
              c.userId
      )
    : [];
// const acceptedConnections = Array.isArray(authState.connections)
//     ? authState.connections.filter((c) => c.status_accepted === true)
//     : [];



// const acceptedConnections = Array.isArray(authState.connections)
//     ? authState.connections.filter(
//           (c) =>
//               c.status_accepted === true &&
//               (c.userId || c.connectionId)
//       )
//     : [];
const acceptedConnections = Array.isArray(authState.connections)
  ? authState.connections.filter(
      (c) =>
        c.status_accepted === true &&
        c.userId &&
        c.connectionId
    )
  : [];
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
                {/* Show pending requests section only if there are pending requests */}
                {pendingRequests.length > 0 ? (
                    <>
                        <h1>My Connections</h1>
                        {pendingRequests.map((user, index) => (
                            <div
                                onClick={() => router.push(`/view_profile/${user.userId.username}`)}
                                className={styles.userCard}
                                key={index}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div className={styles.profilePicture}>
                                            <img src={user.userId.profilePicture} alt="" />
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h3>{user.userId.name}</h3>
                                            <p>@{user.userId.username}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(AcceptConnection({
                                                    token: localStorage.getItem("token"),
                                                    connectionId: user._id,
                                                    action: "accept"
                                                }));
                                            }}
                                            className={styles.connectedButton}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); }}
                                            className={styles.rejectButton}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : acceptedConnections.length === 0 ? (
                    <h1>No Connection Requests Pending</h1>
                ) : null}

                {/* Show My Network only if there are accepted connections */}
                {acceptedConnections.length > 0 && (
                    <>
                        <h2 className={styles.networkHeading}>My Network</h2>
                        {acceptedConnections.map((user, index) => {
                            // const currentUserId = authState.user?.userId?._id;
                            // const profile = user.userId._id === currentUserId ? user.connectionId : user.userId;
                            const currentUserId = authState.user?.userId?._id;

if (!user?.userId && !user?.connectionId) {
    return null;
}

// const profile =
//     user?.userId?._id === currentUserId
//         ? user?.connectionId
//         : user?.userId;
if (!user?.userId || !user?.connectionId) {
    return null;
}

const profile =
    user.userId._id === currentUserId
        ? user.connectionId
        : user.userId;

if (!profile) return null;
                            return (
                                <div
                                    // onClick={() => router.push(`/view_profile/${profile.username}`)}
                                    onClick={() => {
    if (profile?.username) {
        router.push(`/view_profile/${profile.username}`);
    }
}}
                                    className={styles.userCard}
                                    key={index}
                                >
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <div className={styles.profilePicture}>
                                                <img src={profile.profilePicture} alt="" />
                                            </div>
                                            <div className={styles.userInfo}>
                                                <h3>{profile.name}</h3>
                                                <p>@{profile.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </DashboardLayout>
    </UserLayout>
);

}


