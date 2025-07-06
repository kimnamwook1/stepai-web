"use client";

import React from "react";

const SECTION_WIDTH = 1920;
const SECTION_HEIGHT = 300;
const SIDE_PADDING = 320;

const pages = [
    { label: "탐색", link: "/explore" },
    { label: "트렌드", link: "/trend" },
    { label: "소식", link: "/news" },
    { label: "광고", link: "/ad" },
];

const social = [
    { label: "Instagram", icon: "📸", link: "https://instagram.com" },
    { label: "LinkedIn", icon: "💼", link: "https://linkedin.com" },
    { label: "Twitter", icon: "🐦", link: "https://twitter.com" },
    { label: "Facebook", icon: "📘", link: "https://facebook.com" },
];

const contact = [
    { label: "(406) 555-0120", icon: "📞" },
    { label: "companyname@stepai.kr", icon: "✉️" },
    { label: "2972 Westheimer Rd. Santa Ana, Illinois 85486", icon: "📍" },
];

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                width: SECTION_WIDTH,
                minHeight: SECTION_HEIGHT,
                padding: `0 ${SIDE_PADDING}px`,
                background: "#fff",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="w-full flex flex-row justify-between items-start" style={{ maxWidth: 1280 }}>
                {/* (로고) STEPAI */}
                <div className="flex flex-col min-w-[180px] items-start">
                    <span className="text-xl font-medium mb-2 cursor-pointer" onClick={() => window.location.href = '/'}>(로고) STEPAI</span>
                </div>
                {/* Pages */}
                <div className="flex flex-col gap-4 min-w-[180px] items-start">
                    <span className="text-2xl font-bold mb-2 text-left">Pages</span>
                    {pages.map((p) => (
                        <button
                            key={p.label}
                            className="text-base text-black text-left hover:underline"
                            onClick={
                                p.label === '트렌드'
                                    ? () => window.location.href = '/trend'
                                    : undefined
                            }
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                {/* Contact */}
                <div className="flex flex-col gap-4 min-w-[260px] items-start">
                    <span className="text-2xl font-bold mb-2 text-left">Contact</span>
                    {contact.map((c) => (
                        <div key={c.label} className="flex items-center gap-2 text-base">
                            <span>{c.icon}</span>
                            <span>{c.label}</span>
                        </div>
                    ))}
                </div>
                {/* Social Media */}
                <div className="flex flex-col gap-4 min-w-[180px] items-start">
                    <span className="text-2xl font-bold mb-2 text-left">Social media</span>
                    <div className="flex flex-row gap-4">
                        {social.map((s) => (
                            <button
                                key={s.label}
                                className="text-2xl"
                            // onClick={() => window.open(s.link, '_blank')} // 실제 외부 링크 이동, 추후 주석 해제
                            >
                                <span>{s.icon}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
