// import { useState } from 'react';

import SearchButton from '@/assets/icons/SearchButton.svg';
import Filter from '@/components/common/Filter/Filter';
import Input from '@/components/common/Input';
import WineListCard from '@/components/common/winelist/WineListCard';
import { Button } from '@/components/ui/button';

export default function WineFilter() {
  // const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className='relative w-full'>
      {/* PC: 필터 + 검색창 + 등록 버튼 */}
      <div className='hidden xl:flex flex-row max-w-[1140px] mx-auto mt-[40px] gap-[20px]'>
        <aside className='w-[240px] flex flex-col xl:ml-[-20px]'>
          <div className='w-[290px] h-[550px] pt-[60px]'>
            <Filter />
          </div>
          <Button variant='purpleDark' size='sm' width='full' className='mx-[20px] mb-[70px]'>
            와인 등록하기
          </Button>
        </aside>

        <div className='flex-1 flex flex-col items-end gap-[24px] text-gray-500 [&_label]:top-[10px] md:[&_label]:top-[14px] xl:[&_label]:top-[14px]'>
          <Input
            id='wine-search'
            type='text'
            placeholder='와인을 검색해 보세요'
            variant='search'
            className='
              xl:w-[800px] h-[48px] px-[20px] py-[14px] pl-[55px]
              border border-gray-300 rounded-full
            '
          />
          {/* WineListCard PC에서만 노출 */}
          <div className='hidden xl:flex'>
            <WineListCard />
          </div>
        </div>
      </div>

      {/* Tablet: 필터 버튼 + 검색창 + 등록 버튼 */}
      <div className='hidden md:flex xl:hidden flex-row items-center px-[20px] mt-[24px]'>
        <Button
          // onClick={() => setIsFilterOpen(true)}
          variant='white'
          size={null}
          width={null}
          className='flex items-center justify-center border border-gray-300 w-[48px] h-[48px] rounded-[8px] p-0'
        >
          <SearchButton className='w-[20px] h-[20px] text-gray-500' />
        </Button>

        <div className='flex-grow ml-[24px] text-gray-500 [&_label]:top-[14px]'>
          <Input
            id='wine-search'
            type='text'
            placeholder='와인을 검색해 보세요'
            variant='search'
            className='
              md:w-full w-full
              h-[48px] px-[20px] py-[14px] pl-[55px]
              border border-gray-300 rounded-full
            '
          />
        </div>

        <Button
          variant='purpleDark'
          size={null}
          width={null}
          className='w-[220px] h-[48px] rounded-[16px] flex-shrink-0 ml-[16px]'
        >
          와인 등록하기
        </Button>
      </div>

      {/* Mobile: 검색창 + 필터 버튼 */}
      <div className='flex flex-col md:hidden gap-[8px] px-[16px] mt-[24px]'>
        <div className='text-gray-500 [&_label]:top-[10px]'>
          <Input
            id='wine-search'
            type='text'
            placeholder='와인을 검색해 보세요'
            variant='search'
            className='w-full h-[38px] px-[15px] py-[14px] pl-[55px] border border-gray-300 rounded-full'
          />
        </div>

        <div className='w-fit'>
          <Button
            // onClick={() => setIsFilterOpen(true)}
            variant='white'
            size='sm'
            width='xs'
            className='flex items-center justify-center border border-gray-300 w-[38px] h-[38px] p-0'
          >
            <SearchButton className='w-[20px] h-[20px] text-gray-500' />
          </Button>
        </div>
      </div>

      {/* Mobile: 하단 고정 등록 버튼 */}
      <div className='fixed bottom-[20px] left-0 right-0 z-10 px-[16px] md:hidden'>
        <Button
          variant='purpleDark'
          size='sm'
          width='full'
          className='w-full h-[48px] rounded-[12px] text-sm'
        >
          와인 등록하기
        </Button>
      </div>
    </div>
  );
}
