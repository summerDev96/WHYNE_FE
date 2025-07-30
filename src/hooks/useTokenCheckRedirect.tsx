import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { checkToken } from '@/api/auth';

const useTokenCheck = () => {
  const router = useRouter();

  const { data: tokenData, isLoading } = useQuery({
    queryKey: ['checkToken'],
    queryFn: checkToken,
    retry: false,
  });

  useEffect(() => {
    if (tokenData?.accessToken) {
      router.replace('/');
    }
  }, [tokenData, router]);

  return { isLoading, tokenData };
};

export default useTokenCheck;
