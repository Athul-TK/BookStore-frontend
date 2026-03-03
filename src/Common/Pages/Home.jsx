import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getBooksAPI } from '../../services/allAPIs';


function Home() {
  //state for store new arraivals
  const [getbooks,setgetbooks] = useState([])
  
  
  //function for get books data
  const getbooksdata = async()=>{
    try {
      const result = await getBooksAPI()
      console.log(result);
      if(result.status==200){
        setgetbooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  } 
  //useEffect for get books data and display in home page
  useEffect(()=>{
    getbooksdata()
  },[])

  console.log(getbooks);

  return (
    <>
      <Header />
      {/* landing */}
      <div style={{ height: "600px" }} className='flex flex-col justify-center items-center bg-[url("https://t3.ftcdn.net/jpg/08/15/90/80/360_F_815908053_Mfy2DJfv1iFSdL6ET9pRD5R5VzOOEu5k.jpg")] bg-cover text-white'>
      <div style={{height:"600px",backgroundColor:"rgb(0,0,0,0.5)"}} className='w-full flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold '>Wonderfull Gifts</h1>
        <p>Give your family and friends a book</p>
        <div className='mt-9'>
          <input type="text" placeholder='     Search Book' className='bg-white p-2 rounded-3xl placeholder-gray-700 w-100 text-black' />
          <IoSearchOutline className='text-gray-700' style={{marginLeft:"365px",marginTop:"-28px"}}/>
        </div>

      </div>

      </div>

      {/* nw arraivals */}
      <section className='md:px-40 p-5 my-5 flex flex-col justify-center items-center'>
        <h1 className='text-2xl font-bold'>NEW ARRIVALS</h1>
        <p  className='mt-2'>Explore Our Latest Collection</p>

        <div className='md:grid grid-cols-4 w-full my-10 '>
          {  getbooks?.map((books,index)=>(
            <div key={index} className='shadow-md shadow-gray-600 rounded p-3 mx-4 border'>
            <img style={{width:"200px",height:"280px"}} className='rounded-md' src={books.imageURL} alt="img" />

            <div className='flex flex-col justify-center items-center '>
            <p className='text-blue-700 font-bold text-md  mt-4 '>{books.tittle}</p>
            {/* <p className='text-blue-700 font-bold text-md  mt-4 '><span className='text-black'>Name: </span>{books.author}</p> */}
            
            {/* <p ><span className='text-red-700 font-bold text-md '>$</span>{books.price}</p> */}

            <div className='flex mt-5'><Link to={'/books'}><button className='bg-blue-500 p-2 rounded-sm mt-2 mb-2 cursor-pointer'>Explore</button></Link></div>

          </div>
          </div>)) }
          

        </div>
        

      </section>


      <section style={{height:"600px"}} className='p-30'>
        <div  className='md:grid grid-cols-2  justify-center items-center  w-full p-10 gap-5 '>

          <div className='flex flex-col justify-center items-center   p-3 text-justify'>
            <h1 className='text-1xl font-bold'>FEATURED AUTHORS</h1>
            <p className='mt-2 '>Captivates with every word</p>

            <p className='mt-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, labore quo earum ducimus illo deserunt cupiditate dolorum tempora iste praesentium debitis quaerat quam et repellat? Recusandae, itaque suscipit. Ratione, fugiat.
            Aliquid consequatur quos ipsum ducimus minima, harum dicta repellat fuga! Illo facilis dicta accusantium sunt sequi neque expedita voluptates, aut cum, quibusdam ipsum, aspernatur ut vitae. Culpa quam laudantium quos?
          doloremque molees mollitia sint vel cumque temporibus quas saepe itaque corporis esse doloribus iure quia adipisci molestias eos exercitationem. Illum rem voluptatum esse tenetur.</p>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam similique omnis velit temporibus, expedita ipsam delectus quaerat quos nobis qui a ut incidunt nihil, quia atque. Aspernatur molestiae voluptates nisi!</p>

          </div>

          <div className='flex flex-col justify-center items-center bg-yellow-500'>
            <img src="https://img.indiafilings.com/learn/wp-content/uploads/2023/03/Can-a-single-person-own-a-firm-in-India.jpg" alt="booklover" />
          </div>
        </div>


      </section>


      <section style={{height:""}} className='mt-30'>
        <div className='p-20'>
          <h1 className='text-2xl font-bold text-center'>TESTIMONIALS</h1>
          <p className='text-center mt-2'>See What Others Are Saying</p>
          <div className='flex flex-col justify-center items-center '>
            <img style={{borderRadius:"50%",width:"350px",height:"350px"}} className='mt-10' src="https://st2.depositphotos.com/1003989/44419/i/450/depositphotos_444196500-stock-photo-isolated-female-person-portrait-smiling.jpg" alt="" />

            <div>
              <h1 className='text-center mt-5 font-bold text-2xl'>Treesa Joseph</h1>
              <p className='mt-2 p-10 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus molestiae eius quidem laborum iure ipsa temporibus rem, inventore aperiam, eligendi odio sed nesciunt porro atque! Quos sit accusamus rem quod.
              Ab suscipit mollitia quidem accusamus voluptas repellat ea commodi nesciunt rem. Voluptates amet quam id est exercitationem at velit, blanditiis beatae nisi perspiciatis nihil non! Sapiente pariatur ut non quasi.
              Similique a magnam veniam obcaecati distinctio ut doloremque nisi quos eos, temporibus repudiandae iste molestiae. Dolor tempore consectetur quo, inventore, explicabo dolores, maiores animi totam distinctio hic vel. Ipsum, voluptatem.</p>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Home