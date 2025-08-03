import { useEffect } from 'react';

import WineFilter from '@/components/common/winelist/WineFilter';
import WineListCard from '@/components/common/winelist/WineListCard';
import WineSlider from '@/components/common/winelist/WineSlider';
import useFilterStore from '@/stores/filterStore';
import useWineSearchKeywordStore from '@/stores/searchStore';

export default function Wines() {
  const reset = useFilterStore((state) => state.reset);
  const setSearchTerm = useWineSearchKeywordStore((state) => state.setSearchTerm);
  useEffect(() => {
    return () => {
      reset();
      setSearchTerm('');
    };
  }, []);

  return (
    <div>
      <WineSlider />
      <WineFilter />
      <div className='xl:hidden'>
        <WineListCard />
      </div>
    </div>
  );
}
