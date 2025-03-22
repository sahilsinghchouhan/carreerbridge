import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='bg-white text-gray-900 shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                {/* Logo */}
                <Link to="/" className='text-2xl font-bold tracking-wide text-gray-900'>
                    Career<span className='text-blue-600'>Bridge</span>
                </Link>

                {/* Navigation Links (Shifted to Right) */}
                <div className="flex items-center gap-6">
                    <ul className='hidden md:flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-blue-600">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-blue-600">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-blue-600">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-blue-600">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Authentication & User Profile Section */}
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-100">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-blue-600 text-white hover:bg-blue-700">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-blue-600">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200">
                                    <div className='p-4'>
                                        <div className='flex items-center gap-3'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='mt-3 space-y-2'>
                                            {user && user.role === 'student' && (
                                                <div className='flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500'>
                                                    <User2 size={16} />
                                                    <Link to="/profile">View Profile</Link>
                                                </div>
                                            )}
                                            <div onClick={logoutHandler} className='flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-500'>
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
