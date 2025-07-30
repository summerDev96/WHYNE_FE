import React from 'react';

import BasicBottomSheet from '@/components/common/BottomSheet/BasicBottomSheet';
import WineTypeFilter from '@/components/common/Filter/WineTypeFilter';
import BasicModal from '@/components/common/Modal/BasicModal';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import useFilterStore from '@/stores/filterStore';

const FilterModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const reset = useFilterStore((state) => state.reset);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false); // 필터 적용 후 모달을 close
  };

  const renderButton = (
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
        type='button'
        onClick={handleApplyFilter}
        variant='purpleDark'
        size='xl'
        className='w-[223px] md:w-[223px]'
        fontSize='lg'
      >
        필터 적용하기
      </Button>
    </div>
  );

  const renderForm = (
    <form onSubmit={handleApplyFilter}>
      <WineTypeFilter className='mt-[20px] mb-[25px] ' showBorder={true} hasMargin={false} />
    </form>
  );

  return (
    <div>
      {isDesktop ? (
        <BasicModal
          type='filter'
          title='필터'
          open={open}
          onOpenChange={onOpenChange}
          buttons={renderButton}
        >
          {renderForm}
        </BasicModal>
      ) : (
        <BasicBottomSheet
          title='필터'
          open={open}
          onOpenChange={onOpenChange}
          buttons={renderButton}
        >
          {renderForm}
        </BasicBottomSheet>
      )}
    </div>
  );
};

export default FilterModal;
