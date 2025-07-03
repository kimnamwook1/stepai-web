"use client";

import React, { useState, useRef, useEffect } from "react";

interface TrendSet {
    category: string;
    title: string;
    thumbnail: string;
    logo: string;
    hashtags: string;
}

const trendSets: TrendSet[] = [
    {
        category: "문서·글쓰기",
        title: "DocuGenie",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#문서 #자동화 #AI"
    },
    {
        category: "마케팅·디자인",
        title: "Draph Art",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#광고 #모델이미지 #상품이미지"
    },
    {
        category: "교육·학습",
        title: "Tutor Me",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#스터디 #PDF #개인강사"
    },
    {
        category: "미디어·엔터테인먼트",
        title: "Gemini",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#코딩 #기획 #디버그"
    },
    {
        category: "IT·프로그래밍",
        title: "CodeFlow",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#개발 #자동화 #테스트"
    },
    {
        category: "비즈니스·전문가",
        title: "BizPro",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#비즈니스 #전략 #트렌드"
    },
    {
        category: "커머스/리테일",
        title: "Octance AI",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#마케팅 #데이터 #개인화 ..."
    },
    {
        category: "번역·통역",
        title: "Transly",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#번역 #언어 #AI"
    },
    {
        category: "건강·웰니스",
        title: "HealthMate",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#헬스케어 #웰빙 #AI"
    },
    {
        category: "에이전트·자동화",
        title: "AgentX",
        thumbnail: "/api/placeholder/278/185",
        logo: "/api/placeholder/48/48",
        hashtags: "#자동화 #에이전트 #AI"
    }
];

const CARD_WIDTH = 278;
const CARD_HEIGHT = 371;
const CARD_GAP = 24;
const VISIBLE_COUNT = 4;
const BUTTON_SIZE = 48;
const SECTION_WIDTH = 1920;
const SECTION_HEIGHT = 480;
const SIDE_PADDING = 320;
const BOTTOM_PADDING = 32;

const TopTrendsSection: React.FC = () => {
    const [startIdx, setStartIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 부드러운 애니메이션(좌/우 이동)
    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev + 1) % trendSets.length);
    };
    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev - 1 + trendSets.length) % trendSets.length);
    };

    // 자동 슬라이드
    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            handleNext();
        }, 3000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [startIdx, handleNext]);

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
                background: "#fff"
            }}
            className="flex flex-col justify-center"
        >
            {/* 섹션 제목 */}
            <div className="w-full flex justify-start mb-2">
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
                            {/* 카드 */}
                            <div
                                className="bg-[#ededed] rounded-[22px] shadow-md flex flex-col items-center cursor-pointer"
                                style={{
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    border: '1px solid #e5e7eb',
                                }}
                                onClick={() => {}}
                            >
                                {/* 썸네일 */}
                                <div
                                    className="w-full"
                                    style={{ height: 185, background: '#e5e7eb', borderRadius: '22px 22px 0 0', overflow: 'hidden' }}
                                >
                                    <img
                                        src={set.thumbnail}
                                        alt={set.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                {/* 로고+서비스명 */}
                                <div className="flex items-center mt-4 mb-2 w-full px-6">
                                    <div className="w-10 h-10 rounded-full bg-[#f5f04f] flex items-center justify-center mr-3 overflow-hidden">
                                        <img src={set.logo} alt="logo" style={{ width: 32, height: 32, objectFit: 'cover' }} />
                                    </div>
                                    <span className="text-lg font-bold text-black" style={{ fontFamily: 'Inter' }}>{set.title}</span>
                                </div>
                                {/* 해시태그 */}
                                <div className="w-full px-6 mt-auto mb-4">
                                    <span className="text-xs text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>{set.hashtags}</span>
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

export default TopTrendsSection;
