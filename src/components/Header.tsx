'use client';

import { useState, useEffect } from 'react';

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const mainMenuItems = [
        { id: 'explore', label: '탐색', hasDropdown: true },
        { id: 'trends', label: '트렌드', hasDropdown: true },
        { id: 'news', label: '소식', hasDropdown: true },
        { id: 'ads', label: '광고', hasDropdown: true },
    ];

    const actionMenuItems = [
        { id: 'company', label: '기업등록', hasDropdown: false },
        { id: 'expert', label: '전문가등록', hasDropdown: false },
        { id: 'login', label: '로그인', hasDropdown: false },
        { id: 'signup', label: '회원가입', hasDropdown: false },
    ];

    const dropdownItems = ['WIP', 'WIP', 'WIP'];

    const toggleDropdown = (menuId: string) => {
        setOpenDropdown(openDropdown === menuId ? null : menuId);
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenDropdown(null);
        };

        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [openDropdown]);

    return (
        <header className="bg-white border-b border-gray-100 min-w-[1280px] max-w-[1920px] w-full mx-auto" style={{ minWidth: 1280, maxWidth: 1920 }}>
            <div className="px-80 py-0 w-full" style={{ width: 1920, minWidth: 1280, maxWidth: 1920, margin: '0 auto' }}>
                <div className="flex items-center justify-between h-[80px] w-full">
                    {/* 좌측 네비게이션 */}
                    <div className="flex items-center space-x-8">
                        {/* 로고 */}
                        <div className="text-2xl font-bold text-black whitespace-nowrap cursor-pointer" onClick={() => window.location.href = '/'}>
                            로고 STEPAI|스텝AI
                        </div>
                        {/* 주 메뉴 */}
                        <nav className="flex items-center space-x-8">
                            {mainMenuItems.map((item) => (
                                <div key={item.id} className="relative flex items-center space-x-1">
                                    {/* 텍스트 버튼 */}
                                    <button
                                        className="text-black font-medium hover:text-gray-600 transition-colors duration-300 text-base px-1"
                                        onClick={() => {
                                            if (item.id === 'trends') {
                                                window.location.href = '/trend';
                                            } else if (item.id === 'news') {
                                                window.location.href = '/news';
                                            }
                                            // 추후 탐색/소식/광고 등도 경로 추가
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                    {/* V(아래 화살표) 버튼 */}
                                    {item.hasDropdown && (
                                        <button
                                            className="flex items-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(item.id);
                                            }}
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.id ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                    {/* 드롭다운 메뉴 */}
                                    {item.hasDropdown && (
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ${openDropdown === item.id
                                                ? 'opacity-100 max-h-60 visible'
                                                : 'opacity-0 max-h-0 invisible'
                                                }`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {dropdownItems.map((dropdownItem, index) => (
                                                <button
                                                    key={index}
                                                    className="block w-full px-4 py-3 text-left text-base text-black hover:bg-gray-50 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    {dropdownItem}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                    {/* 우측 액션 버튼 */}
                    <nav className="flex items-center space-x-8">
                        {actionMenuItems.map((item) => (
                            <button
                                key={item.id}
                                className="text-black font-medium hover:text-gray-600 transition-colors duration-300 text-base whitespace-nowrap"
                                onClick={
                                    item.id === 'company'
                                        ? () => window.location.href = '/corp'
                                        : item.id === 'expert'
                                            ? () => window.location.href = '/expert'
                                            : undefined
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
