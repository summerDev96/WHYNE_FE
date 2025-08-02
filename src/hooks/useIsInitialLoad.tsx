import { useEffect } from 'react';

import { useRouter } from 'next/router';

import useNavigationStore from '@/stores/routerStore';

export const useSetupNavigationListener = () => {
  const router = useRouter();
  const setNavigated = useNavigationStore((state) => state.setNavigated);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setNavigated();
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events, setNavigated]);
};
