"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main_Banner from "@/components/Main_Banner";
import { useState, useRef, useEffect, useCallback } from "react";
import Card from '@/components/Card';
import SelectedItem from '@/components/SelectedItem';
import type { SelectedItemProps } from '@/components/SelectedItem';

const categoryOptions = [
    "문서·글쓰기", "마케팅·디자인", "교육·학습", "미디어·엔터테인먼트", "IT·프로그래밍", "비즈니스·전문가", "커머스·세일즈", "번역·통역", "건강·웰니스", "에이전트·자동화"
];
const countryOptions = ["한국", "미국", "중국", "프랑스"];
const categoryCounts: Record<string, number> = { "문서·글쓰기": 45, "마케팅·디자인": 67, "교육·학습": 89, "미디어·엔터테인먼트": 10, "IT·프로그래밍": 11, "비즈니스·전문가": 12, "커머스·세일즈": 13, "번역·통역": 14, "건강·웰니스": 15, "에이전트·자동화": 16 };
const countryCounts: Record<string, number> = { "한국": 100, "미국": 200, "중국": 300, "프랑스": 400 };

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

const cardTestData = [
    {
        thumbnail: <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="로고" className="w-8 h-8" />,
        serviceName: 'ChatGPT',
        details: '#슬로건작성 #마케팅문구 #광고트렌드',
    },
    {
        thumbnail: <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">🌊</span>,
        serviceName: 'VEO3',
        details: '#마케팅영상 #최고성능 #광고영상 #마케팅영상 #최고성능 #광고영상 #마케팅영상 #최고성능 #광고영상',
    },
    {
        thumbnail: <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">✖️</span>,
        serviceName: 'ClovaX',
        details: '#슬로건작성 #마케팅문구 #광고트렌드',
    },
    {
        thumbnail: <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">🦄</span>,
        serviceName: 'UnicornAI',
        details: '#유니콘 #AI #혁신',
    },
    {
        thumbnail: <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">🚀</span>,
        serviceName: 'RocketBot',
        details: '#로켓 #챗봇 #자동화',
    },
    {
        thumbnail: <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">🦉</span>,
        serviceName: 'OwlSense',
        details: '#부엉이 #센서 #지능',
    },
];

// 더미 상세 데이터 생성 함수
const getDetailData = (item: { serviceName?: string }): SelectedItemProps['data'] => ({
    serviceName: item.serviceName || 'ChatGPT',
    category: 'AI 어시스턴트',
    tags: ['대화형 AI', '텍스트 생성', '문제 해결', '코딩 지원'],
    description: 'ChatGPT는 OpenAI에서 개발한 대화형 AI 모델로, 다양한 질문에 답변하고 창작, 분석, 학습을 도와주는 AI 어시스턴트입니다.',
    features: ['자연스러운 대화형 인터페이스', '텍스트 생성 및 편집', '코드 작성 및 디버깅', '언어 번역 및 요약'],
    scenarios: ['학생: 학습 및 과제 도움', '개발자: 코딩 및 문제 해결', '작가: 창작 아이디어 및 글쓰기', '직장인: 업무 효율성 향상'],
    rating: 4.8,
    review: '정말 유용한 AI 도구입니다!',
    reviewCount: '전 세계 1억+ 사용자',
    homepage: 'https://chat.openai.com',
    pricing: 'https://openai.com/pricing',
    sns: [
        { type: 'twitter', name: 'Twitter', handle: '@OpenAI', url: 'https://twitter.com/openai', icon: '🐦' },
        { type: 'linkedin', name: 'LinkedIn', handle: 'OpenAI', url: 'https://www.linkedin.com/company/openai', icon: '💼' },
        { type: 'youtube', name: 'YouTube', handle: 'OpenAI', url: 'https://www.youtube.com/@OpenAI', icon: '📺' },
        { type: 'github', name: 'GitHub', handle: 'OpenAI', url: 'https://github.com/openai', icon: '💻' },
    ],
});

const CategoryPage = () => {
    const [open, setOpen] = useState({
        category: true,
        country: false,
        price: false,
    });
    const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
    const [displayedCards, setDisplayedCards] = useState(cardTestData.slice(0, 6));
    const [page, setPage] = useState(1);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [selectedItem, setSelectedItem] = useState<SelectedItemProps['data'] | null>(null);

    const loadMore = useCallback(() => {
        setDisplayedCards((prev) => [
            ...prev,
            ...cardTestData.map((item) => ({ ...item })),
        ].slice(0, (page + 1) * 6));
        setPage((p) => p + 1);
    }, [page]);

    useEffect(() => {
        if (!observerRef.current) return;
        const observer = new window.IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );
        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [loadMore]);

    const toggle = (key: keyof typeof open) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12 bg-white">
                <Main_Banner Main_Title="Step by Step" Detail_Text="First step to AI" />
                <div className="w-[1280px] mt-8 border border-dashed border-gray-300 rounded-lg min-h-[300px] flex flex-row items-stretch">
                    {/* SortSection (좌측) */}
                    <div className="flex-[2] min-w-[180px] border-r border-gray-200 bg-white flex flex-col p-6">
                        {/* 카테고리별 */}
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2" onClick={() => toggle('category')}>
                            산업별
                            <span className="ml-2"><ArrowIcon open={open.category} /></span>
                        </button>
                        {open.category && (
                            <ul className="pl-2 mb-2">
                                {categoryOptions.map((opt) => (
                                    <li
                                        key={opt}
                                        className={`py-1 text-base cursor-pointer hover:font-bold ${selectedCategory === opt ? 'font-bold text-black' : 'text-gray-700'}`}
                                        onClick={() => setSelectedCategory(opt)}
                                    >
                                        {opt}
                                        <span className="ml-2 text-gray-500">({categoryCounts[opt]})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* 가격별 */}
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2" onClick={() => toggle('price')}>
                            가격별
                            <span className="ml-2"><ArrowIcon open={open.price} /></span>
                        </button>
                        {open.price && (
                            <ul className="pl-2 mb-2">
                                <li className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">
                                    유료
                                    <span className="ml-2 text-gray-500">(123)</span>
                                </li>
                                <li className="py-1 text-base text-gray-700 cursor-pointer hover:font-bold">
                                    무료
                                    <span className="ml-2 text-gray-500">(456)</span>
                                </li>
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
                    </div>
                    {/* ResultSection (우측) */}
                    <div className="flex-[8] flex flex-col p-6">
                        <div className="text-3xl font-bold mb-8">{selectedCategory}</div>
                        <div className="grid grid-cols-3 gap-5">
                            {displayedCards.map((item, idx) => (
                                <Card
                                    key={idx}
                                    size={{ width: 300, height: 300 }}
                                    items={item}
                                    serviceNameFontSize={18}
                                    detailsFontSize={12}
                                    detailsMinHeight={32}
                                    detailsMaxHeight={50}
                                    detailsLineClamp={3}
                                    onClick={() => setSelectedItem(getDetailData(item))}
                                />
                            ))}
                        </div>
                        <div ref={observerRef} style={{ height: 1 }} />
                    </div>
                </div>
            </main>
            <Footer />
            {/* SelectedItem 모달 */}
            <SelectedItem open={!!selectedItem} onClose={() => setSelectedItem(null)} data={selectedItem || getDetailData({})} />
        </>
    );
};

export default CategoryPage;
