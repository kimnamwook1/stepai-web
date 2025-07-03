import Header from '@/components/Header';
import Body_Category from '@/components/Body_Category';
import Body_News from '@/components/Body_News';
import Footer from '@/components/Footer';
import Body_ContentsMain from '@/components/Body_ContentsMain';
import Body_TopTrends from '@/components/Body_TopTrends';
import Body_TopSteps from '@/components/Body_TopSteps';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-[110px]">
        <Body_ContentsMain />
        <Body_Category />
        <Body_TopTrends />
        <Body_TopSteps />
        <Body_News />
      </main>
      <Footer />
    </div>
  );
}
