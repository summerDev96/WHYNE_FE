import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

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

const aromaOptions = ['체리', '바닐라', '블랙베리'];

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
      rating: 0,
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

  const onSubmit = (data: ReviewForm) => {
    const fullData = {
      ...data,
    };
    console.log(fullData);
    reset();
    setShowRegisterModal(false);
  };

  return (
    <div>
      <Button variant='purpleDark' size='lg' width='lg' onClick={() => setShowRegisterModal(true)}>
        리뷰 남기기
      </Button>
      <BasicModal
        type='review'
        title='리뷰 등록'
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
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
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <textarea
            id='content'
            {...register('content', {
              required: '리뷰 내용을 입력해 주세요.',
              onChange: () => clearErrors('content'),
            })}
            placeholder='후기를 작성해 주세요'
            className={cn(
              'custom-text-md-regular md:custom-text-lg-regular w-full px-[20px] py-[14px] rounded-[16px] bg-white border border-gray-300 outline-none active:border-gray-500 focus:border-gray-500 font-sans resize-none',
              errors.content && 'border-red-500',
            )}
            rows={5}
          />
          {errors.content && (
            <div role='alert' className='text-red-500 mt-[4px]'>
              {errors.content.message}
            </div>
          )}{' '}
          <p className='custom-text-2lg-bold md:custom-text-xl-bold mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px]'>
            와인의 맛은 어땠나요?
          </p>
          <div>
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
          <p className='custom-text-2lg-bold md:custom-text-xl-bold mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px]'>
            기억에 남는 향이 있나요?
          </p>
          <div>
            {aromaOptions.map((item) => (
              <Badge
                key={item}
                variant='chooseFlavor'
                onClick={() => toggleAroma(item)}
                className={cn('cursor-pointer', isSelected(item) && 'bg-primary text-white')}
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
