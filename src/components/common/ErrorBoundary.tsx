import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean; // 에러 발생 여부
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 초기 상태 설정: 에러가 없다고 가정
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
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
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    // 에러가 발생했다면 대체 UI를 렌더링
    if (hasError) {
      // fallback prop이 있다면 해당 UI를 보여주고, 없다면 기본 메시지 표시
      return fallback;
    }

    // 에러가 없다면 자식 컴포넌트들을 그대로 렌더링
    return children;
  }
}

export default ErrorBoundary;
