type Tab = 'reviews' | 'wines';

interface TabNavProps {
  current: Tab;
  onChange: (t: Tab) => void;
  reviewsCount: number;
  winesCount: number;
}

export function TabNav({ current, onChange, reviewsCount, winesCount }: TabNavProps) {
  const count = current === 'reviews' ? reviewsCount : winesCount;

  return (
    <nav className='flex justify-between items-center'>
      <div className='flex justify-start gap-4'>
        {(['reviews', 'wines'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`text-center custom-text-2lg-bold md:custom-text-xl-bold ${
              current === tab ? 'text-gray-800' : 'text-gray-500'
            }`}
          >
            {tab === 'reviews' ? '내가 쓴 후기' : '내가 등록한 와인'}
          </button>
        ))}
      </div>
      <span className='custom-text-xs-regular text-primary md:custom-text-md-regular '>
        총 {count}개
      </span>
    </nav>
  );
}
