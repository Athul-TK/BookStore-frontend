import React, { useContext, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { data, Link, useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoogleLoginAPI, LoginAPI, registerAPI } from '../../services/allAPIs';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from '../../ContextAPI/AuthContext';


function Auth({ Register }) {

  const [showPassword, setshowPassword] = useState(false)
  const [userData, setuserData] = useState({ username: "", email: "", password: "" })
  console.log(userData);
  
  const {setAuthorisedUser}=useContext(userAuthContext)

  //usenavigate use for navigate when click Register button

  const navigate = useNavigate()



  // this function for reset content inside the register inputs
  const handleReset = () => {
    setuserData({ username: "", email: "", password: "" })
  }

  //handle redister function
  const handleRegister = async () => {
    const { username, email, password } = userData //destrcture

    if (!username || !email || !password) {
      toast.info("Enter The Details Completely")
    }
    else {
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if (result.status == 200) {
          handleReset()
          //("/login") navigate login
          navigate("/login")
          toast.success("Register Successfully")
        }
        else if (result.status == 401) {
          toast.warning(result.response.data)
          //("/login") navigate login
          navigate("/login")
        }
        else {
          toast.error('Somethind Went Worng')
        }
      } catch (error) {
        console.log(error);


      }
    }

  }

  //handle login

  const handleLogin = async () => {
    const { email, password } = userData
    console.log(email, password);

    if (!email || !password) {
      toast.info("Fill The Details Completely")

    }
    else {
      try {
        const result = await LoginAPI(userData)
        console.log(result);
        if (result.status == 200) {
          setAuthorisedUser(true)
          if (result.data.existingUser.role == "admin") {
            navigate('/admin-dashboard')
          } else {
            navigate('/')
          }

          handleReset()
          
          toast.success("Login SuccessFull")
          // login user data store in session storage
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
        }
        else if (result.status == 401) {
          toast.warning(result.response.data)
        }
        else {
          toast.error("Something Went Worng")
        }

      } catch (error) {
        console.log(error);


      }
    }

  }

  //function for google login
  const handleGoogleLodin = async(credentialResponse)=>{
    console.log(credentialResponse.credential);

    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    try {
       const result= await GoogleLoginAPI({username:details?.name, email:details?.email, password:"googlePassword",profileImg:details?.picture})
       console.log(result);
       if(result.status == 200){
        toast.success("Login success")
        setAuthorisedUser(true)
         // login user data store in session storage
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          if (result.data.user.role == "admin") {
            navigate('/admin-dashboard')
          } else {
            navigate('/')
          }

          handleReset()
       }
      
    } catch (error) {
      console.log(error);
      
    }
    
    
  }



  return (
    <>
      <div className='w-full h-screen flex justify-center items-center flex-col bg-[url("https://t3.ftcdn.net/jpg/05/88/24/10/360_F_588241010_cdQJ2QTsyDtt36jZsAFR45aAXICnPAzR.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
        <div className='p-10'>
          <h1 className='text-3xl font-bold text-center'>Book Store</h1>
          <div style={{ width: "400px" }} className='bg-black text-white p-5  flex flex-col justify-center items-center my-5 '>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-5 flex  justify-center items-center mt-3'>

              <CgProfile className='text-7xl' />
            </div>
            {Register ? <h1 className='text2-xl'>Register</h1> :
              <h1 className='text2-xl'>Login</h1>}

            <form className='my-5 w-full p-5 flex gap-3 flex-col'>

              {Register && <div className='flex gap-2 flex-col'>
                <label htmlFor="">User Name</label>

                <input value={userData.username} onChange={(e) => setuserData({ ...userData, username: e.target.value })} type="text" placeholder='Enter Your Username' className='bg-white p-2 w-full rounded text-gray-700 my5' />
              </div>}
              <div className='flex gap-2 flex-col'>
                <label htmlFor="">Email</label>

                <input value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} type="text" placeholder='Enter Your Email' className='bg-white p-2 w-full rounded text-gray-700 my5' />
              </div>

              <div className='flex gap-2 flex-col'>

                <label htmlFor="">Password</label>

                <input value={userData.password} onChange={(e) => setuserData({ ...userData, password: e.target.value })} type={showPassword ? "text" : "password"} placeholder='Enter Your Password' className='bg-white p-2 w-full rounded text-gray-700 my5' />

                <div style={{ marginTop: "" }}>
                  {showPassword ?
                    <MdOutlineRemoveRedEye style={{ marginLeft: "280px", marginTop: "-40px", color: "black" }} onClick={() => setshowPassword(!showPassword)} className='text-gray-500 cursor-pointer text-2xl' /> :
                    <FaRegEyeSlash style={{ marginLeft: "280px", marginTop: "-40px", color: "black" }} onClick={() => setshowPassword(!showPassword)} className='text-gray-500 cursor-pointer text-2xl' />}

                </div>

              </div>





              <div>
                <p className='text-xs text-orange-300 mt-3'>
                  *Never Share Your Password With Other
                </p>
              </div>
              <div>
                {Register ? <button onClick={handleRegister} type='button' className='bg-green-700 w-full rounded h-10' >Register</button> :
                  <button onClick={handleLogin} type='button' className='bg-green-700 w-full rounded h-10' >Login</button>}
              </div>
              <div  className='w-full '>
                {/* google authenticaion */}

                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLodin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>
              <div className='flex gap-1 flex-col'>
                {Register ? <p>Are you already a user ? <Link className='text-orange-700' to={"/login"}>Login</Link>  </p> : <p>Are you  a new user ? <Link className='text-orange-700' to={"/register"}>Register</Link> </p>
                }

              </div>



            </form>

          </div>

        </div>

      </div>

    </>
  )
}

export default Auth