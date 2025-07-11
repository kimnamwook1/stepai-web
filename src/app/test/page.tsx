"use client";

import React, { useState } from 'react';
import Card from '@/components/Card/Card';
import { BaseCard } from '@/components/Card';
import type { CardData } from '@/components/Card';

// 기존 Card 테스트 데이터
const testCards = [
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
];

// BaseCard 테스트 데이터
const baseCardTestData: CardData[] = [
    {
        serviceId: 1,
        serviceName: 'ChatGPT',
        description: 'AI 기반 대화형 챗봇 서비스로 다양한 질문에 대해 자연스러운 대화를 제공합니다.',
        categoryName: 'AI 챗봇',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    },
    {
        serviceId: 2,
        serviceName: 'DALL-E 3',
        description: '텍스트 설명을 통해 고품질 이미지를 생성하는 AI 이미지 생성 서비스입니다.',
        categoryName: '이미지 생성',
        thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    },
    {
        serviceId: 3,
        serviceName: 'Midjourney',
        description: '창의적이고 예술적인 AI 이미지 생성 플랫폼으로 독특한 스타일의 작품을 만들어냅니다.',
        categoryName: '이미지 생성',
        thumbnailUrl: 'https://images.unsplash.com/photo-1686191128892-19d759e4f0a9?auto=format&fit=crop&w=400&q=80',
        // logoUrl 없음 - fallback 테스트
    },
    {
        serviceId: 4,
        serviceName: 'ClovaX',
        description: '네이버의 AI 언어모델로 한국어에 특화된 자연어 처리 서비스를 제공합니다.',
        categoryName: 'AI 챗봇',
        thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
];

export default function TestPage() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const handleCardClick = (serviceId: number) => {
        console.log('🔔 Card clicked!', { serviceId });
        setSelectedCard(serviceId);
        // 실제로는 여기서 API 호출 후 SelectedItem 모달을 열 예정
        alert(`서비스 ID ${serviceId} 클릭됨!\n실제로는 상세 정보를 조회하여 모달을 열 예정입니다.`);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* BaseCard 테스트 섹션 */}
                <section className="mb-16">
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
                        🚀 BaseCard 컴포넌트 테스트
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        새로 구현된 BaseCard의 다양한 기능들을 테스트해봅니다
                    </p>

                    {/* 메인페이지 스타일 (카테고리 포함) */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            📌 메인페이지 스타일 (카테고리 포함)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {baseCardTestData.map((cardData) => (
                                <BaseCard
                                    key={`main-${cardData.serviceId}`}
                                    data={cardData}
                                    sections={{
                                        category: { show: true },
                                        thumbnail: { show: true },
                                        logo: { show: true },
                                        serviceName: { show: true },
                                        details: { show: true },
                                    }}
                                    onCardClick={handleCardClick}
                                    badge={cardData.serviceId === 2 ? {
                                        content: 'NEW',
                                        position: 'top-right',
                                        type: 'text',
                                        size: 'sm',
                                        show: true
                                    } : undefined}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 탐색페이지 스타일 (카테고리 제외) */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            🔍 탐색페이지 스타일 (카테고리 제외)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {baseCardTestData.slice(0, 3).map((cardData) => (
                                <BaseCard
                                    key={`explore-${cardData.serviceId}`}
                                    data={cardData}
                                    sections={{
                                        category: { show: false }, // 탐색페이지에서는 카테고리 숨김
                                        thumbnail: { show: true },
                                        logo: { show: true },
                                        serviceName: { show: true },
                                        details: { show: true },
                                    }}
                                    onCardClick={handleCardClick}
                                    badge={cardData.serviceId === 1 ? {
                                        content: 'HOT',
                                        position: 'top-left',
                                        type: 'text',
                                        size: 'md',
                                        show: true
                                    } : undefined}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 다양한 크기 테스트 */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            📏 다양한 크기 테스트
                        </h2>
                        <div className="flex flex-wrap gap-6 items-end">
                            <BaseCard
                                data={baseCardTestData[0]}
                                size={{ width: 240, height: 280 }}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                                onCardClick={handleCardClick}
                                className="border-2 border-blue-200"
                            />
                            <BaseCard
                                data={baseCardTestData[1]}
                                size={{ width: 300, height: 350 }}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                                onCardClick={handleCardClick}
                                className="border-2 border-green-200"
                            />
                            <BaseCard
                                data={baseCardTestData[2]}
                                size={{ width: 400, height: 420 }}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                                onCardClick={handleCardClick}
                                className="border-2 border-purple-200"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            좌: 240x280, 중: 300x350, 우: 400x420 크기로 비율 자동 조정 테스트
                        </p>
                    </div>

                    {/* 로딩 상태 테스트 */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            ⏳ 로딩 상태 테스트
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <BaseCard
                                    key={`loading-${i}`}
                                    data={baseCardTestData[0]}
                                    sections={{
                                        category: { show: i === 1 },
                                        thumbnail: { show: true },
                                        logo: { show: true },
                                        serviceName: { show: true },
                                        details: { show: true },
                                    }}
                                    isLoading={true}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 구분선 */}
                <div className="border-t-2 border-gray-300 my-16"></div>

                {/* 기존 Card 테스트 섹션 */}
                <section>
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
                        📝 기존 Card 컴포넌트 (비교용)
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        기존 Card와 새로운 BaseCard 비교
                    </p>
                    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testCards.map((item, idx) => (
                            <Card
                                key={idx}
                                size={{ width: 340, height: 320 }}
                                items={item}
                                thumbnailRowGap={8}
                                detailRowGap={8}
                                detailBottomGap={0}
                                thumbnailHeight={180}
                                thumbnailWidth={"100%"}
                                logoSize={32}
                                logoMinWidth={28}
                                logoMinHeight={28}
                                logoMaxWidth={40}
                                logoMaxHeight={40}
                                logoBackground="#f5f5f5"
                                serviceNameFontSize={20}
                                detailsFontSize={15}
                                detailsMinHeight={32}
                                detailsMaxHeight={52}
                                detailsLineClamp={2}
                            />
                        ))}
                    </div>
                </section>

                {/* 선택된 카드 정보 표시 */}
                {selectedCard && (
                    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                        <p className="font-semibold">마지막 클릭된 카드</p>
                        <p>서비스 ID: {selectedCard}</p>
                        <button
                            onClick={() => setSelectedCard(null)}
                            className="mt-2 bg-white text-blue-500 px-2 py-1 rounded text-sm"
                        >
                            닫기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
