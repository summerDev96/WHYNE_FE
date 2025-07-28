import { useEffect, useState } from 'react';

import { getCookie } from '@/lib/cookie';

const useTokenCheck = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const accessToken = getCookie({ name: 'accessToken' });
    setHasToken(!!accessToken);
  }, []);

  return hasToken;
};

export default useTokenCheck;
