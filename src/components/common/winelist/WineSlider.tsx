// src/components/winelist/WineSlider.tsx

export default function WineSlider() {
  return (
    <section
      className='
        w-full
        h-[241px]               // 모바일 높이
        mt-[15px]               // 모바일 상단 여백
        rounded-[12px]          // 모바일 둥글기
        px-[16px]               // 모바일 좌우 패딩
        bg-gray-100             // 배경색

        md:h-[299px]            // 태블릿 높이
        md:mt-[20px]           // 태블릿 상단 여백
        md:rounded-[16px]       // 태블릿 radius
        md:px-[20px]            // 태블릿 패딩

        xl:max-w-[1140px]       // PC 최대 너비
        xl:mt-[20px]           // PC 상단 여백
        xl:px-0                 // PC padding 제거
        xl:mx-auto              // PC 중앙 정렬
      '
    >
      {/* 섹션 제목 */}
      <h2
        className='
          custom-text-2lg-bold     // 모바일 폰트 (18px bold)
          md:custom-text-xl-bold   // 태블릿/PC 폰트 (20px bold)
          p-[20px] md:p-[30px]   // 위쪽 간격
          text-gray-800
          
        '
      >
        이번 달 추천 와인
      </h2>

      {/* 슬라이더 자리 */}
      <div className='mt-[20px] md:mt-[30px] xl:mt-[30px]'>{/* 슬라이더 들어갈 자리 */}</div>
    </section>
  );
}
