import Image from 'next/image';

import { ImageCard } from '@/components/common/card/ImageCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 lg:mt-[80px]'>
      <header>
        <div className='relative h-[403px] md:h-[394px] lg:h-[535px] bg-[#171A21] flex items-center justify-center overflow-hidden rounded-lg'>
          <div className='flex flex-col items-center h-full'>
            <div>
              <Image
                src='/assets/lendinglogo.png'
                alt='와인 로고 이미지'
                width={100}
                height={100}
                className='w-[81px] md:w-[100px] h-[23px] md:h-[30px] text-primary mt-[58px] md:mt-[80px] lg:mt-[112px]'
              />
            </div>
            <span className='text-white text-center custom-text-xl-bold md:custom-text-2xl-bold mt-6 md:mt-8'>
              한 곳에서 관리하는 <br />
              나만의 와인창고
            </span>
            <div className='relative w-[720px] h-[420px] mt-auto mx-auto translate-y-[80px] md:translate-y-[40px] lg:translate-y-[120px] scale-[1] md:scale-[0.7] lg:scale-[1]'>
              {/* 기준 박스 translate-y 아래로-ㅁㅁ만큼 밀어내기 */}
              <div className='absolute top-4 left-1/2 w-[240px] h-[188px] bg-white rounded-xl z-30 -translate-x-1/2 shadow-xl'>
                <ImageCard
                  imageSrc='/assets/lendingwine3.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                    {/* 모달쪽에 구현해둔 별점이 있음 */}
                    <span>별점 나중에</span>
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </div>

              {/* 좌우 위 박스 */}
              <div className='absolute top-10 left-[calc(50%-340px)] w-[240px] h-[185px] rounded-xl z-20 shadow-xl'>
                <ImageCard
                  imageSrc='/assets/lendingwine1.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                    <span>별점 나중에</span>
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </div>
              <div className='absolute top-10 left-[calc(50%+100px)] w-[240px] h-[185px] rounded-xl z-20 shadow-xl'>
                <ImageCard
                  imageSrc='/assets/lendingwine1.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                    <span>별점 나중에</span>
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </div>

              {/* 좌우 아래 박스 */}
              <div className='absolute top-[80px] left-[calc(50%-480px)] w-[240px] h-[185px] bg-primary rounded-xl z-10 shadow-xl'>
                <ImageCard
                  imageSrc='/assets/lendingwine1.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                    <span>별점 나중에</span>
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </div>
              <div className='absolute top-[80px] left-[calc(50%+240px)] w-[240px] h-[185px] bg-[#6A42DB] rounded-xl z-10 shadow-xl'>
                <ImageCard
                  imageSrc='/assets/lendingwine1.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                    <span>별점 나중에</span>
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className='mx-auto md:px-[32px] xl:px-0 max-w-[640px]  min-w-[343px] mt-12 md:mt-[80px] lg:mt-[160px]'>
          <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px] rounded-2xl'>
            <div className='absolute top-[24px] md:top-[56px] left-[24px] md:left-[32px]'>
              <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
                매달 새롭게 만나는 <br />
                와인 추천 콘탠츠
              </span>
              <p className='custom-text-xs-regular text-gray-500'>
                매달 다양한 인기 와인을 만나보세요
              </p>
            </div>
            <div className='absolute w-[290px] md:w-[356px] h-[241px] md:h-[277px] right-0 bottom-[24px] md:bottom-0 bg-gray-100 overflow-hidden'>
              <span className='absolute text-[#7E7E7E] md:text-[#50545B] custom-text-lg-bold md:custom-text-2lg-bold left-5 top-5'>
                이번 달 추천 와인
              </span>
              <div className='flex gap-2.5 ml-5 mt-[61px] '>
                <div className='w-[193px] flex-shrink-0'>
                  <ImageCard
                    className='bg-white h-[160px] rounded-lg border-none overflow-hidden'
                    imageSrc='/assets/lendingwine3.png'
                    imageClassName='h-[165px] w-[44px] object-contain '
                  >
                    <div className='flex flex-col ml-[9px] w-[80px]'>
                      <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                      <span>별점 나중에</span>
                      <p className='text-[10px] text-gray-500'>Sentinel Carbernet Sauvignon 2016</p>
                    </div>
                  </ImageCard>
                </div>
                <div className='w-[193px] flex-shrink-0'>
                  <ImageCard
                    className='bg-white h-[160px] rounded-lg border-none overflow-hidden'
                    imageSrc='/assets/lendingwine3.png'
                    imageClassName='h-[165px] w-[44px] object-contain '
                  >
                    <div className='flex flex-col ml-[9px] w-[80px]'>
                      <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                      <span>별점 나중에</span>
                      <p className='text-[10px] text-gray-500'>Sentinel Carbernet Sauvignon 2016</p>
                    </div>
                  </ImageCard>
                </div>
              </div>
            </div>
          </div>
          <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px] rounded-2xl overflow-hidden'>
            <div className='absolute top-[24px] md:top-[55px] left-[24px] md:left-[32px]'>
              <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
                다양한 필터로 찾는
                <br />내 맞춤 와인
              </span>
              <p className='custom-text-xs-regular text-gray-500'>
                와인 타입, 가격, 평점으로 <br />
                나에게 맞는 와인을 쉽게 검색해요.
              </p>
            </div>
            <Image
              width={280}
              height={100}
              alt='필터로 찾은 내 맞춤 와인'
              src='/assets/lendingwinecard.png'
              className='absolute right-[-10px] top-[110px] md:top-[65px]'
            />
            <div
              className='pointer-events-none absolute inset-0 rounded-xl'
              style={{
                background:
                  'linear-gradient(to top, #EBEEF4 0%, transparent 5%, transparent 95%, #EBEEF4 100%)',
              }}
            />
          </div>
          <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[64px] md:mb-[80px] lg:mb-[104px] rounded-2xl overflow-hidden  '>
            <div className='absolute top-[24px] md:top-[55px] left-[24px] md:left-[28px]'>
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
            <Image
              width={272}
              height={100}
              alt='와인 리뷰 예시 이미지'
              src='/assets/lendingreviewcard.png'
              className='absolute right-[-10px] top-[120px] md:right-[42px] md:top-[-65px]'
            />
            <div
              className='pointer-events-none absolute inset-0 rounded-xl'
              style={{
                background:
                  'linear-gradient(to top, #EBEEF4 0%, transparent 5%, transparent 95%, #EBEEF4 100%)',
              }}
            />
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
