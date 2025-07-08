"use client";

import React from "react";
import { useRouter } from "next/navigation";

/**
 * Register 폴더에서 사용하는 공통 헤더 컴포넌트
 * 홈과 고객센터 링크를 포함한 간단한 네비게이션 제공
 */
function RegisterHeader() {
    const router = useRouter();

    return (
        <header className="w-full flex justify-center bg-white shadow">
            <div className="w-full max-w-[3840px] flex">
                {/* 좌측 여백 */}
                <div
                    className="hidden md:block transition-all duration-300"
                    style={{
                        width: 'max(0px, min(1280px, calc(320px + ((100vw - 1920px) / 3))))',
                        minWidth: 0,
                        flexShrink: 1,
                    }}
                />
                {/* 내용 섹션 */}
                <div className="flex-1 flex justify-center">
                    <div className="max-w-[700px] mx-auto h-20 flex items-center justify-end px-6 w-full">
                        <nav className="flex items-center gap-2 text-sm">
                            <button
                                className="font-bold text-gray-800 hover:underline focus:outline-none"
                                onClick={() => router.push("/")}
                                type="button"
                            >
                                홈
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                className="font-bold text-gray-800 hover:underline focus:outline-none"
                                type="button"
                            >
                                고객센터
                            </button>
                        </nav>
                    </div>
                </div>
                {/* 우측 여백 */}
                <div
                    className="hidden md:block transition-all duration-300"
                    style={{
                        width: 'max(0px, min(1280px, calc(320px + ((100vw - 1920px) / 3))))',
                        minWidth: 0,
                        flexShrink: 1,
                    }}
                />
            </div>
        </header>
    );
}

export default RegisterHeader;
