import React from 'react'
import { MdOutlineLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import Header from '../Component/Header';

function Contact() {
  return (
    <>
    <Header/>
      <section>
        <div className=' w-full p-5'>

          <h1 className='text-center text-3xl font-bold mt-10 '>Contact Us</h1>

          <p className='text-center  mt-3'>Have a question, feedback, or just want to say hello? We're always happy to hear from you. </p>
          <p className='text-center '>Reach out using the details below or send us a message directly</p>


          <div className='flex flex-row justify-center items-center mt-5'>
            <div className='flex flex-col justify-center items-center mt-10'>
              <div style={{ width: "350px" }} className='shadow-lg rounded-xl p-3 gap-5 mx-4 flex  justify-center items-center transform transition-transform duration-300 hover:scale-105'>
                <div style={{ backgroundColor: "rgba(0,0,255,0.3)", borderRadius: "50%", width: "70px", height: "65px" }} className='flex  justify-center items-center p-2'><MdOutlineLocationOn className='text-4xl text-blue-700' /></div>
                <p>123 Main Street. Apt 4B, Kochi. Kerala</p>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-10'>
              <div style={{ width: "350px" }} className='shadow-lg rounded-xl p-3 gap-5 mx-4 flex  justify-center items-center transform transition-transform duration-300 hover:scale-105'>
                <div style={{ backgroundColor: "rgba(0,255,0,0.3)", borderRadius: "50%", width: "65px", height: "65px" }} className='flex  justify-center items-center p-2'> <FiPhone className='text-4xl text-green-700' /></div>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-10'>
              <div style={{ width: "350px" }} className='shadow-lg rounded-xl p-3 gap-5 mx-4 flex  justify-center items-center transform transition-transform duration-300 hover:scale-105'>
                <div style={{ backgroundColor: "rgba(255,0,0,0.3)", borderRadius: "50%", width: "65px", height: "65px" }} className='flex  justify-center items-center p-2'><MdEmail className='text-4xl text-red-700' /></div>
                <p>bookstore@gmail.com</p>
              </div>
            </div>
          </div>



        </div>
      </section>

      <section style={{ height: "" }} className=''>
        <div className='md:grid grid-cols-2 justify-center items-center w-full p-20 '>
          <div style={{height:'600px'}} className='shadow-lg rounded-xl p-10 mx-4 flex flex-col justify-center items-center '>
            <h1 className='text-2xl font-bold'>Send a Message</h1>
            <form className='flex flex-col w-full mt-15'>
              <input type="text" placeholder='Your Name' className='border-b-2 p-2 mb-5 outline-none' />
              <input type="email" placeholder='Your Email' className='border-b-2 p-2 mb-5 outline-none' />

              <textarea placeholder='Your Message' className='border-b-2 p-2 mb-5 outline-none' rows={5} />
              <button type='submit' className='bg-blue-700 text-white p-3 rounded-lg w-full mt-5'>Send Message</button>
            </form>
          </div>
          <div style={{height:'600px'}} className='shadow-lg rounded-xl p-3 mx-4 flex  justify-center items-center '>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502958.1371788013!2d75.97243320060097!3d9.987054988290723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1768474243598!5m2!1sen!2sin" width="600" height="490" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

      </section>
    </>
  )
}

export default Contact