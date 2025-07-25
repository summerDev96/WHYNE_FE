import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getUser } from '@/api/user';

import useTokenCheck from './useTokenCheck';

const useAuthRedirect = () => {
  const router = useRouter();
  const hasToken = useTokenCheck();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    if (userData) {
      router.replace('/');
    }
  }, [userData, router]);

  return { userData, isLoading, hasToken };
};

export default useAuthRedirect;
