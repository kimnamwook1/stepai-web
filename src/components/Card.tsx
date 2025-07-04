import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CardItems = {
    thumbnail?: React.ReactNode;
    logo?: React.ReactNode;
    serviceName?: string;
    details?: React.ReactNode;
};

export type CardProps = {
    layout: 'horizontal' | 'vertical';
    size?: number | { width: number; height: number };
    color?: string;
    items: CardItems;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
};

/*
export default function Card({ layout, size, color, items, onClick, className, style }: CardProps) {
    return (
        <div onClick={onClick} className={className} style={style}>
            {// TODO: 레이아웃, 크기, 색상, 아이템 등 실제 구현 //}
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Card({ layout, size, color, items }: { layout?: string; size?: number; color?: string; items?: any[] }) {
    // TODO: 구현 예정
    return null;
}
*/
