import { logo } from "../assets"
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../constants'

const Navbar = () => {
    const location = useLocation();

    return (

        <nav
            className="px-16 w-full items-center pt-4 pb-2 fixed top-0 z-20 bg-tertiary"
        >
            <div className='relative flex justify-between '>
                <div className='flex gap-10 items-center'>

            {/* Logo and Title for the Project */}
                    <div className='flex gap-2 items-center'>
                        <img src={logo} alt="logo" className='w-6 h-6 object-contain' />
                        <span className='font-semibold'>TicketTrove</span>
                    </div>

            {/* Listing and linking */}
                    <div>
                        <ul className='list-none hidden sm:flex flex-row gap-4'>

                    {/* Getting the nav links from constants */}
                            {navLinks.map((link) => {
                                return (
                                    <li
                                        key={link.id}
                                        className={`${location.pathname === `/${link.id}` ? 'text-white p-2 rounded-md bg-sec bg-opacity-10' : 'text-sec rounded-md p-2'
                                            } hover:text-white text-[18px] font-normal cursor-pointer`}
                                       >
                                        <Link to={`/${link.id}`}>{link.title}</Link>
                                        
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>


                {/* Buttons */}
                <div className='flex gap-5 '>
                    <button
                        type="submit"
                        className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-medium shadow-md shadow:primary rounded-xl"
                    >
                        Login
                    </button>
                    <button
                        type="submit"
                        className="bg-blue py-3 px-8 outline-none w-fit text-white font-medium shadow-md shadow-primary rounded-xl"
                    >
                        Register
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
