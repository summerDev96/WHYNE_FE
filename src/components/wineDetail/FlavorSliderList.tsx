import FlavorSlider from '@/components/common/slider/FlavorSlider';

interface Props {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

function FlavorSliderList({
  lightBold = 0,
  smoothTannic = 0,
  drySweet = 0,
  softAcidic = 0,
}: Props) {
  const sliderClassName = '';

  return (
    <div className='flex gap-[18px] flex-col mb-4 md:mb-6 xl:mb-[6.5px]'>
      <FlavorSlider
        value={lightBold}
        onChange={() => {}} //onChange가 필수 프롭이라
        labelLeft={'가벼워요'}
        labelRight={'진해요'}
        badgeLabel={'바디감'}
        disabled
        className={sliderClassName}
      />
      <FlavorSlider
        value={smoothTannic}
        onChange={() => {}}
        labelLeft={'부드러워요'}
        labelRight={'떫어요'}
        badgeLabel={'타닌'}
        disabled
        className={sliderClassName}
      />
      <FlavorSlider
        value={drySweet}
        onChange={() => {}}
        labelLeft={'드라이해요'}
        labelRight={'달아요'}
        badgeLabel={'당도'}
        disabled
        className={sliderClassName}
      />
      <FlavorSlider
        value={softAcidic}
        onChange={() => {}}
        labelLeft={'안셔요'}
        labelRight={'많이셔요'}
        badgeLabel={'산미'}
        disabled
        className={sliderClassName}
      />
    </div>
  );
}

export default FlavorSliderList;
