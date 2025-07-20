// src/pages/guide/dropdown.tsx

import MenuDropdown from "@/components/common/dropdown/MenuDropdown";
import SelectDropdown from "@/components/common/dropdown/SelectDropdown";
import { useState } from "react";

/**
 * 드롭다운 가이드 페이지
 * - MenuDropdown: 메뉴/액션(수정, 삭제 등)용
 * - SelectDropdown: 선택 입력용 (폼 컴포넌트)
 */
export default function DropdownGuidePage() {
  const [action, setAction] = useState("edit");
  const actionOptions = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const [category, setCategory] = useState("Red");
  const categoryOptions = [
    { label: "Red", value: "Red" },
    { label: "White", value: "White" },
    { label: "Sparkling", value: "Sparkling" },
  ];

  return (
    <main className="p-6 space-y-10">
      {/* MenuDropdown 가이드 */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">MenuDropdown 사용법</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
          <code>
            {`<MenuDropdown
              options={[
                { label: "수정하기", value: "edit" },
                { label: "삭제하기", value: "delete" },
              ]}
              onSelect={setAction}
              label="메뉴"
            />`}
          </code>
        </pre>

        <h3 className="text-md font-medium">데이터 흐름</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>
            <code>options</code>: 메뉴에 표시될 항목 목록
          </li>
          <li>
            <code>onSelect</code>: 항목 클릭 시 실행할 콜백
          </li>
          <li>
            <code>label</code>: 버튼 텍스트
          </li>
        </ul>

        <div className="flex gap-4 items-center pt-5">
          <p className="text-sm w-52">
            선택된 메뉴: <strong>{action}</strong>
          </p>
          <MenuDropdown
            options={actionOptions}
            onSelect={(value) => setAction(value)}
            label="메뉴"
          />
        </div>
      </section>

      {/* SelectDropdown 가이드 */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">SelectDropdown 사용법</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
          <code>
            {`<SelectDropdown
              value={category}
              options={[
                { label: "Red", value: "Red" },
                { label: "White", value: "White" },
                { label: "Sparkling", value: "Sparkling" },
              ]}
              onChange={setCategory}
            />`}
          </code>
        </pre>

        <h3 className="text-md font-medium">데이터 흐름</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>
            <code>value</code>: 현재 선택된 항목 값
          </li>
          <li>
            <code>options</code>: 드롭다운 항목 목록
          </li>
          <li>
            <code>onChange</code>: 항목 선택 시 콜백
          </li>
        </ul>

        <div className="pt-5 space-y-2">
          <p className="text-sm">
            선택된 카테고리: <strong>{category}</strong>
          </p>
          <SelectDropdown
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />
        </div>
      </section>
    </main>
  );
}
