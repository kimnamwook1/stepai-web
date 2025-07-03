"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const trendSets = Array(10).fill(0).map(() => ({
    category: '카테고리',
    title: '서비스',
    thumbnail: '이미지',
    logo: '로고',
    hashtags: '해시태그'
}));

const CARD_WIDTH = 278;
const CARD_HEIGHT = 371;
const CARD_GAP = 24;
const VISIBLE_COUNT = 4;
const BUTTON_SIZE = 48;
const SECTION_WIDTH = 1920;
const SECTION_HEIGHT = 480;
const SIDE_PADDING = 320;
const BOTTOM_PADDING = 32;

const Body_TopTrends: React.FC = () => {
    const [startIdx, setStartIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 부드러운 애니메이션(좌/우 이동)
    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev + 1) % trendSets.length);
    }, [isAnimating]);
    const handlePrev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev - 1 + trendSets.length) % trendSets.length);
    }, [isAnimating]);

    // 자동 슬라이드
    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            handleNext();
        }, 3000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [handleNext]);

    useEffect(() => {
        if (!isAnimating) return;
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [isAnimating]);

    // 현재 표시할 4세트 추출
    const getVisibleSets = () => {
        return Array(VISIBLE_COUNT).fill(0).map((_, i) => trendSets[(startIdx + i) % trendSets.length]);
    };

    return (
        <section
            style={{
                width: SECTION_WIDTH,
                minHeight: SECTION_HEIGHT,
                padding: `0 ${SIDE_PADDING}px ${BOTTOM_PADDING}px ${SIDE_PADDING}px`,
                boxSizing: "border-box",
                overflow: "hidden",
                background: "#fff",
                margin: '50px 0'
            }}
            className="flex flex-col justify-center"
        >
            {/* 섹션 제목 */}
            <div className="w-full flex justify-center mb-2">
                <span className="text-[38px] font-bold text-black" style={{ fontFamily: 'Inter' }}>
                    Top 인기
                </span>
            </div>
            {/* 카드 캐러셀 */}
            <div className="relative flex items-center w-full justify-center" style={{ minHeight: CARD_HEIGHT + 48 }}>
                {/* 좌측 화살표 */}
                <button
                    onClick={handlePrev}
                    className="z-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg self-center"
                    disabled={isAnimating}
                    style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, marginRight: 16 }}
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                {/* 세트 리스트 */}
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        gap: `${CARD_GAP}px`,
                        width: CARD_WIDTH * 4 + CARD_GAP * 3,
                        justifyContent: 'center',
                    }}
                >
                    {getVisibleSets().map((set) => (
                        <div
                            key={set.category}
                            className="flex flex-col items-center"
                            style={{ width: CARD_WIDTH }}
                        >
                            {/* 카테고리명 */}
                            <div className="w-full text-center mb-1">
                                <span className="text-[20px] font-bold text-[#222]" style={{ fontFamily: 'Inter' }}>{set.category}</span>
                            </div>
                            {/* 카드 본체 */}
                            <div
                                className="bg-[#ededed] rounded-[22px] shadow-md flex flex-col items-center cursor-pointer"
                                style={{
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    border: '1px solid #e5e7eb',
                                }}
                            >
                                {/* 썸네일 Placeholder */}
                                <div
                                    className="w-full flex items-center justify-center"
                                    style={{ height: 185, background: '#e5e7eb', borderRadius: '22px 22px 0 0', overflow: 'hidden' }}
                                >
                                    <span className="text-gray-400 text-lg">이미지</span>
                                </div>
                                {/* 로고+서비스명 Placeholder */}
                                <div className="flex items-center mt-4 mb-2 w-full px-6">
                                    <div className="w-10 h-10 rounded-full bg-[#f5f04f] flex items-center justify-center mr-3 overflow-hidden">
                                        <span className="text-xs text-gray-700">로고</span>
                                    </div>
                                    <span className="text-lg font-bold text-black" style={{ fontFamily: 'Inter' }}>서비스</span>
                                </div>
                                {/* 해시태그 Placeholder */}
                                <div className="w-full px-6 mt-auto mb-4">
                                    <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Inter' }}>해시태그</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 우측 화살표 */}
                <button
                    onClick={handleNext}
                    className="z-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg self-center"
                    disabled={isAnimating}
                    style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, marginLeft: 16 }}
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Body_TopTrends;
