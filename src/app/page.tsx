import Header from '@/components/Header';
import ContentsMain from '@/components/ContentsMain';
import Body_Category from '@/components/Body_Category';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-[110px]">
        <ContentsMain />
        <Body_Category />
      </main>
    </div>
  );
}
