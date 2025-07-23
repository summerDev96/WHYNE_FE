import React from 'react';

import Star from '@/assets/star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { ReviewCard } from '@/components/common/card/ReviewCard';
import UserDefaultImg from '@/components/common/UserDefaultImg';
import FlavorSliderList from '@/components/wineDetail/FlavorSliderList';
import Kebab from '@/components/wineDetail/Kebab';
import LikeButton from '@/components/wineDetail/LikeButton';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';

/*----------------테스트용 더미----------------------*/
const review1 = {
  content:
    '최근에 센티넬 카베르네 소비뇽 2016을 마셔볼 기회가 있었는데, 정말 인상 깊은 경험이었어요! 처음 잔에 따랐을 때부터 짙고 깊은 루비색이 묵직한 존재감을 드러냈고, 가장자리로는 은은한 오렌지빛 림이 형성되어 숙성미를 짐작게 했습니다. 코를 가져다 대니 처음에는 블랙커런트, 잘 익은 블랙체리 같은 진한 검은 과일 향이 지배적이었고, 이내 삼나무, 가죽, 흙내음 같은 복합적인 2차 아로마와 함께 초콜릿, 에스프레소 같은 숙성된 오크 뉘앙스가 우아하게 피어났습니다. 한 모금 마셔보니, 탄탄하면서도 벨벳 같은 질감의 타닌이 입안을 감쌌고, 응축된 과일 맛과 함께 숙성에서 오는 스파이시함, 담배 잎 같은 쌉쌀한 풍미가 조화롭게 어우러졌습니다. 산미는 적절하게 균형을 잡아주어 자칫 무거울 수 있는 와인에 생기를 불어넣었고, 길고 우아하게 이어지는 여운 속에서는 미묘한 허브와 미네랄리티가 느껴졌습니다. 그냥 저녁 식사 후 편안하게 혼자 또는 가까운 사람들과 함께 깊이 있는 대화를 나눌 때 마시기에도 완벽했습니다.',
  name: '김성주',
  updatedAt: '11시간 전', // updatedAt: '2025-07-23T08:41:22.920Z', 변환하는 함수 하나 만들기
  aroma: ['체리', '오크', '시트러스'],
  rating: '4.8',
  lightBold: 30,
  smoothTannic: 40,
  drySweet: 50,
  softAcidic: 90,
  id: Math.random() * 100,
};

const { lightBold, smoothTannic, drySweet, softAcidic } = review1;

const wineFlaver = {
  lightBold,
  smoothTannic,
  drySweet,
  softAcidic,
};

const testReviews = [review1, review1, review1, review1];
/*---------------------------------------------------*/

export default function WineInfoById() {
  return (
    <main className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <ImageCard
        imageSrc='/wineImg.png'
        imageClassName={IMAGE_CLASS_NAME}
        className='mx-auto relative w-full h-[190px] md:h-[260px] border rounded-[16px] mt-[29px] md:mt-[62px] mb-[40px] md:mb-[60px]'
      >
        <WineContent />
      </ImageCard>
      <div className='flex flex-col xl:flex-row max-w-[1140px] w-full mx-auto justify-between '>
        <div className='flex-col  order-2 xl:order-1 xl:max-w-[1140px] '>
          <h2 className='hidden xl:block mb-[22px] xl:custom-text-xl-bold'>리뷰 목록</h2>
          <ul>
            {testReviews.map((review) => (
              <li key={review.id} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
                <ReviewCard
                  userIcon={<UserDefaultImg className='w-10 h-10 md:w-16 md:h-16' />}
                  menuSlot={<Kebab />}
                  likeSlot={<LikeButton />}
                  tags={review.aroma}
                  timeAgo={review.updatedAt}
                  username={review.name}
                  rating={
                    <span className='inline-flex gap-1 items-center'>
                      <Star className='w-3 md:w-4 h-3 md:h-4 md:mt-[-2px]' /> {review.rating}
                    </span>
                  }
                  reviewText={review.content}
                  flavorSliderSlot={<FlavorSliderList {...wineFlaver} />}
                  className='w-full xl:w-[800px]'
                ></ReviewCard>
              </li>
            ))}
          </ul>
        </div>
        <WineRating rating={4.8} reviewCount={47} ratings={[90, 80, 50, 30, 20]}></WineRating>
      </div>
    </main>
  );
}

const IMAGE_CLASS_NAME =
  'w-[58px] md:w-[84px] xl:w-[58px] h-[209px] md:h-[302px] xl:h-[209px] absolute bottom-0 left-[20px] md:left-[60px] xl:left-[100px]';

// /*----프롭으로 리액트 노드 넘겨주면 무조건 리렌더  일어나니까--------*/
// function getUserDefaultImg(){
//   return <UserDefaultImg className='w-10 h-10 md:w-16 md:h-16'/>
// }

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
