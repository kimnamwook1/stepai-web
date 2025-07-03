"use client";

import React, { useState } from 'react';
import Carousel_Main_Category from './Carousel_Main_Category';

const categories = [
  '문서·글쓰기',
  '마케팅·디자인',
  '교육·학습',
  '미디어·엔터테인먼트',
  'IT·프로그래밍',
  '비즈니스·전문가',
  '커머스·세일즈',
  '번역·통역',
  '건강·웰니스',
  '에이전트·자동화',
];

const Merged_Carousel_Main_Category: React.FC = () => {
  const [categoryList, setCategoryList] = useState(categories);

  const handleLeft = () => {
    setCategoryList((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
  };

  const handleRight = () => {
    setCategoryList((prev) => [...prev.slice(1), prev[0]]);
  };

  /*
  const handleCategoryClick = (title: string) => {
    // 리디렉션 함수 (리턴값 없음)
  };
  */

  return (
    <div className="w-full flex justify-center py-4 bg-transparent">
      <div className="w-[1280px] max-w-full flex items-center justify-center">
        <button
          onClick={handleLeft}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors duration-300 mr-1"
          aria-label="왼쪽으로 이동"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-[1px] tablet:gap-0 overflow-x-visible">
          {categoryList.map((_, idx) => (
            <Carousel_Main_Category
                key={idx}
                title={categoryList[idx]}
                onClick={() => {}}
            />
          ))}
        </div>
        <button
          onClick={handleRight}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors duration-300 ml-1"
          aria-label="오른쪽으로 이동"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Merged_Carousel_Main_Category; 