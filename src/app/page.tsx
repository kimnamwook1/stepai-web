import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 헤더 높이만큼 상단 여백 추가 - 반응형 */}
      <main className="pt-[120px] sm:pt-[150px] lg:pt-[200px]">
        <div className="px-4 sm:px-8 lg:px-20 py-8 lg:py-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black mb-6 lg:mb-8">
            환영합니다! STEPAI에 오신 것을 환영합니다.
          </h1>
          <p className="text-base lg:text-lg text-center text-gray-600 max-w-2xl mx-auto">
            사용자 맞춤형 콘텐츠를 제공하는 지능형 큐레이션 웹 서비스입니다.
            곧 더 많은 기능이 추가될 예정입니다.
          </p>
        </div>

        {/* 테스트용 콘텐츠 - 스크롤 확인용 */}
        <div className="px-4 sm:px-8 lg:px-20 py-8 lg:py-16 space-y-6 lg:space-y-8">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">
                섹션 {index + 1}
              </h2>
              <p className="text-gray-700 text-sm lg:text-base">
                이것은 스크롤 테스트를 위한 더미 콘텐츠입니다. 
                헤더가 고정되어 있는지 확인할 수 있습니다.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
