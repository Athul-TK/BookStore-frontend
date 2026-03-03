import React, { useEffect, useState } from 'react'
import Header from '../../Common/Component/Header'
import { MdVerified } from "react-icons/md";
import EditProfile from '../Component/EditProfile';
import { addBookAPI, deleteUserBookAPI, getBoughtBooksAPI, getUserBooksAPI } from '../../services/allAPIs';
import { toast } from 'react-toastify';
import { serverURL } from '../../services/serverUrl';
import { useContext } from 'react';
import { UserUpdateContext } from '../../ContextAPI/ContextShare';

function Profie() {
  //notice
  // 1.Sell Book ----- sBStatus,setsBstatus
  // 2.Book Status ----- BookStatus,setBookstatus
  // 3.Purchase History ----- pHStatus,setpHstatus

  //state for status
  //1.sellBook
  const [sBStatus, setsBstatus] = useState(true)
  //2.Book Status
  const [BookStatus, setBookstatus] = useState(false)
  //3.Purchase History
  const [pHStatus, setpHstatus] = useState(false)


  //state for store book details
  const [bookDetails, setbookDetails] = useState({
    tittle: "",
    author: "",
    noPages: "",
    imageURL: '',
    price: "",
    discountPrice: "",
    abstact: "",
    Publisher: "",
    language: "",
    isbn: "",
    Category: "",
    uploadImage: []
  })

  console.log(bookDetails);

  //state for store covrted url 
  const [preview, setpreview] = useState('')

  //state for store book image array
  const [previewlist, setpreviewlist] = useState([])

  //state for store token
  const [token, settoken] = useState("")

  //state for store user added books from api
  const [userBooks, setuserBooks] = useState([])

  //state for bought books
  const [boughtBooks, setboughtBooks] = useState([])

  //useEffect for get token and exsiting user details from session storage 
  const[userdetails,setuserDeatils] = useState({
  username:"",
  password:"",
  confirmPassword:"",
  profileImage:"",
  bio:""
  })

  //state for store preview image from session storage existing profile and this state use for display preview image when user select new image for update profile
  const[profileImage,setprofileImage] = useState("")

  //
  const {userEditResponse}=useContext(UserUpdateContext)

   useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
         setuserDeatils({username:user?.username,password:user?.password,confirmPassword:user?.password,bio:user?.bio,profileImage:user?.profileImg})
         setprofileImage(user?.profileImg)
    }

  },[userEditResponse])

  
  console.log(userdetails);
  console.log(profileImage);
  //handle uploade book image
  const handleUploadImage = (e) => {
    console.log(e.target.files);
    //create temp variable to avoid data loss
    const fileArray = bookDetails.uploadImage
    //
    fileArray.push(e.target.files[0])
    setbookDetails({ ...bookDetails, uploadImage: fileArray })

    //create temp variale for convert file to preveiw url
    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setpreview(url)

    //create temp variale for display image 3 image array 
    const bookimageArray = previewlist
    bookimageArray.push(url)
    setpreviewlist(bookimageArray)


  }



  console.log(previewlist);

  // handle function for reset book details
  const handleReset = () => {
    setbookDetails({
      tittle: "",
      author: "",
      noPages: "",
      imageURL: '',
      price: "",
      discountPrice: "",
      abstact: "",
      Publisher: "",
      language: "",
      isbn: "",
      Category: "",
      uploadImage: []
    })
    setpreview("")
    setpreviewlist([])
  }

  //handle function for add book details
  const handleAddBook = async () => {
    //
    const { tittle, author, noPages, imageURL, price, discountPrice, abstact, Publisher, language, isbn, Category, uploadImage } = bookDetails

    if (!tittle || !author || !noPages || !imageURL || !price || !discountPrice || !abstact || !Publisher || !language || !isbn || !Category || uploadImage.length == 0) {
      alert('Fill The Details completely')
    }
    else {
      //crate reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      //creare reqbody
      //1 create instance of formdata
      const reqBody = new FormData()
      //2 append all the details to formdata instance
      // reqBody.append("tittle",tittle)//normal way to append data to formdata
      // reqBody.append("author",author)
      for (let key in bookDetails) {
        if (key != "uploadImage") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImage.forEach((img) => {
            reqBody.append("uploadImage", img)
          })
        }

      }
      try {
        //call add book api
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success("Book Added Successfully")
          handleReset()
        } else if (result.response.status == 401) {
          toast.warning(result.response.data)
        }
        else {
          toast.error("Something went wrong")
        }

      } catch (error) {
        console.log(error);

      }
    }
  }
  console.log(token);

  //handle function for get only user added books
  const getUserBooks = async () => {
    //crate reqHeader for

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setuserBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }

  }

  console.log(userBooks);

  //delete/remove user added book function
  const deleteUserBook = async (id) => {
    //crate reqHeader for delete book api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {      const result = await deleteUserBookAPI(id, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success("Book Deleted Successfully")
        //after delete book get user added book function call for update book status
        getUserBooks()
      }
      else {
        toast.error("something went wrong")
      }
    } catch (error) {
      console.log(error);
    }
  }

  //bought books function
  const getBoughtBooks = async () => {
    //crate reqHeader for delete book api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getBoughtBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setboughtBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(boughtBooks);
  

  useEffect(() => {
    //get token from local storage
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }
    getUserBooks()
    getBoughtBooks()
  }, [BookStatus,pHStatus])

 
  
  


  return (
    <>
      <Header />

      <div className='bg-black w-full h-40 sm:h-52'></div>

      <div className='flex justify-center sm:justify-start px-4 sm:px-16 -mt-20'>

        <div className='bg-white p-2 rounded-full w-40 h-40 sm:w-56 sm:h-56 shadow-lg'>

          { profileImage ?<img className='w-full h-full rounded-full object-cover' src={`${serverURL}/uploadImages/${profileImage}`}alt="pro" /> : <img className='w-full h-full rounded-full object-cover' src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="pro" />}

        </div>

      </div>

      {/* name and edits */}
      <div className='flex flex-col sm:flex-row justify-between px-4 sm:px-16 mt-6'>

        <div className='flex items-cemter justify-center sm:justify-start gap-3'>

          {userdetails ?<h1>{userdetails.username}</h1>: <h1>Username</h1>}

          <MdVerified className='mt-1 text-xl text-blue-500' />
        </div>

        <div className='flex justify-center sm:justify-end mt-3 sm:mt-0'>

          <EditProfile />

        </div>

      </div>

      {/* description */}
      {userdetails ?<p className='px-4 sm:px-16 my-5 text-justify'>{userdetails.bio}</p>:<p className='px-4 sm:px-16 my-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores reprehenderit odio quo laborum necessitatibus, voluptates aliquam sed saepe sequi assumenda nesciunt dignissimos, excepturi pariatur quaerat cum veritatis optio maxime aut?
        Ea quas ratione reiciendis dicta nam temporibus impedit officia accusantium corporis? Tempore repellendus pariatur veniam necessitatibus, nihil ratione itaque quod, reprehenderit laboriosam vitae ex quibusdam quis, assumenda incidunt. Modi, voluptatem!</p>}


      {/* tab session */}

      <div className='flex justify-center items-center my-8 font-medium text-lg gap-2'>
        <p onClick={() => { setsBstatus(true), setBookstatus(false), setpHstatus(false) }} className={sBStatus ? 'text-blue-500 border-gray-300 border cursor-pointer rounded p-2' : 'border-gray-300 border-b cursor-pointer rounded p-2'}>Sell Book</p>
        <p onClick={() => { setBookstatus(true), setsBstatus(false), setpHstatus(false) }} className={BookStatus ? 'text-blue-500 border-gray-300 border cursor-pointer rounded p-2' : 'border-gray-300 border-b cursor-pointer rounded p-2'}>Book Status</p>
        <p onClick={() => { setpHstatus(true), setBookstatus(false), setsBstatus(false) }} className={pHStatus ? 'text-blue-500 border-gray-300 border cursor-pointer rounded p-2' : 'border-gray-300 border-b cursor-pointer rounded p-2'}>Purchase History</p>
      </div>


      {/* sell book */}
      {sBStatus &&
        <div>
          <div className='p-10 my-20 mx-5 bg-gray-200'>
            <h1 className='text-3xl text-center font-medium'>Book Details</h1>

            <div className='md:grid grid-cols-2 mt-10 w-full'>
              <div className='px-3'>
                <div className='mb-3'>
                  <input value={bookDetails.tittle} onChange={(e) => setbookDetails({ ...bookDetails, tittle: e.target.value })} type="text" placeholder='Title' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.author} onChange={(e) => setbookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.noPages} onChange={(e) => setbookDetails({ ...bookDetails, noPages: e.target.value })} type="text" placeholder='No of Pages' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.imageURL} onChange={(e) => setbookDetails({ ...bookDetails, imageURL: e.target.value })} type="text" placeholder='Image URL' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.price} onChange={(e) => setbookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.discountPrice} onChange={(e) => setbookDetails({ ...bookDetails, discountPrice: e.target.value })} type="text" placeholder='Discount Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <textarea value={bookDetails.abstact} onChange={(e) => setbookDetails({ ...bookDetails, abstact: e.target.value })} type='text' placeholder='Abstact' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
              </div>
              <div className='px-3'>
                <div className='mb-3'>
                  <input value={bookDetails.Publisher} onChange={(e) => setbookDetails({ ...bookDetails, Publisher: e.target.value })} type="text" placeholder='Publisher' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.language} onChange={(e) => setbookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.isbn} onChange={(e) => setbookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.Category} onChange={(e) => setbookDetails({ ...bookDetails, Category: e.target.value })} type="text" placeholder='Category' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3 flex justify-center items-center mt-10'>
                  {!preview ? <label htmlFor="bookimg">
                    <input onChange={(e) => handleUploadImage(e)} type="file" id="bookimg" className='hidden' />
                    <img style={{ width: "150px", height: "200px" }} className=' rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQajLLTNNFcTXntCodJpEI2SnKhL0g-S1e7BA&s" alt="" />
                  </label>
                    :
                    <img style={{ width: "150px", height: "200px" }} src={preview} alt="" />
                  }
                </div>
                {preview && <div className='flex justify-center items-center gap-2'>
                  {previewlist?.map((imgurl, index) => (
                    <img key={index} width={'60px'} height={'60px'} src={imgurl} alt="" />
                  ))

                  }

                  {previewlist.length < 3 && //show upload option only when preview list length is less than 3
                    <label htmlFor="bookimg">
                      <input onChange={(e) => handleUploadImage(e)} type="file" id="bookimg" className='hidden' />
                      <img width={'60px'} height={'60px'} className=' rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQajLLTNNFcTXntCodJpEI2SnKhL0g-S1e7BA&s" alt="" />
                    </label>}
                </div>
                }
              </div>
            </div>
            <div className='p-3 w-full flex md:justify-end justify-center mt-8'>
              <button onClick={handleReset} type='button' className='py-2 px-3 rounded bg-orange-600 text-white hover:border hover:bg-black hover:text-white'>Reset</button>
              <button onClick={handleAddBook} type='button' className='py-2 px-3 rounded bg-green-600 text-white hover:border hover:bg-black hover:text-white ms-4'>Submit</button>
            </div>
          </div>
        </div>
      }

      {/*  book */}
      {BookStatus &&
        <div>
          <div className='p-4 sm:p-10 my-10 shadow-md  rounded-'>
            {
              userBooks.length > 0 ?//if user added book display this section
                userBooks?.map((books, index) => (<div className='bg-gray-200 p-4 sm:p-8 rounded mt-4'>
                  <div key={index} className='grid md:grid-cols-[3fr_1fr] gap-6'>
                    <div className='px-2'>
                      <h1 className='text-xl sm:text-2xl'>{books.tittle}</h1>
                      <h2 className='text-blue-500 text-lg  font-bold mt-3'>{books.author}</h2>
                      <h3 className='text-xl sm:text-2xl mt-2'>${books.price}</h3>
                      <p className='text-justify mt-2'>
                        {books.abstact}
                      </p>
                      <p className='text-red-700'>{books?.boughtby}</p>
                      <div className='flex gap-4 mt-5 flex-wrap'>
                        {books?.status == "pending" ? <img className='w-18 h-14' src="https://img.freepik.com/premium-vector/pending-red-banner-design-vector-illustration_1004592-4070.jpg" alt="" />
                          : books.status == "aproved" ? <img className='w-14 h-14' src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="" />
                            : <img className='w-14 h-14' src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="" />
                        }
                      </div>
                    </div>
                    <div className='px-2 flex flex-col justify-center items-center'>
                      <img className='w-52 h-76 onject-cover rounded' src={books.imageURL} alt="" />
                      <div className='flex justify-end mt-4'>
                        <button onClick={()=>deleteUserBook(books?._id)} type='button' className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                ))

                ://if no book added by user display below section

                <div className='flex flex-col justify-center items-center mt-10'>
                  <img className='w-40 h-40' src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="" />
                  <p className='text-red-600 text-xl sm:text-2xl'>No Book Added Yet</p>
                </div>
            }
          </div>
        </div>
      }

      {/* purchase history  */}
      {pHStatus &&
        <div>
          
          <div className='p-4 sm:p-10 my-10 shadow rounded'>
            { boughtBooks?.length > 0?
            boughtBooks?.map((Bbooks,index)=>(<div className='bg-gray-200 p-4 sm:p-8 rounded mt-4'>
              <div className='grid md:grid-cols-[3fr_1fr] gap-6'>
                <div className='px-2'>
                  <h1 className='text-xl sm:text-2xl'>{Bbooks.tittle}</h1>
                  <h2 className='mt-3 text-blue-500 font-bold'>{Bbooks.author}</h2>
                  <h3 className='text-xl sm:tet-2xl mt-4'>${Bbooks.price}</h3>
                  <p className='text-justify mt-2'>
                   {Bbooks.abstact}
                   </p>
                </div>
                <div className='px-2 flex flex-col justify-center items-center'>
                  <img className='w-52 h-76 onject-cover rounded' src={Bbooks.imageURL} alt="" />
                </div>
              </div>
            </div>
            ))
            
            :
            <div className='flex flex-col justify-center items-center mt-10'>
              <img className='w-40 h-40' src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="" />
              <p className='text-red-600 text-xl sm:text-2xl'>No Book Added Yet</p>
            </div>
            }
            
          </div>
        </div>
      }
    </>
  )
}

export default Profie