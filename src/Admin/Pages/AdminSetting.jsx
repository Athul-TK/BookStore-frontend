import React, { useContext, useEffect } from 'react'
import AdminHeader from '../Component/AdminHeader'
import AdminSidebar from '../Component/AdminSidebar'
import { useState } from 'react'
import { serverURL } from '../../services/serverUrl'
import { updateAdminProfileAPI } from '../../services/allAPIs'
import { toast } from 'react-toastify'
import { AdminUpdateContext } from '../../ContextAPI/ContextShare'

function AdminSetting() {
  //stste for admin book data
  const [admindata, setadmindata] = useState({
    username: "", password: "", confirmPassword: "", profileImage: ""

  })

  //
  const { setadminEditResponse } = useContext(AdminUpdateContext)

  //
  const [exsitingProfile, setexsitingProfile] = useState("")
  //
  const [preView, setpreView] = useState("")

  console.log(admindata, exsitingProfile);

  const handleUploadImage = (e) => {
    console.log(e);
    setadmindata({ ...admindata, profileImage: e.target.files[0] })
    setpreView(URL.createObjectURL(e.target.files[0]))
  }

  //handle resset
  const handleReset=async()=>{
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("existingUser"))
      setadmindata({ username: data?.username, password: data?.password, confirmPassword: data?.password })
      setexsitingProfile(data?.profileImg)
      setpreView("")
    }


  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("existingUser"))
      setadmindata({ username: data?.username, password: data?.password, confirmPassword: data?.password })
      setexsitingProfile(data?.profileImg)
    }

  }, [])

  //function for update user profile and this function call when click on update button in edit profile modal
  const handleProfileUpdate = async () => {
    const { username, password, confirmPassword, profileImage } = admindata
    console.log(username, password, confirmPassword, profileImage);

    if (!username || !password || !confirmPassword) {
      toast.info("Please fill all the fields")

    }
    else {
      if (password != confirmPassword) {
        toast.warning("Password and confirm password must be same")
      }
      else {
        //get token from session storage
        const token = sessionStorage.getItem("token")
        //crate reqHeader for update user profile api call
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        //crate form data for update user profile api call

        //normal way
        // const reqBody = new FormData()
        // reqBody.append("username", username)
        // reqBody.append("password", password)
        // reqBody.append("profileImage", profileImage)

        if (preView) {

          // fordata using loop 


            const reqBody = new FormData()
            for(let key in admindata){
              reqBody.append(key,admindata[key])
          }
          const result = await updateAdminProfileAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile updated successfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setadminEditResponse(result.data)

          } else {
            toast.error("Something Went Worng")
          }

        } else {
          const result = await updateAdminProfileAPI({ username, password, profileImage: exsitingProfile }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile updated successfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setadminEditResponse(result.data)

          } else {
            toast.error("Something went Worng")
          }
        }
      }

    }




  }

  return (
    <>
      <AdminHeader />

      <div className='md:grid grid-cols-5 gap-2'>

        <div className='col-span-1 '>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-5'>
          <h1 className='text-center text-3xl font-bold'>Settings</h1>

          <div className='md:grid grid-cols-2 gap-5 mx-5 items-center mt-10'>
            <div className='mt-10'>
              <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et suscipit blanditiis autem sit laboriosam aspernatur earum maiores ducimus ea minima hic, quos itaque similique repellendus ut sunt nam a optio.
                Possimus alias unde molestiae quo. Repellat expedita omnis non dolor animi natus doloremque odio est ab enim incidunt accusantium inventore rem debitis consequuntur, aliquid saepe esse molestiae! Voluptatibus, odio excepturi.</p>


              <p className='text-justify mt-7'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et suscipit blanditiis autem sit laboriosam aspernatur earum maiores ducimus ea minima hic, quos itaque similique repellendus ut sunt nam a optio.
                Possimus alias unde molestiae quo. Repellat expedita omnis non dolor animi natus doloremque odio est ab enim incidunt accusantium inventore rem debitis consequuntur, aliquid saepe esse molestiae! Voluptatibus, odio excepturi.</p>
            </div>

            <div className=' flex flex-col justify-center items-center rounded-lg bg-blue-100 p-10 mt-10 md:mt-0'>
              <div className=''>
                <label htmlFor="proimg" className='flex flex-col items-center'>
                  <input onChange={(e) => handleUploadImage(e)} id='proimg' type="file" className='hidden' />
                  {exsitingProfile == " " ?
                    <img style={{ borderRadius: "50%", width: "200px", height: "200px", cursor: "pointer" }} src={preView ? preView : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"} alt="" />

                    :
                    <img style={{ borderRadius: "50%", width: "200px", height: "200px", cursor: "pointer" }} src={preView ? preView : `${serverURL}/uploadImages/${exsitingProfile}`} alt="" />
                  }
                </label>
              </div>
              <div className='mt-5 flex flex-col w-full gap-2'>

                <label htmlFor="name">Username</label>
                <input onChange={(e) => setadmindata({ ...admindata, username: e.target.value })} value={admindata?.username} id='name' type="text" placeholder='Enter Your Name' className='rounded-xl p-3 border-blue-600 placeholder-gray-600' />
              </div>
              <div className='mt-5 flex flex-col w-full gap-2'>

                <label htmlFor="pass">Password</label>
                <input onChange={(e) => setadmindata({ ...admindata, password: e.target.value })} value={admindata?.password} id='pass' type="text" placeholder='Enter Your Password' className='rounded-xl p-3 border-blue-600 placeholder-gray-600' />
              </div>
              <div className='mt-5 flex flex-col w-full gap-2'>

                <label htmlFor="con">Confirm Password</label>
                <input onChange={(e) => setadmindata({ ...admindata, confirmPassword: e.target.value })} value={admindata?.confirmPassword} id='con' type="text" placeholder='Enter Your Confirm Password' className='rounded-xl p-3 border-blue-600 placeholder-gray-600' />
              </div>
              <div className='mt-10 flex justify-evenly  w-full gap-2'>

                <button onClick={handleReset} type='button' className='w-full rounded-lg bg-orange-600 p-3 text-white'>Reset</button>
                <button onClick={handleProfileUpdate} type='button' className='w-full rounded-lg bg-green-600 p-3 text-white'>Update</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default AdminSetting