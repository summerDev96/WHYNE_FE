import { useEffect, useState } from 'react';

const useTokenCheck = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setHasToken(!!token);
  }, []);

  return hasToken;
};

export default useTokenCheck;
