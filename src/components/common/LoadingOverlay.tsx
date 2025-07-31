import React, { useEffect, useState } from 'react';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import { Loading } from './Loading';
import { Overlay } from './Overlay';

interface LoadingOverlayProps {
  className?: string;
}

export function LoadingOverlay({ className }: LoadingOverlayProps) {
  const MIN_DELAY = 200;

  const [showLoading, setShowLoading] = useState(false);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    // 로딩중인 경우 로딩 보여줌
    if (isLoading) {
      setShowLoading(true);
      return;
    }

    // 로딩 보여주고 있을 때, 최소 0.2초 이상 보여줌
    if (showLoading) {
      timeout = setTimeout(() => {
        setShowLoading(false);
      }, MIN_DELAY);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading, showLoading]);

  if (!showLoading) return null;

  return (
    <Overlay className={className}>
      <Loading size={'lg'} />
    </Overlay>
  );
}
