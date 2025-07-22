import React from 'react';

import { ImageCard } from '@/components/common/card/ImageCard';
import { ReviewCard } from '@/components/common/card/ReviewCard';
import UserDefaultImg from '@/components/common/UserDefaultImg';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';

//컨테이너 클래스 이름 max-w-[1140px], w-full, mx-auto 하나 묶어서 쓰자
const review1 = {
  text: '최근에 센티넬 카베르네 소비뇽 2016을 마셔볼 기회가 있었는데, 정말 인상 깊은 경험이었어요! 처음 잔에 따랐을 때부터 짙고 깊은 루비색이 묵직한 존재감을 드러냈고, 가장자리로는 은은한 오렌지빛 림이 형성되어 숙성미를 짐작게 했습니다. 코를 가져다 대니 처음에는 블랙커런트, 잘 익은 블랙체리 같은 진한 검은 과일 향이 지배적이었고, 이내 삼나무, 가죽, 흙내음 같은 복합적인 2차 아로마와 함께 초콜릿, 에스프레소 같은 숙성된 오크 뉘앙스가 우아하게 피어났습니다. 한 모금 마셔보니, 탄탄하면서도 벨벳 같은 질감의 타닌이 입안을 감쌌고, 응축된 과일 맛과 함께 숙성에서 오는 스파이시함, 담배 잎 같은 쌉쌀한 풍미가 조화롭게 어우러졌습니다. 산미는 적절하게 균형을 잡아주어 자칫 무거울 수 있는 와인에 생기를 불어넣었고, 길고 우아하게 이어지는 여운 속에서는 미묘한 허브와 미네랄리티가 느껴졌습니다. 구운 육류 요리, 특히 스테이크나 양갈비, 혹은 잘 익은 치즈와 페어링해도 훌륭했을 것 같고, 그냥 저녁 식사 후 편안하게 혼자 또는 가까운 사람들과 함께 깊이 있는 대화를 나눌 때 마시기에도 완벽했습니다. 전반적으로 시간의 흐름이 만들어낸 깊이와 복합미가 돋보이는 와인이었습니다. 숙성된 카베르네 소비뇽의 매력을 한껏 느낄 수 있었고, 밸런스와 구조감이 뛰어나 마시는 내내 즐거움을 주었습니다. 2016 빈티지임에도 여전히 생생한 활력을 가지고 있어 앞으로도 몇 년간 더 발전할 가능성이 있을 것 같습니다.',
  name: '김성주',
  timeAgo: '11시간 전',
  tag: ['체리', '오크', '시트러스'],
  rating: '4.8',
};

function WineInfoById() {
  const testReviews = [review1];

  return (
    <main className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <ImageCard
        //z인덱스 수정하기
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
            {testReviews?.map((review, i) => (
              <li key={`id${i + 1}`} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
                <ReviewCard
                  userIcon={<UserDefaultImg className='w-10 h-10 md:w-16 md:h-16' />}
                  menuSlot={<div>케밥</div>}
                  likeSlot={<div>하트</div>}
                  tags={review.tag}
                  timeAgo={review.timeAgo}
                  username={review.name}
                  rating={review.rating}
                  reviewText={review.text}
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

export default WineInfoById;

const IMAGE_CLASS_NAME =
  'w-[58px] md:w-[84px] xl:w-[58px] h-[209px] md:h-[302px] xl:h-[209px] absolute bottom-0 left-[20px] md:left-[60px] xl:left-[100px]';
