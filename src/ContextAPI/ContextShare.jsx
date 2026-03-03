import React, { createContext, useState } from 'react'

//1.create context
export const UserUpdateContext = createContext("")
export const AdminUpdateContext = createContext("")

function ContextShare({ children }) {

    //2.create state
    const [userEditResponse, setuserEditresponse] = useState({})

    const [adminEditResponse, setadminEditResponse] = useState({})
    return (
        <>

            {/* //3,warp provider to children */}
            <UserUpdateContext.Provider value={{ userEditResponse, setuserEditresponse, }}>
                <AdminUpdateContext.Provider value={{ adminEditResponse, setadminEditResponse }}>
                    {children}
                </AdminUpdateContext.Provider>
            </UserUpdateContext.Provider>
        

        </>
    )
}

export default ContextShare