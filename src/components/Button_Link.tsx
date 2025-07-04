import React from 'react';

export type ButtonLinkProps = {
    redirectionLink: string;
    size?: number | { width: number; height: number };
    bgImage?: React.ReactNode;
    buttonText?: string | null;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

export default function Button_Link({
    redirectionLink,
    size,
    bgImage,
    buttonText,
    className,
    style,
    onClick,
}: ButtonLinkProps) {
    return (
        <button
            className={className}
            style={style}
            onClick={() => {
                if (onClick) onClick();
                window.location.href = redirectionLink;
            }}
        >
            {/* TODO: 이미지/텍스트/사이즈 등 실제 구현 */}
            {bgImage}
            {buttonText && <span>{buttonText}</span>}
        </button>
    );
}
