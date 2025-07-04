'use client';


import React, { useRef, useState } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const BG_COLOR = 'rgb(245,246,248)';

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

function ExpertProfileSection() {
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
        <section className="max-w-[700px] mx-auto mb-8 bg-white rounded-lg shadow p-8 mt-0">
            {/* 제목 */}
            <h2 className="text-xl font-semibold mb-4">프로필 등록</h2>
            {/* Figma 주황색 박스 영역 */}
            <div className="rounded-md p-4 mb-6 bg-[#f8f6f4]">
                <div className="flex gap-4 items-center justify-center">
                    {/* 대표 이미지 업로드 (원형) */}
                    <div className="flex flex-col items-center w-32">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm mb-2 border border-gray-300 cursor-pointer">
                            대표 이미지<br />
                            <span className="text-lg">⭳</span>
                        </div>
                    </div>
                    {/* 전문가 닉네임 입력 */}
                    <div className="flex-1 flex items-center">
                        <div className="relative w-full mb-2">
                            <input
                                type="text"
                                id="expertNickname"
                                placeholder=" "
                                className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:border-blue-400 text-base bg-white peer"
                                maxLength={50}
                            />
                            <label
                                htmlFor="expertNickname"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none bg-transparent px-1 transition-all duration-200
                                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm
                                    peer-placeholder-shown:text-gray-400
                                    peer-focus:-translate-y-full"
                                style={{ transition: 'all 0.2s' }}
                            >
                                전문가 닉네임 <span className="text-[#ff0000]">*</span>
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

function ResultRegisterSection() {
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    return (
        <section className="max-w-[700px] mx-auto mb-8 bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">대표 결과물 등록 <span className="text-base font-normal text-gray-400">(선택)</span></h2>
            {/* 이미지 업로드(원형) + 링크 입력 */}
            <div className="flex items-center gap-4 mb-6">
                {/* 원형 로고 업로드 */}
                <div className="flex flex-col items-center w-16">
                    <div
                        className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs border border-gray-300 cursor-pointer overflow-hidden"
                        onClick={() => logoInputRef.current?.click()}
                    >
                        {logoFile ? (
                            <img
                                src={URL.createObjectURL(logoFile)}
                                alt="로고 미리보기"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span>로고</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        className="hidden"
                        onChange={e => {
                            if (e.target.files && e.target.files[0]) setLogoFile(e.target.files[0]);
                        }}
                    />
                </div>
                {/* 링크 입력 */}
                <input
                    type="text"
                    placeholder="https://your-link.com"
                    className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white"
                />
            </div>
            {/* 이미지/동영상 업로드 박스 */}
            <div className="flex gap-4">
                {/* 대표 이미지 업로드 */}
                <div
                    className="flex-1 flex flex-col items-center justify-center border border-gray-300 rounded-lg min-h-[160px] cursor-pointer bg-gray-50 overflow-hidden"
                    onClick={() => imageInputRef.current?.click()}
                >
                    {imageFile ? (
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="대표 이미지 미리보기"
                            className="w-full h-full object-contain max-h-[140px]"
                        />
                    ) : (
                        <>
                            <span className="text-2xl text-gray-400 mb-2">대표 이미지<span className="text-xs text-gray-400 ml-1">(선택)</span></span>
                            <span className="text-3xl">⭳</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        className="hidden"
                        onChange={e => {
                            if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
                        }}
                    />
                    {imageFile && (
                        <span className="text-xs text-gray-500 mt-2">{imageFile.name}</span>
                    )}
                </div>
                {/* 대표 동영상 업로드 */}
                <div
                    className="flex-1 flex flex-col items-center justify-center border border-gray-300 rounded-lg min-h-[160px] cursor-pointer bg-gray-50 overflow-hidden"
                    onClick={() => videoInputRef.current?.click()}
                >
                    {videoFile ? (
                        <video
                            src={URL.createObjectURL(videoFile)}
                            controls
                            className="w-full h-full object-contain max-h-[140px]"
                        />
                    ) : (
                        <>
                            <span className="text-2xl text-gray-400 mb-2">대표 동영상<span className="text-xs text-gray-400 ml-1">(선택)</span></span>
                            <span className="text-3xl">⭳</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="video/*"
                        ref={videoInputRef}
                        className="hidden"
                        onChange={e => {
                            if (e.target.files && e.target.files[0]) setVideoFile(e.target.files[0]);
                        }}
                    />
                    {videoFile && (
                        <span className="text-xs text-gray-500 mt-2">{videoFile.name}</span>
                    )}
                </div>
            </div>
        </section>
    );
}
function PolicySection() {
    const [allChecked, setAllChecked] = React.useState(false);
    const [serviceChecked, setServiceChecked] = React.useState(false);
    const [privacyChecked, setPrivacyChecked] = React.useState(false);
    const [smsChecked, setSmsChecked] = React.useState(false);
    const [privacyOptChecked, setPrivacyOptChecked] = React.useState(false);
    const [adChecked, setAdChecked] = React.useState(false);
    const [showService, setShowService] = React.useState(false);
    const [showPrivacy, setShowPrivacy] = React.useState(false);
    const [showSms, setShowSms] = React.useState(false);
    const [showPrivacyOpt, setShowPrivacyOpt] = React.useState(false);
    const [showAd, setShowAd] = React.useState(false);

    // 전체동의 체크 시 하위 항목 모두 체크/해제
    const handleAllChange = () => {
        const next = !allChecked;
        setAllChecked(next);
        setServiceChecked(next);
        setPrivacyChecked(next);
        setSmsChecked(next);
        setPrivacyOptChecked(next);
        setAdChecked(next);
    };
    // 개별 체크 시 전체동의 해제/체크
    const updateAllChecked = (checks: boolean[]) => {
        if (checks.every(Boolean)) setAllChecked(true);
        else setAllChecked(false);
    };
    const handleServiceChange = () => {
        const next = !serviceChecked;
        setServiceChecked(next);
        updateAllChecked([next, privacyChecked, smsChecked, privacyOptChecked, adChecked]);
    };
    const handlePrivacyChange = () => {
        const next = !privacyChecked;
        setPrivacyChecked(next);
        updateAllChecked([serviceChecked, next, smsChecked, privacyOptChecked, adChecked]);
    };
    const handleSmsChange = () => {
        const next = !smsChecked;
        setSmsChecked(next);
        updateAllChecked([serviceChecked, privacyChecked, next, privacyOptChecked, adChecked]);
    };
    const handlePrivacyOptChange = () => {
        const next = !privacyOptChecked;
        setPrivacyOptChecked(next);
        updateAllChecked([serviceChecked, privacyChecked, smsChecked, next, adChecked]);
    };
    const handleAdChange = () => {
        const next = !adChecked;
        setAdChecked(next);
        updateAllChecked([serviceChecked, privacyChecked, smsChecked, privacyOptChecked, next]);
    };

    return (
        <section className="max-w-[700px] mx-auto mb-8 bg-white rounded-lg shadow p-8 mt-8">
            {/* 전체 동의 */}
            <div className="flex items-center justify-between mb-6">
                <label htmlFor="chk_all" className="font-medium text-base cursor-pointer select-none text-left w-full pr-8">
                    <span className="align-middle">필수동의 항목 및 개인정보 수집 및 이용 동의(선택), 광고성 정보 수신 동의(선택)에 모두 동의합니다.</span>
                </label>
                <input type="checkbox" id="chk_all" checked={allChecked} onChange={handleAllChange}
                    className="w-6 h-6 accent-blue-600 flex-shrink-0" />
            </div>
            {/* 이용약관 동의 (필수) */}
            <div className="border-t border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="chk_service" className="cursor-pointer select-none text-left">
                        <span className="font-semibold text-blue-600 mr-2">[필수]</span> 이용약관 동의
                    </label>
                    <div className="flex-1" />
                    <button type="button" className="text-xs text-blue-600 underline mr-2" onClick={() => setShowService(v => !v)}>
                        내용보기
                    </button>
                    <input type="checkbox" id="chk_service" checked={serviceChecked} onChange={handleServiceChange}
                        className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                </div>
                {showService && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm max-h-60 overflow-y-auto">
                        <ol className="list-decimal pl-4 space-y-2">
                            <li>
                                <strong>제 1 조 (목적)</strong><br />
                                본 약관은 잡코리아 유한책임회사(이하 &quot;회사&quot;)가 운영하는 &quot;서비스&quot;를 이용함에 있어 &quot;회사&quot;와 회원간의 이용 조건 및 제반 절차, 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 한다.
                            </li>
                            <li>
                                <strong>제 2 조 (용어의 정의)</strong><br />
                                이 약관에서 사용하는 용어의 정의는 아래와 같다.<br />
                                <ul className="list-disc pl-6">
                                    <li>&quot;사이트&quot;라 함은 회사가 서비스를 &quot;회원&quot;에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장 또는 회사가 운영하는 웹사이트, 모바일웹, 앱 등의 서비스를 제공하는 모든 매체를 통칭하며, 통합된 하나의 회원 계정(아이디 및 비밀번호)을 이용하여 서비스를 제공받을 수 있는 아래의 사이트를 말한다.<br />- www.jobkorea.co.kr<br />- www.albamon.com<br />- m.jobkorea.co.kr<br />- m.albamon.com</li>
                                    <li>&quot;서비스&quot;라 함은 회사가 운영하는 사이트를 통해  기업(단체, 사업자, 교육기관)이 직원채용을 목적으로 등록하는 자료를 DB화하여 각각의 목적에 맞게 분류 가공, 집계하여 정보를 제공하는 서비스와 사이트에서 제공하는 모든 부대 서비스를 말한다.</li>
                                    <li>&quot;회원&quot;이라 함은 기업의 필요한 인재를 고용할 것을 목적으로 약관에 동의하고 아이디를 부여받아 회사의 서비스를 이용하는 자를 말하며, 아웃소싱(도급), 인재파견, 채용대행 기업을 포함한다. 또한, 회원은 각 사업자 별로 아이디를 부여 받아 회사의 서비스를 이용하여야 한다.</li>
                                    <li>&quot;아이디&quot;라  함은 회원가입시 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 &quot;회사&quot;가 부여하는 문자와 숫자의 조합을 말한다.</li>
                                    <li>&quot;비밀번호&quot;라 함은 위 제4항에 따라 회원이 회원가입시 아이디를 설정하면서 아이디를 부여받은 자와 동일인임을 확인하고 &quot;회원&quot;의 권익을 보호하기 위하여 &quot;회원&quot;이 선정한 문자와 숫자의 조합을 말한다.</li>
                                    <li>&quot;비회원&quot;이라 함은 회원가입절차를 거치지 않고 &quot;회사&quot;가 제공하는 서비스를 이용하거나 하려는 자를 말한다.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                )}
            </div>
            {/* 개인정보 수집 및 이용 동의 (필수) */}
            <div className="border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="chk_privacy" className="cursor-pointer select-none text-left">
                        <span className="font-semibold text-blue-600 mr-2">[필수]</span> 개인정보 수집 및 이용 동의
                    </label>
                    <div className="flex-1" />
                    <button type="button" className="text-xs text-blue-600 underline mr-2" onClick={() => setShowPrivacy(v => !v)}>
                        내용보기
                    </button>
                    <input type="checkbox" id="chk_privacy" checked={privacyChecked} onChange={handlePrivacyChange}
                        className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                </div>
                {showPrivacy && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm max-h-60 overflow-y-auto">
                        <p className="mb-2">잡코리아 및 알바몬 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용합니다.<br />동의를 거부할 권리가 있으며, 동의 거부 시 잡코리아 및 알바몬 회원서비스 이용이 불가합니다.</p>
                        <table className="w-full text-xs border border-gray-300 mb-2">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-2 py-1">목적</th>
                                    <th className="border border-gray-300 px-2 py-1">항목</th>
                                    <th className="border border-gray-300 px-2 py-1">보유 및 이용기간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-2 py-1">본인여부 확인, 각종 맞춤형 서비스 제공, 취업활동증명서 서비스, 서비스 개선 및 신규 서비스 개발을 위한 통계 활용, 계약이행 및 약관변경 등의 고지를 위한 연락, 본인의사확인 및 민원 등의 고객불만처리</td>
                                    <td className="border border-gray-300 px-2 py-1">가입자명, 본인인증정보 또는 중복가입확인정보(DI), 아이디, 비밀번호, 전화번호, 이메일</td>
                                    <td className="border border-gray-300 px-2 py-1"><span className="underline">회원 탈퇴 시 즉시 파기</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* 문자서비스 이용약관 동의 (필수) */}
            <div className="border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="chk_sms" className="cursor-pointer select-none text-left">
                        <span className="font-semibold text-blue-600 mr-2">[필수]</span> 문자서비스 이용약관 동의
                    </label>
                    <div className="flex-1" />
                    <button type="button" className="text-xs text-blue-600 underline mr-2" onClick={() => setShowSms(v => !v)}>
                        내용보기
                    </button>
                    <input type="checkbox" id="chk_sms" checked={smsChecked} onChange={handleSmsChange}
                        className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                </div>
                {showSms && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm max-h-60 overflow-y-auto">
                        <h3 className="font-semibold mb-2">제1조(목적)</h3>
                        <p className="mb-2">본 약관은 잡코리아 유한책임회사(이하 &quot;회사&quot;)가 운영하는 웹사이트 및 모바일 어플리케이션(이하 &quot;사이트&quot;)에서 제공하는 문자메시지 발송 서비스(이하 &quot;서비스&quot;)를 이용함에 있어 이용자의 권리/의무 및 책임사항, 기타 필요사항을 규정함을 목적으로 한다.</p>
                        <h3 className="font-semibold mb-2">제2조(정의)</h3>
                        <ul className="list-disc pl-6 mb-2 text-xs">
                            <li>서비스 : 회사가 사이트에서 유료 또는 무료로 제공하는 SMS, LMS 등 문자메시지 발송 기능</li>
                            <li>이용자 : 회사가 제공하는 서비스를 이용하고자 절차에 의거 신청한 사이트의 기업회원</li>
                            <li>이용신청 : 회사가 정한 별도의 기준과 절차에 따라 서비스 이용을 신청하는 것</li>
                        </ul>
                        <p className="text-xs text-gray-500">※ 전체 약관은 &apos;내용보기&apos;를 확장하여 확인하세요.</p>
                    </div>
                )}
            </div>
            {/* 개인정보 수집 및 이용 동의 (선택) */}
            <div className="border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="chk_privacy_opt" className="cursor-pointer select-none text-left">
                        <span className="font-semibold text-gray-500 mr-2">[선택]</span> 개인정보 수집 및 이용 동의
                    </label>
                    <div className="flex-1" />
                    <button type="button" className="text-xs text-blue-600 underline mr-2" onClick={() => setShowPrivacyOpt(v => !v)}>
                        내용보기
                    </button>
                    <input type="checkbox" id="chk_privacy_opt" checked={privacyOptChecked} onChange={handlePrivacyOptChange}
                        className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                </div>
                {showPrivacyOpt && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm max-h-60 overflow-y-auto">
                        <h3 className="font-semibold mb-2">1. 수집 이용 목적</h3>
                        <p className="mb-2"><u>상품•서비스 영업, 홍보, 마케팅, 쿠폰 발송을 목적으로 잡코리아, 알바몬에서 활용</u></p>
                        <h3 className="font-semibold mb-2">2. 수집하는 개인정보 항목</h3>
                        <p className="mb-2">전화번호, 이메일, 푸시토큰, 서비스 이용 기록</p>
                        <h3 className="font-semibold mb-2">3. 개인정보 보유 및 이용기간</h3>
                        <p className="mb-2"><u>회원탈퇴 시 즉시 파기</u></p>
                        <h3 className="font-semibold mb-2">4. 수신동의 거부 및 철회방법 안내</h3>
                        <p>본 동의는 거부하실 수 있습니다. 다만 거부 시 동의를 통해 제공 가능한 각종 혜택, 이벤트 안내를 받아보실 수 없습니다.<br />더 이상 상품•서비스 영업, 홍보, 마케팅, 쿠폰 발송을 원하시지 않는 경우 회원정보수정 페이지에서 수신여부를 변경하실 수 있습니다.</p>
                    </div>
                )}
            </div>
            {/* 광고성 정보 수신 동의 (선택) */}
            <div className="py-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="chk_ad" className="cursor-pointer select-none text-left">
                        <span className="font-semibold text-gray-500 mr-2">[선택]</span> 광고성 정보 수신 동의
                    </label>
                    <div className="flex-1" />
                    <button type="button" className="text-xs text-blue-600 underline mr-2" onClick={() => setShowAd(v => !v)}>
                        내용보기
                    </button>
                    <input type="checkbox" id="chk_ad" checked={adChecked} onChange={handleAdChange}
                        className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                </div>
                {showAd && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm max-h-60 overflow-y-auto">
                        <h3 className="font-semibold mb-2">광고성 정보 수신 동의 안내</h3>
                        <p className="mb-2">회원이 수집 및 이용에 동의한 개인정보를 잡코리아, 알바몬에서 활용하는 것에 동의하며, 해당 개인정보를 활용하여 전화 또는 전자적 전송매체(이메일/SMS 등 다양한 전송매체)를 통해 서비스에 대한 개인 맞춤형 광고 정보(뉴스레터, 소식 및 광고메일, 휴대폰 알림), 상품•서비스 영업, 홍보, 마케팅 정보를 전송할 수 있습니다.</p>
                        <p>광고성 정보 수신 동의를 철회하고자 할 경우에는 광고성 동의 수신 설정 페이지에서 수신여부를 변경하실 수 있습니다.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
const ExpertRegisterPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: BG_COLOR }}>
            <HeaderCorp />
            <main className="max-w-[700px] mx-auto my-8 p-4">
                <ExpertProfileSection />
                <SNSInfoSection />
                <ResultRegisterSection />
                <PolicySection />
                <button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded py-3 text-lg transition-colors"
                >
                    등록하기
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default ExpertRegisterPage;
