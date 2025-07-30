import { Component, ErrorInfo, ReactNode } from 'react';

import { isAxiosError } from 'axios';

import ErrorModal from './Modal/ErrorModal';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean; // 에러 발생 여부
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 초기 상태 설정: 에러가 없다고 가정
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;
    console.error('에러 바운더리에서 오류가 감지되었습니다:', error, errorInfo);

    if (onError) {
      onError(error, errorInfo);
    }
  }

  // 컴포넌트 렌더링 로직
  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      let errMsg = '';
      if (isAxiosError(error)) {
        // 에러가 발생했다면 대체 UI를 렌더링
        // fallback prop이 있다면 해당 UI를 보여주고, 없다면 기본 메시지 표시
        switch (error.status) {
          case 404: {
            errMsg = '해당 페이지를 찾을 수 없습니다.';
            break;
          }
          case 403: {
            console.log(error.response?.data?.message);
            if (error.response?.data?.message === '본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.')
              errMsg = '본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.';
            else errMsg = '권한이 없습니다.';
            break;
          }
        }
      }

      return (
        <ErrorModal open={true} onOpenChange={() => {}} onConfirm={() => window.history.go(0)}>
          <div className='custom-text-lg-bold'>{errMsg}</div>
        </ErrorModal>
      );
    }

    // 에러가 없다면 자식 컴포넌트들을 그대로 렌더링
    return children;
  }
}

export default ErrorBoundary;
