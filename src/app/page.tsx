import Header from '@/components/Header';
import ContentsMain from '@/components/ContentsMain';
import Body_Category from '@/components/Body_Category';
import TopTrendsSection from '@/components/TopTrendsSection';
import TopStepSection from '@/components/TopStepSection';
import Body_News from '@/components/Body_News';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-[110px]">
        <ContentsMain />
        <Body_Category />
        <TopTrendsSection /> 
        <TopStepSection />
        <Body_News />
      </main>
      <Footer />
    </div>
  );
}
