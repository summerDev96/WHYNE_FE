import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    //ssr시 실행안하도록
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);

    const handleChange = () => {
      setMatches(media.matches);
    };

    setMatches(media.matches);

    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
}
