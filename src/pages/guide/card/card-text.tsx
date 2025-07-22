import { ImageCard } from '@/components/common/card/ImageCard';
import { MyCard } from '@/components/common/card/MyCard';
import { ReviewCard } from '@/components/common/card/ReviewCard';

export default function CardTestPage() {
  return (
    <div className='p-10 bg-gray-100 min-h-screen space-y-6'>
      {/* ImageCard 테스트 */}
      <ImageCard
        imageSrc='test.url'
        className='p-8' // 컨테이너 패딩 & 배경 덮어쓰기
        imageClassName='w-[80px] h-[120px]' // 이미지 크기 덮어쓰기
        rightSlot={<button className='text-sm'>⋯</button>}
      >
        <p className='text-lg font-semibold'>Sentinel Cabernet 2016</p>
        <span className='bg-violet-100 text-violet-700 text-sm px-2 py-1 rounded-xl'>₩64,000</span>
      </ImageCard>

      {/* MyCard 테스트: className 덮어쓰기 */}
      <MyCard
        rating={
          <div className='bg-violet-100 text-violet-700 text-sm px-2 py-1 rounded-xl'>★ 5.0</div>
        }
        timeAgo='10시간 전'
        title='Sentinel Cabernet Sauvignon 2016'
        review='긴 본문 리뷰 자리'
        rightSlot={<button className='text-sm'>⋯</button>}
        className='p-8' // 컨테이너 패딩 & 배경 덮어쓰기
      />

      {/* ReviewCard 테스트: 기본 + flavorSlider 포함 */}
      <ReviewCard
        userIcon={<div className='h-10 w-10 rounded-full bg-gray-300' />}
        username='와인러버'
        timeAgo='10시간 전'
        tags={['체리', '오크', '카멜', '시트러스', '꽃']}
        rating={
          <div className='bg-violet-100 text-violet-700 text-sm px-2 py-1 rounded-xl'>★ 5.0</div>
        }
        menuSlot={<button className='text-xl'>⋯</button>}
        likeSlot={<button className='text-xl text-pink-500'>♥</button>}
        reviewText='본문자리'
        flavorSliderSlot={
          <div className='space-y-2 text-sm text-gray-700'>
            <div>
              바디감: <span className='text-violet-500'>.</span>
            </div>
            <div>
              타닌: <span className='text-violet-500'>..</span>
            </div>
            <div>
              당도: <span className='text-violet-500'>...</span>
            </div>
          </div>
        }
      />

      {/* ReviewCard 테스트: 슬라이더만 */}
      <ReviewCard
        userIcon={<div className='h-10 w-10 rounded-full bg-gray-300' />}
        username='와인러버'
        timeAgo='10시간 전'
        tags={['체리', '오크', '카멜', '시트러스', '꽃']}
        rating={
          <div className='bg-violet-100 text-violet-700 text-sm px-2 py-1 rounded-xl'>★ 5.0</div>
        }
        menuSlot={<button className='text-xl'>⋯</button>}
        likeSlot={<button className='text-xl text-pink-500'>♥</button>}
        flavorSliderSlot={
          <div className='space-y-2 text-sm text-gray-700'>
            <div>
              바디감: <span className='text-violet-500'>.</span>
            </div>
            <div>
              타닌: <span className='text-violet-500'>..</span>
            </div>
            <div>
              당도: <span className='text-violet-500'>...</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
