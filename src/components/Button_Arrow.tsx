import React from 'react';

export type ButtonArrowProps = {
    direction: 'left' | 'right';
    size?: number;
    color?: string;
    buttonImage?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
};

export default function Button_Arrow({ direction, size, color, buttonImage, onClick, className, style }: ButtonArrowProps) {
    return (
        <button onClick={onClick} className={className} style={style}>
            {/* TODO: 방향, 크기, 색상, 이미지 등 실제 구현 */}
            {buttonImage}
        </button>
    );
}
