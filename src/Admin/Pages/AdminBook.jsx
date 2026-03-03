import React, { useEffect, useState } from 'react'
import AdminHeader from '../Component/AdminHeader'
import AdminSidebar from '../Component/AdminSidebar'
import { approvedBookAPI, getAllAdminBooksAPI, getAllUsersAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverUrl'

function AdminBook() {
  const [bookstatus, setbookstatus] = useState(true)
  const [userstatus, setuserstatus] = useState(false)
  //state for store token
  const [token, settoken] = useState("")

  //state for store all book
  const [allBooks, setallBooks] = useState([])

  //state for get all users
  const [allUsers,setallUsers]=useState([])


  //gel alll books function
  const getAllBooks = async () => {
    //crate reqHeader for allbooks api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAllAdminBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setallBooks(result.data)
      }

    } catch (error) {
      console.log(error);

    }
  }

  console.log(allBooks);
//function for get all users

const getallusers=async()=>{
  //crate reqHeader for allbooks api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
  try {
    const result=await getAllUsersAPI(reqHeader)
    console.log(result);
    if(result.status == 200){
      setallUsers(result.data)
    }
    
    
  } catch (error) {
    console.log(error);
    
  }
}
console.log(allUsers);

  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }

    if (token) {
      getAllBooks()
      getallusers()
    }


  }, [token,userstatus])


// function for approved book
   const approvedBook=async(id)=>{
    //crate reqHeader for approved book
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result= await approvedBookAPI(id,reqHeader)
      console.log(result);
      if(result.status == 200){
        getAllBooks()
      }
      
      
    } catch (error) {
      console.log(error);
      
      
    }
   }


  


  return (
    <>
      <AdminHeader />

      <div className='md:grid grid-cols-5 gap-2 bg-gray-100 '>

        <div className='col-span-1 '>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-30'>
          <h1 className='text-3xl text-center font-bold'>All Collectons</h1>
          <div className='flex justify-center items-center my-8 font-bold text-lg'>
            <p onClick={() => { setuserstatus(false), setbookstatus(true) }} className={bookstatus ? 'text-blue-700 p-4 border-gray-500 border-t border-l border-r cursor-pointer' : 'p-4 border-b border-gray-500 cursor-pointer'}>Books</p>
            <p onClick={() => { setuserstatus(true), setbookstatus(false) }} className={userstatus ? 'text-blue-700 p-4 border-gray-500 border-t border-l border-r cursor-pointer' : 'p-4 border-b border-gray-500 cursor-pointer'}>Users</p>

          </div>

          {/* books */}

          {bookstatus &&
            <div className='md:grid grid-cols-4 w-full my-5 mt-10 '>
              {allBooks?.length > 0 ?
                allBooks?.map((books, index) => (
                  <div className='shadow rounded p-3 mx-4 mt-4 border'>
                    <img src={books?.imageURL} alt="" />

                    <div className='flex flex-col justify-center items-center '>
                      <p className='text-blue-700 font-bold text-md'>{books.tittle}</p>
                      <p>{books.author}</p>
                      <p className='text-red-700 font-bold text-md'>${books.discountPrice}</p>

                    </div>
                    {books.status == "pending" ?
                      <button onClick={()=>approvedBook(books?._id)} type='button' className='w-full mt-4  py-2 rounded-lg bg-green-600 hover:bg-greeen-700 text-white'>Approved</button>
                      :
                      books.status == "aproved" ?
                        <img style={{ width: "50px", borderRadius: "50%", marginTop: "2px" }} src="https://e7.pngegg.com/pngimages/302/913/png-clipart-approved-approved-thumbnail.png" alt="apro" />
                        :
                        <p className='mt-3 text-center text-white bg-red-500 rounded'>SOLD</p>
                  }



                  </div>))

                :
                <h1>no books available</h1>
              }

            </div>}



          {/* users */}

          {userstatus &&
            <div className='md:grid grid-cols-3 w-full w-fit my-5 mt-10 flex gap-10 '>
              {allUsers?.length>0?
              allUsers.map((user,index)=>(
                <div key={index} style={{ width: "280px" }} className=' shadow-2xl p-2 mx-4 bg-white rounded-lg me-10  mb-10'>
                <h1 className='break-words'>{user?._id}</h1>
                <div className='flex flex-col gap-2 p-2 '>
                  <img width={'90px'} height={'90px'} style={{ borderRadius: '50%' }} src={user?.profileImg == ""? "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80":`${serverURL}/uploadImages/${user?.profileImg}`
                  } alt="" />

                  <h1 className='text-blue-700 text-xl'>{user?.username}</h1>
                  <p class="text-sm text-gray-600 break-all">
                    {user?.email}
                  </p>

                </div>

              
              </div>
              ))
              
              :
              <p>no users</p>
              }
              











            </div>

          }


        </div>

      </div>
    </>
  )
}

export default AdminBook