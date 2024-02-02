// Need to use the React-specific entry point to import createApi
import { createApi} from '@reduxjs/toolkit/query/react'
 
import { baseQuery } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery,
  endpoints: (builder) => ({
        PostEvent:builder.mutation({
            query:(formData:FormData)=>{
                const token = localStorage.getItem("token");
                return {
                    url:"/api/v1/event/create-event",
                    method:"post",
                    headers:{
                        Authorization:`${token}`

                    },
                    body:formData,
                }
            }
        }),
    
        GetEvents:builder.mutation({
            query:(body:{token:string})=>{
                 return{
                    url:'/api/v1/club/club-events',
                    method:"get",
                    headers:{
                        Authorization:`${body.token}`
                    }
                }
            }
        }),
        GetEventById:builder.mutation({
            query:(body:{eventId:string})=>{
                const token=localStorage.getItem("token")
                return{
                    url:`/api/v1/event/${body.eventId}`,
                    method:"get",
                    headers:{
                        Authorization:`${token}`
                    }

                }
            }

        }),
        UpdateEvent: builder.mutation({
            query: ({ formData, body }: { formData: FormData; body: { eventId: string } }) =>{
                const token = localStorage.getItem("token");
                return {
                    url:`/api/v1/event/${body.eventId}`,
                    method:"put",
                    headers:{
                        Authorization:`${token}`

                    },
                    body:formData,
                }
            }

        }),
        UpdateStatus: builder.mutation({
            query: (body: { eventId: string ,status:boolean }) => {
                const token = localStorage.getItem("token");
                return {
                    url:`/api/v1/event/${body.eventId}/status`,
                    method:"put",
                    headers:{
                        Authorization:`${token}`

                    },
                    body,
                }
            }

        }),
        UpdateRegistrationForm: builder.mutation({
            query: ({ body }: {  body: { eventId: string ; additionalQuestions:string[] } }) =>{
                const token = localStorage.getItem("token");
                return {
                    url:`/api/v1/event/${body.eventId}/registrationform`,
                    method:"put",
                    headers:{
                        Authorization:`${token}`

                    },
                    body,
                }
            }

        }),
        DeleteEvent:builder.mutation({
            query:(body:{eventId:string})=>{
                const token=localStorage.getItem('token')
                return{
                    url:`/api/v1/event/${body.eventId}`,
                    method:"delete",
                    headers:{

                        Authorization:`${token}`
                    }
                }
            }
        }),
        Updatecheckin: builder.mutation({
            query: ( body:{eventId:string; userId:string; check:boolean;}) =>{
                const token = localStorage.getItem("token");
                return {
                    url:`/api/v1/event/${body.eventId}/${body.userId}`,
                    method:"put",
                    headers:{
                        Authorization:`${token}`

                    },
                    body
                }
            }

        }),
        

            

        
    }),

})

  export const {  usePostEventMutation ,useGetEventsMutation, useGetEventByIdMutation ,useUpdateEventMutation,
    useDeleteEventMutation, useUpdatecheckinMutation , useUpdateRegistrationFormMutation ,useUpdateStatusMutation
 } = postApi


 