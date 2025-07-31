const review1 = {
  content:
    '최근에 센티넬 카베르네 소비뇽 2016을 마셔볼 기회가 있었는데, 정말 인상 깊은 경험이었어요! 처음 잔에 따랐을 때부터 짙고 깊은 루비색이 묵직한 존재감을 드러냈고, 가장자리로는 은은한 오렌지빛 림이 형성되어 숙성미를 짐작게 했습니다. 코를 가져다 대니 처음에는 블랙커런트, 잘 익은 블랙체리 같은 진한 검은 과일 향이 지배적이었고, 이내 삼나무, 가죽, 흙내음 같은 복합적인 2차 아로마와 함께 초콜릿, 에스프레소 같은 숙성된 오크 뉘앙스가 우아하게 피어났습니다. 한 모금 마셔보니, 탄탄하면서도 벨벳 같은 질감의 타닌이 입안을 감쌌고, 응축된 과일 맛과 함께 숙성에서 오는 스파이시함, 담배 잎 같은 쌉쌀한 풍미가 조화롭게 어우러졌습니다. 산미는 적절하게 균형을 잡아주어 자칫 무거울 수 있는 와인에 생기를 불어넣었고, 길고 우아하게 이어지는 여운 속에서는 미묘한 허브와 미네랄리티가 느껴졌습니다. 그냥 저녁 식사 후 편안하게 혼자 또는 가까운 사람들과 함께 깊이 있는 대화를 나눌 때 마시기에도 완벽했습니다.',
  user: {
    name: '김성주',
  },
  updatedAt: '11시간 전', // updatedAt: '2025-07-23T08:41:22.920Z', 변환하는 함수 하나 만들기
  aroma: ['체리', '오크', '시트러스'],
  rating: '4.8',
  lightBold: 30,
  smoothTannic: 40,
  drySweet: 50,
  softAcidic: 90,
  id: '1',
};

const review2 = {
  ...review1,
  id: '2',
};

const review3 = {
  ...review1,
  id: '3',
};

const review4 = {
  ...review1,
  id: '4',
};

const wineInfo = {
  image: '/wineImg.png',
  name: 'Sentinel Carbernet Sauvignon 2016',
  region: 'Western Cape, South Africa',
  price: 360000,
};
const testReviews = [review1, review2, review3, review4];
export { wineInfo, testReviews, review1 };

/*--------------응답 예시------------------*/
// const example = {
//   id: 0,
//   name: 'string',
//   region: 'string',
//   image: 'string',
//   price: 0,
//   type: 'string',
//   avgRating: 0,
//   reviewCount: 0,
//   recentReview: {
//     user: {
//       id: 0,
//       nickname: 'string',
//       image: 'string',
//     },
//     updatedAt: '2025-07-23T08:41:22.919Z',
//     createdAt: '2025-07-23T08:41:22.919Z',
//     content: 'string',
//     aroma: ['CHERRY'],
//     rating: 0,
//     id: 0,
//   },
//   userId: 0,
//   reviews: [
//     {
//       id: 0,
//       rating: 0,
//       lightBold: 0,
//       smoothTannic: 0,
//       drySweet: 0,
//       softAcidic: 0,
//       aroma: ['CHERRY'],
//       content: 'string',
//       createdAt: '2025-07-23T08:41:22.920Z',
//       updatedAt: '2025-07-23T08:41:22.920Z',
//       user: {
//         id: 0,
//         nickname: 'string',
//         image: 'string',
//       },
//       isLiked: {},
//     },
//   ],
//   avgRatings: {
//     additionalProp1: 0,
//     additionalProp2: 0,
//     additionalProp3: 0,
//   },
// };

/*------------------------------------------------------------------------------------------------------------------------- */

// /*1. App에 이거 추가*/

// export default function MyApp({ Component, pageProps }) {
//   // 컴포넌트 라이프사이클 동안 동일한 QueryClient 인스턴스를 유지하기 위해 useState 사용
//   const [queryClient] = useState(() => new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 1000 * 60 * 5, // 기본 staleTime을 5분으로 설정 (선택 사항)
//       },
//     },
//   }));
// }
// <Hydrate state={pageProps.dehydratedState}> {/* 서버에서 전달된 dehydratedState를 Hydrate 컴포넌트에 전달 */}
//   <Component {...pageProps} />
// </Hydrate>

// /*2 리스트 페이지 내부에 */
// //-> 이건 csr기준(useEffect) 버려 겟 서버사이드 프롭스로 ㄱㄱ
// //출력되고 있는 와인 정보 다 요청 미리 때려 ->
// //  useEffect(()=>{
// //   wines.forEach(wine => {
// //      const key = ['wineDetail', wine.id];//쿼리 키로 wineDetail 나중에 값 찾아올 때 이거 쓸거임
// //        if (!queryClient.getQueryData(key)) {//기존에 프리패치 했던 건 빼고-> 굳이 불필요하긴 함. 리액트 쿼리는 이미 캐싱되어있는데이터가 프레쉬 상태면 다시 안하기 때문
// //         queryClient.prefetchQuery(key, () =>  //인자 3개 받음(키, 콜백, staletime)
// //         axios.get(`/wines/${wine.id}`).then(res => res.data),
// //         {staleTime: 1000 * 60 * 5}, //이미 프리페칭한 것도 5분 뒤에는 그냥 새로 패치해주
// //       )}
// //     });
// //   }, [wines, queryClient]);

// /*3. 리스트 페이지 컴포넌트 외부에 */

// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient(); // 서버에서 사용할 새로운 QueryClient 인스턴스 생성

//   await queryClient.prefetchQuery({
//     queryKey: ['wineList'],
//     queryFn: fetchWineList,
//     staleTime: 1000 * 60 * 1,
//   });

//   const initialWineList = queryClient.getQueryData(['wineList']);

//   // 모든 와인의 상세 정보를 프리페칭하는 대신, 처음 몇 개만 하거나
//   // 사용자에게 보여질 가능성이 높은 와인만 프리페칭하는 전략을 고려할 수 있습니다.
//   const prefetchPromises = initialWineList.map(wine => {
//     const key = ['wineDetail', wine.id];//쿼리 키로 wineDetail 나중에 값 찾아올 때 이거 쓸거임
//     if (!queryClient.getQueryData(key)) {//기존에 프리패치 했던 건 빼고-> 굳이 불필요하긴 함. 리액트 쿼리는 이미 캐싱되어있는데이터가 프레쉬 상태면 다시 안하기 때문
//       return queryClient.prefetchQuery(key, () =>  //인자 3개 받음(키, 콜백, staletime)
//         axios.get(`/wines/${wine.id}`).then(res => res.data),
//         { staleTime: 1000 * 60 * 5 }, //이미 프리페칭한 것도 5분 뒤에는 그냥 새로 패치해주
//       )
//     }
//   });

//   await Promise.all(prefetchPromises); // 모든 프리페칭이 완료될 때까지 기다림

//   return {
//     props: {
//       // dehydrate 함수를 사용하여 QueryClient의 캐시를 직렬화(serialize)하여 props로 반환합니다.
//       // 이 dehydratedState는 _app.tsx의 Hydrate 컴포넌트로 전달됩니다.
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

// /*4. 사용하는 곳에서 이렇게 쓰는데 */
// //   const { data, isLoading, error } = useQuery(
// //   ['wineDetail', wineId],
// //   () => axios.get(`/wines/${wineId}`).then(res => res.data)
// // );

// // if (isLoading) return <p>로딩중...</p>;
// // if (error) return <p>에러 발생</p>;

// //data로 html태그에 뿌려주기

// /*5. 목록페이지 안 거칠 껄 생각해서 여기도 겟 서버사이드 프롭 */
// // export const getServerSideProps = async (context) =>
// {
//   const { id } = context.param; // URL 파라미터에서 와인 ID 추출

//   const queryClient = new QueryClient(); // 서버에서 사용할 새로운 QueryClient 인스턴스

//   // 해당 와인 ID의 상세 정보를 서버에서 프리페칭
//   await queryClient.prefetchQuery({
//     queryKey: ['wineDetail', id], // 이 페이지에 필요한 특정 상세 정보만 프리페칭
//     queryFn: () => fetchWineDetail(id),
//     staleTime: 1000 * 60 * 5,
//   });

//   return {
//     props: {
//       // 서버에서 채워진 QueryClient의 캐시를 직렬화하여 클라이언트로 전달
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
