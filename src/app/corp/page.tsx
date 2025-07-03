"use client";

import React, { useState, FocusEvent } from "react";
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

const BG_COLOR = 'rgb(245,246,248)';

function FloatingLabelInput({
    id,
    label,
    required,
    value,
    onChange,
    type = "text",
    maxLength,
    className = "",
    noMargin = false,
    ...props
}: any) {
    const [isFocused, setIsFocused] = useState(false);
    const showFloating = isFocused || value;
    return (
        <div className={`relative${noMargin ? "" : " mt-6"}`}>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:border-gray-400 ${className}`}
                autoComplete="off"
                onFocus={() => setIsFocused(true)}
                onBlur={(e: FocusEvent<HTMLInputElement>) => setIsFocused(!!e.target.value)}
                {...props}
            />
            <label
                htmlFor={id}
                className={`absolute left-3 transition-all duration-200 bg-white px-1 z-10
                    ${showFloating ? "-top-3 text-xs text-[#d2d2d2]" : "top-2 text-sm text-[#d2d2d2]"}`}
                style={{ pointerEvents: 'none' }}
            >
                {label}
                {required && <span className="text-[#ff0000]"> *</span>}
            </label>
        </div>
    );
}

function FloatingLabelSelect({
    id,
    label,
    required,
    value,
    onChange,
    children,
    className = "",
    ...props
}: any) {
    const [isFocused, setIsFocused] = useState(false);
    const showFloating = isFocused || value;
    return (
        <div className="relative mt-6">
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full border rounded px-3 py-2 appearance-none focus:outline-none focus:border-gray-400 pr-8 ${className}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            >
                <option value="" disabled hidden></option>
                {children}
            </select>
            <label
                htmlFor={id}
                className={`absolute left-3 transition-all duration-200 bg-white px-1 z-10
                    ${showFloating ? "-top-3 text-xs text-[#d2d2d2]" : "top-2 text-sm text-[#d2d2d2]"}`}
                style={{ pointerEvents: 'none' }}
            >
                {label}
                {required && <span className="text-[#ff0000]"> *</span>}
            </label>
            {/* ▼ 아이콘 */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#d2d2d2] text-base">
                ▼
            </span>
        </div>
    );
}

function CorpInfoSection() {
    const [corpType, setCorpType] = useState("");
    const [corpRegNum, setCorpRegNum] = useState("");
    const [corpName, setCorpName] = useState("");
    const [ceoName, setCeoName] = useState("");
    const [corpAddress, setCorpAddress] = useState("");

    return (
        <section className="mb-8 bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-semibold mb-4">기업정보</h2>
            <div className="space-y-4">
                {/* 기업형태 */}
                <FloatingLabelSelect
                    id="corpType"
                    label="기업형태"
                    required
                    value={corpType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCorpType(e.target.value)}
                >
                    <option value="3">대기업</option>
                    <option value="4">대기업 계열사·자회사</option>
                    <option value="1">중소기업(300명이하)</option>
                    <option value="2">중견기업(300명이상)</option>
                    <option value="5">벤처기업</option>
                    <option value="6">외국계(외국 투자기업)</option>
                    <option value="8">외국계(외국 법인기업)</option>
                    <option value="7">국내 공공기관·공기업</option>
                    <option value="9">비영리단체·협회·교육재단</option>
                    <option value="10">외국 기관·비영리기구·단체</option>
                </FloatingLabelSelect>
                {/* 사업자등록번호 */}
                <FloatingLabelInput
                    id="corpRegNum"
                    label="사업자등록번호"
                    required
                    value={corpRegNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorpRegNum(e.target.value)}
                    maxLength={12}
                />
                {/* 회사명 + 대표자명 한 행 */}
                <div className="flex gap-4 mt-6">
                    <div className="flex-1" style={{ flexBasis: '70%' }}>
                        <FloatingLabelInput
                            id="corpName"
                            label="회사명"
                            required
                            value={corpName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorpName(e.target.value)}
                            maxLength={50}
                            className=""
                            noMargin={true}
                        />
                    </div>
                    <div className="flex-1" style={{ flexBasis: '30%' }}>
                        <FloatingLabelInput
                            id="ceoName"
                            label="대표자명"
                            required
                            value={ceoName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCeoName(e.target.value)}
                            maxLength={20}
                            className=""
                            noMargin={true}
                        />
                    </div>
                </div>
                {/* 회사주소 */}
                <FloatingLabelInput
                    id="corpAddress"
                    label="회사주소"
                    required
                    value={corpAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorpAddress(e.target.value)}
                />
            </div>
        </section>
    );
}

const CorpRegisterPage = () => {
    return (
        <div style={{ background: BG_COLOR, minHeight: '100vh' }}>
            <HeaderCorp />
            <main className="max-w-[700px] mx-auto my-8 p-4">
                <CorpInfoSection />
                {/* TODO: 다음 섹션(담당자정보, 약관동의 등) 추가 예정 */}
            </main>
        </div>
    );
};

export default CorpRegisterPage; 