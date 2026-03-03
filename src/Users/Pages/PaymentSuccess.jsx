import React from 'react'
import Footer from '../../Common/Component/Footer'
import Header from '../../Common/Component/Header'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
      <Header />

      <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
        <div>
          <h1 className='text-6xl text-blue-700'>Congratulation!!!!!!!!</h1>
          <p className='mt-5 mb-10'>Thankyou for shopping with bookstore.hope you have a good  time with us</p>
          <Link className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600' to={"/books"}>Explore more books</Link>
        </div>
        <img src="https://assets-v2.lottiefiles.com/a/539bfca2-1161-11ee-b51b-1320215f9715/qVyJRkFdMG.png" className='w-3/4 ms-30' alt="" />

      </div>




      <Footer />
    </>
  )
}

export default PaymentSuccess