// import { motion, useViewportScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import AverageStar from '@/components/wineDetail/AverageStar';
// import { ImageCard } from '../common/card/ImageCard';
// import { useRef } from 'react';

// export const ContentSection = () => {
//   const { scrollYProgress } = useViewportScroll();

//   // 섹션별 스크롤 범위를 정해서 애니메이션 매핑할 수 있음
//   // 아래는 예시로 첫번째 박스 텍스트 y축 이동값 정의
//   // 전체 스크롤이 0~1 이므로 각 섹션에 맞게 구간 나누기
//   // (스크롤 영역 높이 및 위치에 따라 조절 필요)
//   const firstBoxStart = 0;
//   const firstBoxEnd = 0.25;
//   const secondBoxStart = 0.25;
//   const secondBoxEnd = 0.6;
//   const thirdBoxStart = 0.6;
//   const thirdBoxEnd = 1;

//   const firstBoxTextY = useTransform(scrollYProgress, [firstBoxStart, firstBoxEnd], [30, 0]);
//   const firstBoxTextOpacity = useTransform(scrollYProgress, [firstBoxStart, firstBoxEnd], [0, 1]);

//   const secondBoxTextY = useTransform(scrollYProgress, [secondBoxStart, secondBoxEnd], [30, 0]);
//   const secondBoxTextOpacity = useTransform(
//     scrollYProgress,
//     [secondBoxStart, secondBoxEnd],
//     [0, 1],
//   );

//   const thirdBoxTextY = useTransform(scrollYProgress, [thirdBoxStart, thirdBoxEnd], [30, 0]);
//   const thirdBoxTextOpacity = useTransform(scrollYProgress, [thirdBoxStart, thirdBoxEnd], [0, 1]);

//   return (
//     <div className='mx-auto max-w-[640px] min-w-[343px] mt-12 md:mt-[80px] xl:mt-[160px]'>
//       {/* 첫 번째 박스 */}
//       <motion.div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px] rounded-2xl mx-auto max-w-[500px] md:max-w-[640px] shadow'>
//         <div className='relative max-w-[500px] md:max-w-[640px] mx-auto'>
//           <motion.div
//             className='absolute top-[24px] md:top-[56px] left-[24px] md:left-[32px]'
//             style={{ y: firstBoxTextY, opacity: firstBoxTextOpacity }}
//           >
//             <span className='custom-text-2lg-bold md:text-[22px] md:leading-8 md:font-bold block mb-[8px]'>
//               매달 새롭게 만나는 <br />
//               와인 추천 콘탠츠
//             </span>
//             <p className='custom-text-xs-regular text-gray-500'>
//               매달 다양한 인기 와인을 만나보세요
//             </p>
//           </motion.div>

//           <motion.div
//             className='absolute w-[290px] md:w-[356px] h-[241px] md:h-[277px] right-0 bottom-[24px] md:bottom-0 bg-gray-100 rounded-2xl overflow-hidden md:overflow-visible top-[160px] md:top-[42px]'
//             style={{ y: firstBoxTextY, opacity: firstBoxTextOpacity }}
//           >
//             <span className='absolute text-[#7E7E7E] md:text-[#50545B] md:font-bold custom-text-lg-bold md:custom-text-2lg-bold left-5 top-5'>
//               이번 달 추천 와인
//             </span>
//             <div className='flex gap-2.5 ml-5 mt-[61px] '>
//               <motion.div className='w-[193px] flex-shrink-0' whileHover={{ scale: 1.05 }}>
//                 <ImageCard
//                   className='bg-white h-[160px] rounded-lg border-none overflow-hidden shadow'
//                   imageSrc='/assets/lendingwine4.png'
//                   imageClassName='h-[165px] w-[44px] object-contain '
//                 >
//                   <div className='flex flex-col ml-[9px] w-[80px]'>
//                     <span className='font-extrabold text-4xl text-gray-800'>4.8</span>
//                     <AverageStar rating={4} />
//                     <p className='text-[10px] text-gray-500'>Sentinel Carbernet Sauvignon 2016</p>
//                   </div>
//                 </ImageCard>
//               </motion.div>
//               <motion.div className='w-[193px] flex-shrink-0' whileHover={{ scale: 1.05 }}>
//                 <ImageCard
//                   className='bg-white h-[160px] rounded-lg border-none overflow-hidden shadow'
//                   imageSrc='/assets/lendingwine3.png'
//                   imageClassName='h-[165px] w-[44px] object-contain '
//                 >
//                   <div className='flex flex-col ml-[9px] w-[80px]'>
//                     <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
//                     <AverageStar rating={4} />
//                     <p className='text-[10px] text-gray-500'>Sentinel Carbernet Sauvignon 2016</p>
//                   </div>
//                 </ImageCard>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* 두 번째 박스 */}
//       <motion.div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px] rounded-2xl mx-auto max-w-[500px] overflow-hidden md:max-w-[640px] shadow'>
//         <div className='relative max-w-[500px] md:max-w-[640px] mx-auto'>
//           <motion.div
//             className='absolute top-[24px] md:top-[55px] left-[24px] md:left-[32px]'
//             style={{ y: secondBoxTextY, opacity: secondBoxTextOpacity }}
//           >
//             <span className='custom-text-2lg-bold md:text-[22px] md:leading-8 md:font-bold block mb-2'>
//               다양한 필터로 찾는
//               <br />내 맞춤 와인
//             </span>
//             <p className='custom-text-xs-regular text-gray-500'>
//               와인 타입, 가격, 평점으로 <br />
//               나에게 맞는 와인을 쉽게 검색해요.
//             </p>
//           </motion.div>

//           <motion.div
//             className='absolute top-[185px] left-[42px] hidden md:block'
//             style={{ scale: secondBoxTextOpacity }}
//           >
//             <Image width={180} height={100} alt='필터이미지2' src='/assets/lendingfilter2.png' />
//           </motion.div>
//           <motion.div
//             className='absolute top-[245px] left-[32px] hidden md:block'
//             style={{ scale: secondBoxTextOpacity }}
//           >
//             <Image width={200} height={100} alt='필터이미지1' src='/assets/lendingfilter1.png' />
//           </motion.div>
//           <motion.div
//             style={{
//               x: useTransform(scrollYProgress, [secondBoxStart, secondBoxEnd], [30, 0]),
//               opacity: secondBoxTextOpacity,
//             }}
//           >
//             <Image
//               width={280}
//               height={100}
//               alt='필터로 찾은 내 맞춤 와인'
//               src='/assets/lendingwinecard.png'
//               className='absolute right-[-10px] top-[120px] md:top-[20px]'
//             />
//           </motion.div>
//         </div>
//         <div
//           className='pointer-events-none absolute inset-0 rounded-xl'
//           style={{
//             background:
//               'linear-gradient(to top, #EBEEF4 0%, transparent 5%, transparent 95%, #EBEEF4 100%)',
//           }}
//         />
//       </motion.div>

//       {/* 세 번째 박스 */}
//       <motion.div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[64px] md:mb-[80px] xl:mb-[104px] rounded-2xl mx-auto max-w-[500px] overflow-hidden md:max-w-[640px] shadow'>
//         <div className='relative max-w-[500px] md:max-w-[640px] mx-auto'>
//           <motion.div
//             className='absolute top-[24px] md:top-[55px] left-[24px] md:left-[28px]'
//             style={{ y: thirdBoxTextY, opacity: thirdBoxTextOpacity }}
//           >
//             <span className='custom-text-2lg-bold md:text-[22px] md:leading-8 md:font-bold block mb-2'>
//               직관적인
//               <br />
//               리뷰 시스템
//             </span>
//             <p className='custom-text-xs-regular text-gray-500'>
//               더 구체화된 리뷰 시스템으로
//               <br />
//               쉽고 빠르게 와인 리뷰를 살펴보세요
//             </p>
//           </motion.div>

//           <motion.div
//             style={{
//               x: useTransform(scrollYProgress, [thirdBoxStart, thirdBoxEnd], [30, 0]),
//               opacity: thirdBoxTextOpacity,
//             }}
//           >
//             <Image
//               width={272}
//               height={100}
//               alt='와인 리뷰 예시 이미지'
//               src='/assets/lendingreviewcard.png'
//               className='absolute right-[-10px] top-[120px] md:right-[42px] md:top-[-65px]'
//             />
//           </motion.div>
//         </div>
//         <div
//           className='pointer-events-none absolute inset-0 rounded-xl'
//           style={{
//             background:
//               'linear-gradient(to top, #EBEEF4 0%, transparent 5%, transparent 95%, #EBEEF4 100%)',
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// };
