import React from 'react';

interface CarouselMainCategoryProps {
  title: string;
  onClick: () => void;
}

const Carousel_Main_Category: React.FC<CarouselMainCategoryProps> = ({ title, onClick }) => {
  return (
    <div
      className="w-[120px] h-[130px] flex flex-col items-center cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="w-[60px] h-[60px] bg-gray-200 flex items-center justify-center rounded-md mt-4 mb-2">
        <span className="text-gray-400 text-xs font-semibold select-none">아이콘</span>
      </div>
      <span className="text-[13px] font-medium text-center text-gray-800 select-none tracking-tighter whitespace-nowrap">
        {title.replace(/\s*·\s*/g, '·')}
      </span>
    </div>
  );
};

export default Carousel_Main_Category; 