'use client';

import { useState, useRef, useEffect } from 'react';

interface CardData {
    id: number;
    category: string;
    title: string;
    brand: string;
    thumbnail: string;
    logo: string;
    hashtags: string;
    color: string;
}

const ContentsMain = () => {
    const [inputText, setInputText] = useState('');
    // 무한루프 캐러셀: 더미 포함 인덱스
    const [currentIndex, setCurrentIndex] = useState(1); // 1이 실제 첫 카드
    const [isTransitioning, setIsTransitioning] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // 카드 데이터 (순서: 디자인, 이벤트, 공모전)
    const cardData: CardData[] = [
        {
            id: 0,
            category: '디자인',
            title: 'Draph Art',
            brand: 'Creative Studio',
            thumbnail: '/api/placeholder/340/280',
            logo: '/api/placeholder/60/60',
            hashtags: '#광고 #모델이미지 #상품이미지',
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
    // 더미 포함 배열: [2,0,1,2,0]
    const carouselCards = [cardData[2], ...cardData, cardData[0]];

    // 텍스트 영역 자동 높이 조절
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    useEffect(() => { adjustTextareaHeight(); }, [inputText]);

    // 왼쪽(이전) 버튼 클릭 시 역방향 무한 루프
    const goPrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    // 트랜지션 끝나면 더미→실제 카드 jump (양방향)
    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
            setCurrentIndex(carouselCards.length - 2); // 맨 앞 더미 → 실제 마지막
        } else if (currentIndex === carouselCards.length - 1) {
            setCurrentIndex(1); // 맨 뒤 더미 → 실제 첫 카드
        }
    };

    // 자동 회전
    const startAutoRotate = () => {
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        autoRotateRef.current = setInterval(() => {
            goNext();
        }, 3000);
    };
    useEffect(() => { startAutoRotate(); return () => { if (autoRotateRef.current) clearInterval(autoRotateRef.current); }; }, []);

    // 오른쪽(순방향) 이동만 허용
    const goNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    // 카드 클릭 핸들러
    const handleCardClick = (cardId: number) => {
        console.log(`카드 ${cardId} 클릭됨 - 상세페이지 이동 예정`);
    };

    return (
        <section className="px-80 py-16">
            <div className="flex gap-16">
                {/* 대화창 - 좌측 */}
                <div className="w-2/5">
                    <div className="bg-[#d9d9d9] rounded-[30px] p-8 border border-black">
                        <div className="relative">
                            <textarea
                                ref={textareaRef}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="어떤 AI가 필요하세요?"
                                className="w-full bg-transparent text-black placeholder-[#8f8f8f] text-2xl font-semibold leading-[1.5] resize-none outline-none min-h-[60px]"
                                style={{ overflow: 'hidden' }}
                            />
                            {/* 밑줄 */}
                            <div className="w-full h-px bg-black mt-4"></div>
                        </div>
                    </div>
                </div>

                {/* ScrollCard_display - 우측 */}
                <div className="w-3/5 relative">
                    <div className="relative h-[400px] flex items-center justify-center">
                        {/* 좌측 화살표 버튼 */}
                        <button
                            onClick={goPrev}
                            className="absolute left-8 z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                            disabled={isTransitioning}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* 캐러셀 컨테이너 */}
                        <div className="relative w-[420px] h-[320px] overflow-visible rounded-[51px]" style={{overflow: 'visible'}}>
                            {/* 캐러셀 트랙 */}
                            <div
                                ref={trackRef}
                                className="flex h-full"
                                style={{
                                    transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' : 'none',
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                    overflow: 'visible',
                                    position: 'relative',
                                }}
                                onTransitionEnd={handleTransitionEnd}
                            >
                                {carouselCards.map((card, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleCardClick(card.id)}
                                        className="w-full h-full flex-shrink-0 rounded-[51px] cursor-pointer relative"
                                        style={{
                                            backgroundColor: card.color,
                                            position: 'relative',
                                            overflow: 'visible',
                                            zIndex: 1,
                                        }}
                                    >
                                        {/* 뱃지 - 우상단 바깥 */}
                                        <div
                                            className="absolute bg-gray-400 text-white px-4 py-2 rounded-full z-20"
                                            style={{
                                                top: '-32px',
                                                right: '-32px',
                                            }}
                                        >
                                            <span className="text-[18px] font-medium" style={{ fontFamily: 'Inter' }}>
                                                {card.category}
                                            </span>
                                        </div>

                                        {/* 카드 본체 */}
                                        <div className="p-6 h-full flex flex-col">
                                            {/* 썸네일 이미지 */}
                                            <div className="w-[374px] h-[231px] mx-auto rounded-[32px] overflow-hidden mb-3 -mt-2">
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-600">썸네일</span>
                                                </div>
                                            </div>

                                            {/* 하단 영역 */}
                                            <div className="flex-1 flex flex-col">
                                                {/* 로고 */}
                                                <div className="flex items-start mb-2" style={{ marginLeft: '23px' }}>
                                                    <div className="w-[48px] h-[48px] bg-[#f5f04f] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs">로고</span>
                                                    </div>
                                                </div>

                                                {/* 서비스명 */}
                                                <div className="text-center mb-2">
                                                    <h4 className="text-[28px] font-bold text-black" style={{ fontFamily: 'Inter', letterSpacing: '-1.104px' }}>
                                                        {card.title}
                                                    </h4>
                                                </div>

                                                {/* 해시태그 */}
                                                <div style={{ marginLeft: '23px' }}>
                                                    <p className="text-[12px] font-medium text-black" style={{ fontFamily: 'Inter', letterSpacing: '-0.608px' }}>
                                                        {card.hashtags}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 우측 화살표 버튼 */}
                        <button
                            onClick={goNext}
                            className="absolute right-8 z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
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
    );
};

export default ContentsMain; 