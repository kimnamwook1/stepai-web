"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main_Banner from "@/components/Main_Banner";

const NewsPage = () => {
    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12">
                <Main_Banner Main_Title="Step Ahead" Detail_Text="Other Sentence" />
                {/* 추후 News 리스트/상세 등 추가 */}
            </main>
            <Footer />
        </>
    );
};

export default NewsPage;
