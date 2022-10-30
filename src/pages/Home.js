import React from 'react'
import NavBar from '../components/NavBar'
import Notification from '../components/Notification'
import UserLogin from '../components/user/UserLogin'
import Loading from "../components/Loading"
const Home = () => {
  return (
    <>
    <NavBar/>
    <UserLogin/>
    <Notification/>
    <Loading/>
    </>
  )
}

export default Home