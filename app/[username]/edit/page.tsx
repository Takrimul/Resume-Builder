'use client';

import React, { useState } from 'react';

const EditProfile = ({
    params
}: {
    params: {
        username: string;
    }
}) => {
    const [selectedButton, setSelectedButton] = useState('');

    const handleButtonClick = (buttonName: string) => {

        setSelectedButton(buttonName);
        confirm(`For the first time, you must login to the red button.\nTo edit anything existing, you just need to pass the id in the end of the url.
        For example: if you want to edit a skill which has an id 3, in the address bar, make sure to add the id at the end of the urls
        your url should look like this /skills/3, if your skill id is 3.
        If you understand, click confirm to proceed.
        `);
        // Perform the desired action based on the selected button
        switch (buttonName) {
            case 'Button 0':
                window.open(`${process.env.BACKEND_URL}/api/authentication/login/`, '_blank');
                break;
            case 'Button 1':
                window.open(`${process.env.BACKEND_URL}/api/users/${params.username}/summary`, '_blank');
                break;
            case 'Button 2':
                window.open(`${process.env.BACKEND_URL}/api/users/${params.username}/skills`, '_blank');
                break;
            case 'Button 3':
                window.open(`${process.env.BACKEND_URL}/api/users/${params.username}/education`, '_blank');
                break;
            case 'Button 4':
                window.open(`${process.env.BACKEND_URL}/api/users/${params.username}/experience`, '_blank');
                break;
            case 'Button 5':
                window.open(`${process.env.BACKEND_URL}/api/users/${params.username}/achievements`, '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <div className='h-[100vh]'>
            <a className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-red-500 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-red-500 lg:p-4 lg:dark:bg-zinc-800/30 mb-20 bg-red-600"
                href={`/${params.username}`}
            >
                <code className="font-mono font-bold">
                    Back to Dashboard
                </code>
            </a>
            <div className='flex flex-col text-center justify-center items-center px-10 gap-10'>
                <button className='border border-blue-500 rounded-lg py-2 w-[30vw] bg-red-500' onClick={() => handleButtonClick('Button 0')}>For the first time must login here</button>
                <button className='border border-blue-500 rounded-lg py-2 w-[30vw]' onClick={() => handleButtonClick('Button 1')}>Edit Basic Information</button>
                <button className='border border-blue-500 rounded-lg py-2 w-[30vw]' onClick={() => handleButtonClick('Button 2')}>Add/Edit Skills</button>
                <button className='border border-blue-500 rounded-lg py-2 w-[30vw]' onClick={() => handleButtonClick('Button 3')}>Add/Edit Education Information</button>
                <button className='border border-blue-500 rounded-lg py-2 w-[30vw]' onClick={() => handleButtonClick('Button 4')}>Add/Edit Experience</button>
                <button className='border border-blue-500 rounded-lg py-2 w-[30vw]' onClick={() => handleButtonClick('Button 5')}>Add/Edit Achievements</button>
            </div>
        </div>
    );
}

export default EditProfile;
