import React from 'react';

interface MainBannerProps {
    Main_Title: string;
    Detail_Text: string;
}

const Main_Banner: React.FC<MainBannerProps> = ({ Main_Title, Detail_Text }) => {
    return (
        <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>
            {/* 메인 컨텐츠 */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-8 sm:py-10 lg:py-12">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            {Main_Title}
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 font-medium">
                        {Detail_Text}
                    </p>
                    <div className="flex justify-center items-center space-x-4 mt-6">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-100"></div>
                    </div>
                </div>
            </div>
            {/* 하단 그림자 효과 */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/50 to-transparent"></div>
        </div>
    );
};

export default Main_Banner;
