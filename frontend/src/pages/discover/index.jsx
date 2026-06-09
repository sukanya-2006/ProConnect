import React from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction'
import { useRouter } from 'next/router'
import styles from "./index.module.css"
import { BASE_URL } from "@/config/index";
export default function DiscoverPage() {

  const authState = useSelector((state) => state.auth)
const dispatch = useDispatch();
  useEffect(() => {
      if(!authState.all_profiles_fetched) {
          dispatch(getAllUsers());
      }
  }, [])

  const router= useRouter();
  return (
      <UserLayout>
        <DashboardLayout>
            <div>
                {/* <h1>Discover</h1> */}
                <h1 className={styles.pageTitle}>Discover</h1>

                <div className={styles.allUserProfile}>

                {/* {authState.all_profiles_fetched && authState.all_users.map((user) => { */}
                {
  authState.all_profiles_fetched &&
  authState.all_users
    .filter((user) => user?.userId)
    .map((user) => {
                    return (
                        <div onClick={() => {
                            router.push(`/view_profile/${user.userId.username}`)
                        }} key={user._id} className={styles.userCard}>
                            {/* <img className={styles.userCard__image} src={`${BASE_URL}/${user.userId.profilePicture}`} alt="profile" /> */}

                            {
  // user.userId.profilePicture &&
  // user.userId.profilePicture !== "default.jpg" ? 
     user?.userId?.profilePicture &&
user?.userId?.profilePicture !== "default.jpg" ? (

    <img
      className={styles.userCard__image}
      // src={`${BASE_URL}/${user.userId.profilePicture}`}
      src={user.userId.profilePicture}
      alt="profile"
    />

  ) : (

    <div className={styles.emptyProfilePicture}>
      {user.userId.name?.charAt(0)?.toUpperCase()}
    </div>

  )
}
                            <div>
                            <h1>{user?.userId?.name}</h1>
                            <p>@{user?.userId?.name}</p>
                            </div>
                            
                        </div>
                    )
                })}
                </div>
            </div>
        </DashboardLayout>
          
    </UserLayout>
  )
}

