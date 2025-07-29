import { useEffect, useState } from 'react';

import { checkToken } from '@/api/auth';

const useTokenCheck = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const tokenData = await checkToken();
        const accessToken = tokenData.accessToken;
        setHasToken(!!accessToken);
      } catch (error) {
        console.error('토큰 확인 실패', error);
      }
    };

    fetchTokenData();
  }, []);

  return hasToken;
};

export default useTokenCheck;
