import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CardItems = {
    thumbnail?: React.ReactNode;
    logo?: React.ReactNode;
    serviceName?: string;
    details?: React.ReactNode;
};

export type CardProps = {
    size?: number | { width: number; height: number };
    color?: string;
    items: CardItems;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    // 아래 prop들은 있으면 우선 적용, 없으면 자동 비율 적용
    thumbnailRowGap?: number | string;
    detailRowGap?: number | string;
    detailBottomGap?: number | string;
    thumbnailHeight?: number | string;
    thumbnailWidth?: number | string;
    logoSize?: number | string;
    logoMinWidth?: number | string;
    logoMinHeight?: number | string;
    logoMaxWidth?: number | string;
    logoMaxHeight?: number | string;
    logoBackground?: string;
    serviceNameFontSize?: number | string;
    detailsFontSize?: number | string;
    detailsMinHeight?: number | string;
    detailsMaxHeight?: number | string;
    detailsLineClamp?: number;
};

export default function Card({
    size,
    color,
    items,
    onClick,
    className,
    style,
    thumbnailRowGap,
    detailRowGap,
    detailBottomGap,
    thumbnailHeight,
    thumbnailWidth,
    logoSize,
    logoMinWidth,
    logoMinHeight,
    logoMaxWidth,
    logoMaxHeight,
    logoBackground = '#fff',
    serviceNameFontSize,
    detailsFontSize,
    detailsMinHeight,
    detailsMaxHeight,
    detailsLineClamp = 2,
}: CardProps) {
    let width = 340, height = 320;
    if (typeof size === 'number') {
        width = height = size;
    } else if (size && typeof size === 'object') {
        width = size.width;
        height = size.height;
    }
    // 비율 기반 자동 계산
    const thumbH = thumbnailHeight ?? Math.round(height * 0.55);
    const thumbW = thumbnailWidth ?? '100%';
    const logoS = logoSize ?? Math.round(height * 0.15);
    const logoMinW = logoMinWidth ?? Math.round(height * 0.13);
    const logoMinH = logoMinHeight ?? Math.round(height * 0.13);
    const logoMaxW = logoMaxWidth ?? Math.round(height * 0.18);
    const logoMaxH = logoMaxHeight ?? Math.round(height * 0.18);
    const nameFont = serviceNameFontSize ?? Math.round(height * 0.07);
    const detailFont = detailsFontSize ?? Math.round(height * 0.05);
    const detailMinH = detailsMinHeight ?? `${Math.round(height * 0.11)}px`;
    const detailMaxH = detailsMaxHeight ?? `${Math.round(height * 0.18)}px`;
    const thumbRowGap = thumbnailRowGap ?? Math.round(height * 0.03);
    const detRowGap = detailRowGap ?? Math.round(height * 0.03);
    const detBottomGap = detailBottomGap ?? 0;

    return (
        <div
            onClick={onClick}
            className={`rounded-2xl bg-gray-100 flex flex-col items-center p-2 shadow-sm ${className || ''}`}
            style={{ width, height, background: color || '#e5e5e5', ...style }}
        >
            {/* 썸네일 */}
            <div
                className="rounded-xl overflow-hidden bg-white flex items-center justify-center border-2 border-blue-300"
                style={{
                    marginBottom: typeof thumbRowGap === 'number' ? `${thumbRowGap}px` : thumbRowGap,
                    height: typeof thumbH === 'number' ? `${thumbH}px` : thumbH,
                    width: typeof thumbW === 'number' ? `${thumbW}px` : thumbW,
                    minHeight: 40,
                }}
            >
                {items.thumbnail || <span className="text-gray-400 text-lg">썸네일</span>}
            </div>
            {/* 로고+서비스명 1:9 분리 */}
            <div
                className="flex flex-row items-center w-full border-2 border-green-300"
                style={{ marginBottom: typeof detRowGap === 'number' ? `${detRowGap}px` : detRowGap }}
            >
                <div
                    className="flex-1 flex items-center justify-center border-2 border-yellow-400 rounded-full mr-3"
                    style={{
                        width: typeof logoS === 'number' ? `${logoS}px` : logoS,
                        height: typeof logoS === 'number' ? `${logoS}px` : logoS,
                        minWidth: typeof logoMinW === 'number' ? `${logoMinW}px` : logoMinW,
                        minHeight: typeof logoMinH === 'number' ? `${logoMinH}px` : logoMinH,
                        maxWidth: typeof logoMaxW === 'number' ? `${logoMaxW}px` : logoMaxW,
                        maxHeight: typeof logoMaxH === 'number' ? `${logoMaxH}px` : logoMaxH,
                        background: logoBackground,
                        overflow: 'hidden',
                    }}
                >
                    {items.logo || <span className="text-gray-400 text-base">로고</span>}
                </div>
                <div className="flex-[9] flex items-center justify-center border-2 border-pink-400 rounded-md h-12 pl-2">
                    <span
                        className="font-bold text-black text-center w-full"
                        style={{ fontSize: typeof nameFont === 'number' ? `${nameFont}px` : nameFont }}
                    >
                        {items.serviceName || <span className="text-gray-400">서비스명</span>}
                    </span>
                </div>
            </div>
            {/* 해시태그/디테일 (최대 N줄, 넘치면 ... 처리) */}
            <div
                className="w-full text-left text-gray-700 border-2 border-purple-300 px-1 py-1 rounded-md"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: detailsLineClamp,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: detailMinH,
                    maxHeight: detailMaxH,
                    marginBottom: typeof detBottomGap === 'number' ? `${detBottomGap}px` : detBottomGap,
                    fontSize: typeof detailFont === 'number' ? `${detailFont}px` : detailFont,
                }}
            >
                {items.details || <span className="text-gray-400">디테일</span>}
            </div>
        </div>
    );
}

/*
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Card({ layout, size, color, items }: { layout?: string; size?: number; color?: string; items?: any[] }) {
    // TODO: 구현 예정
    return null;
}
*/
