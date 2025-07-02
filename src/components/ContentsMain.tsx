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
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

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

    // 텍스트 영역 자동 높이 조절
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [inputText]);

    // 자동 회전 함수
    const startAutoRotate = () => {
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }
        autoRotateRef.current = setInterval(() => {
            setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
        }, 3000);
    };

    // 수동 회전 함수
    const rotateCards = (direction: 'left' | 'right') => {
        // 자동 회전 멈추고 다시 시작
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }
        
        if (direction === 'left') {
            setCurrentCardIndex((prev) => 
                prev === 0 ? cardData.length - 1 : prev - 1
            );
        } else {
            setCurrentCardIndex((prev) => 
                prev === cardData.length - 1 ? 0 : prev + 1
            );
        }
        
        // 3초 후 자동 회전 재시작
        setTimeout(startAutoRotate, 3000);
    };

    // 카드 클릭 핸들러
    const handleCardClick = (cardId: number) => {
        console.log(`카드 ${cardId} 클릭됨 - 상세페이지 이동 예정`);
    };

    // 표시할 카드 순서 계산 (현재 인덱스 기준)
    const getDisplayCards = () => {
        const cards = [];
        for (let i = 0; i < 3; i++) {
            const cardIndex = (currentCardIndex + i) % cardData.length;
            cards.push({
                ...cardData[cardIndex],
                displayIndex: i, // 0: 앞(100%), 1: 중간(90%), 2: 뒤(80%)
            });
        }
        return cards;
    };

    // 컴포넌트 마운트 시 자동 회전 시작
    useEffect(() => {
        startAutoRotate();
        return () => {
            if (autoRotateRef.current) {
                clearInterval(autoRotateRef.current);
            }
        };
    }, []);

    const displayCards = getDisplayCards();

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
                    <div className="relative h-[400px] flex items-end justify-center">
                        {/* 좌측 화살표 버튼 - 1번 카드 기준 좌측 30px, 1번 카드와 수직 센터 */}
                        <button
                            onClick={() => rotateCards('left')}
                            className="absolute z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                            style={{
                                left: '-54px', // 카드 컨테이너 좌측에서 30px + 버튼 반지름
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* 카드들 */}
                        <div className="relative" style={{ width: '500px', height: '320px' }}>
                            {displayCards.map((card) => {
                                const scale = card.displayIndex === 0 ? 1 : card.displayIndex === 1 ? 0.9 : 0.8;
                                const zIndex = 30 - card.displayIndex * 10;
                                
                                // 간단한 겹침: 각각 20px씩만 보이도록
                                const leftOffset = card.displayIndex === 0 ? 0 :      // 1번: 기준점
                                                   card.displayIndex === 1 ? 20 :     // 2번: 20px 오른쪽
                                                   card.displayIndex === 2 ? 40 :     // 3번: 40px 오른쪽  
                                                   0;
                                
                                return (
                                    <div
                                        key={`${card.id}-${card.displayIndex}`}
                                        onClick={() => handleCardClick(card.id)}
                                        className="absolute bottom-0 cursor-pointer transition-all duration-600 ease-in-out"
                                        style={{
                                            transform: `scale(${scale})`,
                                            transformOrigin: 'bottom left',
                                            zIndex: zIndex,
                                            left: `${leftOffset}px`
                                        }}
                                    >
                                        {/* 뱃지 - 좌상단 삐져나옴 */}
                                        <div 
                                            className="absolute bg-gray-400 text-white px-4 py-2 rounded-full z-10"
                                            style={{
                                                top: '-8px',
                                                left: '-8px'
                                            }}
                                        >
                                            <span className="text-[18px] font-medium" style={{ fontFamily: 'Inter' }}>
                                                {card.category}
                                            </span>
                                        </div>

                                        {/* 카드 본체 */}
                                        <div 
                                            className="w-[420px] h-[320px] rounded-[51px] p-6 flex flex-col"
                                            style={{ backgroundColor: card.color }}
                                        >
                                            {/* 썸네일 이미지 - 10% 크게, 위로 올림 */}
                                            <div className="w-[374px] h-[231px] mx-auto rounded-[32px] overflow-hidden mb-3 -mt-2">
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-600">썸네일</span>
                                                </div>
                                            </div>

                                            {/* 하단 영역 */}
                                            <div className="flex-1 flex flex-col">
                                                {/* 로고 - 썸네일 좌측정렬, 20% 크게 */}
                                                <div className="flex items-start mb-2" style={{ marginLeft: '23px' }}>
                                                    <div className="w-[48px] h-[48px] bg-[#f5f04f] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs">로고</span>
                                                    </div>
                                                </div>

                                                {/* 서비스명 - 가운데 정렬 */}
                                                <div className="text-center mb-2">
                                                    <h4 className="text-[28px] font-bold text-black" style={{ fontFamily: 'Inter', letterSpacing: '-1.104px' }}>
                                                        {card.title}
                                                    </h4>
                                                </div>

                                                {/* 해시태그 - 썸네일 좌측정렬 */}
                                                <div style={{ marginLeft: '23px' }}>
                                                    <p className="text-[12px] font-medium text-black" style={{ fontFamily: 'Inter', letterSpacing: '-0.608px' }}>
                                                        {card.hashtags}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 우측 화살표 버튼 - 3번 카드 기준 우측 30px, 1번 카드와 수직 센터 */}
                        <button
                            onClick={() => rotateCards('right')}
                            className="absolute z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                            style={{
                                right: '-54px', // 카드 컨테이너 우측에서 30px + 버튼 반지름
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
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