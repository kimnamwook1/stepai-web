"use client";

import React from 'react';
import Link from 'next/link';

const testItems = [
    {
        name: 'BaseCard',
        description: 'AI 서비스 카드 기본 컴포넌트',
        path: '/test/basecard',
        status: '🟢 완료',
        features: ['동적 크기 조정', 'Badge 오버레이', '이미지 fallback', '반응형 디자인']
    },
    {
        name: 'NewsCard',
        description: '뉴스 전용 카드 컴포넌트',
        path: '/test/newscard',
        status: '🟡 예정',
        features: ['뉴스 썸네일', '제목/요약', '날짜 표시', '카테고리 배지']
    },
    {
        name: 'TrendCard',
        description: '트렌드/랭킹 전용 카드 컴포넌트',
        path: '/test/trendcard',
        status: '🟡 예정',
        features: ['순위 표시', '변화량 표시', '그래프 아이콘', '컬러 코딩']
    },
    {
        name: 'Buttons',
        description: '버튼 컴포넌트들 (Arrow, Filter, Link)',
        path: '/test/buttons',
        status: '🟡 예정',
        features: ['다양한 크기', '아이콘 조합', '상태별 스타일', '호버 효과']
    },
    {
        name: 'Forms',
        description: '폼 관련 컴포넌트들',
        path: '/test/forms',
        status: '🔴 미정',
        features: ['입력 필드', '유효성 검사', '에러 메시지', '제출 버튼']
    },
    {
        name: 'Navigation',
        description: '네비게이션 관련 컴포넌트들',
        path: '/test/navigation',
        status: '🔴 미정',
        features: ['메뉴', '브레드크럼', '페이지네이션', '탭']
    }
];

export default function TestHubPage() {
    return (
        <div className="w-full min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">

                {/* 헤더 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🧪 컴포넌트 테스트 허브
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        각 컴포넌트를 독립적으로 테스트하고 다양한 props 조합을 확인할 수 있는 테스트 환경입니다.
                    </p>
                </div>

                {/* 테스트 아이템들 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testItems.map((item) => (
                        <div
                            key={item.name}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                        >
                            <div className="p-6">
                                {/* 헤더 */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {item.name}
                                    </h3>
                                    <span className="text-sm">
                                        {item.status}
                                    </span>
                                </div>

                                {/* 설명 */}
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {item.description}
                                </p>

                                {/* 기능 목록 */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        주요 기능:
                                    </h4>
                                    <ul className="space-y-1">
                                        {item.features.map((feature, index) => (
                                            <li key={index} className="text-xs text-gray-500 flex items-center">
                                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 테스트 버튼 */}
                                <Link
                                    href={item.path}
                                    className={`
                                        block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-200
                                        ${item.status.includes('완료')
                                            ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-sm'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }
                                    `}
                                    {...(item.status.includes('완료') ? {} : {
                                        onClick: (e) => e.preventDefault(),
                                        'aria-disabled': true
                                    })}
                                >
                                    {item.status.includes('완료') ? '테스트 시작' : '준비중...'}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 추가 정보 */}
                <div className="mt-16 bg-blue-50 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">
                        📋 테스트 가이드
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
                        <div>
                            <h3 className="font-semibold mb-2">🎯 테스트 목적</h3>
                            <ul className="space-y-1">
                                <li>• 컴포넌트별 독립적 테스트 환경 제공</li>
                                <li>• 다양한 props 조합 및 시나리오 확인</li>
                                <li>• 반응형 디자인 및 크기별 동작 검증</li>
                                <li>• 에러 상황 및 fallback 동작 테스트</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">🔧 사용법</h3>
                            <ul className="space-y-1">
                                <li>• 각 컴포넌트 카드를 클릭하여 테스트 페이지 이동</li>
                                <li>• 실시간으로 props 변경하며 결과 확인</li>
                                <li>• 브라우저 개발자 도구로 상세 분석</li>
                                <li>• 발견한 이슈는 즉시 수정 및 재테스트</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 네비게이션 */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← 메인 페이지로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
