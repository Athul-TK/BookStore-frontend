import React, { useEffect, useState } from 'react'
import AdminHeader from '../Component/AdminHeader'
import AdminSidebar from '../Component/AdminSidebar'
import { RiBookShelfLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsJournalRichtext } from "react-icons/bs";
import { getAllAdminBooksAPI, getAllUsersAPI } from '../../services/allAPIs';



function AdminHome() {

  //state for store token
  const [token, settoken] = useState("")

  //state for all books
  const [allBooks, setallBooks] = useState(0)

  //state for getall users
  const [allUsers, setallUsers] = useState(0)



  //  //gel alll books function
  //   const getAllBooks = async () => {
  //     //crate reqHeader for allbooks api call
  //     const reqHeader = {
  //       "Authorization": `Bearer ${token}`
  //     }
  //     try {
  //       const result = await getAllAdminBooksAPI(reqHeader)
  //       console.log(result);
  //       if (result.status == 200) {
  //         setallBooks(result.data)
  //       }

  //     } catch (error) {
  //       console.log(error);

  //     }
  //   }
  //   console.log(allBooks);


  //   //function for get all users

  // const getallusers=async()=>{
  //   //crate reqHeader for allbooks api call
  //     const reqHeader = {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   try {
  //     const result=await getAllUsersAPI(reqHeader)
  //     console.log(result);
  //     if(result.status == 200){
  //       setallUsers(result.data)
  //     }


  //   } catch (error) {
  //     console.log(error);

  //   }
  // }
  // console.log(allUsers);

  const getData = async () => {
    // crate reqHeader for allbooks api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {

      const result1 = await getAllAdminBooksAPI(reqHeader)
      console.log(result1);
      setallBooks(result1?.data?.length)
      const result2 = await getAllUsersAPI(reqHeader)
      console.log(result2);
      setallUsers(result2?.data?.length)

    } catch (error) {
      console.log(error);

    }
  }



  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }

    if (token) {
      // getAllBooks()
      // getallusers()
      getData()
    }


  }, [token])
  return (
    <>
      <AdminHeader />

      <div className='md:grid grid-cols-5 gap-3 '>

        <div className='col-span-1 '>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <div className='md:grid grid-cols-3 gap-3'>
            <div className='bg-blue-500 p-3 flex justify-center items-center text-2xl rounded text-white'>
              <RiBookShelfLine />
              <div className='flex  ms-3'>
                <h2 className='text-lg font-bold'>Total No: Books :</h2>
                <span className='ms-3 font-bold'>{allBooks}</span>
              </div>

            </div>
            <div className='bg-green-500 p-3 flex justify-center items-center text-2xl rounded text-white'>
              <HiOutlineUsers />
              <div className='flex  ms-3'>
                <h2 className='text-lg font-bold'>Total No: Users :</h2>
                <span className='ms-3 font-bold'>{allUsers}</span>
              </div>

            </div>
            <div className='bg-yellow-500 p-3 flex justify-center items-center text-2xl rounded text-white'>
              <BsJournalRichtext />
              <div className='flex  ms-3'>
                <h2 className='text-lg font-bold'>Job Application :</h2>
                <span className='ms-3 font-bold'>12</span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </>
  )
}

export default AdminHome