import React, { useEffect, useState } from 'react'
import Header from '../../Common/Component/Header'
import { FaEye } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { makePaymentAPI, viewBookAPI } from '../../services/allAPIs';
import { serverURL } from '../../services/serverUrl';
import { loadStripe } from '@stripe/stripe-js';

function ViewBooks() {

  //modal state
  const [modalStatus, setmodalStatus] = useState(false)

  //state for view book data
  const [viewBookData, setviewBookData] = useState({})

  //get id from url by useParams hook and use this id for view book api call and display the data in view book page
  const { id } = useParams()
  console.log(id);

  //view book api call function
  const getviewBookData = async () => {
    //get token from session storage
    const token = sessionStorage.getItem("token")

    //crate reqHeader for view book api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await viewBookAPI(id, reqHeader)
      console.log(result);
      // if api call is success then set data in viewBookData state and display in view book page
      if (result.status == 200) {
        setviewBookData(result.data)
      }

    } catch (error) {
      console.log(error);


    }

  }
  console.log(viewBookData);

  //useEffect for view book api call and display the data in view book page
  useEffect(() => {
    getviewBookData()
  }, [])

const handlePayment=async()=>{
  console.log("insid epayment");
  const stripe = await loadStripe('pk_test_51T6NYbPuWzE3ZGsbRQYZGmjYLdkIzW268ysiHiKLDkoi150NmyMc7eseKDmf0EksFgdRKIF9gnX2NWKMEEj6DlL000MMe41ZZ0')
  console.log(stripe);

  const token = sessionStorage.getItem("token")

  if(token){
    //reqHeader

    const reqHeader = {
      "Authorization": `Bearer ${token}`

    }

    try {
      const result= await makePaymentAPI(viewBookData,reqHeader)
      console.log(result);
      if(result.status ==200){
        window.location.href = result.data.checkoutURL
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
}

  return (
    <>
      <Header />
      <div className='md:m-10 m-5'>
        <div className='border p-5 shadow border-gray-200'>
          <div className='md:grid grid-cols-4 gap-x-10'>
            <div>
              <img src={viewBookData?.imageURL} alt="" />
            </div>
            <div className='col-span-3'>
              <div className='flex justify-between mt-5 md:mt-0'>
                <h1 className='text-blue-600 font-bold'>{viewBookData?.tittle}</h1>
                <FaEye onClick={() => setmodalStatus(!modalStatus)} className='text-2xl cursor-pointer' />
              </div>
              <p className='mt-3'>Author <span className='font-bold'>:</span> {viewBookData?.author}</p>
              <div className='md:grid grid-cols-3 gap-5 mt-10 my-10 flex flex-col'>
                <p className='text-sm '>Publisher : {viewBookData?.Publisher}</p>
                <p className='text-sm '>Language : {viewBookData?.language}</p>
                <p className='text-sm '>No: fo page : {viewBookData?.noPages}</p>
                <p className='text-sm '>Seller Mail : {viewBookData?.userMail}</p>
                <p className='text-sm '>Real Price : ${viewBookData?.price}</p>
                <p className='text-sm '>Discount Price : ${viewBookData?.discountPrice}</p>
                <p className='text-sm '>ISBN Number : {viewBookData?.isbn}</p>
                <p className='text-sm '>Category : {viewBookData?.Category}</p>
              </div>
              <div className='md:my-10 my-5'>
                <p>
                  Description : {viewBookData?.abstact}
                </p>
              </div>

            </div>
          </div>
          <div className='flex justify-end'>
            <Link to={'/books'} className='bg-blue-700 text-white p-2 rounded-start'>Back</Link>

            <button onClick={handlePayment} type='button' className='bg-green-700 text-white ms-5 p-2 rounded-start'>Buy</button>


          </div>
        </div >
      </div>

      {/* modal */}

      {modalStatus && <div className='relative z-10 overflow-y-auto'>
        <div className='fixed inset-0 bg-gray-500/75'>
          <div className='flex justify-center items-center min-h-screen scroll-auto'>
            <div className='bg-white rounded-2xl md:w-250 w-100'>
              <div className='bg-black text-white flex justify-between items-center p-3'>
                <h3>Book Name</h3>
                <IoCloseSharp onClick={() => setmodalStatus(!modalStatus)} className='text-2xl cursor-pointer' />

              </div>
              <div className='p-5 flex'>
                <FaCamera className='mt-1 me-3' /> <p>Camera Click of the book in the hand of seller .</p>

              </div>
              <div className='md:flex flex-wrap my-4 overflow-y-auto gap-5 p-5 justify-center items-center'>
                {viewBookData?.uploadImage?.length > 0 ?
                  viewBookData?.uploadImage?.map((image, index) => (<img key={index} className='' width={"250px"} height={"250px"} src={`${serverURL}/uploadImages/${image}`} alt="" />))
                  : <p className='text-center text-gray-500 col-span-4'>No Images Available</p>
                }





              </div>

            </div>

          </div>
        </div>

      </div>}

    </>
  )
}

export default ViewBooks