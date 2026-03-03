import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Header from '../Component/Header';

function Careers() {
  return (
    <>
    <Header/>
      <section>
        <div className='w-full p-10 '>
          <h1 className='text-center text-3xl font-bold  '> Caeers</h1>
          <div className=' flex justify-center items-center '>
            <p className='text-center mt-5 break-all text-gray-600 break-all w-250'> Join our growing team of passionate developers, designers, and innovators. Explore current openings and take the next step in your career journey with us.</p>

          </div>


          <h2 className='text-center text-3xl font-medium mt-20'>Current Openings</h2>
          <div className='flex justify-center items-center mt-5 gap-5'>
            <input className='rounded-xl p-3 placeholder-gray-600' type="text" placeholder='  Search By Job Tittle ' />
            <button className='bg-blue-500 p-3 text-white font-bold rounded-xl'>Search</button>

          </div>


          <div className='p-20'>
            <div className='col-span-4 shadow-2xl p-10 rounded-xl '>
              <div className='flex items-center justify-between '>
                <div className='mt-10 border-b w-full'>
                  <h1 className='text-3xl'>Frontend Dev</h1>
                </div>
                <button className='flex bg-blue-500 p-3 text-white rounded-xl'>apply<BsBoxArrowInUpRight className='m-1 text-2xl' /></button>
              </div>
              <div className='flex flex-col gap-5 mt-2'>
                <div className='flex gap-2 mt-3'>
                  <IoLocationSharp className='mt-1 text-2xl' />
                  <h2 className='text-gray-600 text-2xl'>Kochi</h2>
  
  
                </div>
                <p><span className='text-gray-900 font-bold'>job Tpye :</span> Full Time</p>
                <p><span className='text-gray-900 font-bold'>Sallary :</span> 120000</p>
                <p><span className='text-gray-900 font-bold'>Qulification :</span> Diploma</p>
                <p><span className='text-gray-900 font-bold'>Exprience :</span> 1-2 Years</p>
                <p><span className='text-gray-600 font-bold'>Description :</span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere optio ipsa beatae vitae dolorem, omnis distinctio obcaecati dolore autem commodi, perferendis asperiores! Reprehenderit enim nesciunt recusandae rem laudantium quaerat nulla.</p>
              </div>
            </div>
          </div>


        </div>
      </section>

    </>
  )
}

export default Careers