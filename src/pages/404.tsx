import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

export default function Custom404() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-6'>
      <h1 className='sr-only'>404 Error</h1>

      <div className='flex flex-col items-center mb-20'>
        <Image src='/assets/notFound.png' alt='404 에러 이미지' width={600} height={207} priority />
        <p className='mt-8 text-gray-800 custom-text-lg-bold md:custom-text-2xl-bold'>
          페이지를 찾을 수 없습니다
        </p>
      </div>

      <div className='w-full max-w-[600px] px-8 md:px-0 absolute bottom-16'>
        <Button variant='purpleDark' size='sm' width='full' fontSize='lg' onClick={handleGoHome}>
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
