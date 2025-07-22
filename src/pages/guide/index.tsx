import Link from 'next/link';

const Guide = () => {
  return (
    <div className='p-10'>
      <div className='text-2xl font-extrabold mb-4'>컴포넌트 가이드 목록</div>
      <Link href='/guide/modal' className='text-lg font-medium'>
        모달 가이드
      </Link>
    </div>
  );
};

export default Guide;
