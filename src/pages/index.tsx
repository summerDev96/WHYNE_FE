import LendingPageLogoIcon from '@/assets/lendinglogo.svg';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 lg:mt-[80px]'>
      <header>
        <div className='relative h-[403px] md:h-[394px] lg:h-[535px] bg-[#171A21] flex items-center justify-center overflow-hidden'>
          <div className='flex flex-col items-center h-full'>
            <div>
              {/* 이미지에 그라디언트 */}
              <LendingPageLogoIcon className='w-[81px] md:w-[100px] h-[23px] md:h-[30px] text-primary mt-[58px] md:mt-[80px] lg:mt-[112px]' />
            </div>
            <span className='text-white text-center custom-text-xl-bold md:custom-text-2xl-bold mt-6 md:mt-8'>
              한 곳에서 관리하는 <br />
              나만의 와인창고
            </span>
            {/* 카드에 와인넣기 */}
            <div className='relative w-[720px] h-[420px] mt-auto mx-auto translate-y-[80px] md:translate-y-[40px] lg:translate-y-[120px]'>
              {/* 흰색 박스 translate-y 아래로-ㅁㅁ만큼 밀어내기 */}
              <div className='absolute top-4 left-1/2 w-[240px] h-[185px] bg-white rounded-lg z-30 -translate-x-1/2'></div>

              {/* 좌우 위 박스 */}
              <div className='absolute top-10 left-[calc(50%-300px)] w-[240px] h-[185px] bg-[#D842DB] rounded-lg z-20'></div>
              <div className='absolute top-10 left-[calc(50%+60px)] w-[240px] h-[185px] bg-black rounded-lg z-20'></div>

              {/* 좌우 아래 박스 */}
              <div className='absolute top-[80px] left-[calc(50%-400px)] w-[240px] h-[185px] bg-primary rounded-lg z-10'></div>
              <div className='absolute top-[80px] left-[calc(50%+160px)] w-[240px] h-[185px] bg-[#6A42DB] rounded-lg z-10'></div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className='mx-auto md:px-[32px] xl:px-0 max-w-[640px]  min-w-[343px] mt-12 md:mt-[80px] lg:mt-[160px]'>
          <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px]'>
            <div className='relative top-[24px] left-[24px]'>
              <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
                매달 새롭게 만나는 <br />
                와인 추천 콘탠츠
              </span>
              <p className='custom-text-xs-regular text-gray-500'>
                매달 다양한 인기 와인을 만나보세요
              </p>
            </div>
            <div className='absolute w-[290px] md:w-[356px] h-[241px] md:h-[277px] right-0 bottom-[24px] md:bottom-0 bg-gray-100'></div>
          </div>
          <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px]'>
            <div className='relative top-[24px] left-[24px]'>
              <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
                다양한 필터로 찾는
                <br />내 맞춤 와인
              </span>
              <p className='custom-text-xs-regular text-gray-500'>
                와인 타입, 가격, 평점으로 <br />
                나에게 맞는 와인을 쉽게 검색해요.
              </p>
            </div>
          </div>
          <div className='bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[64px] md:mb-[80px] lg:mb-[104px]'>
            <div className='relative top-[24px] left-[24px]'>
              <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
                직관적인
                <br />
                리뷰 시스템
              </span>
              <p className='custom-text-xs-regular text-gray-500'>
                더 구체화된 리뷰 시스템으로
                <br />
                쉽고 빠르게 와인 리뷰를 살펴보세요/
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Button
          variant='purpleDark'
          size='onlyLanding'
          width='onlyLanding'
          className='block mx-auto mb-[62px]'
        >
          와인 보러가기
        </Button>
      </footer>
    </div>
  );
}
