import React, { useState } from 'react';

import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { updateReview } from '@/api/editreview';
import BasicModal from '@/components/common/Modal/BasicModal';
import StarRating from '@/components/Modal/ReviewModal/StarRating';
import { cn } from '@/lib/utils';

import FlavorSlider from '../../common/slider/FlavorSlider';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface ReviewForm {
  rating: number;
  sliderLightBold: number;
  sliderSmoothTanic: number;
  sliderdrySweet: number;
  slidersoftAcidic: number;
  aroma: Array<string>;
  content: string;
}

interface ReviewData {
  reviewId: number;
  rating: number;
  sliderLightBold: number;
  sliderSmoothTanic: number;
  sliderdrySweet: number;
  slidersoftAcidic: number;
  aroma: string[];
  content: string;
}

const aromaOptions = [
  '체리',
  '베리',
  '오크',
  '바닐라',
  '후추',
  '제빵',
  '풀',
  '사과',
  '복숭아',
  '시트러스',
  '트로피컬',
  '미네랄',
  '꽃',
  '담뱃잎',
  '흙',
  '초콜릿',
  '스파이스',
  '카라멜',
  '가죽',
];

const aromaMap: Record<string, string> = {
  체리: 'CHERRY',
  베리: 'BERRY',
  오크: 'OAK',
  바닐라: 'VANILLA',
  후추: 'PEPPER',
  제빵: 'BAKERY',
  풀: 'GRASS',
  사과: 'APPLE',
  복숭아: 'PEACH',
  시트러스: 'CITRUS',
  트로피컬: 'TROPICAL',
  미네랄: 'MINERAL',
  꽃: 'FLOWER',
  담뱃잎: 'TOBACCO',
  흙: 'EARTH',
  초콜릿: 'CHOCOLATE',
  스파이스: 'SPICE',
  카라멜: 'CARAMEL',
  가죽: 'LEATHER',
};

const EditReviewModal = ({
  wineName,
  reviewData,
}: {
  wineName: string;
  reviewData: ReviewData;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
    setValue,
    setError,
  } = useForm<ReviewForm>({
    defaultValues: {
      rating: reviewData.rating,
      sliderLightBold: reviewData.sliderLightBold,
      sliderSmoothTanic: reviewData.sliderSmoothTanic,
      sliderdrySweet: reviewData.sliderdrySweet,
      slidersoftAcidic: reviewData.slidersoftAcidic,
      content: reviewData.content,
      aroma: reviewData.aroma.map((eng) => {
        const kor = Object.keys(aromaMap).find((key) => aromaMap[key] === eng);
        return kor || eng;
      }),
    },
  });

  const aroma = watch('aroma');
  const isSelected = (item: string) => aroma?.includes(item);

  const toggleAroma = (item: string) => {
    if (!aroma) return;
    if (aroma.includes(item)) {
      setValue(
        'aroma',
        aroma.filter((a) => a !== item),
      );
    } else {
      setValue('aroma', [...aroma, item]);
    }
    clearErrors('aroma');
  };

  const onSubmit = async (data: ReviewForm) => {
    if (!data.aroma || data.aroma.length === 0) {
      setError('aroma', { type: 'errmsg', message: '최소 하나의 향을 선택해주세요.' });
      return;
    }

    try {
      const fullData = {
        reviewId: reviewData.reviewId,
        rating: data.rating,
        lightBold: data.sliderLightBold,
        smoothTannic: data.sliderSmoothTanic,
        drySweet: data.sliderdrySweet,
        softAcidic: data.slidersoftAcidic,
        aroma: data.aroma.map((a) => aromaMap[a]).filter(Boolean),
        content: data.content,
      };
      console.log('리뷰 수정 요청 데이터:', fullData);
      await updateReview(fullData);
      console.log('리뷰 수정 완료');
      setShowEditModal(false);
    } catch (error) {
      console.error('리뷰 수정 실패', error);
    }
  };

  const closeModalReset = (isOpen: boolean) => {
    setShowEditModal(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <div>
      <Button variant='purpleDark' size='xs' width='sm' onClick={() => setShowEditModal(true)}>
        리뷰 수정하기
      </Button>
      <BasicModal
        type='review'
        title='리뷰 수정'
        open={showEditModal}
        onOpenChange={closeModalReset}
        buttons={
          <Button
            onClick={handleSubmit(onSubmit)}
            type='button'
            variant='purpleDark'
            size='xl'
            width='full'
            fontSize='lg'
          >
            수정 완료
          </Button>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType='multipart/form-data'
          className='my-[32px] md:my-[40px]'
        >
          <div className='w-[274px] md:w-[384px] h-[84px] md:h-[68px] mb-6 flex items-center'>
            <Image
              src='/assets/reviewicon.png'
              alt='리뷰 아이콘'
              width={68}
              height={68}
              className='bg-gray-100 rounded-lg p-[7px] object-contain'
            />
            <div className='ml-4'>
              <span className='custom-text-lg-bold md:custom-text-2lg-semibold'>{wineName}</span>
              <div className='mt-2'>
                <StarRating value={watch('rating')} onChange={(val) => setValue('rating', val)} />
              </div>
            </div>
          </div>

          <textarea
            id='content'
            {...register('content', {
              required: '리뷰 내용을 입력해 주세요.',
              onChange: () => clearErrors('content'),
            })}
            placeholder='후기를 작성해 주세요'
            className={cn(
              'h-[100px] md:h-[120px] w-full px-[20px] py-[14px] rounded-[16px] bg-white border border-gray-300 outline-none font-sans resize-none',
              errors.content && 'border-red-500',
            )}
            rows={5}
          />
          {errors.content && (
            <div role='alert' className='text-red-500 mt-1'>
              {errors.content.message}
            </div>
          )}

          <p className='custom-text-2lg-bold md:custom-text-xl-bold mb-[24px] mt-[35px]'>
            와인의 맛은 어땠나요?
          </p>

          <div className='mb-[40px] space-y-[18px]'>
            <FlavorSlider
              value={watch('sliderLightBold')}
              min={0}
              max={10}
              step={1}
              onChange={(val) => setValue('sliderLightBold', val)}
              labelLeft='가벼워요'
              labelRight='진해요'
              badgeLabel='바디감'
            />
            <FlavorSlider
              value={watch('sliderSmoothTanic')}
              min={0}
              max={10}
              step={1}
              onChange={(val) => setValue('sliderSmoothTanic', val)}
              labelLeft='부드러워요'
              labelRight='떫어요'
              badgeLabel='타닌'
            />
            <FlavorSlider
              value={watch('sliderdrySweet')}
              min={0}
              max={10}
              step={1}
              onChange={(val) => setValue('sliderdrySweet', val)}
              labelLeft='드라이해요'
              labelRight='달아요'
              badgeLabel='당도'
            />
            <FlavorSlider
              value={watch('slidersoftAcidic')}
              min={0}
              max={10}
              step={1}
              onChange={(val) => setValue('slidersoftAcidic', val)}
              labelLeft='안 셔요'
              labelRight='많이 셔요'
              badgeLabel='산미'
            />
          </div>

          <p className='custom-text-2lg-bold md:custom-text-xl-bold'>기억에 남는 향이 있나요?</p>
          {errors.aroma && (
            <div role='alert' className='text-red-500 mt-1'>
              {errors.aroma.message}
            </div>
          )}
          <div className='relative flex flex-wrap gap-[10px] mt-6'>
            {aromaOptions.map((item) => (
              <Badge
                key={item}
                variant='chooseFlavor'
                onClick={() => toggleAroma(item)}
                className={cn(
                  'cursor-pointer px-2.5 md:px-[18px] py-1.5 md:py-2.5 hover:bg-primary-100 hover:text-primary hover:border-primary-100',
                  isSelected(item) && 'bg-primary text-white',
                )}
              >
                {item}
              </Badge>
            ))}
          </div>
        </form>
      </BasicModal>
    </div>
  );
};

export default EditReviewModal;
