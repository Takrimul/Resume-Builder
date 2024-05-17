'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        router.push(`/${inputValue}`);
    };

    return (
        <div className='items-center justify-center h-[100vh] p-72'>
            <div className="search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px] px-10">
                <input
                    type="text"
                    id="inputId"
                    placeholder="Enter your keywords"
                    value={inputValue ?? ""}
                    onChange={handleChange}
                    className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3"
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
        </div>
    );
};

export default SearchBar;
