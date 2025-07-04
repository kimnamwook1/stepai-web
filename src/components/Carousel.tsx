import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CarouselProps<T> = {
    items: T[];
    renderItem: (item: T, idx: number) => React.ReactNode;
    visibleCount?: number;
    cardWidth?: number;
    cardGap?: number;
    isAnimating?: boolean;
    autoAnimate?: boolean;
    slideInterval?: number;
    className?: string;
    style?: React.CSSProperties;
};

/*
export default function Carousel<T>({ items, renderItem, visibleCount, cardWidth, cardGap, isAnimating, autoAnimate, slideInterval, className, style }: CarouselProps<T>) {
    return (
        <div className={className} style={style}>
            {// TODO: 캐러셀 구조, 아이템 렌더링, 애니메이션 등 실제 구현 //}
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Carousel({ items, renderItem, visibleCount, cardWidth, cardGap, isAnimating, autoAnimate, slideInterval }: { items?: any[]; renderItem?: any; visibleCount?: number; cardWidth?: number; cardGap?: number; isAnimating?: boolean; autoAnimate?: boolean; slideInterval?: number }) {
    // TODO: 구현 예정
    return null;
}
*/

