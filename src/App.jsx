
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Common/Pages/Auth'
import Careers from './Common/Pages/Careers'
import Contact from './Common/Pages/Contact'
import Home from './Common/Pages/Home'
import Books from './Users/Pages/Books'
import Profie from './Users/Pages/Profie'
import ViewBooks from './Users/Pages/ViewBooks'
import AdminBook from './Admin/Pages/AdminBook'
import AdminCareers from './Admin/Pages/AdminCareers'
import AdminSetting from './Admin/Pages/AdminSetting'
import AdminHome from './Admin/Pages/AdminHome'
import PnF from './Common/Pages/PnF'
import { useContext, useEffect, useState } from 'react'
import PreLoader from './Common/Pages/PreLoader'
import Footer from './Common/Component/Footer'
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './Users/Pages/PaymentSuccess'
import PaymentError from './Users/Pages/PaymentError'
import { userAuthContext } from './ContextAPI/AuthContext'


function App() {

  // for preloader

  const [loading, setloading] = useState(true)

  const { role } = useContext(userAuthContext)

  console.log(role);

  useEffect(() => {

    setTimeout(() => (
      setloading(false)
    ), 5000);

  }, [])


  return (
    <>


      <Routes>
        {/* common */}
        <Route path='/' element={loading ? <PreLoader /> : <Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/careers' element={<Careers />} />



        {/* user */}
        {
          role == "user" &&
          <>

            <Route path='/books' element={<Books />} />
            <Route path='/profile' element={<Profie />} />
            <Route path='/view/:id/book' element={<ViewBooks />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/payment-error' element={<PaymentError />} />

          </>
        }


        {/* admin */}
        {
          role == "admin" &&
          <>

            <Route path='/admin-dashboard' element={<AdminHome />} />
            <Route path='/admin-books' element={<AdminBook />} />
            <Route path='/admin-careers' element={<AdminCareers />} />
            <Route path='/admin-settings' element={<AdminSetting />} />

          </>
        }

        <Route path='/*' element={<PnF />} />



      </Routes>

      <Footer />


      <ToastContainer position="top-center" autoClose={5000} theme="light" />

    </>
  )
}

export default App
