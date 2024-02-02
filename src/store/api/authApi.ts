// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';

 

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,

   endpoints: (builder) => ({
        SigninClub:builder.mutation({
            query:(body:{clubEmail:string; password:string})=>{
                return {
                    url:"/api/v1/admin-auth/login",
                    method:"post",
                    body,
                }
            }
        }),
        SignupClub:builder.mutation({
            query:( formData:FormData)=>{

                return {
                    url:"/api/v1/admin-auth/register",
                    method:"post",
                    body:formData,
                    
                }
            }
        }),
        forgotpassword:builder.mutation({
            query:(body:{clubEmail:string})=>{
                return{
                    url:'api/v1/admin-auth/forgot-password',
                    method:"post",
                    body

                }
            }

        }),
        verifyclub: builder.mutation({
            query: (body:{token:string}) => ({
              url: 'api/v1/admin-auth/protected',
              method: 'get',
              headers: {
                Authorization: `${body.token}`,
              },
            }),
          }),
          

    
  }),
  

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useSigninClubMutation, useSignupClubMutation, useForgotpasswordMutation, useVerifyclubMutation
 } = authApi

 