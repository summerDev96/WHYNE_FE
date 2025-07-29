import apiClient from '@/api/apiClient';

import type { MyWinesResponse } from '@/types/MyWinesTypes';

const DEFAULT_LIMIT = 10;
const BASE_PATH = '/users/me/wines';

/**
 * 내 와인 조회 옵션
 */
export interface FetchMyWinesOptions {
  /** 조회 시작 커서 (기본: 0) */
  cursor?: number | null;
  /** 한 페이지당 아이템 수 (기본: DEFAULT_LIMIT) */
  limit?: number;
}

/**
 * 내 와인 목록 가져오기
 *
 * @param options.cursor 시작 커서 (기본 0)
 * @param options.limit  페이지 크기 (기본 DEFAULT_LIMIT)
 * @returns Promise<MyWinesResponse>
 * @throws {Error} NEXT_PUBLIC_TEAM 환경변수가 없으면 예외 발생
 */
export const getMyWines = async (options: FetchMyWinesOptions = {}): Promise<MyWinesResponse> => {
  const { cursor = 0, limit = DEFAULT_LIMIT } = options;

  const teamId = process.env.NEXT_PUBLIC_TEAM;
  if (!teamId) {
    throw new Error('환경변수 NEXT_PUBLIC_TEAM이 설정되지 않았습니다. 빌드 환경을 확인해주세요.');
  }

  const url = `/${teamId}${BASE_PATH}`;

  // API 호출
  const response = await apiClient.get<MyWinesResponse, MyWinesResponse>(url, {
    params: { cursor, limit },
  });

  // 요청 디버그 로그
  if (process.env.NODE_ENV === 'development') {
    console.debug('[API] getMyWines', { url, cursor, limit, response });
  }

  return response;
};
