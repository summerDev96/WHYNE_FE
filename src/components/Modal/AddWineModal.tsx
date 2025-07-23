import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';

import axiosInstance from '@/api/axios';
import CameraIcon from '@/assets/camera.svg';

import SelectDropdown from '../common/dropdown/SelectDropdown';
import Input from '../common/Input';
import BasicModal from '../common/Modal/BasicModal';
import { Button } from '../ui/button';

interface WineForm {
  wineName: string;
  winePrice: number;
  wineOrigin: string;
  wineImage: FileList;
}

////api 테스트용////
///////////////
export const uploadImage = async (teamId: string, file: File) => {
  //토큰추가//
  const token = localStorage.getItem('accessToken');

  console.log(token);

  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post(`/${teamId}/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.imageUrl;
};
//
export const PostWine = async (
  teamId: string,
  data: {
    name: string;
    region: string;
    image: string;
    price: number;
    type: 'RED' | 'WHITE' | 'SPARKLING';
  },
) => {
  const response = await axiosInstance.post(`/${teamId}/wines`, data);
  return response.data;
};
///////
///////
//////
const AddWineModal = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [category, setCategory] = useState('Red');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const trigerFileSelect = () => {
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
    reset,
  } = useForm<WineForm>();

  // const onSubmit = (data: WineForm) => {
  //   const fullData = {
  //     ...data,
  //     category,
  //   };
  //   console.log(fullData);
  //   reset();
  //   setShowRegisterModal(false);
  // };

  const onSubmit = async (form: WineForm) => {
    const teamId = '16-4';

    try {
      const file = form.wineImage[0];
      const imageUrl = await uploadImage(teamId, file);

      const requestData = {
        name: form.wineName,
        region: form.wineOrigin,
        image: imageUrl,
        price: Number(form.winePrice),
        type: category.toUpperCase() as 'RED' | 'WHITE' | 'SPARKLING',
        category,
      };

      await PostWine(teamId, requestData);

      console.log('와인등록완료');
      reset();
      setShowRegisterModal(false);
    } catch (error) {
      console.error('와인등록실패', error);
      alert('와인등ㄹ곡실패');
    }
  };

  const categoryOptions = [
    { label: 'Red', value: 'Red' },
    { label: 'White', value: 'White' },
    { label: 'Sparkling', value: 'Sparkling' },
  ];

  const selectedCategoryLabel =
    categoryOptions.find((opt) => opt.value === category)?.label ?? '선택';

  return (
    <div>
      <Button variant='purpleDark' size='lg' width='lg' onClick={() => setShowRegisterModal(true)}>
        와인 등록하기
      </Button>
      <BasicModal
        type='register'
        title='와인 등록'
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        buttons={
          <div className='flex gap-2'>
            <Button
              onClick={() => {
                reset();
                setShowRegisterModal(false);
              }}
              variant='onlyCancel'
              size='xl'
              className='w-[96px] md:w-[108px]'
              fontSize='lg'
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              type='submit'
              variant='purpleDark'
              size='xl'
              className='w-[223px] md:w-[294px]'
              fontSize='lg'
            >
              와인 등록하기
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <p className='custom-text-md-medium md:custom-text-lg-medium mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px] '>
            와인 이름
          </p>
          <Input
            className='custom-text-md-regular md:custom-text-lg-regular'
            id='wineName'
            type='text'
            variant='name'
            placeholder='와인 이름 입력'
            {...register('wineName', {
              required: '와인 이름을 입력해 주세요.',
              onChange: () => clearErrors('wineName'),
            })}
            errorMessage={errors.wineName?.message}
          />
          <p className='custom-text-md-medium md:custom-text-lg-medium mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px]'>
            가격
          </p>
          <Input
            className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-text-md-regular md:custom-text-lg-regular'
            id='winePrice'
            type='number'
            variant='name'
            placeholder='가격 입력'
            {...register('winePrice', {
              required: '가격을 입력해 주세요.',
              onChange: () => clearErrors('winePrice'),
            })}
            errorMessage={errors.winePrice?.message}
          />
          <p className='custom-text-md-medium md:custom-text-lg-medium mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px]'>
            원산지
          </p>
          <Input
            className='custom-text-md-regular md:custom-text-lg-regular'
            id='wineOrigin'
            type='text'
            variant='name'
            placeholder='원산지 입력'
            {...register('wineOrigin', {
              required: '원산지를 입력해 주세요.',
              onChange: () => clearErrors('wineOrigin'),
            })}
            errorMessage={errors.wineOrigin?.message}
          />
          <p className='custom-text-md-medium md:custom-text-lg-medium mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px]'>
            타입
          </p>
          <SelectDropdown
            value={category}
            options={categoryOptions}
            onChange={setCategory}
            trigger={
              <button className='w-full px-4 py-2 border rounded text-left'>
                {selectedCategoryLabel}
              </button>
            }
          />
          <p className='custom-text-md-medium md:custom-text-lg-medium mb-[10px] md:mb-[12px] mt-[22px] md:mt-[24px]'>
            와인 사진
          </p>
          <Input
            className='custom-text-md-regular md:custom-text-lg-regular hidden'
            id='wineImage'
            type='file'
            accept='image/*'
            {...register('wineImage', {
              required: '이미지를 업로드해 주세요.',
              onChange: (e) => {
                clearErrors('wineImage');
                handleImageChange(e);
              },
            })}
            ref={(e) => {
              register('wineImage').ref(e);
              fileInputRef.current = e;
            }}
            errorMessage={errors.wineImage?.message}
          />
          <div className='mt-2'>
            <div
              className='w-[140px] aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center relative cursor-pointer'
              onClick={trigerFileSelect}
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
          </div>
        </form>
      </BasicModal>
    </div>
  );
};

export default AddWineModal;
