import { useState } from "react";

import BasicModal from "@/components/common/Modal/BasicModal";
import { Button } from "@/components/ui/button";

const BasicModalGuide = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  return (
    <div className="p-10 flex flex-col gap-4 items-start">
      <div className="text-2xl font-extrabold">BasicModal 가이드</div>
      <div className="text-xl font-bold">props</div>
      <div className="text-small font-medium">
        type : 타입에 따라 모달 크기 결정 ex) register, review, filter
        <br />
        title : 모달 제목
        <br />
        children : 모달 내용
        <br />
        buttons : 푸터의 버튼 영역
        <br />
        open : 모달 show 상태 true/false
        <br />
        onOpenChange : 모달 show 상태 변경 함수
        <br />
        showCloseButton : 닫기 버튼 보여줄지 여부 true/false
      </div>

      <div className="text-xl font-bold">모달1: 하단 버튼이 두개인 경우</div>
      {/* 예시에는 버튼 클릭 시 모달 열리게 되어있음 */}
      {/* 사용 시에는 텍스트, 버튼에 onClick={() => setShowRegisterModal(true)} 추가필요! */}
      <Button
        size="md"
        width="md"
        variant="purpleDark"
        className="text-base font-bold"
        onClick={() => setShowRegisterModal(true)}
      >
        등록 모달 예시
      </Button>
      {/* 모달 컴포넌트 */}
      <BasicModal
        type="register"
        title="와인 등록"
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        /* 버튼커스텀 영역 */
        buttons={
          <>
            <Button
              size="xl"
              width="xl"
              variant="purpleLight"
              className="flex-auto text-base font-bold"
              onClick={() => setShowRegisterModal(false)}
            >
              취소
            </Button>
            <Button
              size="xl"
              width="xl"
              variant="purpleDark"
              className="flex-auto text-base font-bold"
            >
              와인 등록하기
            </Button>
          </>
        }
      >
        {/* 모달 내용 영역 */}
        모달의 내용을 추가해주세요
      </BasicModal>

      <div className="text-xl font-bold">모달2: 하단 버튼이 한 개인 경우</div>
      {/* 버튼 클릭 시 모달 열림 */}
      <Button
        size="md"
        width="md"
        variant="purpleDark"
        className="text-base font-bold"
        onClick={() => setShowReviewModal(true)}
      >
        리뷰 모달 예시
      </Button>
      {/* 모달 컴포넌트 */}
      <BasicModal
        type="review"
        title="리뷰 등록"
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        /* 버튼커스텀 영역 */
        buttons={
          <>
            <Button
              size="xl"
              width="xl"
              variant="purpleDark"
              className="flex-auto text-base font-bold"
            >
              리뷰 남기기
            </Button>
          </>
        }
      >
        {/* 모달 내용 영역 */}
        모달의 내용을 추가해주세요
      </BasicModal>
    </div>
  );
};

export default BasicModalGuide;
