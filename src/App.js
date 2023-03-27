import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Calendar from './Calendar'
import CustomTheme from './CustomTheme'
import UserDashboard from './pages/dashboard/UserDashboard'
import Home from './pages/Home'


const App = () => {
  return (
    <>
    {/* <Calendar> */}
    <CustomTheme>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<UserDashboard/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
      
      </BrowserRouter>
    </CustomTheme>
    {/* </Calendar> */}
    </>
  )
}

export default App