import React from "react";

interface CardWithBadgeProps {
    badgeText: string;
    badgeColor?: string;
    badgeWidth?: number | string;
    badgeHeight?: number | string;
    badgeTop?: number | string;
    badgeLeft?: number | string;
    backgroundColor?: string;
    width?: number | string;
    height?: number | string;
    thumbnailWidth?: number | string;
    thumbnailHeight?: number | string;
    thumbnailSrc?: string;
    detailBoxWidth?: number | string;
    detailBoxHeight?: number | string;
    detailBoxText?: string;
    thumbnailDetailGap?: number | string;
    padding?: number | string;
}

const Card_with_Badge: React.FC<CardWithBadgeProps> = ({
    badgeText,
    badgeColor = '#F6D9D9',
    badgeWidth = 60,
    badgeHeight = 28,
    badgeTop = 8,
    badgeLeft = 8,
    backgroundColor = '#E5E5E5',
    width = 320,
    height = 240,
    thumbnailWidth = '80%',
    thumbnailHeight = 60,
    thumbnailSrc,
    detailBoxWidth = '80%',
    detailBoxHeight = 48,
    detailBoxText,
    thumbnailDetailGap = 16,
    padding = 16,
}) => {
    return (
        <div
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                background: backgroundColor,
                borderRadius: 20,
                position: 'relative',
                boxSizing: 'border-box',
                padding: typeof padding === 'number' ? `${padding}px` : padding,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                border: '1px solid #f44336',
            }}
        >
            {/* Badge */}
            <div
                style={{
                    position: 'absolute',
                    top: typeof badgeTop === 'number' ? `${badgeTop}px` : badgeTop,
                    left: typeof badgeLeft === 'number' ? `${badgeLeft}px` : badgeLeft,
                    background: badgeColor,
                    width: typeof badgeWidth === 'number' ? `${badgeWidth}px` : badgeWidth,
                    height: typeof badgeHeight === 'number' ? `${badgeHeight}px` : badgeHeight,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#222',
                    padding: '0 12px',
                    zIndex: 10,
                }}
            >
                {badgeText}
            </div>
            {/* Thumbnail */}
            <div
                style={{
                    width: thumbnailWidth,
                    height: typeof thumbnailHeight === 'number' ? `${thumbnailHeight}px` : thumbnailHeight,
                    background: '#fff',
                    marginTop: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
            >
                {thumbnailSrc ? (
                    <img
                        src={thumbnailSrc}
                        alt="썸네일"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <span style={{ color: '#222', fontSize: 18 }}>기사 대표 이미지</span>
                )}
            </div>
            {/* Detail */}
            <div
                style={{
                    width: detailBoxWidth,
                    height: typeof detailBoxHeight === 'number' ? `${detailBoxHeight}px` : detailBoxHeight,
                    background: '#F5F2F2',
                    marginTop: typeof thumbnailDetailGap === 'number' ? `${thumbnailDetailGap}px` : thumbnailDetailGap,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                }}
            >
                <span style={{ color: '#222', fontSize: 20, fontWeight: 500 }}>
                    {detailBoxText || '기사 짧은 내용'}
                </span>
            </div>
        </div>
    );
};

export default Card_with_Badge;
