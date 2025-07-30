import React, { useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { uploadImage, postWine, PostWineRequest } from '@/api/addwine';
import CameraIcon from '@/assets/camera.svg';
import DropdownIcon from '@/assets/dropdowntriangle.svg';
import BasicBottomSheet from '@/components/common/BottomSheet/BottomSheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import SelectDropdown from '../../common/dropdown/SelectDropdown';
import Input from '../../common/Input';
import BasicModal from '../../common/Modal/BasicModal';
import { Button } from '../../ui/button';

interface WineForm {
  wineName: string;
  winePrice: number;
  wineOrigin: string;
  wineImage: FileList;
  wineType: string;
}

interface AddWineModalProps {
  showRegisterModal: boolean;
  setShowRegisterModal: (state: boolean) => void;
}

const AddWineModal = ({ showRegisterModal, setShowRegisterModal }: AddWineModalProps) => {
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
      const imageUrl = URL.createObjectURL(file);
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
    reset,
  } = useForm<WineForm>({
    mode: 'onBlur',
  });

  const resetForm = () => {
    reset({
      wineName: '',
      winePrice: NaN,
      wineOrigin: '',
      wineImage: {} as FileList,
      wineType: '',
    });
    setCategory('');
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePostWine = async (form: WineForm) => {
    const file = form.wineImage[0];
    const imageUrl = await uploadImage(file);
    const requestData: PostWineRequest = {
      name: form.wineName,
      region: form.wineOrigin,
      image: imageUrl,
      price: Number(form.winePrice),
      type: form.wineType.toUpperCase() as 'RED' | 'WHITE' | 'SPARKLING',
    };
    return postWine(requestData);
  };

  const postWineMutation = useMutation({
    mutationFn: handlePostWine,
    onSuccess: () => {
      console.log('와인 등록 성공');
      resetForm();
      setShowRegisterModal(false);
      queryClient.invalidateQueries({ queryKey: ['wines'] });
    },
    onError: (error) => {
      console.log('와인 등록 실패', error);
    },
  });

  const onSubmit = async (form: WineForm) => {
    postWineMutation.mutate(form);
  };

  const categoryOptions = [
    { label: 'Red', value: 'Red' },
    { label: 'White', value: 'White' },
    { label: 'Sparkling', value: 'Sparkling' },
  ];

  const selectedCategoryLabel = categoryOptions.find((opt) => opt.value === category)?.label;

  //모달창 끄면 리셋되게
  const closeModalReset = (isOpen: boolean) => {
    setShowRegisterModal(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
      }, 50);
    }
  };
  ////

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className='mx-2'>
      {/* 이름 */}
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>
        와인 이름
      </p>
      <Input
        {...register('wineName', {
          required: '와인 이름을 입력해 주세요.',
          onChange: () => clearErrors('wineName'),
        })}
        errorMessage={errors.wineName?.message}
        id='wineName'
        type='text'
        variant='name'
        placeholder='와인 이름 입력'
        className='custom-text-md-regular md:custom-text-lg-regular'
      />
      {/* 가격 */}
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>가격</p>
      <Input
        {...register('winePrice', {
          required: '가격을 입력해 주세요.',
          onChange: () => clearErrors('winePrice'),
        })}
        errorMessage={errors.winePrice?.message}
        id='winePrice'
        type='number'
        variant='name'
        placeholder='가격 입력'
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-text-md-regular md:custom-text-lg-regular'
      />
      {/* 원산지 */}
      <p className='custom-text-md-medium md:custom-text-lg-medium mt-[22px] mb-[10px]'>원산지</p>
      <Input
        {...register('wineOrigin', {
          required: '원산지를 입력해 주세요.',
          onChange: () => clearErrors('wineOrigin'),
        })}
        errorMessage={errors.wineOrigin?.message}
        id='wineOrigin'
        type='text'
        variant='name'
        placeholder='원산지 입력'
        className='custom-text-md-regular md:custom-text-lg-regular'
      />
      {/* 타입 */}
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
      )}{' '}
      <Input
        {...register('wineType', {
          required: '타입을 선택해 주세요.',
          onChange: () => clearErrors('wineType'),
        })}
        id='wineType'
        type='text'
        className='hidden'
      />
      {/* 사진 */}
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
        accept='image/*'
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
            // eslint-disable-next-line @next/next/no-img-element
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
        className='w-full md:w-[294px] lg:w-[294px]'
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
