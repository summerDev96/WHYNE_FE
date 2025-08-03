import { useEffect, useState } from 'react';

import NextIcon from '@/assets/icons/Next.svg'; // 👉 오른쪽 화살표 아이콘 (↑로 만들기 위해 회전함)

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 📌 스크롤 이벤트 등록 → 300px 이상 내려가면 버튼 표시
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // 📌 클릭 시 부드럽게 최상단 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null; // ❌ 안 보이면 렌더 안 함

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-6 right-6 z-50 rounded-full bg-purple-600 p-3 shadow-lg transition hover:bg-purple-700'
      aria-label='Scroll to top'
    >
      {/* ✅ 아이콘을 위쪽(↑)으로 보이게 회전 */}
      <NextIcon className='w-5 h-5 rotate-[-90deg] text-white' />
    </button>
  );
}
