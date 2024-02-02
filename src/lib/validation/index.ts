import * as z from "zod";


export const SignupValidationSchema= z.object({
    clubName:z.string().min(2,{message:'Too short'}),
    clubUsername: z.string().min(2,{message:'Too short'}),
    clubEmail:z.string().email(),
    clubTitle:z.string(),
    description:z.string(),
    phoneNumber: z.string().refine(value => value.length === 10, {
      message: 'Phone number must be 10 digits long',
    }),
    password:z.string().min(8,{message:"Password must be at least 8 charecters "}),
   })

  
export const SigninValidationSchema= z.object({
   
  clubEmail:z.string().email(),
  password:z.string().min(8,{message:"Password must be at least 8 charecters "})

})
export const forgotpasswordValidationSchema= z.object({
   
  clubEmail:z.string().email(),
 
})

export const PostValidation = z.object({
  
  eventName: z.string().min(5, { message: "Minimum 5 characters." }).max(25, { message: "Maximum 100 caracters" }),
  title :z.string().min(5, { message: "Minimum 5 characters." }).max(100, { message: "Maximum 100 caracters" }),
  description:z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  startDate:z.string(),
  endDate:z.string(),
   eventPoster: z.custom<File[]>(),
    amount: z.string(),
    minSize: z.string().refine(value => {
      const numericValue = Number(value);
      return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 9;
    }, { message: "Enter a valid number between 1 and 9" }),
    maxSize: z.string().refine(value => {
      const numericValue = Number(value);
      return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 9;
    }, { message: "Enter a valid number between 1 and 9" }),
 });

