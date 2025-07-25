import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getUser } from '@/api/user';

const useAuthRedirect = () => {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    if (userData) {
      router.replace('/');
    }
  }, [userData, router]);

  return { userData, isLoading, hasToken };
};

export default useAuthRedirect;
