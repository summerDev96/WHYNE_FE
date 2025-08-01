import { motion } from 'framer-motion';
import Image from 'next/image';

import HeroSectionLayout from './HeroSectionLayout';
import { ImageCard } from '../common/card/ImageCard';
import AverageStar from '../wineDetail/AverageStar';

export const HeroSection = () => {
  return (
    <header>
      <div className='relative h-[403px] md:h-[394px] xl:h-[535px] bg-[#171A21] flex items-center justify-center overflow-hidden rounded-lg'>
        <div className='flex flex-col items-center h-full'>
          <div>
            <Image
              src='/assets/lendinglogo.png'
              alt='와인 로고 이미지'
              width={100}
              height={100}
              className='w-[81px] md:w-[100px] h-[23px] md:h-[30px] text-primary mt-[58px] md:mt-[80px] xl:mt-[112px]'
            />
          </div>
          <span className='text-white text-center custom-text-xl-bold md:custom-text-2xl-bold mt-6 md:mt-8'>
            한 곳에서 관리하는 <br />
            나만의 와인창고
          </span>
          <div className='relative w-[720px] h-[420px] mt-auto mx-auto translate-y-[80px] md:translate-y-[40px] xl:translate-y-[120px] scale-[1] md:scale-[0.7] xl:scale-[1]'>
            {/* 기준 박스 translate-y 아래로-ㅁㅁ만큼 밀어내기 */}
            <HeroSectionLayout className='top-4 left-1/2 -translate-x-1/2 z-30 hover:z-30'>
              <motion.div
                whileHover={{
                  y: -25, //y축 튀어오름
                  scale: 1,
                  rotate: 0, //기울기
                  transition: {
                    type: 'tween', // 자연스럽게 튀어오름
                    bounce: 1, // 자연스럽게 튀어오름
                    duration: 0.8,
                  },
                }}
              >
                <ImageCard
                  imageSrc='/assets/lendingwine3.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                    <AverageStar rating={4} />
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </motion.div>
            </HeroSectionLayout>

            {/* 좌우 위 박스 */}
            <HeroSectionLayout className='top-10 left-[calc(50%-340px)] z-20 hover:z-30'>
              <motion.div
                whileHover={{
                  y: -40, //y축 튀어오름
                  scale: 1,
                  rotate: 0, //기울기
                  transition: {
                    type: 'spring', // 자연스럽게 튀어오름
                    bounce: 0.3, // 자연스럽게 튀어오름
                    duration: 0.5,
                  },
                }}
              >
                <ImageCard
                  imageSrc='/assets/lendingwine1.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.6</span>
                    <AverageStar rating={4} />
                    <p className='custom-text-xs-regular text-gray-500'>
                      Ciel du Cheval Vaineyard Collaboration
                    </p>
                  </div>
                </ImageCard>
              </motion.div>
            </HeroSectionLayout>
            <HeroSectionLayout className='top-10 left-[calc(50%+100px)] z-20 hover:z-30'>
              <motion.div
                whileHover={{
                  y: -40, //y축 튀어오름
                  scale: 1.1,
                  rotate: 0, //기울기
                  transition: {
                    type: 'spring', // 자연스럽게 튀어오름
                    bounce: 0.3, // 자연스럽게 튀어오름
                    duration: 0.5,
                  },
                }}
              >
                <ImageCard
                  imageSrc='/assets/lendingwine2.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.2</span>
                    <AverageStar rating={4} />
                    <p className='custom-text-xs-regular text-gray-500'>Palazzo della Torre 2017</p>
                  </div>
                </ImageCard>
              </motion.div>
            </HeroSectionLayout>

            {/* 좌우 아래 박스 */}
            <HeroSectionLayout className='top-[80px] left-[calc(50%-480px)] z-10 hover:z-30'>
              <motion.div
                whileHover={{
                  y: -40, //y축 튀어오름
                  scale: 1.1,
                  rotate: 0, //기울기
                  transition: {
                    type: 'spring', // 자연스럽게 튀어오름
                    bounce: 0.3, // 자연스럽게 튀어오름
                    duration: 0.5,
                  },
                }}
              >
                <ImageCard
                  imageSrc='/assets/lendingwine4.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.8</span>
                    <AverageStar rating={4} />
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </motion.div>
            </HeroSectionLayout>
            <HeroSectionLayout className='top-[80px] left-[calc(50%+240px)] z-10 hover:z-30'>
              <motion.div
                whileHover={{
                  y: -40, //y축 튀어오름
                  scale: 1.1,
                  rotate: 0, //기울기
                  transition: {
                    type: 'spring', // 자연스럽게 튀어오름
                    bounce: 0.3, // 자연스럽게 튀어오름
                    duration: 0.5,
                  },
                }}
              >
                <ImageCard
                  imageSrc='/assets/lendingwine1.png'
                  imageClassName='h-full w-[44px] object-contain '
                >
                  <div className='flex flex-col ml-[8px] w-[100px]'>
                    <span className='font-extrabold text-4xl text-gray-800'>4.9</span>
                    <AverageStar rating={4.2} />
                    <p className='custom-text-xs-regular text-gray-500'>
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </ImageCard>
              </motion.div>
            </HeroSectionLayout>
          </div>
        </div>
      </div>
    </header>
  );
};
