import React, { useState } from 'react';

import Filterbtn from '@/assets/icons/filterbtn.svg';
import WineTypeFilter from '@/components/common/Filter/WineTypeFilter';
import useFilterStore from '@/stores/filterStore';

import BasicModal from '../../common/Modal/BasicModal';
import { Button } from '../../ui/button';

const FilterModal = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const reset = useFilterStore((state) => state.reset);

  //모달창 끄면 리셋되게
  const closeModalReset = (isOpen: boolean) => {
    setShowRegisterModal(isOpen);
    if (!isOpen) reset();
  };
  ////
  return (
    <div>
      <Filterbtn
        className='w-[38px] md:w-[48px] h-[38px] md:h-[48px] border border-gray-300 text-gray-500 rounded-[8px] p-2 md:p-[11px] cursor-pointer'
        onClick={() => setShowRegisterModal(true)}
      />
      <BasicModal
        type='filter'
        title='필터'
        open={showRegisterModal}
        onOpenChange={closeModalReset}
        buttons={
          <div className='flex gap-2'>
            <Button
              onClick={reset}
              variant='purpleLight'
              size='xl'
              className='w-[96px] md:w-[96px]'
              fontSize='lg'
            >
              초기화
            </Button>
            <Button
              type='submit'
              variant='purpleDark'
              size='xl'
              className='w-[223px] md:w-[223px]'
              fontSize='lg'
            >
              필터 적용하기
            </Button>
          </div>
        }
      >
        <form>
          <WineTypeFilter className='mt-[20px] mb-[25px] ' showBorder={true} hasMargin={false} />
        </form>
      </BasicModal>
    </div>
  );
};

export default FilterModal;
