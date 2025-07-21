import ImageCard from "@/components/common/card/ImageCard";

export default function CardTestPage() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <ImageCard
        imageSrc="test.url"
        rightSlot={<button className="text-sm">⋯(버튼자리)</button>}
      >
        <p className="text-lg font-semibold">
          와인 이름: Sentinel Cabernet Sauvignon 2016
        </p>
        <p className="text-sm text-gray-600">가격: ₩64,000</p>
      </ImageCard>
    </div>
  );
}
