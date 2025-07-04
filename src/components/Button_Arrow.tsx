import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ButtonArrowProps = {
    direction: 'left' | 'right';
    size?: number;
    color?: string;
    buttonImage?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
};

/*
export default function Button_Arrow({ direction, size, color, buttonImage, onClick, className, style }: ButtonArrowProps) {
    return (
        <button onClick={onClick} className={className} style={style}>
            {// TODO: 방향, 크기, 색상, 이미지 등 실제 구현 //}
            {buttonImage}
        </button>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Button_Arrow({ direction, size, color }: { direction: string; size?: number; color?: string }) {
    // TODO: 구현 예정
    return null;
}
*/
