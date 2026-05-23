import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/utils/cn';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className,
}) => {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
        checked ? 'bg-indigo-600' : 'bg-slate-700',
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
};
