import Filter from "@/components/common/Filter/Filter";
import useFilterStore from "@/stores/filterStore";

const BasicFilterGuide = () => {
  const { type, minPrice, maxPrice, rating } = useFilterStore();

  return (
    <div className="p-10 flex flex-col gap-4 items-start">
      <div className="text-2xl font-extrabold">필터 가이드</div>
      <div className="text-xl font-bold">필터 예시</div>
      <div className="bg-slate-50">
        <Filter />
      </div>
      <div className="text-xl font-bold">필터 값</div>
      *stores의 filterStore로 관리 (zustand) <br />
      useFilterStore를 import 하여 type, minPrice, maxPrice, rating 값 사용
      <br />
      <br />
      type (와인 종류): {type}
      <br />
      minPrice (최소 가격): {minPrice}
      <br />
      maxPrice (최대 가격): {maxPrice}
      <br />
      rating (별점): {rating}
    </div>
  );
};

export default BasicFilterGuide;
