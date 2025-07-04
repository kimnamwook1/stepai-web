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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FloatingLabelInput(props: any) {
    const {
        id,
        label,
        required,
        value,
        onChange,
        type = "text",
        maxLength,
        className = "",
        noMargin = false,
        ...rest
    } = props;
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
                {...rest}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FloatingLabelSelect(props: any) {
    const {
        id,
        label,
        required,
        value,
        onChange,
        children,
        className = "",
        ...rest
    } = props;
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
                {...rest}
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
        <section className="max-w-[700px] mx-auto mb-8 bg-white rounded-lg shadow p-8">
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

function AIServiceInfo() {
    // 카테고리별 스킬 데이터 구조
    const categorySkillMap: { [key: string]: string[] } = {
        "디자인": [
            "Adobe Photoshop", "Adobe Illustrator", "Adobe Creative Suite", "Adobe Dreamweaver", "Adobe Flash",
            "Adobe XD", "Indesign", "MicroSoft PowerPoint", "Paint tool sai", "sketch up", "Corel Painter",
            "Sketch3", "Sketchapp", "Zeplin", "HTML & CSS", "Keyshot"
        ],
        "마케팅": ["Google Analytics", "Facebook Ads", "Instagram Ads", "SEO", "콘텐츠 마케팅"],
        "번역·통역": ["영한 번역", "한영 번역", "일한 번역", "중한 번역"],
        "문서·글쓰기": ["기획서 작성", "보고서 작성", "에세이", "블로그 글쓰기"],
        "IT·프로그래밍": ["HTML & CSS", "JavaScript", "React", "Node.js", "Python", "Java", "C#", "Spring"],
        "세무·법무·노무": ["세무 상담", "법률 자문", "노무 관리"],
        "창업·사업": ["사업계획서", "BM 설계", "시장조사"],
        "운세": ["사주", "타로", "신점"],
        "직무역량 레슨": ["엑셀", "파워포인트", "프레젠테이션"],
        "취업·입시": ["이력서 첨삭", "면접 코칭", "자소서"],
        "투잡·노하우": ["온라인 판매", "블로그 수익화"],
        "취미 레슨": ["기타", "피아노", "드로잉"],
        "생활서비스": ["청소", "이사", "수리"],
        "영상·사진·음향": ["프리미어", "애프터이펙트", "파이널컷"],
        "심리상담": ["성인 상담", "아동 상담"],
        "주문제작": ["굿즈 제작", "인쇄물 제작"]
    };
    const categories = Object.keys(categorySkillMap);
    const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
    const [search, setSearch] = React.useState("");
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

    // 검색 필터링
    const filteredSkills = (categorySkillMap[selectedCategory] || []).filter(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
    );

    // 스킬 선택/해제
    const handleSkillClick = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else if (selectedSkills.length < 20) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    // 태그 X 버튼
    const handleRemoveSkill = (skill: string) => {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
    };

    // 전체삭제
    const handleRemoveAll = () => {
        setSelectedSkills([]);
    };

    return (
        <section className="max-w-[700px] mx-auto mb-8 bg-white rounded-lg shadow p-8 mt-8">
            {/* 제목 */}
            <h2 className="text-xl font-semibold mb-4">AI 서비스 등록</h2>
            {/* Figma 주황색 박스 영역 */}
            <div className="rounded-md p-4 mb-6 bg-[#f8f6f4]">
                <div className="flex gap-4 items-center justify-center">
                    {/* 대표 이미지 업로드 (원형) */}
                    <div className="flex flex-col items-center w-32">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm mb-2 border border-gray-300 cursor-pointer">
                            대표 이미지
                            <br />
                            <span className="text-lg">⭳</span>
                        </div>
                        {/* 실제 업로드 기능은 추후 구현 */}
                    </div>
                    {/* 서비스 이름 입력 */}
                    <div className="flex-1 flex items-center">
                        <div className="relative w-full mb-2">
                            <input
                                type="text"
                                id="serviceName"
                                placeholder=" "
                                className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-blue-400 text-base bg-white peer"
                                maxLength={50}
                            />
                            <label
                                htmlFor="serviceName"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none bg-transparent px-1 transition-all duration-200
                                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm
                                    peer-placeholder-shown:text-gray-400
                                    peer-focus:-translate-y-full"
                                style={{
                                    transition: 'all 0.2s',
                                }}
                            >
                                서비스 이름 <span className="text-[#ff0000]">*</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* TIP 안내 박스 */}
                <div className="mt-3 p-3 rounded border border-blue-200 bg-blue-50 text-xs text-gray-600">
                    <div className="font-bold text-[11px] text-blue-700 mb-1">TIP</div>
                    <ul className="list-disc pl-4 space-y-0.5">
                        <li>닉네임은 최초 설정 또는 변경 후 30일이 지나야 바꿀 수 있어요.</li>
                        <li>진행 중인 거래가 있으면 닉네임을 바꿀 수 없어요.</li>
                        <li>한글/영문/숫자만 사용할 수 있으며, 이메일 아이디와 동일한 문자열은 사용이 불가해요.</li>
                    </ul>
                </div>
            </div>
            {/* 기술 검색 박스 (2단 컬럼 위) */}
            <div className="mb-2">
                <div className="flex items-center gap-2 w-full">
                    <span className="text-gray-400">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14.94 16.29C13.58 17.36 11.86 18 10 18 5.58 18 2 14.42 2 10 2 5.58 5.58 2 10 2c4.42 0 8 3.58 8 8 0 1.83-.62 3.52-1.65 4.87l4.36 4.36c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-4.36-4.36ZM16 10c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6Z" fill="#bdbdbd" /></svg>
                    </span>
                    <input
                        type="text"
                        placeholder="기술 검색"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded bg-white px-2 py-1 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        style={{ minWidth: 0 }}
                    />
                </div>
            </div>
            {/* 2단 컬럼 */}
            <div className="flex border border-gray-300 rounded overflow-hidden" style={{ minHeight: 240 }}>
                {/* 카테고리 리스트 */}
                <div className="w-1/3 border-r-2 border-gray-300 bg-[#fafbfc] overflow-y-auto" style={{ maxHeight: 240 }}>
                    <ul>
                        {categories.map(cat => (
                            <li
                                key={cat}
                                className={`px-4 py-2 cursor-pointer text-sm ${selectedCategory === cat ? "bg-white font-bold text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* 스킬+태그 flex row */}
                <div className="flex w-2/3" style={{ maxHeight: 240, minWidth: 0 }}>
                    {/* 스킬 리스트 */}
                    <div className="overflow-y-auto border-r-2 border-gray-300 bg-white flex-1" style={{ maxHeight: 200, minWidth: 0 }}>
                        <ul>
                            {filteredSkills.length === 0 ? (
                                <li className="px-4 py-2 text-gray-400 text-sm">해당 기술이 없습니다.</li>
                            ) : (
                                filteredSkills.map(skill => {
                                    const selected = selectedSkills.includes(skill);
                                    return (
                                        <li
                                            key={skill}
                                            className={`px-4 py-2 text-sm border-b last:border-b-0 cursor-pointer flex items-center ${selected ? "bg-yellow-100 border-yellow-300" : "text-gray-800 hover:bg-gray-50"}`}
                                            onClick={() => handleSkillClick(skill)}
                                        >
                                            <span className="flex-1 truncate">{skill}</span>
                                            {selected && (
                                                <span className="ml-2 text-yellow-500">
                                                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.44-6.44 1.06 1.06-7.5 7.5z" fill="#facc15" /></svg>
                                                </span>
                                            )}
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                    {/* 태그 리스트 (오른쪽 고정, 좌측정렬) + 상단 컨트롤 */}
                    <div className="flex flex-col items-start gap-2 pl-4 py-2 min-w-[140px] max-w-[180px] overflow-y-auto bg-[#f8fafc]" style={{ maxHeight: 240, borderLeft: '2px solid #d1d5db' }}>
                        {/* 상단 컨트롤 */}
                        <div className="flex items-center gap-4 mb-2 w-full">
                            <span className="text-xs text-gray-500 font-medium">{selectedSkills.length}/20</span>
                            <button type="button" className="text-xs text-blue-700 hover:underline" onClick={handleRemoveAll}>전체삭제</button>
                        </div>
                        {selectedSkills.length > 0 ? (
                            selectedSkills.map(skill => (
                                <span key={skill} className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-800 whitespace-nowrap mb-1">
                                    {skill}
                                    <button
                                        type="button"
                                        className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                                        onClick={() => handleRemoveSkill(skill)}
                                        aria-label="선택 해제"
                                    >
                                        <svg width="14" height="14" fill="none" viewBox="0 0 20 20"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </button>
                                </span>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}

// SNS 등록 섹션 컴포넌트
function SNSInfoSection() {
    // SNS 종류 및 아이콘(간단한 예시)
    const snsList = [
        { name: 'YouTube', icon: '▶️' },
        { name: 'Instagram', icon: '📸' },
        { name: 'TikTok', icon: '🎵' },
        { name: 'Thread', icon: '🧵' },
        { name: 'X (구 Twitter)', icon: '✖️' },
        { name: 'LinkedIn', icon: '🔗' },
    ];
    return (
        <section className="max-w-[700px] mx-auto mb-8 bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">SNS 등록 <span className="text-gray-400 text-sm ml-2">(선택)</span></h2>
            <div className="grid grid-cols-1 gap-4">
                {snsList.map(sns => (
                    <div key={sns.name} className="flex items-center gap-3">
                        <span className="text-2xl w-10 flex-shrink-0 flex items-center justify-center">{sns.icon}</span>
                        <input
                            type="text"
                            id={`sns-${sns.name}`}
                            placeholder={`${sns.name} 링크`}
                            className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-blue-400 text-base bg-white"
                        />
                    </div>
                ))}
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
                <AIServiceInfo />
                <SNSInfoSection />
                {/* TODO: 다음 섹션(담당자정보, 약관동의 등) 추가 예정 */}
            </main>
        </div>
    );
};

export default CorpRegisterPage;
