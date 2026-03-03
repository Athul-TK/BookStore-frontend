import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { FaGraduationCap } from "react-icons/fa6";

import { IoSettingsSharp } from "react-icons/io5";
import { AdminUpdateContext } from '../../ContextAPI/ContextShare';
import { serverURL } from '../../services/serverUrl';
function AdminSidebar() {
     //
      const {adminEditResponse}=useContext(AdminUpdateContext)

      const[adminDetails,setadminetails]=useState("")
      const[profileImage,setprofileImage]=useState("")
      console.log(profileImage);
      


      useEffect(()=>{
          if(sessionStorage.getItem("token")){
            const data = JSON.parse(sessionStorage.getItem("existingUser"))
               setadminetails(data?.username)
               setprofileImage(data?.profileImg)
          }
      
        },[adminEditResponse])

  return (
    <> 
    <div className='bg-yellow-100 md:min-h-screen h-fit md:flex text-center flex-col h-full '>
        <div className='flex justify-center mt-10'>
            {profileImage?
            <img  style={{borderRadius:"50%",width:"150px",height:"150px"}} src={`${serverURL}/uploadImages/${profileImage}`} alt="" />
        :
        <img style={{borderRadius:"50%",width:"150px",height:"150px"}} src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
        }
            

        </div>
        <h1 className='mt-3 sm:text-md'>{adminDetails}</h1>

        <div className='md:text-left mx-auto mt-5'>
            <div className='mt-5'>
                <Link to={'/admin-dashboard'} className='flex'><MdOutlineDashboard className='mt-1 me-1' />Dashboard</Link>

            </div>
            <div className='mt-5'>
                <Link to={'/admin-books'} className='flex'><LiaSwatchbookSolid className='mt-1 me-1' />Books</Link>

            </div>
            <div className='mt-5'>
                <Link to={'/admin-careers'} className='flex'><FaGraduationCap className='mt-1 me-1' />Careers</Link>

            </div>
            <div className='mt-5'>
                <Link to={'/admin-settings'} className='flex'><IoSettingsSharp className='mt-1 me-1' />Settings</Link>

            </div>

        </div>

    </div>
    </>
  )
}

export default AdminSidebar