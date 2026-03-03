import React, { use, useEffect, useState } from 'react'
import Header from '../../Common/Component/Header'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allAPIs'

function Books() {
  //state for store token
  const [token, settoken] = useState("")
  //state for store all books data
  const [getallbooks, setgetallbooks] = useState([])

  //state for stoe filtre name
  const [allCategories, setallCategories] = useState([])

  //state for temp store book data for filtering
  const [tempBooks,settempBooks]=useState([])

  //state for search key
  const[searchKey,setsearchKey]=useState("")

  //function for get all books data

  const getAllBooksdata = async () => {
    if (token) {


      //crate reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllBooksAPI(searchKey,reqHeader)
        console.log(result);
        if (result.status == 200) {
          setgetallbooks(result.data)
          settempBooks(result.data)
          //
          const tempArray = result.data.map((items) => items.Category)
          const tempCate= [...new Set(tempArray)]
          setallCategories(tempCate)
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log(token);
  console.log(getallbooks);

  //useEffect for get all books data and display in books page
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }
    getAllBooksdata()
  }, [token,searchKey])

  //function for handle filter
  const filterbooks =(category)=>{
    if(category == "No Filter"){
      setgetallbooks(tempBooks)
    }else{
      setgetallbooks(tempBooks?.filter(items => items.Category == category))
    }
  }


  return (
    <>
      <Header />
      <div className='flex flex-col justify-center items-center my-5'>
        <h1 className='text-3xl font-bold my-5'>COLLECTIONS</h1>

        <div className='flex my-5 gap-3'>
          <input value={searchKey} onChange={(e)=>setsearchKey(e.target.value)} type="text" placeholder='Search by tittle ...' className='p-2 border border-gray-400 rounded-xl placeholder-gray-600 w-full' />
          <button className='btn bg-blue-500 p-3 rounded-xl text-white'>Search</button>
        </div>
      </div>



      {/* grid foe filter */}

      <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10 '>

        <div className='col-span-1 shadow-lg p-5 rounded-2xl'>
          <div >
            <h1 className='text-2xl font-bold mb-3 text-gray-700'>Filter By</h1>
          </div>
          {allCategories?.map((items, index) => (
            <div onClick={()=>filterbooks(items)} key={index} className='mt-5'>
              <div className='mt-3 '>
                <label>{items}</label>
              </div>
            </div>
          ))

          }
          <div onClick={()=>filterbooks("No Filter")} className='mt-3 '>
                <label>No Filter</label>
              </div>
        </div>
        <div className='col-span-3'>
          <div className='md:grid grid-cols-4 mt-5 md:mt-0 gap-5'>
            {getallbooks?.length > 0 ?
              getallbooks?.map((books, index) => (
                <div key={index} className='shadow-md shadow-gray-500 rounded p-3 mx-4' hidden={books?.status == "pending" || books?.status == "sold"}>
                  <img src={books?.imageURL} alt="" />

                  <div className='flex flex-col justify-center items-center '>
                    <div className='flex flex-col justify-center items-center text-center mt-5'>
                      <p className='text-blue-700 font-bold text-lg'>{books?.tittle}</p>
                      <p>{books.author}</p>
                    </div>
                    <p className='text-red-700 font-bold text-lg'>${books?.price}</p>
                  </div>
                  <div className='flex justify-center items-center mt-3'>
                    <Link to={`/view/${books?._id}/book`} className='bg-blue-500 text-white px-3 py-2 rounded-lg'>View Book</Link>

                  </div>
                </div>))
              : <p className='text-center text-gray-500 col-span-4'>No Books Available</p>}


          </div>
        </div>

      </div>



    </>
  )
}

export default Books