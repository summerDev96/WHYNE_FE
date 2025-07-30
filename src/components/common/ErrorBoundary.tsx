import { Component, ErrorInfo, ReactNode } from 'react';

import { isAxiosError } from 'axios';

import ErrorModal from './Modal/ErrorModal';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRedirect: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean; // 에러 발생 여부
  error: Error | null;
  isOpen: boolean;
  errorMessageToDisplay: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 초기 상태 설정: 에러가 없다고 가정
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    isOpen: false,
    errorMessageToDisplay: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let errorMessage = '알 수 없는 에러가 발생했습니다.';

    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 404: {
          errorMessage = '해당 페이지를 찾을 수 없습니다.';
          break;
        }
        case 403: {
          const apiMessage = error.response?.data?.message;
          if (apiMessage === '본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.') {
            errorMessage = '본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.';
          } else {
            errorMessage = '권한이 없습니다.';
          }
          break;
        }
        default: {
          errorMessage = `${error.response?.status || ''} - ${error.response?.data?.message || error.message}`;
          break;
        }
      }
    } else {
      errorMessage = `${error.message}`;
    }

    return { hasError: true, error, isOpen: true, errorMessageToDisplay: errorMessage };
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
    const { hasError, isOpen, errorMessageToDisplay } = this.state;
    const { children, onRedirect } = this.props;

    if (hasError) {
      return (
        <ErrorModal
          open={isOpen}
          onOpenChange={() => {}}
          onConfirm={() => {
            this.setState({ isOpen: false, hasError: false });
            onRedirect();
          }}
        >
          <div className='text-center custom-text-lg-bold'>
            {errorMessageToDisplay}
            <br />
            {'메인화면으로 돌아갑니다.'}
          </div>
        </ErrorModal>
      );
    }

    // 에러가 없다면 자식 컴포넌트들을 그대로 렌더링
    return children;
  }
}

export default ErrorBoundary;
