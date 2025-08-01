import WineFilter from '@/components/common/winelist/WineFilter';
import WineListCard from '@/components/common/winelist/WineListCard';
import WineSlider from '@/components/common/winelist/WineSlider';

export default function Wines() {
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
