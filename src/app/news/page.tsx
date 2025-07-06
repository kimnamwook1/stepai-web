"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main_Banner from "@/components/Main_Banner";
import Button_Filter from "@/components/Button_Filter";
import Card_with_Badge from "@/components/Card_with_Badge";
import Card_News from "@/components/Card_News";
import { useState } from "react";

const filterList = [
    { key: "latest", label: "최신" },
    { key: "news", label: "뉴스" },
    { key: "event", label: "이벤트" },
    { key: "contest", label: "공모전" },
    { key: "class", label: "클래스" },
    { key: "support", label: "지원사업" },
];

// [뉴스 데이터 출처 및 필터링 기준]
// newsList는 https://news.naver.com/section/105 에서 'AI' 관련 키워드를 가진 기사만 추출해서 사용할 예정입니다.
// 실제 서비스에서는 해당 URL에서 크롤링 또는 API 연동 후 'AI' 키워드 포함 기사만 필터링하여 newsList에 반영하세요.

const newsList = [
    {
        thumbnailSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_Icon_Salesforce.png",
        title: "세일즈포스, 'AI 업무 플랫폼' 선언…슬랙은 워크스페이스, 태블로는 분석 파트너",
        detail: "세일즈포스가 국내 시장을 겨냥한 '에이전트포스' 전략을 본격화하며 도메인별 인공지능...",
        source: "지디넷코리아",
        relatedCount: 9,
        viewCount: 150,
        link: "https://zdnet.co.kr/",
    },
    {
        thumbnailSrc: "https://img.etnews.com/news/article/2023/06/20/news-p.v1.20230620.1b1e6e2b7e.jpg",
        title: "AI정책실 신설하고 사이버안보 역량도 높인다…과기부 현안보고",
        detail: "과학기술정보통신부는 18일 국정기획위원회에 인공지능(AI)정책실 신설을 통한 AI거버...",
        source: "뉴스1",
        relatedCount: 10,
        viewCount: 150,
        link: "https://news1.kr/",
    },
    {
        thumbnailSrc: "https://img.etnews.com/news/article/2023/06/20/news-p.v1.20230620.1b1e6e2b7e.jpg",
        title: "'AI 국가대표' 실험, GPU 몰아주기로 생태계 키울 수 있나",
        detail: "이재명 정부가 'AI 세계 3대 강국'을 목표로 국가 AI 클러스터를 조성하고 고성능 GPU...",
        source: "데일리안",
        relatedCount: 7,
        viewCount: 150,
        link: "https://dailian.co.kr/",
    },
    {
        thumbnailSrc: "https://img.etnews.com/news/article/2023/06/20/news-p.v1.20230620.1b1e6e2b7e.jpg",
        title: "AI 뉴스 예시4",
        detail: "AI 관련 뉴스 예시 디테일4...",
        source: "매일경제",
        relatedCount: 3,
        viewCount: 150,
        link: "https://mk.co.kr/",
    },
    {
        thumbnailSrc: "https://img.etnews.com/news/article/2023/06/20/news-p.v1.20230620.1b1e6e2b7e.jpg",
        title: "AI 뉴스 예시5",
        detail: "AI 관련 뉴스 예시 디테일5...",
        source: "조선일보",
        relatedCount: 2,
        viewCount: 150,
        link: "https://chosun.com/",
    },
];

const NewsPage = () => {
    const [selectedKey, setSelectedKey] = useState("latest");
    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12">
                <Main_Banner Main_Title="Step Ahead" Detail_Text="Other Sentence" />
                <div className="w-[1280px] flex flex-row mt-8 border border-gray-300 rounded-xl bg-white" style={{ minHeight: 600 }}>
                    {/* 좌측 필터 메뉴 (2/10) */}
                    <div className="flex flex-col items-center justify-start py-8 px-4 border-r border-gray-200" style={{ flex: 1 }}>
                        {filterList.map((item) => (
                            <Button_Filter
                                key={item.key}
                                title={item.label}
                                width={120}
                                height={40}
                                selected={selectedKey === item.key}
                                onClick={() => setSelectedKey(item.key)}
                            />
                        ))}
                    </div>
                    {/* 우측 뉴스 카드 영역 (8/10) */}
                    <div className="w-full p-8" style={{ flex: 9, minHeight: 600 }}>
                        {selectedKey === "news" ? (
                            <div className="flex flex-col gap-4">
                                {newsList.slice(0, 5).map((item, idx) => (
                                    <Card_News
                                        key={idx}
                                        thumbnailSrc={item.thumbnailSrc}
                                        title={item.title}
                                        detail={item.detail}
                                        source={item.source}
                                        relatedCount={item.relatedCount}
                                        viewCount={item.viewCount}
                                        link={item.link}
                                        height={110}
                                        padding={16}
                                        thumbnailWidth={80}
                                        thumbnailHeight={80}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {Array(6).fill(0).map((_, idx) => (
                                    <Card_with_Badge
                                        key={idx}
                                        badgeText={filterList[idx % filterList.length].label}
                                        badgeColor="#F6D9D9"
                                        badgeWidth={84}
                                        badgeHeight={28}
                                        badgeTop={8}
                                        badgeLeft={8}
                                        backgroundColor="#E5E5E5"
                                        width={340}
                                        height={240}
                                        thumbnailWidth={"100%"}
                                        thumbnailHeight={200}
                                        detailBoxWidth={"100%"}
                                        detailBoxHeight={80}
                                        detailBoxText={`기사 짧은 내용 ${idx + 1}`}
                                        thumbnailDetailGap={4}
                                        padding={12}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default NewsPage;
