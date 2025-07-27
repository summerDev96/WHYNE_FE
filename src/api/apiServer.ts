import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

async function refreshAccessTokenOnServer(refreshToken: string) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });
    return {
      newAccessToken: response.data.accessToken,
      newRefreshToken: response.data.refreshToken,
    };
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    throw error;
  }
}

interface FetchWineInfoOptions {
  accessToken?: string;
  refreshToken?: string;
  context?: GetServerSidePropsContext; // SSR에서만 사용
}

export async function getWineInfo(wineid: number, options?: FetchWineInfoOptions) {
  const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.accessToken && { Authorization: `Bearer ${options.accessToken}` }),
    },
  });

  try {
    console.log(`[getWineInfo] 1차 시도: /${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`);
    console.log(
      `[getWineInfo] 1차 시도 AccessToken: ${options?.accessToken ? options.accessToken.substring(0, 10) + '...' : '없음'}`,
    );

    const response = await apiInstance.get(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`);
    console.log(`[getWineInfo] 1차 시도 성공 (ID: ${wineid})`);
    return response.data;
  } catch (error: any) {
    console.error(`[getWineInfo] 1차 시도 에러 발생:`, error.response?.status || error.message);

    if (error.response?.status === 401 && options?.refreshToken && options?.context) {
      console.log('[getWineInfo] 401 발생. 토큰 갱신 로직 진입.');
      console.log(`[getWineInfo] refreshToken 존재 여부: ${!!options.refreshToken}`); // refreshToken 존재 확인
      console.log(`[getWineInfo] context 존재 여부: ${!!options.context}`); // context 존재 확인

      try {
        const refreshResult = await refreshAccessTokenOnServer(options.refreshToken);

        if (refreshResult) {
          const { newAccessToken, newRefreshToken } = refreshResult;

          console.log(`[getWineInfo] ✅ 토큰 갱신 성공 (refreshAccessTokenOnServer 호출 결과):`);
          console.log(
            `  New AccessToken (first 10): ${newAccessToken ? newAccessToken.substring(0, 10) + '...' : '없음'}`,
          );
          console.log(
            `  New RefreshToken (first 10): ${newRefreshToken ? newRefreshToken.substring(0, 10) + '...' : '없음'}`,
          );

          // 새로운 토큰을 클라이언트에 쿠키로 설정 (SSR에서만 context.res 사용)
          // Secure 및 HttpOnly 속성도 production 환경에서 꼭 넣어주세요.
          options.context.res.setHeader('Set-Cookie', [
            `accessToken=${newAccessToken}; Path=/; Max-Age=${60 * 60}; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
            `refreshToken=${newRefreshToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
          ]);

          // 새로 발급받은 토큰으로 API 호출 재시도
          apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          console.log(
            `[getWineInfo] 2차 시도 (갱신된 토큰 사용): /${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`,
          );
          const retryResponse = await apiInstance.get(
            `/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`,
          );

          console.log(`[getWineInfo] ✅ 2차 시도 성공 (ID: ${wineid})`);
          return retryResponse.data;
        } else {
          // refreshAccessTokenOnServer가 에러를 던지지 않고 falsy 값을 반환한 경우
          console.error(
            '[getWineInfo] refreshAccessTokenOnServer가 유효한 토큰 결과를 반환하지 않았습니다.',
          );
          throw new Error('Access token refresh failed: No valid tokens returned.');
        }
      } catch (refreshOrRetryError: any) {
        // 토큰 갱신 자체에서 에러가 났거나, 2차 시도에서 에러가 났을 때
        //  document.cookie = `accessToken=${data.accessToken}; Path=/; Max-Age=${60 * 60}; SameSite=Lax; ${location.protocol === 'https:' ? 'Secure;' : ''}`;
        console.error(
          `[getWineInfo] ❌ 토큰 갱신 또는 2차 시도 중 최종 에러 발생:`,
          refreshOrRetryError.message || refreshOrRetryError,
        );
        if (refreshOrRetryError.response) {
          console.error(
            `  응답 상태: ${refreshOrRetryError.response.status}, 응답 데이터:`,
            refreshOrRetryError.response.data,
          );
        }
        throw refreshOrRetryError; // 이 에러를 다시 던져서 getServerSideProps의 catch 블록으로 전달
      }
    }

    // 401 에러가 아니거나, refreshToken/context가 없어서 토큰 갱신 로직에 진입하지 않은 경우
    // 또는 토큰 갱신 시도 후에도 재시도 로직에 진입하지 못했거나 다른 예외가 발생한 경우
    console.error(
      `[getWineInfo] ❌ API 호출 최종 실패 (401 에러 처리 불가능 또는 다른 유형의 에러):`,
      error.message || error,
    );
    if (error.response) {
      console.error(`  응답 상태: ${error.response.status}, 응답 데이터:`, error.response.data);
    }
    throw error; // 이 에러를 다시 던져서 getServerSideProps의 catch 블록으로 전달
  }
}
