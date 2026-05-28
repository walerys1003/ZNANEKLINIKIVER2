import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ReactNode, type ComponentProps } from 'react';

const sizeClasses = {
  xs: 'h-8 px-4 text-[11px]',
  sm: 'h-10 px-5 text-xs',
  md: 'h-12 px-6 text-[13px]',
  lg: 'h-14 px-8 text-sm',
  xl: 'h-16 px-10 text-base',
};

type Size = keyof typeof sizeClasses;

interface BtnProps {
  children: ReactNode;
  size?: Size;
  href?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function ButtonPrimary({ children, size = 'md', href, icon, className, onClick, type = 'button', disabled }: BtnProps) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 bg-burgundy-500 text-nude-50',
    'font-medium uppercase tracking-wide rounded-sm',
    'transition-all duration-300 ease-out',
    'hover:bg-burgundy-600 hover:shadow-editorial-lg',
    'active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed',
    sizeClasses[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon ?? <ArrowRight size={14} strokeWidth={1.75} />}
    </>
  );
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{content}</button>;
}

export function ButtonGold({ children, size = 'md', href, icon, className, onClick }: BtnProps) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 bg-transparent text-charcoal-800',
    'font-medium uppercase tracking-wide rounded-sm border border-champagne-500',
    'transition-all duration-300 ease-out',
    'hover:bg-champagne-500 hover:text-charcoal-800 hover:shadow-gold-glow',
    sizeClasses[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <button onClick={onClick} className={cls}>{content}</button>;
}

export function ButtonGhost({ children, href, className, onClick }: BtnProps) {
  const cls = cn(
    'inline-flex items-center gap-1.5 text-sm font-medium text-burgundy-500',
    'hover:text-burgundy-600 transition-colors group',
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight size={14} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
    </>
  );
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <button onClick={onClick} className={cls}>{content}</button>;
}
