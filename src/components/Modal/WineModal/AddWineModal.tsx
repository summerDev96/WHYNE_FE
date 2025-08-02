import React, { useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { uploadImage, postWine, PostWineRequest } from '@/api/addwine';
import CameraIcon from '@/assets/camera.svg';
import DropdownIcon from '@/assets/dropdowntriangle.svg';
import BasicBottomSheet from '@/components/common/BottomSheet/BasicBottomSheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getTrimmedHandlers } from '@/lib/inputCheck';
import { getCommaNumberHandlers } from '@/lib/inputNumberCheck';
import { renameFileIfNeeded } from '@/lib/renameFile';

import SelectDropdown from '../../common/dropdown/SelectDropdown';
import Input from '../../common/Input';
import BasicModal from '../../common/Modal/BasicModal';
import { Button } from '../../ui/button';
interface WineForm {
  wineName: string;
  winePrice: string;
  wineOrigin: string;
  wineImage: FileList;
  wineType: string;
}
interface AddWineModalProps {
  showRegisterModal: boolean;
  setShowRegisterModal: (state: boolean) => void;
}
const AddWineModal = ({ showRegisterModal, setShowRegisterModal }: AddWineModalProps) => {
  const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

  const [category, setCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setPreviewImage(null);
        setError('wineImage', {
          type: 'manual',
          message: '지원하지 않는 이미지 형식입니다. (png, jpg, webp)',
        });
        return;
      }
      const renamedFile = renameFileIfNeeded(file); //이미지파일 이름 정규화
      const imageUrl = URL.createObjectURL(renamedFile);
      setPreviewImage(imageUrl);
    } else {
      setPreviewImage(null);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    setValue,
    setError,
    reset,
    watch,
  } = useForm<WineForm>({
    mode: 'onBlur',
  });
  const resetForm = () => {
    reset({
      wineName: '',
      winePrice: '',
      wineOrigin: '',
      wineImage: {} as FileList,
      wineType: '',
    });
    setCategory('');
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePostWine = async (data: PostWineRequest) => {
    return postWine(data);
  };
  const postWineMutation = useMutation({
    mutationFn: handlePostWine,
    onSuccess: () => {
      toast.success('와인이 성공적으로 등록되었습니다.');
      console.log('와인 등록 성공');
      resetForm();
      setShowRegisterModal(false);
      queryClient.invalidateQueries({ queryKey: ['wines'] });
    },
    onError: (error) => {
      toast.error('와인 등록이 실패하였습니다.');
      console.log('와인 등록 실패', error);
    },
  });

  //WineForm의 price를 string으로 해서 쉼표 가능 후 >>서버에 저장할때는 쉼표 제거 후 숫자로 변환을 위해서
  const onSubmit = async (form: WineForm) => {
    ////이미지 확장자 검사 및 잘못된 확장자 업로드 방지////
    const file = form.wineImage?.[0];

    // 1. 이미지 없을 때 막기 (선택사항: 이미 react-hook-form required로 막고 있음)
    if (!file) {
      setError('wineImage', {
        type: 'manual',
        message: '이미지를 업로드해 주세요.',
      });
      return;
    }
    // 2. 확장자 제한
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('wineImage', {
        type: 'manual',
        message: '지원하지 않는 이미지 형식입니다. (png, jpg, webp)',
      });
      return;
    }
    //// ////

    const imageUrl = await uploadImage(file); //이미지 업로드해서 URL얻고

    const numberPrice = Number(form.winePrice.replace(/,/g, '')); //가격 쉼표 제거 후 숫자로 변환

    const requestData: PostWineRequest = {
      name: form.wineName,
      region: form.wineOrigin,
      image: imageUrl,
      price: numberPrice,
      type: form.wineType.toUpperCase() as 'RED' | 'WHITE' | 'SPARKLING',
    };
    postWineMutation.mutate(requestData);
  };
  const categoryOptions = [
    { label: 'Red', value: 'Red' },
    { label: 'White', value: 'White' },
    { label: 'Sparkling', value: 'Sparkling' },
  ];
  const selectedCategoryLabel = categoryOptions.find((opt) => opt.value === category)?.label;
  const closeModalReset = (isOpen: boolean) => {
    setShowRegisterModal(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
      }, 50);
    }
  };
  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className='mx-2'>
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>
        와인 이름
      </p>
      <Input
        {...register('wineName', {
          required: '와인 이름을 입력해 주세요.',
          ...getTrimmedHandlers<WineForm>('wineName', setValue, clearErrors), //정규식 검사 함수
        })}
        errorMessage={errors.wineName?.message}
        id='wineName'
        type='text'
        variant='name'
        placeholder='와인 이름 입력'
        className='custom-text-md-regular md:custom-text-lg-regular'
      />
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>가격</p>
      <Input
        {...register('winePrice', {
          required: '가격을 입력해 주세요.',
          pattern: {
            value: /^[1-9][0-9]{0,9}(,[0-9]{3})*$/, // 총 10자리, 1~9로 시작
            message: '숫자만 입력 가능하며, 0으로 시작할 수 없습니다.',
          },
          ...getCommaNumberHandlers<WineForm>('winePrice', setValue, clearErrors), //정규식 검사 함수
        })}
        errorMessage={errors.winePrice?.message}
        id='winePrice'
        type='text'
        inputMode='numeric' //모바일시 숫자패드
        variant='name'
        placeholder='가격 입력'
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-text-md-regular md:custom-text-lg-regular'
      />
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>원산지</p>
      <Input
        {...register('wineOrigin', {
          required: '원산지를 입력해 주세요.',
          ...getTrimmedHandlers<WineForm>('wineOrigin', setValue, clearErrors), //정규식 검사 함수
        })}
        errorMessage={errors.wineOrigin?.message}
        id='wineOrigin'
        type='text'
        variant='name'
        placeholder='원산지 입력'
        className='custom-text-md-regular md:custom-text-lg-regular'
      />
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>타입</p>
      <SelectDropdown
        selectedValue={category}
        options={categoryOptions}
        onChange={(value) => {
          setCategory(value);
          setValue('wineType', value, { shouldValidate: true });
          trigger('wineType');
        }}
        placeholder='타입 선택'
        trigger={
          <button
            className={`w-full h-[42px] md:h-[48px] px-4 py-2 border rounded-[12px] md:rounded-[16px] text-left ${
              category ? 'text-black' : 'text-gray-500'
            }`}
          >
            <span>{selectedCategoryLabel || '타입 선택'}</span>
            <DropdownIcon className='ml-2 w-4 h-4 bg-black' />
          </button>
        }
      />
      {errors.wineType?.message && (
        <div className='relative'>
          <p className='text-red-500 absolute mt-1'>{errors.wineType.message}</p>
        </div>
      )}
      <Input
        {...register('wineType', {
          required: '타입을 선택해 주세요.',
          onChange: () => clearErrors('wineType'),
        })}
        id='wineType'
        type='text'
        className='hidden'
      />
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[24px]'>와인 사진</p>
      <Input
        {...register('wineImage', {
          required: '이미지를 업로드해 주세요.',
          onChange: (e) => {
            clearErrors('wineImage');
            handleImageChange(e);
          },
        })}
        id='wineImage'
        type='file'
        accept='.png, .jpg, .jpeg, .webp'
        className='hidden'
        ref={(e) => {
          register('wineImage').ref(e);
          fileInputRef.current = e;
        }}
      />
      <div className='mt-2 mb-5'>
        <div
          className='w-[140px] aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center relative cursor-pointer'
          onClick={triggerFileSelect}
        >
          {previewImage ? (
            <img src={previewImage} alt='미리보기' className='w-full h-full object-cover' />
          ) : (
            <div className='flex flex-col items-center text-gray-400'>
              <CameraIcon className='w-6 h-6 mb-2' />
            </div>
          )}
        </div>
        {errors.wineImage?.message && (
          <div className='relative'>
            <p className='text-red-500 absolute mt-1'>{errors.wineImage.message}</p>
          </div>
        )}
      </div>
    </form>
  );

  const watchedName = watch('wineName');
  const watchedPrice = watch('winePrice');
  const watchedOrigin = watch('wineOrigin');
  const watchedType = watch('wineType');
  const watchedImage = watch('wineImage');

  const isFormValid =
    watchedName?.trim() &&
    watchedPrice &&
    watchedOrigin?.trim() &&
    watchedType?.trim() &&
    watchedImage?.length > 0;

  const renderButton = (
    <div className='flex gap-2 w-full'>
      <Button
        onClick={() => {
          resetForm();
          setShowRegisterModal(false);
        }}
        variant='purpleLight'
        size='xl'
        fontSize='lg'
        width='full'
        className='w-full md:w-[108px] lg:w-[108px]'
      >
        취소
      </Button>
      <Button
        onClick={handleSubmit(onSubmit)}
        type='submit'
        variant='purpleDark'
        size='xl'
        fontSize='lg'
        width='full'
        className={
          !isFormValid
            ? 'cursor-not-allowed w-full md:w-[294px] lg:w-[294px]'
            : 'w-full md:w-[294px] lg:w-[294px]'
        }
        disabled={!isFormValid}
      >
        와인 등록하기
      </Button>
    </div>
  );
  return isDesktop ? (
    <BasicModal
      type='register'
      title='와인 등록'
      open={showRegisterModal}
      onOpenChange={closeModalReset}
      showCloseButton={false}
      buttons={renderButton}
    >
      {renderForm()}
    </BasicModal>
  ) : (
    <BasicBottomSheet
      open={showRegisterModal}
      onOpenChange={closeModalReset}
      title='와인 등록'
      buttons={renderButton}
    >
      {renderForm()}
    </BasicBottomSheet>
  );
};
export default AddWineModal;
