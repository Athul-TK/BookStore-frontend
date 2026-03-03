import React, { useState } from 'react'
import AdminHeader from '../Component/AdminHeader'
import AdminSidebar from '../Component/AdminSidebar'
import { MdDelete } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdArrowBack } from "react-icons/md";
function AdminCareers() {
  //modal state
  const [modalStatus, setmodalStatus] = useState(false)
  const [jobstatus, setjobstatus] = useState(true)
  const [appstatus, setappstatus] = useState(false)
  return (
    <>
      <AdminHeader />

      <div className='md:grid grid-cols-5 gap-2'>

        <div className='col-span-1 '>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-3xl text-center font-bold'>Career Management</h1>
          <div className='flex justify-center items-center my-8 font-bold text-lg'>
            <p onClick={() => { setappstatus(false), setjobstatus(true) }} className={jobstatus ? 'text-blue-700 p-4 border-gray-500 border-t border-l border-r cursor-pointer' : 'p-4 border-b border-gray-500 cursor-pointer'}>Job Post</p>
            <p onClick={() => { setappstatus(true), setjobstatus(false) }} className={appstatus ? 'text-blue-700 p-4 border-gray-500 border-t border-l border-r cursor-pointer' : 'p-4 border-b border-gray-500 cursor-pointer'}>View application</p>

          </div>

          {/* job */}

          {jobstatus &&
            <div className='md:grid grid-cols-4 w-full my-5 mt-10'>

              <div className='col-span-4 flex items-center justify-between p-5'>
                <div className='flex items-center gap-3'>
                  <input type="text" placeholder='Search By Tittle' />
                  <button className="px-4 py-2 bg-green-500 text-white rounded">Search</button>

                </div>

                <button onClick={() => setmodalStatus(!modalStatus)} className="px-4 py-2 bg-blue-500 text-white rounded">Add Job +</button>

              </div>

              <div className='col-span-4 shadow-xl p-5 rounded-md'>
                <div className='flex items-center justify-between '>
                  <div className='mt-10'>
                    <h1 className='text-3xl'>Frontend Dev</h1>
                  </div>
                  <button className='px-4 py-2 bg-red-500 text-white rounded flex gap-2'>Delete<MdDelete className='mt-1' /> </button>
                </div>
                <div className='flex flex-col gap-5 mt-2'>
                  <div className='flex gap-2 mt-3'>
                    <IoLocationSharp className='mt-1 text-2xl' />
                    <h2 className='text-gray-600 text-2xl'>Kochi</h2>


                  </div>
                  <p><span className='text-black-900 font-bold'>job Tpye :</span> Full Time</p>
                  <p><span className='text-black-900 font-bold'>Sallary :</span> 120000</p>
                  <p><span className='text-black-900 font-bold'>Qulification :</span> Diploma</p>
                  <p><span className='text-black-900 font-bold'>Exprience :</span> 1-2 Years</p>
                  <p><span className='text-black-900 font-bold'>Description :</span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere optio ipsa beatae vitae dolorem, omnis distinctio obcaecati dolore autem commodi, perferendis asperiores! Reprehenderit enim nesciunt recusandae rem laudantium quaerat nulla.</p>
                </div>
              </div>



            </div>
          }


          {/* application */}

          {modalStatus && <div className='relative z-10 overflow-y-auto'>
            <div className='fixed inset-0 bg-gray-500/75'>
              <div className='flex justify-center items-center min-h-screen scroll-auto'>
                <div className='bg-white rounded-2xl md:w-250 w-100'>
                  <div className='bg-black text-white flex justify-between items-center p-3'>
                    <h3>Book Name</h3>
                    <IoCloseSharp onClick={() => setmodalStatus(!modalStatus)} className='text-2xl cursor-pointer' />

                  </div>
                  <div className='p-5 flex'>
                    <LuClipboardList className='mt-1 me-3' /> <p>Fill Your Details .</p>

                  </div>
                  <div className='md:flex flex-wrap my-4 overflow-y-auto gap-5 p-4 justify-center items-center'>
                       <div className='flex flex-col gap-2 '>
                          
                            <label htmlFor="">Job Name</label>
                            <input type="text" />
                            <label htmlFor="">Job Location</label>
                            <input type="text" />
                            <label htmlFor="">Job Type</label>
                            <input type="text" />
                         </div>
                         <div className='flex flex-col gap-2 '>
                            <label htmlFor="">Salary</label>
                            <input type="text" />
                            <label htmlFor="">Qualification</label>
                            <input type="text" />
                            <label htmlFor="">Exprience</label>
                            <input type="text" />
                            
                        </div>
                        <div className='flex flex-col gap-2 '>
                          <label htmlFor="">Description</label>
                            <textarea name="" id="" cols="15" rows="8"></textarea>
                        </div>
                       <div className='flex justify- gap-4'>
                    <button onClick={() => setmodalStatus(!modalStatus)} className='bg-black text-white p-3 rounded-xl flex gap-2 '><MdArrowBack className='mt-1 text-1xl' />Back</button>
                    <butt0n className='bg-blue-600 text-white p-3 rounded-xl'>Updadte</butt0n>
                  </div>

                  </div>
                  

                </div>

              </div>
            </div>

          </div>}



          {/* users */}

          {appstatus &&
            <div className='md:grid grid-cols-4 w-full my-5 mt-10 p-10'>
              <div className='col-span-4 flex items-center justify-center p-10'>
                <table className='border-collapse border border-gray-400  shadow-xl'>
                  <thead className='bg-blue-800 text-white h-10 '>
                    <tr className='p-5'>
                      <th className='border border-gray-300 p-3 items-center justify-center'>SL:NO</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>JobTittle</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>Name</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>Qualification</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>Email</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>Phone</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>Cover Letter</th>
                      <th className='border border-gray-300 p-3 items-center justify-center'>Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">1</td>
                      <td className="border border-gray-300 p-3">dev</td>
                      <td className="border border-gray-300 p-3">Athultk</td>
                      <td className="border border-gray-300 p-3">12</td>
                      <td className="border border-gray-300 p-3">athulathul232003@gmail.com</td>
                      <td className="border border-gray-300 p-3">1233</td>
                      <td className="border border-gray-300 p-3 break-all">qwertyuiajhathhsfhshshshhshh </td>
                      <td className="border border-gray-300 p-3">resume</td>
                    </tr>
                  </tbody>
                </table>
              </div>





            </div>
          }


        </div>

      </div>
    </>
  )
}

export default AdminCareers