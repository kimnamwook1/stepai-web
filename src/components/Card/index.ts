/**
 * Card 컴포넌트들 통합 export
 * 모든 Card 관련 컴포넌트와 타입을 한 곳에서 관리
 */

// ============================================================================
// 컴포넌트 exports
// ============================================================================

// 새로 구현한 BaseCard 컴포넌트
export { default as BaseCard } from './BaseCard';

// 기존 Card 컴포넌트들 (하위 호환성 유지)
export { default as Card } from './Card';
export { default as CardNews } from './CardNews';
export { default as CardWithBadge } from './CardWithBadge';
export { default as TrendCard } from './TrendCard';

// ============================================================================
// 타입 exports (re-export)
// ============================================================================

// BaseCard 관련 타입들
export type {
    CardData,
    BaseCardProps,
    SectionProps,
    CardSections,
    BadgeProps,
    BadgePosition,
    BadgeType,
    BadgeSize,
    CardClickHandler,
    CardSize,
    PlaceholderTexts
} from '@/types/card';

// 기존 Card 타입 (하위 호환성 유지)
export type {
    CardItems,
    CardProps
} from './Card';

// ============================================================================
// 상수 exports
// ============================================================================

// 기본 플레이스홀더 텍스트
export { DEFAULT_PLACEHOLDERS } from '@/types/card';
