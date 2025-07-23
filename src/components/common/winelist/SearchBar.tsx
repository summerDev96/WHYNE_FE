import Input from '@/components/common/Input';

export default function SearchBar() {
  return (
    <div
      className='
        relative xl:max-w-[1140px] xl:mx-auto
        flex justify-start xl:justify-end
        mt-[24px] md:mt-[24px] xl:mt-[40px]
        px-[16px] md:px-[20px] xl:px-0 
        text-gray-500
        [&_label]:top-[10px]             // 모바일용 아이콘 수직 정렬 보정
      md:[&_label]:top-[14px]          // 태블릿용 보정
      xl:[&_label]:top-[14px]          // PC용 보정
      '
    >
      <Input
        id='wine-search'
        type='text'
        placeholder='와인을 검색해 보세요'
        variant='search'
        className='
    w-[343px] h-[38px] px-[15px] py-[14px] pl-[55px]  // ← 모바일에서 아이콘 간격 반영
    md:w-[396px] md:h-[48px] md:px-[20px] md:py-[14px] md:pl-[55px]  // ← 태블릿 이상
    xl:w-[800px] xl:h-[48px] xl:px-[20px] xl:py-[14px] xl:pl-[55px]
    border border-gray-300
  '
      />
    </div>
  );
}
