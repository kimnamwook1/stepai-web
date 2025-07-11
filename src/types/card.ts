/**
 * BaseCard 컴포넌트 관련 타입 정의
 * DB 구조 기반으로 설계된 카드 데이터 및 Props 타입들
 */

import React from 'react';

// ============================================================================
// 기본 데이터 타입
// ============================================================================

/**
 * DB에서 받아오는 카드 표시용 데이터
 * ai_services 테이블 기반
 */
export interface CardData {
    /** Primary Key (내부 관리용, UI에 표시 안함) */
    serviceId: number;

    /** 서비스명 (ai_name) */
    serviceName: string;

    /** 서비스 설명 (ai_description) */
    description: string;

    /** 카테고리명 (category_name) - 메인페이지에서만 사용 */
    categoryName?: string;

    /** 썸네일 이미지 URL (content_url where content_type='thumbnail') */
    thumbnailUrl: string;

    /** 로고 이미지 URL (content_url where content_type='logo') */
    logoUrl?: string;
}

// ============================================================================
// 섹션 관련 타입
// ============================================================================

/**
 * 각 섹션의 표시 여부 및 설정
 */
export interface SectionProps {
    /** 섹션 표시 여부 */
    show: boolean;

    /** 커스텀 컨텐츠 (선택사항) */
    content?: string;

    /** 추가 CSS 클래스 */
    className?: string;

    /** 인라인 스타일 */
    style?: React.CSSProperties;
}

/**
 * 카드 섹션들의 구성
 */
export interface CardSections {
    /** 카테고리 섹션 (메인페이지에서만 표시) */
    category?: SectionProps;

    /** 썸네일 섹션 (필수) */
    thumbnail: SectionProps;

    /** 로고 섹션 (선택사항) */
    logo?: SectionProps;

    /** 서비스명 섹션 (필수) */
    serviceName: SectionProps;

    /** 상세설명 섹션 (필수) */
    details: SectionProps;
}

// ============================================================================
// Badge 관련 타입
// ============================================================================

/**
 * Badge 위치 옵션
 */
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Badge 타입
 */
export type BadgeType = 'text' | 'image';

/**
 * Badge 크기
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge 오버레이 설정
 */
export interface BadgeProps {
    /** Badge 내용 (텍스트) 또는 이미지 URL */
    content: string;

    /** Badge 위치 */
    position: BadgePosition;

    /** Badge 타입 */
    type: BadgeType;

    /** Badge 크기 */
    size: BadgeSize;

    /** 표시 여부 */
    show?: boolean;

    /** 추가 CSS 클래스 */
    className?: string;

    /** 인라인 스타일 */
    style?: React.CSSProperties;
}

// ============================================================================
// 이벤트 핸들러 타입
// ============================================================================

/**
 * 카드 클릭 이벤트 핸들러
 */
export type CardClickHandler = (serviceId: number) => void;

// ============================================================================
// 메인 Props 타입
// ============================================================================

/**
 * BaseCard 컴포넌트의 Props
 */
export interface BaseCardProps {
    /** 카드 표시용 데이터 (필수) */
    data: CardData;

    /** 섹션 구성 (필수) */
    sections: CardSections;

    /** Badge 오버레이 (선택사항) */
    badge?: BadgeProps;

    /** 카드 크기 설정 */
    size?: number | { width: number; height: number };

    /** 최소 너비 */
    minWidth?: number;

    /** 최소 높이 */
    minHeight?: number;

    /** 카드 클릭 이벤트 핸들러 */
    onCardClick?: CardClickHandler;

    /** 추가 CSS 클래스 */
    className?: string;

    /** 인라인 스타일 */
    style?: React.CSSProperties;

    /** 로딩 상태 */
    isLoading?: boolean;
}

// ============================================================================
// 유틸리티 타입
// ============================================================================

/**
 * 카드 크기 타입
 */
export type CardSize = number | { width: number; height: number };

/**
 * 플레이스홀더 텍스트 설정
 */
export interface PlaceholderTexts {
    serviceName: string;
    description: string;
    category: string;
    thumbnail: string;
    logo: string;
}

/**
 * 기본 플레이스홀더 텍스트
 */
export const DEFAULT_PLACEHOLDERS: PlaceholderTexts = {
    serviceName: '서비스명',
    description: '서비스 설명',
    category: '카테고리',
    thumbnail: '썸네일',
    logo: '로고'
};
