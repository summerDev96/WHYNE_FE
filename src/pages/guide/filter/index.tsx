import Link from "next/link";

const FilterGuide = () => {
  return (
    <div className="p-10">
      <div className="text-2xl font-extrabold mb-4">필터 가이드 목록</div>
      <div className="flex flex-col gap-2">
        <Link href="/guide/filter/basicfilter" className="text-lg font-medium">
          Filter 가이드
        </Link>
      </div>
    </div>
  );
};

export default FilterGuide;
