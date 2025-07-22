/* 
localhost:3000/guide/text-demo
*/

export default function TextDemoPage() {
  return (
    <main className='p-10 space-y-8 bg-gray-100 min-h-screen'>
      {/* font-size + font-weight + color 테스트 */}

      <p className='text-3xl-bold text-gray-800'>3XL Bold / Pretendard / Gray-800</p>

      <p className='text-2xl-semibold text-primary'>2XL SemiBold / Pretendard / Primary</p>

      <p className='text-xl-medium text-gray-500'>XL Medium / Pretendard / Gray-500</p>

      <p className='text-2lg-regular text-black'>2LG Regular / Pretendard / Black</p>

      <p className='text-lg-bold text-primary-100'>LG Bold / Pretendard / Primary-100</p>

      <p className='text-md-regular text-gray-300'>MD Regular / Pretendard / Gray-300</p>

      <p className='text-sm-medium text-gray-800'>SM Medium / Pretendard / Gray-800</p>

      <p className='text-xs-regular text-destructive'>XS Regular / Pretendard / Destructive</p>
    </main>
  );
}
