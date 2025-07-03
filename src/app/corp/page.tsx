"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Header_Corp 컴포넌트 내부 정의
function HeaderCorp() {
    const router = useRouter();
    return (
        <header className="w-full bg-white shadow">
            <div className="max-w-[700px] mx-auto h-20 flex items-center justify-end px-6">
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
        </header>
    );
}

const CorpRegisterPage = () => {
    return (
        <>
            <HeaderCorp />
            <main className="max-w-[700px] mx-auto my-8 p-4">
                {/* TODO: 헤더 및 폼 추가 예정 */}
                <h1 className="text-2xl font-bold mb-4">기업회원 가입</h1>
                <p>여기에 기업회원 가입 폼이 들어갑니다.</p>
            </main>
        </>
    );
};

export default CorpRegisterPage; 