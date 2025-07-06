import React from "react";

interface CardNewsProps {
    thumbnailSrc?: string;
    title: string;
    detail: string;
    source: string;
    relatedCount: number;
    viewCount: number;
    link: string;
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    padding?: number | string;
    margin?: number | string;
    thumbnailWidth?: number | string;
    thumbnailHeight?: number | string;
    contentGap?: number | string;
    sectionGap?: number | string;
}

const Card_News: React.FC<CardNewsProps> = ({
    thumbnailSrc,
    title,
    detail,
    source,
    relatedCount,
    viewCount,
    link,
    width = '100%',
    height = 120,
    backgroundColor = '#fff',
    padding = 16,
    margin = 0,
    thumbnailWidth = 80,
    thumbnailHeight = 80,
    contentGap = 12,
    sectionGap = 8,
}) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'block',
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                background: backgroundColor,
                padding: typeof padding === 'number' ? `${padding}px` : padding,
                margin: typeof margin === 'number' ? `${margin}px` : margin,
                borderRadius: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                boxSizing: 'border-box',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s',
                border: '1px solid #2196f3',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', gap: contentGap, height: '100%' }}>
                {/* 썸네일 */}
                <div
                    style={{
                        width: typeof thumbnailWidth === 'number' ? `${thumbnailWidth}px` : thumbnailWidth,
                        height: typeof thumbnailHeight === 'number' ? `${thumbnailHeight}px` : thumbnailHeight,
                        background: '#eee',
                        borderRadius: 8,
                        overflow: 'hidden',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #4caf50',
                    }}
                >
                    {thumbnailSrc ? (
                        <img src={thumbnailSrc} alt="썸네일" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ color: '#bbb', fontSize: 14 }}>No Image</span>
                    )}
                </div>
                {/* 내용(제목, 디테일, 출처, 관련) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: sectionGap, border: '1px solid #ff9800', height: '100%' }}>
                    {/* 제목 */}
                    <div style={{ fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
                    {/* 디테일 */}
                    <div style={{ fontSize: 14, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{detail}</div>
                    {/* 하단: 출처, 관련 뉴스 */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: 13, color: '#888' }}>
                        <span>{source}</span>
                        <span>🔗 {relatedCount}</span>
                    </div>
                </div>
                {/* 뷰 수 */}
                <div style={{ minWidth: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #607d8b', height: '100%', fontSize: 18, fontWeight: 600 }}>
                    👁 {viewCount}
                </div>
            </div>
        </a>
    );
};

export default Card_News;
