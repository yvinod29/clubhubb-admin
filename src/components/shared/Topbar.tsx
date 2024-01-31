 import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { INITIAL_CLUB } from '@/context/AuthContext';
import { useUserContext } from '@/context/useUserContext';

const Topbar = () => {
    const navigate = useNavigate();
 
    const { setClub, setIsAuthenticated } = useUserContext();


    const signOut = () => {
      console.log("signout");
      localStorage.removeItem('token');
      navigate("/sign-in");
      window.location.reload();

    };

    
const handleSignOut = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  signOut();
  setIsAuthenticated(false);
  setClub(INITIAL_CLUB);
  navigate("/sign-in");
};
  return (

    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link  to ="/" className='flex gap-3 items-center'>
             <h1
                  className="font-bold text-2xl md:text-4xl"
                  style={{ color: "#877EFF", fontSize: "2rem" }}
              >
                  Clubhubb
              </h1>
                        {/*<img src="logo" alt="logo" width={130} height={325}/> */}

            </Link>
            <div className='flex gap-4'>
            <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={(e)=>handleSignOut(e)}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to='/profile/${user.id}' className='flex-center gap-3'>
            <img 
                src="/assets/images/profile.png"
                alt="profile"
                className='h-8 w-8 rounded-full'
            />
          </Link>

            </div>
         
         </div>

    </section>
  )
}

export default Topbar
