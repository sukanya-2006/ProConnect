import React, { useEffect, useState } from 'react'
import UserLayout from "@/layout/UserLayout"
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./style.module.css"
import { registerUser, loginUser } from "@/config/redux/action/authAction"
import { emptyMessage } from "@/config/redux/reducer/authReducer"

function LoginComponent() {

  const authState = useSelector((state) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  const [userLoginMethod, setUserLoginMethod] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard")
    }
  }, [authState.loggedIn])

  useEffect(() => {
     if (localStorage.getItem("token")) {
        router.push("/dashboard")
     }
  }, [])


  useEffect(() => {
    dispatch(emptyMessage())
    setEmail("")
    setPassword("")
    setUsername("")
    setName("")
  }, [userLoginMethod])

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
  }

  const handleRegister = () => {
    dispatch(registerUser({ username, password, email, name }))
  }

  const handleSubmit = () => {
    if (userLoginMethod) {
      handleLogin()
    } else {
      handleRegister()
    }
  }


return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>

          <div className={styles.cardContainer_left}>

            <p className={styles.cardleft_heading}>
              {userLoginMethod ? "Sign In" : "Sign Up"}
            </p>

            {authState.message && (
              <p style={{ color: authState.isError ? "red" : "green" }}>
                {authState.message}
              </p>
            )}

            <div className={styles.inputContainers}>

              {!userLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder='Username'
                  />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder='Name'
                  />
                </div>
              )}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                type="text"
                placeholder='Email'
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder='Password'
              />

              <div onClick={handleSubmit} className={styles.buttonWithOutline}>
                <p>{authState.isLoading ? "Please wait..." : (userLoginMethod ? "Sign In" : "Sign Up")}</p>
              </div>

            </div>
          </div>

          {/* ✅ Right blue section with switch message */}
          <div className={styles.cardContainer_right} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            color: "white",
            padding: "40px"
          }}>
            <p style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center" }}>
              {userLoginMethod ? "Don't have an account?" : "Already have an account?"}
            </p>
            <p style={{ fontSize: "14px", textAlign: "center", opacity: 0.8 }}>
              {userLoginMethod
                ? "Sign up and start connecting with professionals!"
                : "Sign in to continue where you left off!"}
            </p>
            <div
              onClick={() => setUserLoginMethod(!userLoginMethod)}
              style={{
                border: "2px solid white",
                borderRadius: "25px",
                padding: "10px 40px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                marginTop: "10px"
              }}
            >
              {userLoginMethod ? "Sign Up" : "Sign In"}
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  )
}
export default LoginComponent