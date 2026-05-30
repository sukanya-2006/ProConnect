


import { clientServer, BASE_URL } from '@/config';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from "react";
import styles from "./index.module.css";

export default function ViewProfilePage({ userProfile }) {

    const searchParamers = useSearchParams();

    useEffect(() => {
        console.log("From View : View Profile");
    }, []);

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

                  

                    <div className={styles.profileContainer_details}>
                       
                       <div style={{display: "flex", gap: "0.7rem"}}>
                           <div style={{flex:"0.8"}}>
                              <div  style={{
                                 display: "flex",
                                 alignItems: "center",
                                 gap: "1rem"
                              }}>
                                <h2>{userProfile.userId.name}</h2>
                                <p style={{color: "grey"}}>@{userProfile.userId.username}</p>
                              </div>


                             </div>
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