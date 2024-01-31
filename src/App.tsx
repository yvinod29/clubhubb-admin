import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import {  CreatePost, EditPost, Home, PostDetails, Profile, UpdateProfile } from './_root/pages';
import RootLayout from './_root/pages/RootLayout';
import './globals.css';
import { Routes, Route  } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import ForgotPasswordForm from './_auth/forms/ForgotPassword';
import Manage from './_root/pages/Manage';
import RegisterDetails from './_root/pages/RegisterDetails';
import RegistrationForm from './components/shared/RegistrationForm';
import DownloadExcel from './components/shared/DownloadExcel';


const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes*/}
            <Route element={<AuthLayout/>}>
                <Route path="/sign-in" element={<SigninForm/>}/>
                <Route path="/sign-up" element={<SignupForm/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordForm/>}/>
            </Route>
            {/* private routes*/}
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/manage" element={<Manage/>}/>
                 <Route path="/create-post" element={<CreatePost/>}/>
 
                 <Route path="/update-post/:eventId" element={<EditPost />} />
                <Route path="/posts/:eventId" element={<PostDetails />} />
                <Route path="/posts/:eventId/registarionform" element={<RegistrationForm/>}/>

                <Route path="/profile" element={<Profile/>}/>
                <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
                <Route path="/posts/:eventId/register-details" element={<RegisterDetails/>}/>
                <Route path="/posts/:eventId/register-details/downloadexcel" element={<DownloadExcel/>}/>



            </Route>
        </Routes>
      <Toaster/>
    </main>
    
  )
}

export default App;
