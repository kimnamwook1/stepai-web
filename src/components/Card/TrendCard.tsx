'use client';

import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter, FaThreads, FaLinkedin } from 'react-icons/fa6';

interface TrendCardProps {
    rank: number; // 0~9
    serviceName: string;
    category: string;
    updown: 'Up' | 'Down';
    homepage: string;
    snsLinks: {
        youtube: string;
        instagram: string;
        facebook: string;
        x: string;
        thread: string;
        linkedin: string;
    };
}

const rankImg = [
    '/rank_1.png', // 0
    '/rank_2.png', // 1
    '/rank_3.png', // 2
];

const Trend_card: React.FC<TrendCardProps> = ({ rank, serviceName, category, updown, homepage, snsLinks }) => {
    return (
        <div className="w-full flex flex-row items-center py-4 border-b last:border-b-0">
            {/* Rank */}
            <div className="w-20 flex justify-center items-center">
                {rank < 3 ? (
                    <img src={rankImg[rank]} alt={`${rank + 1}위`} className="w-8 h-8" />
                ) : (
                    <span className="text-lg font-bold text-gray-500">{rank + 1}</span>
                )}
            </div>
            {/* 서비스명/로고 */}
            <div className="w-32 flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-1">
                    {/* 로고 placeholder */}
                </div>
                <span className="text-xs text-gray-500">({serviceName})</span>
            </div>
            {/* 카테고리 */}
            <div className="w-60 text-center text-base text-gray-700">{category}</div>
            {/* Up & Down */}
            <div className="w-40 text-center font-bold text-base" style={{ color: updown === 'Up' ? '#F00' : '#06F' }}>
                {updown}
            </div>
            {/* 홈페이지 */}
            <div className="w-40 text-center text-base text-gray-500 underline cursor-pointer" onClick={() => window.open(homepage, '_blank')}>{homepage}</div>
            {/* SNS */}
            <div className="flex flex-col gap-1 ml-16">
                <div className="flex flex-row gap-2">
                    <a href={snsLinks.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube size={20} className="text-black hover:text-red-600" /></a>
                    <a href={snsLinks.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram size={20} className="text-black hover:text-pink-500" /></a>
                    <a href={snsLinks.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook size={20} className="text-black hover:text-blue-600" /></a>
                </div>
                <div className="flex flex-row gap-2">
                    <a href={snsLinks.x} target="_blank" rel="noopener noreferrer"><FaXTwitter size={20} className="text-black hover:text-blue-400" /></a>
                    <a href={snsLinks.thread} target="_blank" rel="noopener noreferrer"><FaThreads size={20} className="text-black hover:text-gray-700" /></a>
                    <a href={snsLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} className="text-black hover:text-blue-700" /></a>
                </div>
            </div>
        </div>
    );
};

export default Trend_card;
