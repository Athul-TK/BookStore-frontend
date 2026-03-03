import React, { useContext, useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { serverURL } from '../../services/serverUrl';
import { toast } from 'react-toastify';
import { updateUserProfileAPI } from '../../services/allAPIs';
import { UserUpdateContext } from '../../ContextAPI/ContextShare';

function EditProfile() {
  //modal state for open and close edit profile modal
  const [offcanvasStatus, setoffcanvasStatus] = useState(false)

  //state for store user details and update user details
  const [userDeatails, setuserDeatils] = useState({
    username:"",
    password:"",
    confirmPassword:"",
    profileImage:"",
    bio:""
  })
  //state for store preview image
const [previewImage,setpreviewImage] = useState("")

//
const [exsitingProfile,setexsitingProfile] = useState("")

//
const {setuserEditresponse}=useContext(UserUpdateContext)

  console.log(userDeatails);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setuserDeatils({username:user?.username,password:user?.password,confirmPassword:user?.password,bio:user?.bio})
      setexsitingProfile(user?.profileImg)
    }

  },[])
  console.log(userDeatails);
  

  const handleImageUpload = (e)=>{
    console.log(e);
    setuserDeatils({...userDeatails,profileImage:e.target.files[0]})
    //for preview image before update profile and set this preview image in img tag src attribute
    setpreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  //function for update user profile and this function call when click on update button in edit profile modal
  const handleProfileUpdate = async()=>{
    const {username,password,confirmPassword,bio,profileImage} = userDeatails
    console.log(username,password,confirmPassword,bio,profileImage);

    if(!username || !password || !confirmPassword || !bio){
      toast.info("Please fill all the fields")
      
    }
    else{ if(password != confirmPassword){
      toast.warning("Password and confirm password must be same")
    }
    else{
      //get token from session storage
      const token = sessionStorage.getItem("token")
      //crate reqHeader for update user profile api call
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      //crate form data for update user profile api call
      if(previewImage){
        const reqBody = new FormData()
        for(let key in userDeatails){
          reqBody.append(key,userDeatails[key])
      }
      const result= await updateUserProfileAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status == 200){
        toast.success("Profile updated successfully")
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setuserEditresponse(result.data)
        setoffcanvasStatus(false)
      }else{
        toast.error("Something Went Worng")
      }
      
    }else{
      const result= await updateUserProfileAPI({username,password,bio,profileImage:exsitingProfile},reqHeader)
      console.log(result);
      if(result.status == 200){
        toast.success("Profile updated successfully")
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setuserEditresponse(result.data)
        setoffcanvasStatus(false)
      }else{
        toast.error("Something went Worng")
      }
    }
    }

  }

  


}
  return (
    <>
    <button onClick={()=>setoffcanvasStatus(true)} className='flex px-4 py-2 font-bold border-blue-200 text-blue-500 rounded'><FaUserEdit className='mt-1 me-2' />Edit</button>
    <div className=''>
      { offcanvasStatus &&
      <div className='fixed inset-0 bg-gray-500/75 w-full h-full '>
      <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
        <div className='bg-gray-900 px-3 flex justify-between text-white text-2xl p-3'>
          <h1 className='font-bold'>Edit User Profile</h1>
          <button onClick={()=>setoffcanvasStatus(false)}>X</button>
        </div>
        <div className='flex justify-center items-center flex-col my-5'>
            <label htmlFor="profileImageInput">
              <input onChange={(e)=>handleImageUpload(e)} type="file" style={{display:"none"}} id="profileImageInput" />
              {exsitingProfile == "" ?  
              <img style={{height:"150px",width:"150px",borderRadius:"50%"}} src={previewImage?previewImage:"https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"} alt="" />
              : 
              <img style={{height:"150px",width:"150px",borderRadius:"50%"}} src={previewImage?previewImage:`${serverURL}/uploadImages/${exsitingProfile}`} alt="" />
              }
            </label>
        </div>
        <div className='mt-10 mb-3 w-full px-5'>
            <input value={userDeatails.username} onChange={(e)=>setuserDeatils({...userDeatails,username:e.target.value})} type="text" placeholder='Username' className='border border-gray-300 placeholder-gray-500 rounded-md w-full p-2 ' />
        </div>
        <div className='mt-10 mb-3 w-full px-5'>
            <input value={userDeatails.password} onChange={(e)=>setuserDeatils({...userDeatails,password:e.target.value})} type="text" placeholder='Password' className='border border-gray-300 placeholder-gray-500 rounded-md w-full p-2 ' />
        </div>
        <div className='mt-10 mb-3 w-full px-5'>
            <input  value={userDeatails.confirmPassword} onChange={(e)=>setuserDeatils({...userDeatails,confirmPassword:e.target.value})} type="text" placeholder='Confirm Password' className='border border-gray-300 placeholder-gray-500 rounded-md w-full p-2 ' />
        </div>
        <div className='mt-10 mb-3 w-full px-5'>
            <textarea value={userDeatails.bio} onChange={(e)=>setuserDeatils({...userDeatails,bio:e.target.value})} type="text" placeholder='Bio' className='border border-gray-300 placeholder-gray-500 rounded-md w-full p-2 ' />
        </div>
        <div className='flex justify-end w-full gap-2 px-5 mt-5  '>
        <button type='button' className='bg-orange-500 text-white p-2 rounded'>Reset</button>
        <button onClick={handleProfileUpdate} type='button' className='bg-blue-500 text-white p-2 rounded'>Update</button>
      </div>
      </div>
      </div>
      }
    </div>
    
    </>
  )
}

export default EditProfile