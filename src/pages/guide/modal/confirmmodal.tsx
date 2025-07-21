import { useState } from "react";

import ConfirmModal from "@/components/common/Modal/ConfirmModal";
import { Button } from "@/components/ui/button";

const ConfirmModalGuide = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-10 flex flex-col gap-4 items-start">
      <div className="text-2xl font-extrabold">ConfirmModal 가이드</div>
      <div className="text-xl font-bold">props</div>
      <div className="text-small font-medium">
        children : 모달 내용
        <br />
        buttons : 푸터의 버튼 영역
        <br />
        open : 모달 show 상태 true/false
        <br />
        onOpenChange : 모달 show 상태 변경 함수
      </div>
      <div className="text-xl font-bold">모달 예시</div>
      {/* 예시에는 버튼 클릭 시 모달 열리게 되어있음 */}
      {/* 사용 시에는 텍스트, 버튼에 onClick={() => setShowModal(true)} 추가필요! */}
      <Button variant="purpleDark" onClick={() => setShowModal(true)}>
        삭제 모달 예시
      </Button>
      {/* 모달 컴포넌트 */}
      <ConfirmModal
        open={showModal}
        onOpenChange={setShowModal}
        /* 버튼커스텀 영역 */
        buttons={
          <>
            <Button
              variant="purpleDark"
              className="flex-auto"
              onClick={() => setShowModal(false)}
            >
              취소
            </Button>
            <Button className="flex-auto">삭제하기</Button>
          </>
        }
      >
        {/* 모달 내용 영역 */}
        정말 삭제하시겠습니까?
      </ConfirmModal>
    </div>
  );
};

export default ConfirmModalGuide;
