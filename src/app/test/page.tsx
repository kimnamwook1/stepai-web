import React from 'react';
import Main_Banner from '../../components/Main_Banner';
import Trend_card from '../../components/Trend_card';

const TestPage = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <h2 className="text-2xl font-bold mb-6">컴포넌트 테스트 페이지</h2>
            <section className="mb-12 w-full flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Main_Banner</h3>
                <Main_Banner
                    Main_Title="테스트용 메인 배너 타이틀"
                    Detail_Text="이곳은 테스트 페이지에서 전달된 상세 설명입니다."
                />
            </section>
            <section className="mb-12 w-full flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Trend_card</h3>
                <div className="w-[900px]">
                    <Trend_card
                        rank={0}
                        serviceName="ChatGPT"
                        category="글쓰기"
                        updown="Up"
                        homepage="https://chatgpt.com"
                        snsLinks={{
                            youtube: 'https://youtube.com',
                            instagram: 'https://instagram.com',
                            facebook: 'https://facebook.com',
                            x: 'https://x.com',
                            thread: 'https://threads.net',
                            linkedin: 'https://linkedin.com',
                        }}
                    />
                </div>
            </section>
            {/* 추후 다른 컴포넌트도 아래에 추가 */}
        </div>
    );
};

export default TestPage;
