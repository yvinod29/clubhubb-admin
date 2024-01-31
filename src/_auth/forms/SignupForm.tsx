import  { z } from "zod";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Link, useNavigate} from 'react-router-dom';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"
 import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupValidationSchema } from "@/lib/validation"
import Loader from "@/components/shared/Loader";
import { useSignupClubMutation } from "@/store/api/authApi";
import { useToast } from "@/components/ui/use-toast"
 import { useEffect } from "react";


const SignupForm = () => {

   const { toast } = useToast()
   const navigate = useNavigate();


    const [signupclub,{data,isLoading,isError,isSuccess}]=useSignupClubMutation();
 

   const form = useForm<z.infer<typeof SignupValidationSchema>>({
       resolver: zodResolver(SignupValidationSchema),
       defaultValues: {
         clubName:"",
         clubUsername: "",
         clubEmail:"",
         clubTitle:"",
         description:"",
         password:"",
         phoneNumber:""
       },
     })
    
     // 2. Define a submit handler.
     async function handleSignup(values: z.infer<typeof SignupValidationSchema>) {
      console.log(values)
       const formData = new FormData();
   Object.entries(values).forEach(([key, value]) => {
     formData.append(key, value);
   });
   

   try {
     const newClub=await signupclub(formData);
     if (isError) {
      toast({ title: "Login failed. Please try again." });
      
      return;
    }

     
     console.log(newClub);
   } catch (error) {
     console.error('Signup error:', error);
   }
 }

 useEffect(()=>{
  if(isSuccess){
   
    navigate("/sign-in");

  }

 },[isSuccess,data,navigate])
     
 return (

   <Form {...form}>
       <div className="sm:w-420 flex-center flex-col " >
   {/*        <img src="/public/assets/images/logo.svg" width={300}  alt="ClubHubb" />*/}
  
   <h1 className="font-bold text-6xl mt-60" style={{color: "#866eff"}}>Clubhubb</h1>
   
           
       <h2 className="h3-bold md:h2-bold pt-5 ">
       
         Create a new account
       </h2>
       <p className="text-light-3 small-medium md:base-regular mt-2">
         To use Clubhubb, Please enter your details
       </p>

       <form
         onSubmit={form.handleSubmit(handleSignup)}
         className="flex flex-col gap-5 w-full mt-4">
         <FormField
           control={form.control}
           name="clubName"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Club Name</FormLabel>
               <FormControl>
                 <Input type="text" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <FormField
           control={form.control}
           name="clubUsername"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Club Username</FormLabel>
               <FormControl>
                 <Input type="text" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <FormField
           control={form.control}
           name="clubEmail"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Email</FormLabel>
               <FormControl>
                 <Input type="text" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <FormField
           control={form.control}
           name="clubTitle"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Club Title</FormLabel>
               <FormControl>
                 <Input type="text" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <FormField
           control={form.control}
           name="description"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Description</FormLabel>
               <FormControl>
                 <Input type="text" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <FormField
           control={form.control}
           name="phoneNumber"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Phone Number</FormLabel>
               <FormControl>
                 <Input type="text" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <FormField
           control={form.control}
           name="password"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="shad-form_label">Password</FormLabel>
               <FormControl>
                 <Input type="password" className="shad-input" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />

         <Button type="submit" className="shad-button_primary">
             {isLoading?(
               <div className="flex-center gap-2">
                   <Loader/> Loading...
                </div>
             ):"Sign up"}
         </Button>


         <p className="text-small-regular text-light-2 text-center mt-2">
           Already have an account?
           <Link
             to="/sign-in"
             className="text-primary-500 text-small-semibold ml-1">
             Log in
           </Link>
          
         </p>
         
       </form>

 </div>
 </Form>
 )
}

export default SignupForm
