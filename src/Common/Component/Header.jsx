import React, { useEffect, useState } from 'react'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { serverURL } from '../../services/serverUrl';

function Header() {
    //state for menu toggle 
    const [listStatus, setlistStatus] = useState(false)
    //state for Dropdpwn Menu  
    const [DropdownStatus, setDropdownStatus] = useState(false)
    //state for store token data
    const [Token, setToken] = useState("")
    //state for store username data
    const [Username, setUsername] = useState({})
    //state for store userprofile 
    const [userProfile, setuserProfile] = useState("")
    console.log(Username);
    // console.log(Username.username);
    


    //useeffect for get sessiion data

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            const tokeData = sessionStorage.getItem('token')
            setToken(tokeData)
        }
        if(sessionStorage.getItem('existingUser')){
            const name = JSON.parse(sessionStorage.getItem('existingUser'))
            setUsername(name)
            setuserProfile(name?.profileImg)
        }
    },[])
    console.log(userProfile);
    

    return (
        <>
            <div className=' grid grid-cols-3 p-3'>
                {/* logo */}
                <div className='felx items-center'>
                    <img width={"100px"} height={"100px"} src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg" alt="logo" />
                    <h1 className='flex text-2xl font-bold md:hidden'>BOOKSTORE</h1>
                </div>
                <div className='md:flex justify-center items-center hidden'>
                    <h1 className='text-2xl font-bold '>BOOKSTORE</h1>
                </div>
                <div className='md:flex justify-end items-center gap-3 me-5 hidden'>
                    <FaSquareInstagram className='text-2xl' />
                    <FaXTwitter className='text-2xl' />
                    <FaFacebookSquare className='text-2xl' />
                    {!Token?<Link to={"/login"}>
                        <button className='border border-black rounded px-3 py-2 ms-2 hover:bg-black hover:text-white'>Login</button>
                    </Link>
                    :
                    <div className='relative inline-block text-left'>
                        <button onClick={()=>setDropdownStatus(!DropdownStatus)} className='w-full justify-center items-center rounded-sm flex gap-1 bg-white px-3 py-2 shadow-xs hover:bg-gray-50'>
                            {userProfile? <img style={{ borderRadius: "50%" }} src={`${serverURL}/uploadImages/${userProfile}`} width={'40px'} height={'40px'} alt="profile" className='mx-2' />
                            :
                            <img style={{ borderRadius: "50%" }} src="https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg" width={'40px'} height={'40px'} alt="profile" className='mx-2' />}
                            <span>{Username.username}</span>
                        </button>

                        {DropdownStatus &&
                            <div className='absolute right-0-z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg'>
                                <div className='py-1'>
                                    <Link to={'/profile'} className='block px-4 py-2 text-sm text-gray-700 hover:text-black'>Profile</Link>
                                    <Link to={'/login'}><button className='block px-4 py-2 text-sm text-gray-700 hover:text-black'>Logout</button></Link>

                                </div>

                            </div>
                            }

                    </div>
}
                </div>

            </div>

            <nav className='w-full bg-black p-3 text-white md:flex justify-center items-cente'>

                <div className='flex justify-between items-center text-2xl md:hidden'>
                    <button><TiThMenu onClick={() => setlistStatus(!listStatus)} /></button>
                    <Link to={"/login"}><button className='border border-black rounded px-3 py-2 ms-2 hover:bg-black hover:text-white'>Login</button></Link>

                </div>

                <ul className={listStatus ? "flex flex-col " : 'md:flex justify-center items-center  '}>
                    <Link to={'/'}><li className='mx-4'>Home</li></Link>
                    <Link to={'/books'}><li className='mx-4'>Books</li></Link>
                    <Link to={'/careers'}><li className='mx-4'>Careers</li></Link>
                    <Link to={'/contact'}><li className='mx-4'>Contact</li></Link>
                </ul>

            </nav>
        </>
    )
}

export default Header