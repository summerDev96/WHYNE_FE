import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

export function Loading({ size = 'lg', className }: LoadingProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-4 border-muted border-t-primary',
        sizeClasses[size],
        className,
      )}
    />
  );
}
