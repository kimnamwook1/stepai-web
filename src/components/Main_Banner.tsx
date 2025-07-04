import React from 'react';

interface MainBannerProps {
    Main_Title: string;
    Detail_Text: string;
}

const Main_Banner: React.FC<MainBannerProps> = ({ Main_Title, Detail_Text }) => {
    return (
        <div
            className="flex justify-center items-center bg-blue-50"
            style={{ width: 1280, height: 150 }}
        >
            <div className="flex flex-col justify-center px-8 w-full h-full">
                <h1 className="text-6xl font-bold mt-2 mb-6 text-gray-900">{Main_Title}</h1>
                <p className="text-2xl mb-2 text-gray-700">{Detail_Text}</p>
            </div>
        </div>
    );
};

export default Main_Banner;
