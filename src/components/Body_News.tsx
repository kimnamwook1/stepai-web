"use client";

import React, { useState, useCallback, useEffect } from "react";

const SECTION_WIDTH = 1920;
const SECTION_HEIGHT = 400;
const SIDE_PADDING = 320;
const VERTICAL_MARGIN = 50;
const CARD_WIDTH = 180;
const CARD_HEIGHT = 135; // 4:3 비율
const CARD_GAP = 12;
const VISIBLE_COUNT = 6;
const BUTTON_SIZE = 40;

const topicList = ["주제", "주제", "주제", "주제"];
const cardList = Array(10).fill(0).map(() => ({
    topic: "주제",
    image: "이미지",
    summary: "짧은 내용",
    date: "날짜"
}));

const Body_News: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState(0);
    const [startIdx, setStartIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // 캐러셀 이동
    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev + 1) % cardList.length);
    }, [isAnimating]);
    const handlePrev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev - 1 + cardList.length) % cardList.length);
    }, [isAnimating]);

    useEffect(() => {
        if (!isAnimating) return;
        const timer = setTimeout(() => setIsAnimating(false), 400);
        return () => clearTimeout(timer);
    }, [isAnimating]);

    // 현재 표시할 6개 카드
    const getVisibleCards = () => {
        return Array(VISIBLE_COUNT).fill(0).map((_, i) => cardList[(startIdx + i) % cardList.length]);
    };

    return (
        <section
            style={{
                width: SECTION_WIDTH,
                minHeight: SECTION_HEIGHT,
                margin: `${VERTICAL_MARGIN}px 0`,
                padding: `0 ${SIDE_PADDING}px`,
                boxSizing: "border-box",
                background: "#fff"
            }}
            className="flex flex-col items-center"
        >
            {/* 섹션 타이틀 */}
            <div className="w-full flex justify-center mb-4">
                <span className="text-[38px] font-bold text-black" style={{ fontFamily: 'Inter' }}>
                    모두의 AI 소식
                </span>
            </div>
            {/* 주제 버튼 */}
            <div className="flex gap-4 mb-6">
                {topicList.map((topic, idx) => (
                    <button
                        key={idx}
                        className={`px-6 py-2 rounded-full border-2 text-base font-bold transition-colors duration-200 ${activeTopic === idx ? 'bg-black text-white border-black' : 'bg-white text-black border-black'}`}
                        onClick={() => setActiveTopic(idx)}
                    >
                        {topic}
                    </button>
                ))}
            </div>
            {/* 카드 캐러셀 */}
            <div className="relative flex items-center w-full justify-center" style={{ maxWidth: 1280 }}>
                {/* 좌측 화살표 */}
                <button
                    onClick={handlePrev}
                    className="z-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow self-center"
                    disabled={isAnimating}
                    style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, marginRight: 8 }}
                >
                    <span className="text-xl">&#8592;</span>
                </button>
                {/* 카드 리스트 */}
                <div
                    className="flex transition-transform duration-400"
                    style={{
                        gap: `${CARD_GAP}px`,
                        width: CARD_WIDTH * VISIBLE_COUNT + CARD_GAP * (VISIBLE_COUNT - 1),
                        justifyContent: 'center',
                    }}
                >
                    {getVisibleCards().map((card, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col relative bg-[#ededed] rounded-[16px] shadow items-center"
                            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                        >
                            {/* 좌상단 주제 뱃지 */}
                            <span className="absolute left-2 top-2 bg-[#f6d9d9] text-xs px-2 py-1 rounded-full">{card.topic}</span>
                            {/* 우상단 날짜 뱃지 */}
                            <span className="absolute right-2 top-2 bg-[#d6ffc3] text-xs px-2 py-1 rounded-full">{card.date}</span>
                            {/* 대표 이미지 Placeholder */}
                            <div className="flex-1 w-full flex items-center justify-center" style={{ minHeight: 60 }}>
                                <span className="text-gray-400 text-sm">{card.image}</span>
                            </div>
                            {/* 짧은 내용 Placeholder */}
                            <div className="w-full text-center pb-2">
                                <span className="text-xs text-gray-700">{card.summary}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 우측 화살표 */}
                <button
                    onClick={handleNext}
                    className="z-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow self-center"
                    disabled={isAnimating}
                    style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, marginLeft: 8 }}
                >
                    <span className="text-xl">&#8594;</span>
                </button>
            </div>
        </section>
    );
};

export default Body_News; 