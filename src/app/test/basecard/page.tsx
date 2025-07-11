"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BaseCard } from '@/components/Card';
import type { CardData } from '@/components/Card';

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
    {
        serviceId: 5,
        serviceName: '매우 긴 서비스 이름을 가진 AI 서비스',
        description: '이것은 매우 긴 설명 텍스트입니다. 이 텍스트는 ellipsis 처리가 잘 되는지 확인하기 위한 것으로, 두 줄을 넘어가면 ...으로 표시되어야 합니다. 계속해서 더 긴 텍스트를 작성해보겠습니다.',
        categoryName: '매우 긴 카테고리 이름',
        thumbnailUrl: 'invalid-url', // 이미지 에러 테스트
        logoUrl: 'invalid-url', // 로고 에러 테스트
    },
];

export default function BaseCardTestPage() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const handleCardClick = (serviceId: number) => {
        console.log('🔔 BaseCard clicked!', { serviceId });
        setSelectedCard(serviceId);
        alert(`서비스 ID ${serviceId} 클릭됨!\n실제로는 상세 정보를 조회하여 모달을 열 예정입니다.`);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* 헤더 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🚀 BaseCard 컴포넌트 테스트
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        새로 구현된 BaseCard의 다양한 기능들을 테스트합니다.
                        동적 크기 조정, Badge 오버레이, 이미지 fallback, 반응형 디자인 등을 확인할 수 있습니다.
                    </p>
                </div>

                {/* 메인페이지 스타일 (카테고리 포함) */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                        📌 메인페이지 스타일 <span className="text-sm font-normal text-gray-500 ml-3">(카테고리 포함)</span>
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
                </section>

                {/* 탐색페이지 스타일 (카테고리 제외) */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                        🔍 탐색페이지 스타일 <span className="text-sm font-normal text-gray-500 ml-3">(카테고리 제외)</span>
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
                </section>

                {/* 다양한 크기 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        📏 다양한 크기 테스트
                    </h2>
                    <div className="flex flex-wrap gap-6 items-end justify-center">
                        <div className="text-center">
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
                            <p className="text-sm text-gray-500 mt-2">240×280 (소형)</p>
                        </div>
                        <div className="text-center">
                            <BaseCard
                                data={baseCardTestData[1]}
                                size={{ width: 340, height: 380 }}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                                onCardClick={handleCardClick}
                                className="border-2 border-green-200"
                            />
                            <p className="text-sm text-gray-500 mt-2">340×380 (기본)</p>
                        </div>
                        <div className="text-center">
                            <BaseCard
                                data={baseCardTestData[2]}
                                size={{ width: 450, height: 500 }}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                                onCardClick={handleCardClick}
                                className="border-2 border-purple-200"
                            />
                            <p className="text-sm text-gray-500 mt-2">450×500 (대형)</p>
                        </div>
                    </div>
                </section>

                {/* Badge 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        🏷️ Badge 오버레이 테스트
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <BaseCard
                            data={baseCardTestData[0]}
                            sections={{
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                            badge={{
                                content: 'TOP',
                                position: 'top-left',
                                type: 'text',
                                size: 'sm',
                                show: true,
                                className: 'bg-red-500 text-white'
                            }}
                        />
                        <BaseCard
                            data={baseCardTestData[1]}
                            sections={{
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                            badge={{
                                content: 'NEW',
                                position: 'top-right',
                                type: 'text',
                                size: 'md',
                                show: true,
                                className: 'bg-green-500 text-white'
                            }}
                        />
                        <BaseCard
                            data={baseCardTestData[2]}
                            sections={{
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                            badge={{
                                content: 'HOT',
                                position: 'bottom-left',
                                type: 'text',
                                size: 'lg',
                                show: true,
                                className: 'bg-orange-500 text-white'
                            }}
                        />
                        <BaseCard
                            data={baseCardTestData[3]}
                            sections={{
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                            badge={{
                                content: '🔥',
                                position: 'bottom-right',
                                type: 'text',
                                size: 'md',
                                show: true,
                                className: 'bg-yellow-400 text-gray-800'
                            }}
                        />
                    </div>
                </section>

                {/* 로딩 상태 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        ⏳ 로딩 상태 (스켈레톤 UI) 테스트
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
                </section>

                {/* 에러 상황 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        🚨 에러 상황 & Fallback 테스트
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BaseCard
                            data={baseCardTestData[4]} // 이미지 에러 테스트용 데이터
                            sections={{
                                category: { show: true },
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                        />
                        <BaseCard
                            data={{
                                serviceId: 999,
                                serviceName: '',
                                description: '',
                                categoryName: '',
                                thumbnailUrl: '',
                                logoUrl: '',
                            }}
                            sections={{
                                category: { show: true },
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                        />
                        <BaseCard
                            data={{
                                serviceId: 1000,
                                serviceName: 'A',
                                description: '짧은 설명',
                                categoryName: 'X',
                                thumbnailUrl: 'https://via.placeholder.com/400x225',
                                logoUrl: 'https://via.placeholder.com/64x64',
                            }}
                            sections={{
                                thumbnail: { show: true },
                                logo: { show: true },
                                serviceName: { show: true },
                                details: { show: true },
                            }}
                        />
                    </div>
                </section>

                {/* 섹션별 조건부 렌더링 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        🎛️ 섹션별 조건부 렌더링 테스트
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <BaseCard
                                data={baseCardTestData[0]}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: false },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                            />
                            <p className="text-sm text-gray-500 mt-2">로고 숨김</p>
                        </div>
                        <div className="text-center">
                            <BaseCard
                                data={baseCardTestData[1]}
                                sections={{
                                    thumbnail: { show: false },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: true },
                                }}
                            />
                            <p className="text-sm text-gray-500 mt-2">썸네일 숨김</p>
                        </div>
                        <div className="text-center">
                            <BaseCard
                                data={baseCardTestData[2]}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: true },
                                    details: { show: false },
                                }}
                            />
                            <p className="text-sm text-gray-500 mt-2">설명 숨김</p>
                        </div>
                        <div className="text-center">
                            <BaseCard
                                data={baseCardTestData[3]}
                                sections={{
                                    thumbnail: { show: true },
                                    logo: { show: true },
                                    serviceName: { show: false },
                                    details: { show: true },
                                }}
                            />
                            <p className="text-sm text-gray-500 mt-2">서비스명 숨김</p>
                        </div>
                    </div>
                </section>

                {/* 네비게이션 */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                    <Link
                        href="/test"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← 테스트 허브로 돌아가기
                    </Link>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">다음 구현 예정: NewsCard, TrendCard</p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-700"
                    >
                        메인 페이지 →
                    </Link>
                </div>

                {/* 선택된 카드 정보 표시 */}
                {selectedCard && (
                    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
                        <p className="font-semibold">마지막 클릭된 카드</p>
                        <p>서비스 ID: {selectedCard}</p>
                        <button
                            onClick={() => setSelectedCard(null)}
                            className="mt-2 bg-white text-blue-500 px-2 py-1 rounded text-sm hover:bg-gray-100 transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
