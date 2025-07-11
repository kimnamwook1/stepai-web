'use client';

import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter, FaThreads, FaLinkedin } from 'react-icons/fa6';

/**
 * TrendCard 컴포넌트용 데이터 인터페이스
 */
export interface TrendCardData {
    rank: number; // 1~10
    serviceName: string;
    category: string;
    trendDirection: 'Up' | 'Down';
    homepage?: string;
    logoUrl?: string;
    snsLinks?: {
        youtube?: string;
        instagram?: string;
        facebook?: string;
        x?: string;
        threads?: string;
        linkedin?: string;
    };
}

/**
 * TrendCard 섹션별 설정
 */
export interface TrendSectionConfig {
    show: boolean;
    width?: string; // Tailwind CSS 클래스 (예: "w-20", "w-32", "flex-1")
    className?: string;
    style?: React.CSSProperties;
}

/**
 * TrendCard 섹션들 구성
 */
export interface TrendSections {
    rank: TrendSectionConfig;
    serviceName: TrendSectionConfig;
    category: TrendSectionConfig;
    trend: TrendSectionConfig;
    homepage: TrendSectionConfig;
    sns: TrendSectionConfig;
}

/**
 * TrendCard 컴포넌트 Props
 */
export interface TrendCardProps {
    data: TrendCardData;
    sections?: Partial<TrendSections>; // BaseCard처럼 섹션별 제어
    onHomepageClick?: (homepage: string) => void;
    onSnsClick?: (platform: string, url: string) => void;
    className?: string;
    showHeader?: boolean; // 테이블 헤더 표시 여부
    headerLabels?: {
        rank?: string;
        serviceName?: string;
        category?: string;
        trend?: string;
        homepage?: string;
        sns?: string;
    };
}

/**
 * 순위별 이미지 (1-10위 모두 이미지로 처리)
 * 실제로는 디자이너가 제작한 이미지로 교체 예정
 */
const rankImages = Array.from({ length: 10 }, (_, i) => `/rank_${i + 1}.png`);

/**
 * 기본 섹션 설정
 */
const DEFAULT_SECTIONS: TrendSections = {
    rank: { show: true, width: 'w-20' },
    serviceName: { show: true, width: 'w-32' },
    category: { show: true, width: 'w-60' },
    trend: { show: true, width: 'w-40' },
    homepage: { show: true, width: 'w-40' },
    sns: { show: true, width: 'flex-1' },
};

/**
 * 기본 헤더 라벨
 */
const DEFAULT_HEADER_LABELS = {
    rank: '순위',
    serviceName: '서비스명',
    category: '카테고리',
    trend: '트렌드',
    homepage: '홈페이지',
    sns: 'SNS',
};

/**
 * 기본 SNS 링크 정보
 */
const snsConfig = [
    { key: 'youtube', icon: FaYoutube, color: 'hover:text-red-600', label: 'YouTube' },
    { key: 'instagram', icon: FaInstagram, color: 'hover:text-pink-500', label: 'Instagram' },
    { key: 'facebook', icon: FaFacebook, color: 'hover:text-blue-600', label: 'Facebook' },
    { key: 'x', icon: FaXTwitter, color: 'hover:text-blue-400', label: 'X (Twitter)' },
    { key: 'threads', icon: FaThreads, color: 'hover:text-gray-700', label: 'Threads' },
    { key: 'linkedin', icon: FaLinkedin, color: 'hover:text-blue-700', label: 'LinkedIn' },
];

/**
 * TrendCard 컴포넌트
 * 트렌드 순위를 표시하는 가로 테이블 형태의 카드
 */
const TrendCard: React.FC<TrendCardProps> = ({
    data,
    sections: propSections,
    onHomepageClick,
    onSnsClick,
    className = '',
    showHeader = false,
    headerLabels: propHeaderLabels
}) => {
    const {
        rank,
        serviceName,
        category,
        trendDirection,
        homepage,
        logoUrl,
        snsLinks = {}
    } = data;

    // 섹션 설정 병합 (BaseCard 패턴)
    const sections = React.useMemo(() => {
        const merged = { ...DEFAULT_SECTIONS };
        if (propSections) {
            Object.keys(propSections).forEach(key => {
                const sectionKey = key as keyof TrendSections;
                if (propSections[sectionKey]) {
                    merged[sectionKey] = { ...merged[sectionKey], ...propSections[sectionKey] };
                }
            });
        }
        return merged;
    }, [propSections]);

    // 헤더 라벨 병합
    const headerLabels = React.useMemo(() => ({
        ...DEFAULT_HEADER_LABELS,
        ...propHeaderLabels
    }), [propHeaderLabels]);

    const handleHomepageClick = () => {
        if (homepage) {
            if (onHomepageClick) {
                onHomepageClick(homepage);
            } else {
                window.open(homepage, '_blank', 'noopener,noreferrer');
            }
        }
    };

    const handleSnsClick = (platform: string, url: string) => {
        if (onSnsClick) {
            onSnsClick(platform, url);
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            {/* 테이블 헤더 (선택적 표시) */}
            {showHeader && (
                <div className="w-full flex flex-row items-center py-3 border-b bg-gray-50 font-semibold text-sm text-gray-600">
                    {sections.rank.show && (
                        <div className={`${sections.rank.width} flex justify-center ${sections.rank.className || ''}`}>
                            {headerLabels.rank}
                        </div>
                    )}
                    {sections.serviceName.show && (
                        <div className={`${sections.serviceName.width} flex justify-center ${sections.serviceName.className || ''}`}>
                            {headerLabels.serviceName}
                        </div>
                    )}
                    {sections.category.show && (
                        <div className={`${sections.category.width} text-center ${sections.category.className || ''}`}>
                            {headerLabels.category}
                        </div>
                    )}
                    {sections.trend.show && (
                        <div className={`${sections.trend.width} text-center ${sections.trend.className || ''}`}>
                            {headerLabels.trend}
                        </div>
                    )}
                    {sections.homepage.show && (
                        <div className={`${sections.homepage.width} text-center ${sections.homepage.className || ''}`}>
                            {headerLabels.homepage}
                        </div>
                    )}
                    {sections.sns.show && (
                        <div className={`${sections.sns.width} text-center ${sections.sns.className || ''}`}>
                            {headerLabels.sns}
                        </div>
                    )}
                </div>
            )}

            {/* 메인 카드 */}
            <div className={`w-full flex flex-row items-center py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200 ${className}`}>

                {/* 순위 */}
                {sections.rank.show && (
                    <div className={`${sections.rank.width} flex justify-center items-center ${sections.rank.className || ''}`} style={sections.rank.style}>
                        <img
                            src={rankImages[rank - 1]}
                            alt={`${rank}위`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                                // 이미지 로드 실패 시 텍스트로 대체
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML = `<span class="text-lg font-bold text-gray-500">${rank}</span>`;
                                }
                            }}
                        />
                    </div>
                )}

                {/* 서비스명/로고 */}
                {sections.serviceName.show && (
                    <div className={`${sections.serviceName.width} flex flex-col items-center ${sections.serviceName.className || ''}`} style={sections.serviceName.style}>
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-1 border border-gray-200">
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt={`${serviceName} 로고`}
                                    className="w-full h-full object-contain rounded-lg"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                            parent.innerHTML = '<div class="text-gray-400 text-xs">로고</div>';
                                        }
                                    }}
                                />
                            ) : (
                                <div className="text-gray-400 text-xs">로고</div>
                            )}
                        </div>
                        <span className="text-xs text-gray-600 truncate max-w-full" title={serviceName}>
                            ({serviceName})
                        </span>
                    </div>
                )}

                {/* 카테고리 */}
                {sections.category.show && (
                    <div className={`${sections.category.width} text-center text-base text-gray-700 truncate px-2 ${sections.category.className || ''}`} style={sections.category.style} title={category}>
                        {category}
                    </div>
                )}

                {/* 트렌드 방향 */}
                {sections.trend.show && (
                    <div className={`${sections.trend.width} text-center font-bold text-base ${sections.trend.className || ''}`} style={sections.trend.style}>
                        <span
                            className={`px-2 py-1 rounded ${trendDirection === 'Up'
                                ? 'text-red-600 bg-red-50'
                                : 'text-blue-600 bg-blue-50'
                                }`}
                        >
                            {trendDirection === 'Up' ? '↗ UP' : '↘ DOWN'}
                        </span>
                    </div>
                )}

                {/* 홈페이지 */}
                {sections.homepage.show && (
                    <div className={`${sections.homepage.width} text-center ${sections.homepage.className || ''}`} style={sections.homepage.style}>
                        {homepage ? (
                            <button
                                onClick={handleHomepageClick}
                                className="text-gray-500 hover:text-gray-700 text-lg transition-colors duration-200"
                                title={`${serviceName} 홈페이지 방문`}
                            >
                                🏠
                            </button>
                        ) : (
                            <span className="text-gray-300">-</span>
                        )}
                    </div>
                )}

                {/* SNS 링크들 */}
                {sections.sns.show && (
                    <div className={`${sections.sns.width} flex justify-center items-center ${sections.sns.className || ''}`} style={sections.sns.style}>
                        {(() => {
                            // 실제로 존재하는 SNS 링크들만 필터링
                            const availableLinks = snsConfig.filter(({ key }) =>
                                snsLinks[key as keyof typeof snsLinks]
                            );

                            if (availableLinks.length === 0) {
                                return <span className="text-gray-300 text-sm">-</span>;
                            }

                            // 최대 6개씩 2줄로 배치
                            const firstRow = availableLinks.slice(0, 3);
                            const secondRow = availableLinks.slice(3, 6);

                            return (
                                <div className="flex flex-col gap-1 items-center">
                                    {/* 첫 번째 줄 */}
                                    <div className="flex flex-row gap-2 justify-center">
                                        {firstRow.map(({ key, icon: Icon, color, label }) => {
                                            const url = snsLinks[key as keyof typeof snsLinks];
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => handleSnsClick(key, url!)}
                                                    className={`text-gray-400 ${color} transition-colors duration-200`}
                                                    title={`${serviceName} ${label} 방문`}
                                                >
                                                    <Icon size={18} />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* 두 번째 줄 (4개 이상일 때만) */}
                                    {secondRow.length > 0 && (
                                        <div className="flex flex-row gap-2 justify-center">
                                            {secondRow.map(({ key, icon: Icon, color, label }) => {
                                                const url = snsLinks[key as keyof typeof snsLinks];
                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => handleSnsClick(key, url!)}
                                                        className={`text-gray-400 ${color} transition-colors duration-200`}
                                                        title={`${serviceName} ${label} 방문`}
                                                    >
                                                        <Icon size={18} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>
        </>
    );
};

export default TrendCard;
