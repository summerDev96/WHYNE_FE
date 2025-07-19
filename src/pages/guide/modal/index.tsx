import Link from "next/link";

const ModalGuide = () => {
  return (
    <div className="p-10">
      <div className="text-2xl font-extrabold mb-4">모달 가이드 목록</div>
      <div className="flex flex-col gap-2">
        <Link href="/guide/modal/basicmodal" className="text-lg font-medium">
          BasicModal 가이드
        </Link>
        <Link href="/guide/modal/confirmmodal" className="text-lg font-medium">
          ConfirmModal 가이드
        </Link>
      </div>
    </div>
  );
};

export default ModalGuide;
