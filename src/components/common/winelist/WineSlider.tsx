// src/components/winelist/WineSlider.tsx

export default function WineSlider() {
  return (
    <section
      className='
        w-full
        h-[241px]
        mt-[15px]
        rounded-[12px]
        px-[16px]
        bg-gray-100 

        md:mt-[20px]           
        md:rounded-[16px]     
        md:px-[20px]          

        xl:max-w-[1140px]      
        xl:mt-[20px]           
        xl:px-0                 
        xl:mx-auto             
      '
    >
      {/* 섹션 제목 */}
      <h2
        className='
          custom-text-2lg-bold     
          md:custom-text-xl-bold   
          p-[20px] md:p-[30px] 
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
