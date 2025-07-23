// src/mocks/user.ts

export interface Review {
  id: number;
  rating: number; // 별점 (0–5)
  timeAgo: string; // 작성 시점(예: "2시간 전")
  title: string; // 리뷰 제목
  review: string; // 리뷰 본문
}

export interface Wine {
  id: number;
  name: string; // 와인 이름
  region: string; // 생산지
  price: number; // 가격(원 단위)
}

export interface User {
  id: number;
  nickname: string;
  profileImageUrl: string; // 프로필 이미지 경로
  reviews: Review[];
  wines: Wine[];
}

export const mockUser: User = {
  id: 1,
  nickname: '홍길동',
  profileImageUrl: 'https://picsum.photos/43',
  reviews: [
    {
      id: 1,
      rating: 4.8,
      timeAgo: '방금 전',
      title: '첫인상이 깔끔해요',
      review: '탄탄한 바디감과 깔끔한 피니시가 인상적입니다.',
    },
    {
      id: 2,
      rating: 3.5,
      timeAgo: '2시간 전',
      title: '과일향 풍부',
      review: '달콤한 베리향이 풍성하게 퍼지면서 마무리는 드라이해요.',
    },
    {
      id: 3,
      rating: 5.0,
      timeAgo: '하루 전',
      title: '최고의 가성비',
      review: '가성비가 훌륭하고, 풍미가 깊어 자주 찾게 됩니다.',
    },
  ],
  wines: [
    {
      id: 1,
      name: 'Château Margaux 2016',
      region: 'Bordeaux, France',
      price: 64990,
    },
    {
      id: 2,
      name: 'Screaming Eagle 2012',
      region: 'Napa Valley, USA',
      price: 320000,
    },
  ],
};
