import apiClient from '@/api/apiClient';

import type { MyReviewsResponse } from '@/types/MyReviewsTypes';

const DEFAULT_LIMIT = 10;
const BASE_PATH = '/users/me/reviews';

/**
 * 내 리뷰 조회 옵션
 */
export interface FetchMyReviewsOptions {
  /** 조회 시작 커서 (기본: 0) */
  cursor?: number | null;
  /** 한 페이지당 아이템 수 (기본: DEFAULT_LIMIT) */
  limit?: number;
}

/**
 * 내 리뷰 목록 가져오기
 *
 * @param options.cursor 시작 커서 (기본 0)
 * @param options.limit  페이지 크기 (기본 DEFAULT_LIMIT)
 * @returns Promise<MyReviewsResponse>
 * @throws {Error} NEXT_PUBLIC_TEAM 환경변수가 없으면 예외 발생
 */
export const getMyReviews = async (
  options: FetchMyReviewsOptions = {},
): Promise<MyReviewsResponse> => {
  const { cursor = 0, limit = DEFAULT_LIMIT } = options;

  const teamId = process.env.NEXT_PUBLIC_TEAM;
  if (!teamId) {
    throw new Error('환경변수 NEXT_PUBLIC_TEAM이 설정되지 않았습니다. 빌드 환경을 확인해주세요.');
  }

  const url = `/${teamId}${BASE_PATH}`;

  // API 호출
  const response = await apiClient.get<MyReviewsResponse, MyReviewsResponse>(url, {
    params: { cursor, limit },
  });

  // 요청 디버그 로그 (개발 환경에서만 활성화 권장)
  if (process.env.NODE_ENV === 'development') {
    console.debug('[API] getMyReviews', { url, cursor, limit, response });
  }

  return response;
};
