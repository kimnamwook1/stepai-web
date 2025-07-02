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
        { id: 'expert', label: '전문가 등록', hasDropdown: false },
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
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="px-4 sm:px-8 lg:px-20 py-0">
                <div className="flex items-center justify-between h-[120px] sm:h-[150px] lg:h-[200px]">
                    {/* 좌측 네비게이션 */}
                    <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
                        {/* 로고 */}
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-black whitespace-nowrap">
                            로고 STEPAI|스텝AI
                        </div>

                        {/* 주 메뉴 - 태블릿 이상에서만 표시 */}
                        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
                            {mainMenuItems.map((item) => (
                                <div key={item.id} className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            item.hasDropdown && toggleDropdown(item.id);
                                        }}
                                        className="flex items-center space-x-1 text-black font-medium hover:text-gray-600 transition-colors duration-300 text-sm lg:text-base"
                                    >
                                        <span>{item.label}</span>
                                        {item.hasDropdown && (
                                            <svg
                                                className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 ${
                                                    openDropdown === item.id ? 'rotate-180' : ''
                                                }`}
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
                                        )}
                                    </button>

                                    {/* 드롭다운 메뉴 */}
                                    {item.hasDropdown && (
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-40 lg:w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ${
                                                openDropdown === item.id
                                                    ? 'opacity-100 max-h-60 visible'
                                                    : 'opacity-0 max-h-0 invisible'
                                            }`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {dropdownItems.map((dropdownItem, index) => (
                                                <button
                                                    key={index}
                                                    className="block w-full px-3 lg:px-4 py-2 lg:py-3 text-left text-sm lg:text-base text-black hover:bg-gray-50 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg"
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
                    <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
                        {actionMenuItems.map((item, index) => (
                            <button
                                key={item.id}
                                className={`text-black font-medium hover:text-gray-600 transition-colors duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                                    // 모바일에서는 마지막 2개 버튼만 표시
                                    index < 2 ? 'hidden sm:block' : ''
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* 모바일 네비게이션 - 태블릿 미만에서만 표시 */}
                <div className="md:hidden pb-4">
                    <nav className="flex flex-wrap gap-2">
                        {mainMenuItems.map((item) => (
                            <div key={item.id} className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        item.hasDropdown && toggleDropdown(item.id);
                                    }}
                                    className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg text-black font-medium hover:bg-gray-200 transition-colors duration-300 text-sm"
                                >
                                    <span>{item.label}</span>
                                    {item.hasDropdown && (
                                        <svg
                                            className={`w-3 h-3 transition-transform duration-300 ${
                                                openDropdown === item.id ? 'rotate-180' : ''
                                            }`}
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
                                    )}
                                </button>

                                {/* 모바일 드롭다운 메뉴 */}
                                {item.hasDropdown && (
                                    <div
                                        className={`absolute top-full left-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ${
                                            openDropdown === item.id
                                                ? 'opacity-100 max-h-60 visible'
                                                : 'opacity-0 max-h-0 invisible'
                                        }`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {dropdownItems.map((dropdownItem, index) => (
                                            <button
                                                key={index}
                                                className="block w-full px-3 py-2 text-left text-sm text-black hover:bg-gray-50 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg"
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
            </div>
        </header>
    );
};

export default Header; 