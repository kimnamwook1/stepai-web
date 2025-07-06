"use client";

import React from 'react';
import Card from '@/components/Card';

const testCards = [
    {
        thumbnail: <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="로고" className="w-8 h-8" />,
        serviceName: 'ChatGPT',
        details: '#슬로건작성 #마케팅문구 #광고트렌드',
    },
    {
        thumbnail: <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">🌊</span>,
        serviceName: 'VEO3',
        details: '#마케팅영상 #최고성능 #광고영상 #마케팅영상 #최고성능 #광고영상 #마케팅영상 #최고성능 #광고영상' ,
    },
    {
        thumbnail: <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="썸네일" className="w-full h-full object-cover" />,
        logo: <span className="text-2xl">✖️</span>,
        serviceName: 'ClovaX',
        details: '#슬로건작성 #마케팅문구 #광고트렌드',
    },
];

export default function TestPage() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-start pt-12 bg-white">
            <div className="w-[1100px] grid grid-cols-3 gap-8 mt-12">
                {testCards.map((item, idx) => (
                    <Card
                        key={idx}
                        size={{ width: 340, height: 320 }}
                        items={item}
                        thumbnailRowGap={8}
                        detailRowGap={8}
                        detailBottomGap={0                        }
                        thumbnailHeight={180}
                        thumbnailWidth={"100%"}
                        logoSize={32}
                        logoMinWidth={28}
                        logoMinHeight={28}
                        logoMaxWidth={40}
                        logoMaxHeight={40}
                        logoBackground="#f5f5f5"
                        serviceNameFontSize={20}
                        detailsFontSize={15}
                        detailsMinHeight={32}
                        detailsMaxHeight={52}
                        detailsLineClamp={2}
                    />
                ))}
            </div>
        </div>
    );
}
