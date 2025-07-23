// components/TabNav.tsx
type Tab = 'reviews' | 'wines';

export function TabNav({ current, onChange }: { current: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav>
      <div className='flex justify-start gap-4'>
        {(['reviews', 'wines'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`text-center custom-text-2lg-bold ${
              current === tab ? 'text-gray-800' : 'text-gray-500'
            }`}
          >
            {tab === 'reviews' ? '내가 쓴 후기' : '내가 등록한 와인'}
          </button>
        ))}
      </div>
    </nav>
  );
}
