import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

const sizes = {
  prose: 'max-w-prose-editorial',
  editorial: 'max-w-editorial',
  'editorial-wide': 'max-w-editorial-wide',
  full: 'max-w-none',
};

export function Container({
  children,
  size = 'editorial',
  className,
}: {
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full px-6 md:px-10 lg:px-16', sizes[size], className)}>
      {children}
    </div>
  );
}
