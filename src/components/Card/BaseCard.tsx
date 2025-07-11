/**
 * BaseCard 컴포넌트
 * 서비스 카드 표시를 위한 기본 컴포넌트
 * DB 구조 기반으로 설계되어 serviceId를 통한 상세 조회 지원
 */

import React, { useMemo, useState } from 'react';
import { BaseCardProps, DEFAULT_PLACEHOLDERS, BadgeSize } from '@/types/card';

/**
 * Badge 크기별 스타일 매핑
 */
const BADGE_SIZE_STYLES: Record<BadgeSize, string> = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
};

/**
 * BaseCard 컴포넌트
 * 메인 페이지와 탐색 페이지에서 AI 서비스 정보를 카드 형태로 표시
 */
const BaseCard = React.memo(function BaseCard({
    data,
    sections,
    badge,
    size,
    minWidth = 280,
    minHeight = 320,
    onCardClick,
    className = '',
    style = {},
    isLoading = false
}: BaseCardProps) {

    // ============================================================================
    // 상태 관리
    // ============================================================================

    const [thumbnailError, setThumbnailError] = useState(false);
    const [logoError, setLogoError] = useState(false);

    // ============================================================================
    // 크기 계산 로직 (메모이제이션)
    // ============================================================================

    const cardDimensions = useMemo(() => {
        let width = 340, height = 320;

        if (typeof size === 'number') {
            width = height = size;
        } else if (size && typeof size === 'object') {
            width = size.width;
            height = size.height;
        }

        // 최소 크기 보장
        width = Math.max(width, minWidth);
        height = Math.max(height, minHeight);

        return { width, height };
    }, [size, minWidth, minHeight]);

    // ============================================================================
    // 비율 기반 요소 크기 계산 (메모이제이션)
    // ============================================================================

    const elementSizes = useMemo(() => {
        const { height } = cardDimensions;

        return {
            // 섹션 높이 비율
            thumbnailHeight: Math.round(height * 0.55),
            logoSize: Math.round(height * 0.15),
            logoMinSize: Math.round(height * 0.12),
            logoMaxSize: Math.round(height * 0.18),

            // 폰트 크기 비율
            serviceNameFontSize: Math.max(12, Math.round(height * 0.07)),
            detailsFontSize: Math.max(10, Math.round(height * 0.05)),
            categoryFontSize: Math.max(10, Math.round(height * 0.045)),

            // 간격 비율
            sectionGap: Math.max(4, Math.round(height * 0.03)),
            padding: Math.max(8, Math.round(height * 0.025)),
        };
    }, [cardDimensions]);

    // ============================================================================
    // 이벤트 핸들러
    // ============================================================================

    const handleCardClick = () => {
        if (onCardClick && !isLoading) {
            onCardClick(data.serviceId);
        }
    };

    const handleThumbnailError = () => {
        setThumbnailError(true);
    };

    const handleLogoError = () => {
        setLogoError(true);
    };

    // ============================================================================
    // Badge 위치 계산
    // ============================================================================

    const getBadgePositionStyle = useMemo(() => {
        if (!badge?.show) return {};

        const offset = 8;
        return {
            zIndex: 999,
            top: badge.position.includes('top') ? offset : 'auto',
            bottom: badge.position.includes('bottom') ? offset : 'auto',
            left: badge.position.includes('left') ? offset : 'auto',
            right: badge.position.includes('right') ? offset : 'auto',
        };
    }, [badge]);

    // ============================================================================
    // 로딩 상태 렌더링
    // ============================================================================

    if (isLoading) {
        return (
            <div
                className={`rounded-2xl bg-gray-200 animate-pulse flex flex-col shadow-sm ${className}`}
                style={{
                    width: cardDimensions.width,
                    height: cardDimensions.height,
                    padding: elementSizes.padding,
                    ...style
                }}
            >
                {/* Category 스켈레톤 */}
                {sections.category?.show && (
                    <div className="w-full h-6 bg-gray-300 rounded mb-2" />
                )}

                {/* Thumbnail 스켈레톤 */}
                <div
                    className="w-full bg-gray-300 rounded-xl mb-2"
                    style={{ height: elementSizes.thumbnailHeight }}
                />

                {/* Middle 스켈레톤 */}
                <div className="w-full flex items-center mb-2">
                    {sections.logo?.show && (
                        <div
                            className="bg-gray-300 rounded-full mr-3 flex-shrink-0"
                            style={{
                                width: elementSizes.logoSize,
                                height: elementSizes.logoSize
                            }}
                        />
                    )}
                    <div className="flex-1 h-5 bg-gray-300 rounded" />
                </div>

                {/* Details 스켈레톤 */}
                <div className="w-full space-y-1">
                    <div className="w-full h-3 bg-gray-300 rounded" />
                    <div className="w-3/4 h-3 bg-gray-300 rounded" />
                </div>
            </div>
        );
    }

    // ============================================================================
    // 메인 렌더링
    // ============================================================================

    return (
        <div className="relative flex flex-col items-center">
            {/* ======================================================================
          Category 섹션 (카드 외부)
      ====================================================================== */}
            {sections.category?.show && (
                <div
                    className={`
            text-center mb-2 p-1 bg-blue-50 rounded text-blue-600 font-medium
            ${sections.category.className || ''}
          `}
                    style={{
                        fontSize: elementSizes.categoryFontSize,
                        width: cardDimensions.width,
                        ...sections.category.style
                    }}
                >
                    {sections.category.content || data.categoryName || DEFAULT_PLACEHOLDERS.category}
                </div>
            )}

            {/* 메인 카드 */}
            <div
                onClick={handleCardClick}
                className={`
        rounded-2xl bg-white flex flex-col shadow-sm border border-gray-200
        hover:shadow-md hover:border-gray-300 transition-all duration-200
        ${onCardClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
        ${className}
      `}
                style={{
                    width: cardDimensions.width,
                    height: cardDimensions.height,
                    padding: elementSizes.padding,
                    position: 'relative',
                    ...style
                }}
            >
                {/* ======================================================================
            Thumbnail 섹션 (3단계 완료)
        ====================================================================== */}
                {sections.thumbnail.show && (
                    <div
                        className={`
            w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200
            flex items-center justify-center relative
            ${sections.thumbnail.className || ''}
          `}
                        style={{
                            height: elementSizes.thumbnailHeight,
                            marginBottom: elementSizes.sectionGap,
                            ...sections.thumbnail.style
                        }}
                    >
                        {data.thumbnailUrl && !thumbnailError ? (
                            <img
                                src={data.thumbnailUrl}
                                alt={`${data.serviceName} 썸네일`}
                                className="w-full h-full object-contain"
                                onError={handleThumbnailError}
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                                <svg
                                    className="w-8 h-8 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span style={{ fontSize: elementSizes.detailsFontSize }}>
                                    {DEFAULT_PLACEHOLDERS.thumbnail}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* ======================================================================
            Middle 섹션 - Logo + ServiceName (4단계 완료)
        ====================================================================== */}
                <div
                    className="w-full flex items-center"
                    style={{ marginBottom: elementSizes.sectionGap }}
                >
                    {/* Logo 영역 (1:9 비율 중 1) */}
                    {sections.logo?.show && (
                        <div
                            className={`
              rounded-full bg-gray-50 border border-gray-200 overflow-hidden
              flex items-center justify-center ml-5 mr-5 flex-shrink-0
              ${sections.logo.className || ''}
            `}
                            style={{
                                width: elementSizes.logoSize,
                                height: elementSizes.logoSize,
                                minWidth: elementSizes.logoMinSize,
                                minHeight: elementSizes.logoMinSize,
                                maxWidth: elementSizes.logoMaxSize,
                                maxHeight: elementSizes.logoMaxSize,
                                ...sections.logo.style
                            }}
                        >
                            {data.logoUrl && !logoError ? (
                                <img
                                    src={data.logoUrl}
                                    alt={`${data.serviceName} 로고`}
                                    className="w-full h-full object-contain"
                                    onError={handleLogoError}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <svg
                                        className="w-4 h-4 mx-auto mb-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span style={{ fontSize: Math.max(8, elementSizes.detailsFontSize - 2) }}>
                                        로고
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ServiceName 영역 (1:9 비율 중 9) */}
                    {sections.serviceName.show && (
                        <div className={`flex-1 flex items-center justify-center ${sections.serviceName.className || ''}`}>
                            <span
                                className="font-bold text-gray-900 truncate leading-tight text-center"
                                style={{
                                    fontSize: elementSizes.serviceNameFontSize,
                                    ...sections.serviceName.style
                                }}
                                title={sections.serviceName.content || data.serviceName}
                            >
                                {sections.serviceName.content || data.serviceName || DEFAULT_PLACEHOLDERS.serviceName}
                            </span>
                        </div>
                    )}
                </div>

                {/* ======================================================================
            Details 섹션 (5단계 완료)
        ====================================================================== */}
                {sections.details.show && (
                    <div
                        className={`
            w-full text-gray-600 text-left leading-relaxed px-2
            ${sections.details.className || ''}
          `}
                        style={{
                            fontSize: elementSizes.detailsFontSize,
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'keep-all',
                            ...sections.details.style
                        }}
                        title={sections.details.content || data.description}
                    >
                        {sections.details.content || data.description || DEFAULT_PLACEHOLDERS.description}
                    </div>
                )}

                {/* ======================================================================
            Badge 오버레이 (6단계 완료)
        ====================================================================== */}
                {badge?.show && (
                    <div
                        className={`
            absolute rounded shadow-sm font-medium
            ${badge.type === 'text'
                                ? 'bg-red-500 text-white'
                                : 'bg-white border border-gray-200'
                            }
            ${BADGE_SIZE_STYLES[badge.size]}
            ${badge.className || ''}
          `}
                        style={{
                            ...getBadgePositionStyle,
                            ...badge.style
                        }}
                    >
                        {badge.type === 'image' ? (
                            <img
                                src={badge.content}
                                alt="Badge"
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                            />
                        ) : (
                            badge.content
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

export default BaseCard;
