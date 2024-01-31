import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
 import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
 import { Button } from '../ui/button';
 import { useUserContext } from '@/context/useUserContext';
import { INITIAL_CLUB } from '@/context/AuthContext';
   

const LeftSideBar = () => {
    console.log("leftside bar")
     const { pathname} =useLocation();
    const navigate = useNavigate();
    const { club, setClub, setIsAuthenticated } = useUserContext();

 
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
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                  <h1
                  className="font-bold text-2xl md:text-4xl"
                  style={{ color: "#877EFF", fontSize: "2rem" }}
              >
                  Clubhubb
              </h1>
                    {/*<img src="logo" alt="logo" width={130} height={325}/> */}
                </Link>

                <Link to='/profile/${user.id}' className='flex gap-3'>
                    <img
                        src="/assets/images/profile.png"
                        alt="profile"
                        className='h-11 w-11 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>
                            {club.clubName}
                        </p>
                        <p className='small-regular text-lighnt-3'>
                            @{club.clubUsername}
                        </p>
                    </div>
                </Link>
                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                         const isActive=pathname==link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>

                                <NavLink
                                    to={link.route}
                                    className='flex gap-4 items-center p-2'
                                >
                                    <img 
                                       src={link.imgURL}
                                       alt={link.label}
                                       className={`group-hover:invert-white ${isActive && 'invert-white'}` }                                    />
                                    {link.label}

                                </NavLink>
                            </li>
                        )
                    })}

                </ul>

            </div>
            <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={(e)=>handleSignOut(e)}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p  className='small-medium'>Logout</p>
          </Button>
        </nav>
    )
}

export default LeftSideBar;
