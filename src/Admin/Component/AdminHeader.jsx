import React from 'react'
import { Link } from 'react-router-dom'

function AdminHeader() {
  return (
    <>
        <div className='flex justify-between items-center p-1 md:px-20 gap-3 border-b border-gray-200'>
            <div className='flex items-center'>
                <img width={"120px"} height={"120px"} src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg" alt="logo" />
                <h1 className='flex text-2xl font-bold '>BOOKSTORE</h1>
            </div>
            <Link to={'/login'}>
              <button className='border border-black rounded px-3 py-2 ms-2 hover:bg-black hover:text-white'>Logout</button>
               </Link>
          </div>
           
    </>
  )
}

export default AdminHeader