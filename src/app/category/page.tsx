"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main_Banner from "@/components/Main_Banner";
import { useApi, useInfiniteApi } from '@/hooks/useApi';
import { categoryApi, aiCategoryApi } from '@/services';
import { useState, useRef, useEffect, useCallback } from "react";
import Card from '@/components/Card';
import SelectedItem from '@/components/SelectedItem';
import type { SelectedItemProps } from '@/components/SelectedItem';
import type { ApiResponse } from '@/types/api';

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
    // 카테고리 목록 API
    const { data } = useApi(aiCategoryApi.getAllCategories);

    // 디버깅용 로그
    console.log('카테고리 API 응답:', data);
    console.log('카테고리 데이터 구조:', (data as any)?.categories);

    // 아이콘 URL 확인
    if ((data as any)?.categories) {
        (data as any).categories.forEach((cat: any) => {
            console.log(`카테고리: ${cat.category_name}, 아이콘: ${cat.category_icon}`);
        });
    }
    // 선택된 카테고리 id 상태
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    // 선택된 카테고리명 상태
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
    // 카테고리별 서비스 API
    const { data: aiServices, loading: servicesLoading, refetch } = useApi(
        () => categoryApi.getServicesByCategory(selectedCategoryId!, { page: 1, limit: 12 }),
        { enabled: !!selectedCategoryId }
    );

    // 디버깅용 로그
    console.log('선택된 카테고리 ID:', selectedCategoryId);
    console.log('AI 서비스 데이터:', aiServices);

    // selectedCategoryId가 변경될 때마다 API 재호출
    useEffect(() => {
        if (selectedCategoryId) {
            console.log('카테고리 변경으로 인한 API 재호출:', selectedCategoryId);
            refetch();
        }
    }, [selectedCategoryId]);

    // 머티리얼 스타일용 상태
    const [open, setOpen] = useState({ category: true });
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [selectedItem, setSelectedItem] = useState<SelectedItemProps['data'] | null>(null);

    // 카테고리 클릭 핸들러
    const handleCategoryClick = (cat: any) => {
        console.log('카테고리 클릭됨:', cat);
        setSelectedCategoryId(cat.id);
        setSelectedCategoryName(cat.category_name);
    };

    // URL 처리 함수
    const processUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            console.log('URL:', url);
            return url;
        }
        const API_BASE_URL = 'https://web-production-e8790.up.railway.app';
        console.log('API_BASE_URL:', API_BASE_URL);
        console.log('Original URL:', url);
        const processedUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
        console.log('Processed URL:', processedUrl);
        return processedUrl;
    };

    // 서비스 카드 데이터 변환
    const serviceCards = aiServices && (aiServices as any).data && Array.isArray((aiServices as any).data)
        ? (aiServices as any).data.map((service: any) => {
            const imageContent = service.contents?.find((c: any) => c.content_type === 'image');
            const iconContent = service.contents?.find((c: any) => c.content_type === 'icon');
            return {
                thumbnail: processUrl(imageContent?.content_url || ''),
                logo: processUrl(iconContent?.content_url || ''),
                serviceName: service.ai_name || 'AI 서비스',
                details: service.tags && service.tags.length > 0
                    ? `#${service.tags.map((tag: any) => tag.tag_name).join(' #')}`
                    : service.ai_description ? `#${service.ai_description.split(' ').slice(0, 3).join(' #')}` : '#AI #서비스',
            };
        }) : [];

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12 bg-white">
                <Main_Banner Main_Title="Step by Step" Detail_Text="First step to AI" />
                <div className="w-full max-w-7xl flex flex-row gap-6 mt-8">
                    {/* 왼쪽 카테고리 메뉴 */}
                    <aside className="flex-[2] min-w-[220px] bg-white rounded-xl shadow-md p-6 material-input-wrapper">
                        <button className="flex items-center w-full justify-between text-lg font-semibold py-2 mb-2" onClick={() => setOpen(o => ({ ...o, category: !o.category }))}>
                            카테고리별
                            <span className="ml-2"><ArrowIcon open={open.category} /></span>
                        </button>
                        {open.category && (
                            <ul className="pl-2 mb-2">
                                {(data as any)?.categories?.length > 0 ? (
                                    (data as any).categories.map((cat: any) => (
                                        <li
                                            key={cat.id}
                                            className={`py-2 px-3 rounded-lg cursor-pointer transition font-medium flex items-center gap-2 mb-1 material-category-card ${selectedCategoryId === cat.id ? 'bg-blue-50 border-blue-500 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                                            onClick={() => handleCategoryClick(cat)}
                                        >
                                            {cat.category_icon ? (
                                                <img
                                                    src={processUrl(cat.category_icon)}
                                                    alt={cat.category_name}
                                                    className="w-6 h-6 object-contain mr-2"
                                                    crossOrigin="anonymous"
                                                    onError={(e) => {
                                                        console.log('아이콘 로딩 실패:', cat.category_icon);
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-6 h-6 bg-gray-200 rounded mr-2 flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">📁</span>
                                                </div>
                                            )}
                                            <span>{cat.category_name}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400">카테고리가 없습니다.</li>
                                )}
                            </ul>
                        )}
                    </aside>
                    {/* 오른쪽 결과 영역 */}
                    <section className="flex-[8] flex flex-col p-6 bg-white rounded-xl shadow-md material-input-wrapper">
                        <div className="text-2xl font-bold mb-8 min-h-[32px]">{selectedCategoryName || '카테고리를 선택하세요'}</div>
                        <div className="grid grid-cols-3 gap-6">
                            {serviceCards.length === 0 && !servicesLoading && (
                                <div className="col-span-3 text-center text-gray-400 py-12">서비스가 없습니다.</div>
                            )}
                            {serviceCards.map((item: any, idx: number) => (
                                <div key={idx} className="material-category-card flex flex-col items-center p-4 rounded-xl shadow hover:shadow-lg transition">
                                    {/* 썸네일 */}
                                    <div className="w-full h-36 rounded-lg bg-gray-100 flex items-center justify-center mb-3 overflow-hidden relative">
                                        {item.thumbnail ? (
                                            <img
                                                src={item.thumbnail}
                                                alt="썸네일"
                                                className="w-full h-full object-cover"
                                                crossOrigin="anonymous"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                        ) : null}
                                        <span className={`text-gray-400 ${item.thumbnail ? 'hidden' : ''}`}>이미지</span>
                                    </div>
                                    {/* 로고+서비스명 */}
                                    <div className="flex items-center w-full mb-2">
                                        <div className="w-10 h-10 rounded-full bg-[#f5f04f] flex items-center justify-center mr-3 overflow-hidden relative">
                                            {item.logo ? (
                                                <img
                                                    src={item.logo}
                                                    alt="로고"
                                                    className="w-full h-full object-contain rounded-full"
                                                    crossOrigin="anonymous"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : null}
                                            <span className={`text-xs text-gray-700 ${item.logo ? 'hidden' : ''}`}>로고</span>
                                        </div>
                                        <span className="text-lg font-bold text-black" style={{ fontFamily: 'Inter' }}>{item.serviceName}</span>
                                    </div>
                                    {/* 해시태그 */}
                                    <div className="w-full min-h-[32px]">
                                        <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Inter' }}>{item.details}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
            {/* SelectedItem 모달 */}
            <SelectedItem open={!!selectedItem} onClose={() => setSelectedItem(null)} data={selectedItem || getDetailData({})} />
        </>
    );
};

export default CategoryPage;
