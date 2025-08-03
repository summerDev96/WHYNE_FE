import { useState } from 'react';

import { toast } from 'sonner';

import SearchButton from '@/assets/icons/SearchButton.svg';
import WineTypeFilter from '@/components/common/Filter/WineTypeFilter';
import Input from '@/components/common/Input';
import WineListCard from '@/components/common/winelist/WineListCard';
import FilterModal from '@/components/Modal/FilterModal/FilterModal';
import AddWineModal from '@/components/Modal/WineModal/AddWineModal';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import useWineSearchKeywordStore from '@/stores/searchStore';

export default function WineFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { searchTerm, setSearchTerm } = useWineSearchKeywordStore();

  const { user } = useUser();

  return (
    <div className='w-full max-w-[1140px] mx-auto'>
      {/* PC: 필터 + 검색창 + 등록 버튼 */}
      <div className='hidden xl:flex max-w-[1140px] mx-auto mt-[30px] gap-[24px]'>
        <div className='flex-shrink-0 w-[260px] h-auto flex flex-col gap-[50px] ml-[-28px]'>
          <div className='pt-[70px] '>
            <WineTypeFilter className='h-[450px]' />
          </div>
          <Button
            variant='purpleDark'
            size='md'
            width={null}
            onClick={() => {
              if (!user) toast.error('', { description: '로그인이 필요합니다.' });
              else setShowRegisterModal(true);
            }}
            className='ml-[30px] mb-[200px] w-[284px]'
          >
            와인 등록하기
          </Button>
        </div>
        <div className='flex-1 flex flex-col items-end gap-[18px] text-gray-500 [&_label]:top-[10px] md:[&_label]:top-[14px] xl:[&_label]:top-[14px]'>
          <Input
            id='wine-search'
            type='text'
            placeholder='와인을 검색해 보세요'
            variant='search'
            className='
              xl:w-[800px] h-[48px] px-[20px] py-[14px] pl-[55px]
              border border-gray-300 rounded-full
            '
            value={searchTerm} // 검색어 연결
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='hidden xl:flex pt-[20px]'>
            <WineListCard />
          </div>
        </div>
      </div>
      {/* Tablet: 필터 버튼 + 검색창 + 등록 버튼 */}
      <div className='hidden md:flex xl:hidden flex-row items-center px-[20px] mt-[24px] md:mt-[50px] md:mb-[80px]'>
        <Button
          onClick={() => setIsFilterOpen(true)}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant='purpleDark'
          size={null}
          width={null}
          onClick={() => setShowRegisterModal(true)}
          className='w-[220px] h-[48px] rounded-[16px] flex-shrink-0 ml-[16px]'
        >
          와인 등록하기
        </Button>
      </div>
      {/* Mobile: 검색창 + 필터 버튼 */}
      <div className='flex flex-col md:hidden gap-[8px] px-[16px] mt-[24px]'>
        <div className='text-gray-500 [&_label]:top-[10px] min-w-[343px]'>
          <Input
            id='wine-search'
            type='text'
            placeholder='와인을 검색해 보세요'
            variant='search'
            className='w-full h-[38px] px-[15px] py-[14px] pl-[55px] border border-gray-300 rounded-full'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='w-fit mt-[15px] mb-[20px]'>
          <Button
            onClick={() => setIsFilterOpen(true)}
            variant='white'
            size='sm'
            width='xs'
            className='flex items-center justify-center border border-gray-300 w-[38px] h-[38px] p-0'
          >
            <SearchButton className='w-[20px] h-[20px] text-gray-500' />
          </Button>
        </div>
      </div>
      {isFilterOpen && <FilterModal open={isFilterOpen} onOpenChange={setIsFilterOpen} />}
      {/* Mobile: 하단 고정 등록 버튼 */}
      <div className='fixed bottom-[20px] left-0 right-0 z-10 px-[16px] md:hidden'>
        <Button
          variant='purpleDark'
          size='sm'
          width='full'
          onClick={() => setShowRegisterModal(true)}
          className='w-full h-[48px] rounded-[12px] text-sm'
        >
          와인 등록하기
        </Button>
      </div>
      <AddWineModal
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
      />
    </div>
  );
}
