import React from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction'
import { useRouter } from 'next/router'
export default function DiscoverPage() {

  const authState = useSelector((state) => state.auth)
const dispatch = useDispatch();
  useEffect(() => {
      if(!authState.all_profiles_fetched) {
          dispatch(getAllUsers());
      }
  }, [])
  return (
      <UserLayout>
        <DashboardLayout>
            <div>
                <h1>Discover</h1>
            </div>
        </DashboardLayout>
          
    </UserLayout>
  )
}

