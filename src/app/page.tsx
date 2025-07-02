import Header from '@/components/Header';
import ContentsMain from '@/components/ContentsMain';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-[110px]">
        <ContentsMain />
      </main>
    </div>
  );
}
