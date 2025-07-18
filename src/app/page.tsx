'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useApi } from '@/hooks/useApi';
import { mainApi, aiCategoryApi } from '@/services';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

function Body_ContentsMainSection() {
    // Body_ContentsMain 내부 state/로직
    const [inputText, setInputText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // 0~2
    const [isTransitioning, setIsTransitioning] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

    // AI 서비스 검색 API 연동
    const { data: searchResults, loading: searchLoading, refetch: searchAIServices } = useApi(
        () => inputText ? mainApi.searchAIServices(inputText) : Promise.resolve({ success: true, data: [], message: '' }),
        { enabled: !!inputText } // 입력이 있을 때만 호출
    );

    const HASHTAGS = '#광고 #모델이미지 #상품이미지';

    // 기본 카드 데이터 (검색 결과가 없을 때 표시)
    const defaultCardData = [
        {
            id: 0,
            category: '디자인',
            title: 'Draph Art',
            brand: 'Creative Studio',
            thumbnail: '/api/placeholder/340/280',
            logo: '/api/placeholder/60/60',
            hashtags: HASHTAGS,
            color: '#ffcab3'
        },
        {
            id: 1,
            category: '이벤트',
            title: 'Tech Meetup',
            brand: 'Innovation Space',
            thumbnail: '/api/placeholder/340/280',
            logo: '/api/placeholder/60/60',
            hashtags: '#기술 #네트워킹 #세미나 #교육',
            color: '#fffc97'
        },
        {
            id: 2,
            category: '공모전',
            title: 'Design Contest',
            brand: 'Creative Hub',
            thumbnail: '/api/placeholder/340/280',
            logo: '/api/placeholder/60/60',
            hashtags: '#디자인 #공모전 #창작 #아이디어',
            color: '#81bcff'
        }
    ];

    // 검색 결과를 카드 데이터로 변환
    const cardData = (() => {
        if (searchResults && Array.isArray(searchResults) && searchResults.length > 0) {
            return searchResults.slice(0, 3).map((service: any, index: number) => ({
                id: service.id,
                category: service.ai_type || 'AI 서비스',
                title: service.ai_name,
                brand: service.nationality || 'Unknown',
                thumbnail: '/api/placeholder/340/280',
                logo: '/api/placeholder/60/60',
                hashtags: service.ai_description ? `#${service.ai_description.split(' ').slice(0, 3).join(' #')}` : '#AI #서비스',
                color: ['#ffcab3', '#fffc97', '#81bcff'][index % 3]
            }));
        }
        return defaultCardData;
    })();

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    useEffect(() => { adjustTextareaHeight(); }, [inputText]);

    const getIndex = (idx: number) => (idx + cardData.length) % cardData.length;

    const goNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => getIndex(prev + 1));
    };
    const goPrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => getIndex(prev - 1));
    };
    useEffect(() => {
        if (!isTransitioning) return;
        const timer = setTimeout(() => setIsTransitioning(false), 500);
        return () => clearTimeout(timer);
    }, [isTransitioning]);

    useEffect(() => {
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        autoRotateRef.current = setInterval(() => {
            goNext();
        }, 3000);
        return () => { if (autoRotateRef.current) clearInterval(autoRotateRef.current); };
    }, []);

    const handleCardClick = (cardId: number) => {
        console.log(`카드 ${cardId} 클릭됨 - 상세페이지 이동 예정`);
    };

    return (
        <div className="bg-white">
            <main className="pt-[0px]">
                {/* Body_ContentsMain의 return 전체를 1:1로 복사 */}
                <section className="pb-16 pt-0">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-end">
                        {/* 대화창 - 좌측 */}
                        <div className="w-full lg:w-2/5">
                            <div className="material-input-wrapper">
                                <div className="material-input-container">
                                    <textarea
                                        ref={textareaRef}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder=" "
                                        className="material-input"
                                        style={{ overflow: 'hidden' }}
                                    />
                                    <label className="material-label">
                                        어떤 AI가 필요하세요?
                                    </label>

                                    {/* 입력 버튼 - 오른쪽 아래 */}
                                    {inputText.trim() && (
                                        <button
                                            onClick={() => {
                                                console.log('입력된 텍스트:', inputText);
                                                // 여기에 입력 처리 로직 추가
                                            }}
                                            className="material-button"
                                        >
                                            입력
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Carousel_cards_container - 우측 */}
                        <div className="w-full lg:w-3/5 flex justify-center">
                            <div
                                className="Carousel_cards_container relative w-full max-w-[600px] h-[300px] sm:h-[350px] lg:h-[400px] flex items-center justify-center"
                                style={{ marginTop: '-50px' }}
                            >
                                {/* 좌측 화살표 버튼 */}
                                <button
                                    onClick={goPrev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                                    disabled={isTransitioning}
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                {/* 카드 전체 래퍼: 항상 중앙 고정 */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] h-[240px] sm:h-[280px] lg:h-[320px]">
                                    <div className="relative w-full h-full">
                                        {cardData.map((card, idx: number) => {
                                            let diff = idx - currentIndex;
                                            if (diff < -1) diff += cardData.length;
                                            if (diff > 1) diff -= cardData.length;
                                            let style: React.CSSProperties = {
                                                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                zIndex: 0,
                                                transform: 'scale(0.92) translateX(46px)',
                                            };
                                            if (diff === 0) {
                                                style = {
                                                    ...style,
                                                    zIndex: 6,
                                                    opacity: 1,
                                                    transform: 'scale(1) translateX(0)',
                                                    top: 0,
                                                };
                                            } else if (diff === 1 || diff === -2) {
                                                style = {
                                                    ...style,
                                                    zIndex: 5,
                                                    opacity: 1,
                                                    transform: 'scale(0.96) translateX(24px)',
                                                    top: '6px',
                                                };
                                            } else if (diff === -1 || diff === 2) {
                                                style = {
                                                    ...style,
                                                    zIndex: 4,
                                                    opacity: 1,
                                                    transform: 'scale(0.92) translateX(46px)',
                                                    top: '12px',
                                                };
                                            }
                                            return (
                                                <div
                                                    key={card.id}
                                                    onClick={() => handleCardClick(card.id as number)}
                                                    className="overflow-visible rounded-[51px] cursor-pointer"
                                                    style={{
                                                        ...style,
                                                        backgroundColor: card.color,
                                                    }}
                                                >
                                                    {/* 뱃지 - 좌상단 바깥 */}
                                                    <div
                                                        className="absolute bg-gray-400 text-white px-4 py-2 rounded-full z-20"
                                                        style={{
                                                            top: '-2px',
                                                            left: '-32px',
                                                        }}
                                                    >
                                                        <span className="text-[18px] font-medium" style={{ fontFamily: 'Inter' }}>
                                                            {card.category}
                                                        </span>
                                                    </div>
                                                    {/* 카드 본체 */}
                                                    <div className="p-6 h-full flex flex-col">
                                                        {/* 썸네일 이미지 */}
                                                        <div className="w-full h-[160px] sm:h-[200px] lg:h-[280px] mx-auto rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden mb-3 -mt-2">
                                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                                <span className="text-gray-600 text-sm sm:text-base">썸네일</span>
                                                            </div>
                                                        </div>
                                                        {/* 하단 영역 */}
                                                        <div className="flex-1 flex flex-col justify-center">
                                                            {/* 로고+서비스명 수평 정렬 */}
                                                            <div className="flex flex-row items-center mb-2 px-3 sm:px-4 lg:px-6">
                                                                <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[48px] lg:h-[48px] bg-[#f5f04f] rounded-full flex items-center justify-center flex-shrink-0 mr-2 sm:mr-3">
                                                                    <span className="text-xs">로고</span>
                                                                </div>
                                                                <h4 className="text-lg sm:text-xl lg:text-[28px] font-bold text-black" style={{ fontFamily: 'Inter', letterSpacing: '-1.104px' }}>
                                                                    {card.title}
                                                                </h4>
                                                            </div>
                                                            {/* 해시태그 - 아래쪽에 고정 */}
                                                            <div className="mt-auto px-3 sm:px-4 lg:px-6">
                                                                <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-medium text-black" style={{ fontFamily: 'Inter', letterSpacing: '-0.608px' }}>
                                                                    {card.hashtags}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* 우측 화살표 버튼 */}
                                <button
                                    onClick={goNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                                    disabled={isTransitioning}
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function Body_CategorySection() {
    // 카테고리 데이터 가져오기
    const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useApi(aiCategoryApi.getAICategories);

    // URL 처리 함수
    const processUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://web-production-e8790.up.railway.app';
        return `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
    };

    // Carousel_Main_Category 내부 함수
    function Carousel_Main_Category({ category, onClick }: { category: { name: string; icon: string | null }; onClick: () => void }) {
        return (
            <div
                className="w-[80px] h-[90px] sm:w-[100px] sm:h-[110px] lg:w-[120px] lg:h-[130px] flex flex-col items-center cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                onClick={onClick}
            >
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] bg-gray-200 flex items-center justify-center rounded-md mt-2 sm:mt-3 lg:mt-4 mb-1 sm:mb-2 relative">
                    {category.icon ? (
                        <img
                            src={category.icon}
                            alt={category.name}
                            className="w-full h-full object-contain rounded-md"
                            crossOrigin="anonymous"
                            onError={(e) => {
                                console.log('Image load error for:', category.icon);
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.parentElement?.querySelector('.icon-fallback');
                                if (fallback) {
                                    fallback.classList.remove('hidden');
                                }
                            }}
                            onLoad={(e) => {
                                console.log('Image loaded successfully:', category.icon);
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'block';
                                const fallback = target.parentElement?.querySelector('.icon-fallback');
                                if (fallback) {
                                    fallback.classList.add('hidden');
                                }
                            }}
                        />
                    ) : null}
                    <span className="text-gray-400 text-xs font-semibold select-none icon-fallback hidden">
                        {category.name.charAt(0)}
                    </span>
                </div>
                <span className="text-[10px] sm:text-[11px] lg:text-[13px] font-medium text-center text-gray-800 select-none tracking-tighter whitespace-nowrap px-1">
                    {category.name.replace(/\s*·\s*/g, '·')}
                </span>
            </div>
        );
    }

    // Merged_Carousel_Main_Category 내부 함수
    function Merged_Carousel_Main_Category() {
        // 기본 카테고리 (로딩 중이거나 에러일 때)
        const defaultCategories = [
            { name: '준비중입니다', icon: null },
        ];

        // API 데이터를 카테고리 리스트로 변환 (useMemo로 메모이제이션)
        const categories = useMemo(() => {
            console.log('Processing categoriesData:', categoriesData);

            if (categoriesData && (categoriesData as any).data && Array.isArray((categoriesData as any).data)) {
                // PaginatedResponse 구조인 경우
                return (categoriesData as any).data.map((category: any) => ({
                    name: category.category_name,
                    icon: processUrl(category.category_icon)
                }));
            } else if (categoriesData && Array.isArray((categoriesData as any).categories)) {
                // categories 배열이 직접 있는 경우
                return (categoriesData as any).categories.map((category: any) => ({
                    name: category.category_name,
                    icon: processUrl(category.category_icon)
                }));
            } else if (categoriesData && Array.isArray(categoriesData)) {
                // 배열이 직접 반환되는 경우
                return categoriesData.map((category: any) => ({
                    name: category.category_name,
                    icon: processUrl(category.category_icon)
                }));
            }

            console.log('Using default categories');
            return defaultCategories;
        }, [categoriesData]);

        const [categoryList, setCategoryList] = useState<Array<{ name: string; icon: string | null }>>(categories);

        // categories가 변경될 때 categoryList 업데이트
        useEffect(() => {
            if (categories && categories.length > 0) {
                setCategoryList(categories);
            }
        }, [categories]);

        const handleLeft = () => {
            setCategoryList((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
        };
        const handleRight = () => {
            setCategoryList((prev) => [...prev.slice(1), prev[0]]);
        };
        return (
            <div className="w-full flex justify-center py-0 bg-transparent px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl flex items-center justify-center">
                    <button
                        onClick={handleLeft}
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors duration-300 mr-1"
                        aria-label="왼쪽으로 이동"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex gap-[1px] tablet:gap-0 overflow-x-visible flex-1 justify-center">
                        {categoryList.map((category, idx) => (
                            <Carousel_Main_Category
                                key={idx}
                                category={category}
                                onClick={() => { }}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleRight}
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors duration-300 ml-1"
                        aria-label="오른쪽으로 이동"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    // Body_CategorySection의 반환 JSX
    return (
        <section className="w-full py-0 pb-16 bg-white">
            <Merged_Carousel_Main_Category />
        </section>
    );
}

function Body_TopTrendsSection() {
    // AI 서비스 데이터 가져오기
    const { data: aiServices, loading, error } = useApi(mainApi.getTrends);

    // URL 처리 함수
    const processUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://web-production-e8790.up.railway.app';
        return `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
    };

    // 기본 데이터 (로딩 중이거나 에러일 때)
    const defaultTrendSets = Array(10).fill(0).map(() => ({
        category: '카테고리',
        title: '서비스',
        thumbnail: '이미지',
        logo: '로고',
        hashtags: '해시태그'
    }));

    // API 데이터를 트렌드 세트로 변환
    const trendSets = aiServices && (aiServices as any).data && Array.isArray((aiServices as any).data) && (aiServices as any).data.length > 0
        ? (aiServices as any).data.slice(0, 10).map((service: any) => {
            // contents에서 이미지와 아이콘 찾기
            const imageContent = service.contents?.find((content: any) => content.content_type === 'image');
            const iconContent = service.contents?.find((content: any) => content.content_type === 'icon');

            // 태그들을 해시태그로 변환
            const hashtags = service.tags && service.tags.length > 0
                ? `#${service.tags.map((tag: any) => tag.tag_name).join(' #')}`
                : service.ai_description ? service.ai_description.slice(0, 20) + '...' : '해시태그';

            return {
                category: service.ai_type || 'AI 서비스',
                title: service.ai_name,
                thumbnail: processUrl(imageContent?.content_url || ''),
                logo: processUrl(iconContent?.content_url || ''),
                hashtags: hashtags
            };
        })
        : defaultTrendSets;

    const CARD_WIDTH = 278;
    const CARD_HEIGHT = 330;
    const CARD_GAP = 24;
    const VISIBLE_COUNT = 4;
    const BUTTON_SIZE = 48;
    const SECTION_WIDTH = 1920;
    const SECTION_HEIGHT = 480;
    const SIDE_PADDING = 320;
    const BOTTOM_PADDING = 64;

    const [startIdx, setStartIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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

    const getVisibleSets = () => {
        return Array(VISIBLE_COUNT).fill(0).map((_, i) => trendSets[(startIdx + i) % trendSets.length]);
    };

    return (
        <section
            className="flex flex-col justify-center py-12 lg:py-16"
            style={{
                background: "#fff",
                margin: '50px 0'
            }}
        >
            {/* 섹션 제목 */}
            <div className="w-full flex justify-center mb-8 lg:mb-12">
                <span className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-black" style={{ fontFamily: 'Inter' }}>
                    Top 인기
                </span>
            </div>
            {/* 카드 캐러셀 */}
            <div className="relative flex items-center w-full justify-center px-4 sm:px-6 lg:px-8" style={{ minHeight: '280px' }}>
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
                    className="flex transition-transform duration-500 gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl justify-center"
                    style={{ overflow: 'hidden' }}
                >
                    {getVisibleSets().map((set, index) => (
                        <div
                            key={`${set.category}-${startIdx + index}`}
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
                                {/* 썸네일 이미지 */}
                                <div
                                    className="w-full flex items-center justify-center relative"
                                    style={{ height: 185, background: '#e5e7eb', borderRadius: '22px 22px 0 0', overflow: 'hidden' }}
                                >
                                    {set.thumbnail ? (
                                        <img
                                            src={set.thumbnail}
                                            alt="썸네일"
                                            className="w-full h-full object-cover"
                                            crossOrigin="anonymous"
                                            style={{ display: 'block' }}
                                            onError={e => {
                                                e.currentTarget.style.display = 'none';
                                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (fallback) fallback.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg bg-[#e5e7eb]"
                                        style={{ display: set.thumbnail ? 'none' : 'flex' }}
                                    >
                                        이미지
                                    </span>
                                </div>
                                {/* 로고+서비스명 */}
                                <div className="flex items-center mt-4 mb-2 w-full px-6">
                                    <div className="w-10 h-10 rounded-full bg-[#f5f04f] flex items-center justify-center mr-3 overflow-hidden relative">
                                        {set.logo ? (
                                            <img
                                                src={set.logo}
                                                alt="로고"
                                                className="w-full h-full object-contain rounded-full"
                                                crossOrigin="anonymous"
                                                style={{ display: 'block' }}
                                                onError={e => {
                                                    e.currentTarget.style.display = 'none';
                                                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <span
                                            className="absolute inset-0 flex items-center justify-center text-xs text-gray-700 bg-[#f5f04f]"
                                            style={{ display: set.logo ? 'none' : 'flex' }}
                                        >
                                            로고
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-black" style={{ fontFamily: 'Inter' }}>{set.title}</span>
                                </div>
                                {/* 해시태그 */}
                                <div className="w-full px-6 mt-auto mb-4">
                                    <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'Inter' }}>{set.hashtags}</span>
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
}

function Body_TopStepsSection() {
    // 내부 placeholder 데이터 및 상수
    const CARD_WIDTH = 278;
    const CARD_HEIGHT = 371;
    const CARD_GAP = 24;
    const VISIBLE_COUNT = 4;
    const BUTTON_SIZE = 48;
    const SECTION_WIDTH = 1920;
    const SECTION_HEIGHT = 480;
    const SIDE_PADDING = 320;
    const BOTTOM_PADDING = 64;

    const placeholderSets = Array(10).fill(0).map(() => ({
        category: '카테고리',
    }));

    const [startIdx, setStartIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev + 1) % placeholderSets.length);
    }, [isAnimating]);
    const handlePrev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStartIdx((prev) => (prev - 1 + placeholderSets.length) % placeholderSets.length);
    }, [isAnimating]);

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

    const getVisibleSets = () => {
        return Array(VISIBLE_COUNT).fill(0).map((_, i) => placeholderSets[(startIdx + i) % placeholderSets.length]);
    };

    // 필요시 하위 컴포넌트/함수 중첩 선언 가능

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
                    Top 스텝(전문가)
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
                    {getVisibleSets().map((set, idx) => (
                        <div
                            key={set.category + idx}
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
}

function Body_NewsSection() {
    // 내부 상수 및 데이터
    const SECTION_WIDTH = 1920;
    const SECTION_HEIGHT = 400;
    const SIDE_PADDING = 320;
    const VERTICAL_MARGIN = 0;
    const CARD_WIDTH = 180;
    const CARD_HEIGHT = 135;
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

    // 필요시 하위 컴포넌트/함수 중첩 선언 가능

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
}

export default function Home() {
    return (
        <div className="bg-white min-h-screen w-full overflow-x-hidden">
            <Header />
            <main className="pt-[110px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                    <Body_ContentsMainSection />
                    <Body_CategorySection />
                    <Body_TopTrendsSection />
                    <Body_TopStepsSection />
                    <Body_NewsSection />
                </div>
            </main>
            <Footer />
        </div>
    );
}

