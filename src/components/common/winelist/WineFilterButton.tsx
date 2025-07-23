// import { useState } from 'react';

// import { Button } from '@/components/ui/button';
// // import FilterModal from '@/components/modals/FilterModal'; // 추후 활성화
// import SearchButton from '@/assets/SearchButton.svg'; // ✅ svgr로 불러온 아이콘

// export default function WineFilterButton() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className='
//         flex items-center justify-start
//         xl:hidden                  // PC에서는 숨김, 태블릿/모바일에서만 표시
//         mt-[40px]                 // 슬라이더 아래 여백
//         ml-[20px] mr-[20px]       // 좌우 여백 (검색창과 동일)
//       '
//     >
//       {/* 필터 버튼 */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className='
//           w-[48px] h-[48px]          // 버튼 크기
//           border border-gray-300     // 테두리 색상
//           flex items-center justify-center
//           rounded-[8px]
//           bg-white
//         '
//         aria-label='필터 열기'
//       >
//         {/* svgr로 변환한 아이콘 */}
//         <SearchButton witdh={19.5} height={19.5} className='fill-gray-500' />
//       </button>

//       {/* 모달 - 추후 적용 예정 */}
//       {/*
//         {isOpen && (
//           <FilterModal onClose={() => setIsOpen(false)} />
//         )}
//       */}
//     </div>
//   );
// }
