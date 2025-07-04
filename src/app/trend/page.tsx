'use client';

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main_Banner from "@/components/Main_Banner";

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

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12">
                <Main_Banner Main_Title="Stepper" Detail_Text="Other sentence" />
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
                                    <li key={opt} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">{opt}</li>
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
                                    <li key={opt} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">{opt}</li>
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
                                    <li key={opt} className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">{opt}</li>
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
                                        {num > 0
                                            ? Array(num).fill('⭐').join('')
                                            : Array(5).fill('🩶').join('')
                                        }
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* ResultSection */}
                    <div className="flex-[8] flex flex-col p-6">
                        {/* ResultSection: 추후 내용 */}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default TrendPage;
