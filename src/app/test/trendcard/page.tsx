"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TrendCard from '@/components/Card/TrendCard';

// TrendCard 테스트 데이터
const trendTestData = [
    {
        rank: 1,
        serviceName: 'ChatGPT',
        category: 'AI 챗봇',
        trendDirection: 'Up' as const,
        homepage: 'https://openai.com/chatgpt',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        snsLinks: {
            youtube: 'https://youtube.com/@OpenAI',
            instagram: 'https://instagram.com/openaidalle',
            facebook: 'https://facebook.com/openai.research',
            x: 'https://x.com/OpenAI',
            threads: 'https://threads.net/@openaidalle',
            linkedin: 'https://linkedin.com/company/openai'
        }
    },
    {
        rank: 2,
        serviceName: 'DALL-E 3',
        category: '이미지 생성',
        trendDirection: 'Up' as const,
        homepage: 'https://openai.com/dall-e-3',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        snsLinks: {
            youtube: 'https://youtube.com/@OpenAI',
            instagram: 'https://instagram.com/openaidalle',
            x: 'https://x.com/OpenAI'
        }
    },
    {
        rank: 3,
        serviceName: 'Midjourney',
        category: '이미지 생성',
        trendDirection: 'Down' as const,
        homepage: 'https://midjourney.com',
        logoUrl: '',
        snsLinks: {
            x: 'https://x.com/midjourney',
            instagram: 'https://instagram.com/midjourney'
        }
    },
    {
        rank: 4,
        serviceName: 'Claude',
        category: 'AI 챗봇',
        trendDirection: 'Up' as const,
        homepage: 'https://claude.ai',
        logoUrl: 'https://anthropic.com/favicon.ico',
        snsLinks: {
            x: 'https://x.com/AnthropicAI',
            linkedin: 'https://linkedin.com/company/anthropic'
        }
    },
    {
        rank: 5,
        serviceName: 'Stable Diffusion',
        category: '이미지 생성',
        trendDirection: 'Down' as const,
        homepage: 'https://stability.ai',
        logoUrl: '',
        snsLinks: {
            youtube: 'https://youtube.com/@StabilityAI',
            x: 'https://x.com/StabilityAI'
        }
    },
    {
        rank: 6,
        serviceName: 'Google Bard',
        category: 'AI 챗봇',
        trendDirection: 'Up' as const,
        homepage: 'https://bard.google.com',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        snsLinks: {
            youtube: 'https://youtube.com/@Google',
            facebook: 'https://facebook.com/Google',
            x: 'https://x.com/Google'
        }
    },
    {
        rank: 7,
        serviceName: 'Perplexity',
        category: 'AI 검색',
        trendDirection: 'Up' as const,
        homepage: 'https://perplexity.ai',
        logoUrl: '',
        snsLinks: {
            x: 'https://x.com/perplexity_ai'
        }
    },
    {
        rank: 8,
        serviceName: 'Character.AI',
        category: 'AI 캐릭터',
        trendDirection: 'Down' as const,
        homepage: 'https://character.ai',
        logoUrl: '',
        snsLinks: {
            x: 'https://x.com/character_ai',
            instagram: 'https://instagram.com/character.ai'
        }
    },
    {
        rank: 9,
        serviceName: 'Runway ML',
        category: '비디오 생성',
        trendDirection: 'Up' as const,
        homepage: 'https://runwayml.com',
        logoUrl: '',
        snsLinks: {
            youtube: 'https://youtube.com/@runwayml',
            instagram: 'https://instagram.com/runwayml',
            x: 'https://x.com/runwayml'
        }
    },
    {
        rank: 10,
        serviceName: 'Notion AI',
        category: '문서·글쓰기',
        trendDirection: 'Down' as const,
        homepage: 'https://notion.so/product/ai',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
        snsLinks: {
            youtube: 'https://youtube.com/@notion',
            x: 'https://x.com/NotionHQ',
            linkedin: 'https://linkedin.com/company/notion-so'
        }
    },
    // 에러 테스트용 데이터
    {
        rank: 11,
        serviceName: '매우 긴 서비스 이름을 가진 AI 서비스 테스트용',
        category: '매우 긴 카테고리 이름을 가진 테스트 카테고리',
        trendDirection: 'Up' as const,
        homepage: '',
        logoUrl: 'invalid-url',
        snsLinks: {}
    }
];

export default function TrendCardTestPage() {
    const [clickLog, setClickLog] = useState<string[]>([]);

    const handleHomepageClick = (homepage: string) => {
        const log = `🏠 홈페이지 클릭: ${homepage}`;
        setClickLog(prev => [log, ...prev.slice(0, 4)]);
        console.log(log);
    };

    const handleSnsClick = (platform: string, url: string) => {
        const log = `📱 SNS 클릭: ${platform} - ${url}`;
        setClickLog(prev => [log, ...prev.slice(0, 4)]);
        console.log(log);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* 헤더 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        📊 TrendCard 컴포넌트 테스트
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        새로 구현된 TrendCard의 다양한 기능들을 테스트합니다.
                        순위 이미지, 트렌드 방향, SNS 링크, 홈페이지 클릭 등을 확인할 수 있습니다.
                    </p>
                </div>

                {/* 1. 기본 랭킹 테스트 (1-10위) */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                        🏆 기본 랭킹 테스트 <span className="text-sm font-normal text-gray-500 ml-3">(1-10위 전체)</span>
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <TrendCard
                            data={trendTestData[0]}
                            showHeader={true}
                            onHomepageClick={handleHomepageClick}
                            onSnsClick={handleSnsClick}
                        />
                        {trendTestData.slice(1, 10).map((data, index) => (
                            <TrendCard
                                key={index + 1}
                                data={data}
                                onHomepageClick={handleHomepageClick}
                                onSnsClick={handleSnsClick}
                            />
                        ))}
                    </div>
                </section>

                {/* 2. 순위 이미지 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        🖼️ 순위 이미지 테스트 (Placeholder)
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-blue-50 border-b">
                            <p className="text-sm text-blue-700">
                                💡 <strong>디자이너 작업 대기 중:</strong> 실제로는 `/rank_1.png ~ /rank_10.png` 이미지가 표시됩니다.
                                현재는 이미지 로드 실패 시 텍스트로 대체됩니다.
                            </p>
                        </div>
                        {trendTestData.slice(0, 5).map((data, index) => (
                            <TrendCard
                                key={index}
                                data={data}
                                onHomepageClick={handleHomepageClick}
                                onSnsClick={handleSnsClick}
                                className="hover:bg-blue-50"
                            />
                        ))}
                    </div>
                </section>

                {/* 3. 트렌드 방향 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        📈 트렌드 방향 테스트 (Up vs Down)
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* UP 트렌드 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-3 bg-red-50 border-b">
                                <h3 className="font-semibold text-red-700">📈 상승 트렌드 (UP)</h3>
                            </div>
                            {trendTestData.filter(data => data.trendDirection === 'Up').slice(0, 4).map((data, index) => (
                                <TrendCard
                                    key={index}
                                    data={data}
                                    onHomepageClick={handleHomepageClick}
                                    onSnsClick={handleSnsClick}
                                />
                            ))}
                        </div>

                        {/* DOWN 트렌드 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-3 bg-blue-50 border-b">
                                <h3 className="font-semibold text-blue-700">📉 하락 트렌드 (DOWN)</h3>
                            </div>
                            {trendTestData.filter(data => data.trendDirection === 'Down').slice(0, 4).map((data, index) => (
                                <TrendCard
                                    key={index}
                                    data={data}
                                    onHomepageClick={handleHomepageClick}
                                    onSnsClick={handleSnsClick}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. 링크 인터랙션 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        🔗 링크 인터랙션 테스트
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 클릭 로그 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-800 mb-4">📋 클릭 로그</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {clickLog.length > 0 ? (
                                    clickLog.map((log, index) => (
                                        <div key={index} className="text-xs bg-gray-50 p-2 rounded text-gray-700">
                                            {log}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">홈페이지나 SNS 아이콘을 클릭해보세요!</p>
                                )}
                            </div>
                            {clickLog.length > 0 && (
                                <button
                                    onClick={() => setClickLog([])}
                                    className="mt-3 text-xs text-red-600 hover:text-red-700"
                                >
                                    로그 지우기
                                </button>
                            )}
                        </div>

                        {/* 인터랙션 테스트용 카드들 */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-3 bg-green-50 border-b">
                                <h3 className="font-semibold text-green-700">🖱️ 클릭 테스트용 카드들</h3>
                                <p className="text-xs text-green-600 mt-1">홈페이지(🏠) 버튼과 SNS 아이콘들을 클릭해보세요</p>
                            </div>
                            {trendTestData.slice(0, 3).map((data, index) => (
                                <TrendCard
                                    key={index}
                                    data={data}
                                    onHomepageClick={handleHomepageClick}
                                    onSnsClick={handleSnsClick}
                                    className="hover:bg-green-50"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. 유연한 섹션 설정 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        ⚙️ 유연한 섹션 설정 테스트 (BaseCard 스타일)
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 커스텀 섹션 설정 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-3 bg-purple-50 border-b">
                                <h3 className="font-semibold text-purple-700">🎨 커스텀 섹션 (카테고리+홈페이지 숨김)</h3>
                                <p className="text-xs text-purple-600 mt-1">특정 섹션만 선택적으로 표시</p>
                            </div>
                            <TrendCard
                                data={trendTestData[0]}
                                showHeader={true}
                                sections={{
                                    rank: { show: true, width: 'w-16', className: 'bg-purple-50' },
                                    serviceName: { show: true, width: 'w-40' },
                                    category: { show: false }, // 숨김
                                    trend: { show: true, width: 'w-32' },
                                    homepage: { show: false }, // 숨김
                                    sns: { show: true, width: 'flex-1' }
                                }}
                                headerLabels={{
                                    rank: '#',
                                    serviceName: '서비스',
                                    trend: '상승/하락',
                                    sns: 'SNS 링크'
                                }}
                                onHomepageClick={handleHomepageClick}
                                onSnsClick={handleSnsClick}
                            />
                            {trendTestData.slice(1, 4).map((item, index) => (
                                <TrendCard
                                    key={index}
                                    data={item}
                                    sections={{
                                        rank: { show: true, width: 'w-16', className: 'bg-purple-50' },
                                        serviceName: { show: true, width: 'w-40' },
                                        category: { show: false },
                                        trend: { show: true, width: 'w-32' },
                                        homepage: { show: false },
                                        sns: { show: true, width: 'flex-1' }
                                    }}
                                    onHomepageClick={handleHomepageClick}
                                    onSnsClick={handleSnsClick}
                                />
                            ))}
                        </div>

                        {/* 최소 구성 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-3 bg-indigo-50 border-b">
                                <h3 className="font-semibold text-indigo-700">📝 최소 구성 (순위+서비스명만)</h3>
                                <p className="text-xs text-indigo-600 mt-1">가장 간단한 순위표 형태</p>
                            </div>
                            <TrendCard
                                data={trendTestData[0]}
                                showHeader={true}
                                sections={{
                                    rank: { show: true, width: 'w-20' },
                                    serviceName: { show: true, width: 'flex-1' },
                                    category: { show: false },
                                    trend: { show: false },
                                    homepage: { show: false },
                                    sns: { show: false }
                                }}
                                headerLabels={{
                                    rank: '순위',
                                    serviceName: 'AI 서비스명'
                                }}
                                onHomepageClick={handleHomepageClick}
                                onSnsClick={handleSnsClick}
                            />
                            {trendTestData.slice(1, 6).map((item, index) => (
                                <TrendCard
                                    key={index}
                                    data={item}
                                    sections={{
                                        rank: { show: true, width: 'w-20' },
                                        serviceName: { show: true, width: 'flex-1' },
                                        category: { show: false },
                                        trend: { show: false },
                                        homepage: { show: false },
                                        sns: { show: false }
                                    }}
                                    onHomepageClick={handleHomepageClick}
                                    onSnsClick={handleSnsClick}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. 에러 상황 & Edge Case 테스트 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        🚨 에러 상황 & Edge Case 테스트
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-yellow-50 border-b">
                            <h3 className="font-semibold text-yellow-700">⚠️ 테스트 시나리오</h3>
                            <ul className="text-sm text-yellow-600 mt-2 space-y-1">
                                <li>• 로고 이미지 로드 실패 (fallback 처리)</li>
                                <li>• 긴 서비스명과 카테고리명 (truncate 처리)</li>
                                <li>• SNS 링크 없음 (공백 처리)</li>
                                <li>• 홈페이지 링크 없음 (- 표시)</li>
                            </ul>
                        </div>
                        <TrendCard
                            data={trendTestData[10]} // 에러 테스트용 데이터
                            onHomepageClick={handleHomepageClick}
                            onSnsClick={handleSnsClick}
                            className="hover:bg-yellow-50"
                        />
                        <TrendCard
                            data={{
                                rank: 12,
                                serviceName: 'A',
                                category: 'X',
                                trendDirection: 'Up',
                                homepage: '',
                                logoUrl: '',
                                snsLinks: {}
                            }}
                            onHomepageClick={handleHomepageClick}
                            onSnsClick={handleSnsClick}
                            className="hover:bg-yellow-50"
                        />
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
                        <p className="text-sm text-gray-500">다음 구현 예정: NewsCard, Button 컴포넌트들</p>
                    </div>

                    <Link
                        href="/trend"
                        className="inline-flex items-center text-gray-600 hover:text-gray-700"
                    >
                        트렌드 페이지 보기 →
                    </Link>
                </div>
            </div>
        </div>
    );
}
