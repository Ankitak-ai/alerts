import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';

interface SliderProps {
  value: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  step,
  onValueChange,
  className,
}) => {
  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-700">
        <SliderPrimitive.Range className="absolute h-full bg-indigo-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-indigo-500 bg-slate-900 ring-offset-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
};
