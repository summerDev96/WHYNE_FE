import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateReview } from '@/api/editreview';
import BasicBottomSheet from '@/components/common/BottomSheet/BasicBottomSheet';
import BasicModal from '@/components/common/Modal/BasicModal';
import StarRating from '@/components/Modal/ReviewModal/StarRating';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

import FlavorSlider from '../../common/slider/FlavorSlider';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface ReviewForm {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: Array<string>;
  content: string;
}

interface ReviewData {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
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

export const aromaMap: Record<string, string> = {
  체리: 'CHERRY',
  베리: 'BERRY',
  오크: 'OAK',
  바닐라: 'VANILLA',
  후추: 'PEPPER',
  제빵: 'BAKING',
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
  showEditModal,
  setShowEditModal,
}: {
  wineName: string;
  reviewData: ReviewData;
  showEditModal: boolean;
  setShowEditModal: (state: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
    throwOnError: true,
    onSuccess: () => {
      toast.success('', {
        description: '리뷰가 성공적으로 수정되었습니다.',
      });
      console.log('리뷰 수정 완료');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['wineDetail'] });
      setShowEditModal(false);
    },
    onError: (error) => {
      toast.error('', {
        description: '리뷰 수정이 실패하였습니다.',
      });
      console.log('리뷰 수정 실패', error);
    },
  });

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
      lightBold: reviewData.lightBold,
      smoothTannic: reviewData.smoothTannic,
      drySweet: reviewData.drySweet,
      softAcidic: reviewData.softAcidic,
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
    const fullData = {
      id: reviewData.id,
      rating: data.rating,
      lightBold: data.lightBold,
      smoothTannic: data.smoothTannic,
      drySweet: data.drySweet,
      softAcidic: data.softAcidic,
      aroma: data.aroma.map((a) => aromaMap[a]).filter(Boolean),
      content: data.content,
    };
    updateReviewMutation.mutate(fullData);
  };

  const closeModalReset = (isOpen: boolean) => {
    setShowEditModal(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  //watch() 값들 추적
  const content = watch('content');
  const aromaList = watch('aroma'); // 한글임
  const rating = watch('rating');
  const lightBold = watch('lightBold');
  const smoothTannic = watch('smoothTannic');
  const drySweet = watch('drySweet');
  const softAcidic = watch('softAcidic');

  // 한글 → 영어 변환
  const selectedAromaEng = (aromaList || []).map((kor) => aromaMap[kor]).filter(Boolean);

  // 변경 여부 비교
  const isChanged =
    rating !== reviewData.rating ||
    lightBold !== reviewData.lightBold ||
    smoothTannic !== reviewData.smoothTannic ||
    drySweet !== reviewData.drySweet ||
    softAcidic !== reviewData.softAcidic ||
    content !== reviewData.content ||
    JSON.stringify(selectedAromaEng) !== JSON.stringify(reviewData.aroma);

  //버튼 활성화 조건 개선
  const isFormValid = rating > 0 && content.trim().length > 0 && aromaList.length > 0 && isChanged;

  const renderButton = (
    <Button
      onClick={handleSubmit(onSubmit)}
      type='button'
      variant='purpleDark'
      size='xl'
      width='full'
      fontSize='lg'
      disabled={!isFormValid}
      className={!isFormValid ? 'cursor-not-allowed' : ''}
    >
      수정 완료
    </Button>
  );

  const renderForm = () => (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType='multipart/form-data'
      className='my-[32px] md:my-[40px] px-2'
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
          maxLength: {
            value: 500,
            message: '최대 500자까지 입력 가능합니다.',
          },
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
        <div role='alert' className='relative'>
          <p className='absolute text-red-500 mt-1'>{errors.content.message}</p>
        </div>
      )}

      <p className='custom-text-2lg-bold md:custom-text-xl-bold mb-[24px] mt-[35px]'>
        와인의 맛은 어땠나요?
      </p>

      <div className='mb-[40px] space-y-[18px]'>
        <FlavorSlider
          value={watch('lightBold')}
          min={0}
          max={10}
          step={1}
          onChange={(val) => setValue('lightBold', val)}
          labelLeft='가벼워요'
          labelRight='진해요'
          badgeLabel='바디감'
        />
        <FlavorSlider
          value={watch('smoothTannic')}
          min={0}
          max={10}
          step={1}
          onChange={(val) => setValue('smoothTannic', val)}
          labelLeft='부드러워요'
          labelRight='떫어요'
          badgeLabel='타닌'
        />
        <FlavorSlider
          value={watch('drySweet')}
          min={0}
          max={10}
          step={1}
          onChange={(val) => setValue('drySweet', val)}
          labelLeft='드라이해요'
          labelRight='달아요'
          badgeLabel='당도'
        />
        <FlavorSlider
          value={watch('softAcidic')}
          min={0}
          max={10}
          step={1}
          onChange={(val) => setValue('softAcidic', val)}
          labelLeft='안 셔요'
          labelRight='많이 셔요'
          badgeLabel='산미'
        />
      </div>

      <p className='custom-text-2lg-bold md:custom-text-xl-bold'>기억에 남는 향이 있나요?</p>
      {errors.aroma && (
        <div role='alert' className='relative'>
          <p className='absolute text-red-500'>{errors.aroma.message}</p>
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
  );

  return (
    <div>
      {isDesktop ? (
        <BasicModal
          type='review'
          title='리뷰 수정'
          open={showEditModal}
          onOpenChange={closeModalReset}
          buttons={renderButton}
        >
          {renderForm()}
        </BasicModal>
      ) : (
        <BasicBottomSheet
          open={showEditModal}
          onOpenChange={closeModalReset}
          title='리뷰 수정하기'
          buttons={renderButton}
        >
          {renderForm()}
        </BasicBottomSheet>
      )}
    </div>
  );
};

export default EditReviewModal;
