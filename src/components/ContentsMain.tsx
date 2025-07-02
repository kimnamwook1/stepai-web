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

    // 더미 카드 데이터 (향후 API로 교체)
    const cardData: CardData[] = [
        {
            id: 1,
            category: '공모전',
            title: 'Design Contest',
            brand: 'Creative Hub',
            thumbnail: '/api/placeholder/360/202',
            logo: '/api/placeholder/60/60',
            hashtags: '#디자인 #공모전 #창작 #아이디어',
            color: '#81bcff'
        },
        {
            id: 2,
            category: '이벤트',
            title: 'Tech Meetup',
            brand: 'Innovation Space',
            thumbnail: '/api/placeholder/360/202',
            logo: '/api/placeholder/60/60',
            hashtags: '#기술 #네트워킹 #세미나 #교육',
            color: '#fffc97'
        },
        {
            id: 3,
            category: '디자인',
            title: 'Draph Art',
            brand: 'Creative Studio',
            thumbnail: '/api/placeholder/360/202',
            logo: '/api/placeholder/60/60',
            hashtags: '#광고 #모델이미지 #상품이미지...',
            color: '#ffcab3'
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

    // 카드 회전 함수
    const rotateCards = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setCurrentCardIndex((prev) => 
                prev === 0 ? cardData.length - 1 : prev - 1
            );
        } else {
            setCurrentCardIndex((prev) => 
                prev === cardData.length - 1 ? 0 : prev + 1
            );
        }
    };

    // 카드 배열 정렬 (현재 인덱스 기준)
    const getOrderedCards = () => {
        const ordered = [];
        for (let i = 0; i < cardData.length; i++) {
            const index = (currentCardIndex + i) % cardData.length;
            ordered.push(cardData[index]);
        }
        return ordered;
    };

    // 카드 클릭 핸들러 (향후 상세페이지 이동)
    const handleCardClick = (cardId: number) => {
        console.log(`카드 ${cardId} 클릭됨 - 상세페이지 이동 예정`);
        // 향후 router.push() 등으로 상세페이지 이동
    };

    const orderedCards = getOrderedCards();

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

                {/* 회전카드 시스템 - 우측 */}
                <div className="w-3/5 relative">
                    <div className="relative h-[400px] flex items-center justify-center">
                        {/* 좌측 화살표 버튼 */}
                        <button
                            onClick={() => rotateCards('left')}
                            className="absolute left-0 z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* 카드들 */}
                        <div className="relative w-[400px] h-[300px]">
                            {orderedCards.map((card, index) => (
                                <div
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    className={`absolute w-[400px] h-[300px] rounded-[51px] cursor-pointer transition-all duration-600 ease-in-out hover:scale-105 ${
                                        index === 0 ? 'z-10' : index === 1 ? 'z-5' : 'z-0'
                                    }`}
                                    style={{
                                        backgroundColor: card.color,
                                        transform: `translateX(${index * 20}px) translateY(${index * 10}px)`,
                                    }}
                                >
                                    {/* 카드 내용 */}
                                    <div className="p-6 h-full flex flex-col">
                                        {/* 카테고리 */}
                                        <h3 className="text-[36px] font-medium text-black mb-4" style={{ fontFamily: 'Inter', letterSpacing: '-0.792px' }}>
                                            {card.category}
                                        </h3>

                                        {/* 썸네일 이미지 (16:9 비율) */}
                                        <div className="w-[320px] h-[180px] mx-auto rounded-[32px] overflow-hidden mb-4">
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-gray-600">썸네일</span>
                                            </div>
                                        </div>

                                        {/* 하단 영역 */}
                                        <div className="flex-1 flex flex-col justify-end">
                                            {/* 브랜드 로고 & 서비스명 */}
                                            <div className="flex items-center justify-between mb-3">
                                                {/* 브랜드 로고 */}
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-[50px] h-[50px] bg-[#f5f04f] rounded-full flex items-center justify-center">
                                                        <span className="text-xs">로고</span>
                                                    </div>
                                                </div>

                                                {/* 서비스명 (가운데 정렬) */}
                                                <div className="flex-1 text-center">
                                                    <h4 className="text-[48px] font-bold text-black" style={{ fontFamily: 'Inter', letterSpacing: '-1.104px' }}>
                                                        {card.title}
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* 해시태그 */}
                                            <div className="text-center">
                                                <p className="text-[24px] font-medium text-black truncate" style={{ fontFamily: 'Inter', letterSpacing: '-0.608px' }}>
                                                    {card.hashtags}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 우측 화살표 버튼 */}
                        <button
                            onClick={() => rotateCards('right')}
                            className="absolute right-0 z-20 w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 shadow-lg"
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