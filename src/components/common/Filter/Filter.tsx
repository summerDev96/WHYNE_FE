import { Badge } from '@/components/ui/badge';
import { DualSlider } from '@/components/ui/dual-slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useFilterStore, { WineType } from '@/stores/filterStore';

const Filter = () => {
  const { type, setType, minPrice, maxPrice, setPriceRange, rating, setRating } = useFilterStore();

  const wineTypeOptions: WineType[] = ['Red', 'White', 'Sparkling'];
  const priceRange: [number, number] = [minPrice, maxPrice];

  return (
    <div className='m-8 flex flex-col gap-9'>
      <div className='flex flex-col gap-3'>
        <span className='text-xl font-bold'>WINE TYPES</span>
        <div className='flex gap-2.5'>
          {wineTypeOptions.map((option, index) => (
            <Badge
              key={`${option}-${index}`}
              variant='chooseWineType'
              className={type === option ? 'bg-purpleDark text-white' : 'bg-white'}
              onClick={() => setType(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <span className='text-xl font-bold'>PRICE</span>
        {/* todo: 공통 레인지 슬라이더로 변경 필요 */}
        <DualSlider
          min={0}
          max={100000}
          step={1000}
          defaultValue={[0, 100000]}
          value={priceRange}
          onValueChange={setPriceRange}
          minStepsBetweenThumbs={5}
        />
      </div>
      <div className='flex flex-col gap-2.5'>
        <span className='text-xl font-bold'>RATING</span>
        {/* todo: 공통 라디오, 라벨 컴포넌트로 변경 필요 */}
        <RadioGroup value={rating} onValueChange={setRating}>
          <div className='flex items-center gap-3'>
            {/* 전체인 경우 rating값을 아예 안보내는 것 같아 임의로 all로 설정 */}
            <RadioGroupItem value='all' id='rate-all' />
            <Label htmlFor='rate-all'>전체</Label>
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='4.6' id='rate1' />
            <Label htmlFor='rate1'>4.5 - 5.0</Label>
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='4.1' id='rate2' />
            <Label htmlFor='rate2'>4.0 - 4.5</Label>
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='3.6' id='rate3' />
            <Label htmlFor='rate3'>3.5 - 4.0</Label>
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='3.1' id='rate4' />
            <Label htmlFor='rate4'>3.0 - 3.5</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;
