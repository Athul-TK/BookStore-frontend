import commonAPI from "./commonApi";
import { serverURL } from "./serverUrl";




/////////////////////////////////////////////////////// API CALL'S \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



//1 register api call
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//2 Login api call
export const LoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//2 Google Login api call
export const GoogleLoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}

//3 add book api call only for user/admin
export const addBookAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-book`,reqBody,reqHeader)
}

//4 get books api call
export const getBooksAPI=async()=>{
    return await commonAPI("GET",`${serverURL}/home-books`)
}   

//4 get all books api call only for admin/user
export const getAllBooksAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-books?search=${searchKey}`,"",reqHeader)
}

//5 get user added books api call only for user
export const getUserBooksAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-books`,"",reqHeader)
}

//6 delete book api call only for user/admin
export const deleteUserBookAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-book/${id}`,"",reqHeader)
}

//7 get bougth books api call only for user
export const getBoughtBooksAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/bought-books`,"",reqHeader)
}   

//8 view book api call only 
export const viewBookAPI=async(id,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/view-book/${id}`,"",reqHeader)
}

//9 update user profile api call only for user
export const updateUserProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/update-profile`,reqBody,reqHeader)
}

//make payment
export const makePaymentAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/make-payment`,reqBody,reqHeader)
}







//////////////////////////// admin ///////////////////////////


//1.get all admin books
export const getAllAdminBooksAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-allbooks`,"",reqHeader)
}

//2.approved book
export const approvedBookAPI=async(id,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-updatebook/${id}`,"",reqHeader)
}

//update admin profile api call only for user
export const updateAdminProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-updateprofile`,reqBody,reqHeader)
}

//get all users
export const getAllUsersAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-allusers`,'',reqHeader)
}