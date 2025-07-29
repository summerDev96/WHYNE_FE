import React, { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { postReview } from '@/api/addreview';
import StarRating from '@/components/Modal/ReviewModal/StarRating';
import { cn } from '@/lib/utils';

import BasicModal from '../../common/Modal/BasicModal';
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
interface ReviewRequest {
  wineId: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
}
interface ReviewResponse {
  success: boolean;
  message?: string;
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

const AddReviewModal = ({ wineId, wineName }: { wineId: number; wineName: string }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();

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
      sliderLightBold: 0,
      sliderSmoothTanic: 0,
      sliderdrySweet: 0,
      slidersoftAcidic: 0,
      content: '',
      aroma: [],
      rating: 5,
    },
  });

  const reviewMutation = useMutation<ReviewResponse, AxiosError, ReviewRequest>({
    //mutation function
    mutationFn: postReview, //실제 서버에 리뷰를 보내는 역할
    onSuccess: (data) => {
      console.log('리뷰 등록 성공', data);
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      reset();
      setShowRegisterModal(false);
    },
    onError: (error) => {
      console.log('리뷰 등록 실패', error);
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
    clearErrors('aroma');
  };
  ////

  const onSubmit = async (data: ReviewForm) => {
    if (!data.aroma || data.aroma.length === 0) {
      setError('aroma', { type: 'errmsg', message: '최소 하나의 향을 선택해주세요.' });
      return;
    }
    const fullData: ReviewRequest = {
      wineId,
      rating: data.rating,
      lightBold: data.sliderLightBold,
      smoothTannic: data.sliderSmoothTanic,
      drySweet: data.sliderdrySweet,
      softAcidic: data.slidersoftAcidic,
      aroma: data.aroma.map((a) => aromaMap[a]).filter(Boolean),
      content: data.content,
    };
    reviewMutation.mutate(fullData);
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
            type='button'
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
          className='my-[32px] md:my-[40px] px-4'
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
                {wineName}
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
              'relative h-[100px] md:h-[120px] custom-text-md-regular md:custom-text-lg-regular w-full px-[20px] py-[14px] rounded-[16px] bg-white border border-gray-300 outline-none active:border-gray-500 focus:border-gray-500 font-sans resize-none',
              errors.content && 'border-red-500',
            )}
            rows={5}
          />
          {errors.content && (
            <div role='alert' className='absolute text-red-500 mt-[4px]'>
              <p>{errors.content.message}</p>
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
                max={10}
                step={1}
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
                max={10}
                step={1}
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
                max={10}
                step={1}
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
                max={10}
                step={1}
                onChange={(value) => setValue('slidersoftAcidic', value)}
                labelLeft='안셔요'
                labelRight='많이셔요'
                badgeLabel='산미'
              />
            </div>
          </div>
          <p className='custom-text-2lg-bold md:custom-text-xl-bold'>기억에 남는 향이 있나요?</p>
          {errors.aroma && (
            <div role='alert' className='absolute text-red-500'>
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

export default AddReviewModal;
