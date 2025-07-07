'use client';

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainBanner from "@/components/MainBanner";
import Trend_card from '@/components/Card/TrendCard';

const TrendPage = () => {
    // SortSection 상태 관리
    const [open, setOpen] = useState({
        date: false,
        category: true,
        country: false,
        review: false,
    });
    const toggle = (key: keyof typeof open) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

    const dateOptions = ["1일 전", "1주일 전", "1달 전", "1년 전"];
    const categoryOptions = [
        "All", "문서·글쓰기", "마케팅·디자인", "교육·학습", "미디어·엔터테인먼트", "IT·프로그래밍", "비즈니스·전문가", "커머스·세일즈", "번역·통역", "건강·웰니스", "에이전트·자동화"
    ];
    const countryOptions = ["한국", "미국", "중국", "프랑스"];
    const reviewOptions = [5, 4, 3, 2, 1, 0];

    // 일자별, 카테고리별, 국가별 숫자 예시(실제 데이터 연동 전까지 하드코딩)
    const dateCounts: Record<string, number> = {
        "1일 전": 12,
        "1주일 전": 34,
        "1달 전": 56,
        "1년 전": 78,
    };
    const categoryCounts: Record<string, number> = {
        "All": 123,
        "문서·글쓰기": 45,
        "마케팅·디자인": 67,
        "교육·학습": 89,
        "미디어·엔터테인먼트": 10,
        "IT·프로그래밍": 11,
        "비즈니스·전문가": 12,
        "커머스·세일즈": 13,
        "번역·통역": 14,
        "건강·웰니스": 15,
        "에이전트·자동화": 16,
    };
    const countryCounts: Record<string, number> = {
        "한국": 100,
        "미국": 200,
        "중국": 300,
        "프랑스": 400,
    };

    // 리뷰별 숫자 예시(실제 데이터 연동 전까지 하드코딩)
    const reviewCounts: Record<number, number> = {
        5: 12345,
        4: 6789,
        3: 234,
        2: 56,
        1: 7,
        0: 0,
    };

    // ResultSection 탭 상태
    const [tab, setTab] = useState<'popular' | 'recent'>('popular');

    // Header에서 사용한 V 아이콘 SVG
    const ArrowIcon = ({ open }: { open: boolean }) => (
        <svg
            className={`w-4 h-4 transition-transform duration-300 inline ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    // Trend_card용 예시 데이터
    const trendList = Array.from({ length: 10 }, (_, i) => ({
        rank: i,
        serviceName: `Service${i + 1}`,
        category: categoryOptions[i % categoryOptions.length],
        updown: (i % 2 === 0 ? 'Up' : 'Down') as 'Up' | 'Down',
        homepage: 'https://example.com',
        snsLinks: {
            youtube: 'https://youtube.com',
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com',
            x: 'https://x.com',
            thread: 'https://threads.net',
            linkedin: 'https://linkedin.com',
        },
    }));

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12">
                <MainBanner Main_Title="Stepper" Detail_Text="Other sentence" />
                <div className="w-[1280px] mt-8 border border-dashed border-gray-300 rounded-lg min-h-[300px] flex flex-row items-stretch">
                    {/* SortSection */}
                    <div className="flex-[2] min-w-[180px] border-r border-gray-200 bg-white flex flex-col p-6">
                        {/* 일자별 */}
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2" onClick={() => toggle('date')}>
                            일자별
                            <span className="ml-2"><ArrowIcon open={open.date} /></span>
                        </button>
                        {open.date && (
                            <ul className="pl-2 mb-2">
                                {dateOptions.map((opt) => (
                                    <li key={opt} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">
                                        {opt}
                                        <span className="ml-2 text-gray-500">({dateCounts[opt]})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* 카테고리별 */}
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2" onClick={() => toggle('category')}>
                            카테고리별
                            <span className="ml-2"><ArrowIcon open={open.category} /></span>
                        </button>
                        {open.category && (
                            <ul className="pl-2 mb-2">
                                {categoryOptions.map((opt) => (
                                    <li key={opt} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">
                                        {opt}
                                        <span className="ml-2 text-gray-500">({categoryCounts[opt]})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* 국가별 */}
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2" onClick={() => toggle('country')}>
                            국가별
                            <span className="ml-2"><ArrowIcon open={open.country} /></span>
                        </button>
                        {open.country && (
                            <ul className="pl-2 mb-2">
                                {countryOptions.map((opt) => (
                                    <li key={opt} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">
                                        {opt}
                                        <span className="ml-2 text-gray-500">({countryCounts[opt]})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* 리뷰별 */}
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2" onClick={() => toggle('review')}>
                            리뷰별
                            <span className="ml-2"><ArrowIcon open={open.review} /></span>
                        </button>
                        {open.review && (
                            <ul className="pl-2 mb-2">
                                {reviewOptions.map((num) => (
                                    <li key={num} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">
                                        {Array(num).fill('★').join('') + Array(5 - num).fill('☆').join('')}
                                        <span className="ml-2 text-gray-500">({reviewCounts[num]})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* ResultSection */}
                    <div className="flex-[8] flex flex-col p-6">
                        {/* 상단 탭 */}
                        <div className="w-full flex flex-row items-center justify-center mb-6">
                            <button
                                className={`flex-1 flex items-center justify-center py-4 text-xl font-bold border-b-2 transition-colors duration-200 ${tab === 'popular' ? 'text-blue-600 border-blue-500 bg-white' : 'text-gray-400 border-transparent bg-gray-50'}`}
                                onClick={() => setTab('popular')}
                            >
                                {/* 아이콘은 추후 추가 */}
                                Popular Service
                            </button>
                            <button
                                className={`flex-1 flex items-center justify-center py-4 text-xl font-bold border-b-2 transition-colors duration-200 ${tab === 'recent' ? 'text-blue-600 border-blue-500 bg-white' : 'text-gray-400 border-transparent bg-gray-50'}`}
                                onClick={() => setTab('recent')}
                            >
                                {/* 아이콘은 추후 추가 */}
                                Recently Added
                            </button>
                        </div>
                        {/* 탭에 따라 내용이 바뀌는 영역 (아직 내용 없음) */}
                        <div className="w-full min-h-[200px] bg-white rounded-lg border border-gray-100 px-2">
                            {/* 헤더 row */}
                            <div className="w-full flex flex-row items-center py-2 border-b bg-gray-50">
                                <div className="w-20 flex justify-center text-xs text-gray-400 font-semibold">순위</div>
                                <div className="w-32 flex justify-center text-xs text-gray-400 font-semibold">서비스명</div>
                                <div className="w-60 text-center text-xs text-gray-400 font-semibold">카테고리</div>
                                <div className="w-40 text-center text-xs text-gray-400 font-semibold">Up & Down</div>
                                <div className="w-40 text-center text-xs text-gray-400 font-semibold">홈페이지</div>
                                <div className="flex-1 text-center text-xs gap-1 ml-10 text-gray-400 font-semibold">SNS</div>
                            </div>
                            {(tab === 'popular' ? trendList : trendList).map((item, idx) => (
                                <Trend_card key={idx} {...item} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default TrendPage;
