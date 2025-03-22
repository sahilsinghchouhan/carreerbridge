import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='text-center bg-gray-50 py-20 px-4'>
            <div className='flex flex-col gap-6 max-w-3xl mx-auto'>
                <span className='mx-auto px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm'>Your Career Starts Here</span>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>Find & Land Your <br /> <span className='text-blue-600'>Dream Job</span></h1>
                <p className='text-gray-600 text-lg'>Discover top opportunities, apply with ease, and take the next step in your career.</p>
                <div className='flex w-full max-w-xl shadow-md border border-gray-300 bg-white rounded-full items-center gap-3 mx-auto p-2'>
                    <input
                        type="text"
                        placeholder='Search for jobs...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-4 py-2 rounded-full text-gray-800'
                    />
                    <Button onClick={searchJobHandler} className='bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;