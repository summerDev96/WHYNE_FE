import { Badge } from "@/components/ui/badge";
import { DualSlider } from "@/components/ui/dual-slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFilterStore, { WineType } from "@/stores/filterStore";

const Filter = () => {
  const {
    type,
    setType,
    minPrice,
    maxPrice,
    setPriceRange,
    rating,
    setRating,
  } = useFilterStore();
  const wineTypeOptions: WineType[] = ["Red", "White", "Sparkling"];
  const priceRange: [number, number] = [minPrice, maxPrice];

  return (
    <div className="m-8 flex flex-col gap-9">
      <div className="flex flex-col gap-3">
        <span className="text-xl font-bold">WINE TYPES</span>
        <div className="flex gap-2.5">
          {/* todo: 공통 뱃지로 변경 필요 */}
          {wineTypeOptions.map((option, index) => (
            <Badge
              key={`${option}-${index}`}
              variant="secondary"
              className={
                type === option ? "bg-violet-500 text-white" : "bg-white"
              }
              onClick={() => setType(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-xl font-bold">PRICE</span>
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
      <div className="flex flex-col gap-2.5">
        <span className="text-xl font-bold">RATING</span>
        {/* todo: 공통 라디오, 라벨 컴포넌트로 변경 필요 */}
        <RadioGroup value={rating} onValueChange={setRating}>
          <div className="flex items-center gap-3">
            {/* 전체인 경우 보내야 하는 값을 몰라서, 임의로 value 0으로 설정하였습니다. */}
            <RadioGroupItem value="0" id="r1" />
            <Label htmlFor="r1">전체</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="4.9" id="r2" />
            <Label htmlFor="r2">4.8 - 5.0</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="4.1" id="r3" />
            <Label htmlFor="r3">4.0 - 4.5</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="3.1" id="r4" />
            <Label htmlFor="r4">3.0 - 4.0</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;
