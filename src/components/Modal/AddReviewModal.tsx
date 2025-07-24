import React, { useState } from 'react';

import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

import StarRating from './StarRating';
import BasicModal from '../common/Modal/BasicModal';
import FlavorSlider from '../common/slider/FlavorSlider';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ReviewForm {
  rating: number;
  sliderLightBold: number;
  sliderSmoothTanic: number;
  sliderdrySweet: number;
  slidersoftAcidic: number;
  aroma: Array<string>;
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

const AddReviewModal = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
    setValue,
  } = useForm<ReviewForm>({
    defaultValues: {
      sliderLightBold: 0,
      sliderSmoothTanic: 0,
      sliderdrySweet: 0,
      slidersoftAcidic: 0,
      content: '',
      aroma: [],
      rating: 5,
    },
  });

  //falvor선택
  const aroma = watch('aroma');
  const isSelected = (item: string) => aroma?.includes(item);

  //클릭시 아로마 배열에 추가/삭제
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
  };
  ////

  const onSubmit = (data: ReviewForm) => {
    const fullData = {
      ...data,
    };
    console.log(fullData);
    reset();
    setShowRegisterModal(false);
  };

  //모달창 끄면 리셋되게
  const closeModalReset = (isOpen: boolean) => {
    setShowRegisterModal(isOpen);
    if (!isOpen) {
      reset();
    }
  };
  ////

  return (
    <div>
      <Button variant='purpleDark' size='xs' width='sm' onClick={() => setShowRegisterModal(true)}>
        리뷰 남기기
      </Button>
      <BasicModal
        type='review'
        title='리뷰 등록'
        open={showRegisterModal}
        onOpenChange={closeModalReset}
        buttons={
          <Button
            onClick={handleSubmit(onSubmit)}
            type='submit'
            variant='purpleDark'
            size='xl'
            width='full'
            fontSize='lg'
          >
            리뷰 남기기
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
              className='bg-gray-100 rounded-lg p-[7px] text-primary object-contain'
            />
            <div className='flex flex-col justify-between w-[191px] md:w-[300px] h-[84px] md:h-[66px] ml-4'>
              <span className='mt-0 custom-text-lg-bold md:custom-text-2lg-semibold'>
                Sentinel Carbernet Sauviginon 2016
              </span>
              <span className='mb-0 w-[120px] md:w-[160px] h-[24px] md:h-[32px] flex items-center'>
                <StarRating
                  value={watch('rating')}
                  onChange={(rating) => setValue('rating', rating)}
                />
              </span>
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
              'h-[100px] md:h-[120px] custom-text-md-regular md:custom-text-lg-regular w-full px-[20px] py-[14px] rounded-[16px] bg-white border border-gray-300 outline-none active:border-gray-500 focus:border-gray-500 font-sans resize-none',
              errors.content && 'border-red-500',
            )}
            rows={5}
          />
          {errors.content && (
            <div role='alert' className='text-red-500 mt-[4px]'>
              {errors.content.message}
            </div>
          )}
          <p className='custom-text-2lg-bold md:custom-text-xl-bold mb-[24px] mt-[35px]'>
            와인의 맛은 어땠나요?
          </p>
          <div className='mb-[40px]'>
            <div className='mb-[16px] md:mb-[18px]'>
              <FlavorSlider
                value={watch('sliderLightBold')}
                min={0}
                max={100}
                step={5}
                onChange={(value) => setValue('sliderLightBold', value)}
                labelLeft='가벼워요'
                labelRight='진해요'
                badgeLabel='바디감'
              />
            </div>
            <div className='mb-[16px] md:mb-[18px]'>
              <FlavorSlider
                value={watch('sliderSmoothTanic')}
                min={0}
                max={100}
                step={5}
                onChange={(value) => setValue('sliderSmoothTanic', value)}
                labelLeft='부드러워요'
                labelRight='떫어요'
                badgeLabel='타닌'
              />
            </div>
            <div className='mb-[16px] md:mb-[18px]'>
              <FlavorSlider
                value={watch('sliderdrySweet')}
                min={0}
                max={100}
                step={5}
                onChange={(value) => setValue('sliderdrySweet', value)}
                labelLeft='드라이해요'
                labelRight='달아요'
                badgeLabel='당도'
              />
            </div>
            {/* 사이즈?? 조정이 필요할듯 */}
            <div className='mb-[16px] md:mb-[18px]'>
              <FlavorSlider
                value={watch('slidersoftAcidic')}
                min={0}
                max={100}
                step={5}
                onChange={(value) => setValue('slidersoftAcidic', value)}
                labelLeft='안셔요'
                labelRight='많이셔요'
                badgeLabel='산미'
              />
            </div>
          </div>
          <p className='custom-text-2lg-bold md:custom-text-xl-bold mb-[24px]'>
            기억에 남는 향이 있나요?
          </p>
          <div className='flex flex-wrap gap-[10px]'>
            {aromaOptions.map((item) => (
              <Badge
                key={item}
                variant='chooseFlavor'
                onClick={() => toggleAroma(item)}
                className={cn(
                  'cursor-pointer px-2.5 md:px-[18px] py-1.5 md:py-2.5',
                  isSelected(item) && 'bg-primary text-white border-primary',
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

export default AddReviewModal;
