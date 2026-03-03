import React, { Children, useEffect, useState } from 'react'
import { createContext } from 'react'


export const userAuthContext = createContext((""))

function AuthContext({children}) {

    const [role,setrole]=useState("")
    const [authorisedUser,setAuthorisedUser]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("existingUser") && sessionStorage.getItem("token")){

            const user =JSON.parse(sessionStorage.getItem("existingUser"))
            setrole(user.role)
            setAuthorisedUser(!authorisedUser)

        }
    },[])
    
  return (
    <>
        <userAuthContext.Provider value={{role,authorisedUser,setAuthorisedUser}}>
            {children}
        </userAuthContext.Provider>
    </>
  )
}

export default AuthContext