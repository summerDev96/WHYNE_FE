import SearchBar from '@/components/common/winelist/SearchBar';
// import WineFilter from '@/components/common/winelist/WineFilter';
import WineSlider from '@/components/common/winelist/WineSlider';
// import WineFilterButton from '@/components/common/winelist/WineFilterButton';

export default function Wines() {
  return (
    <div>
      <WineSlider />
      <SearchBar />
      {/* <WineFilter />
      <WineFilterButton /> */}
    </div>
  );
}
