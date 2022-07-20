import React from 'react';

export default function Button({
  text,
  width,
  brand,
  widthClass,
  height,
  heightClass,
  textSize,
  textSizeClass,
  secondary,
  disabled
}) {
  return (
    <button
      className={` ${
        !brand
          ? !secondary && 'bg-brand primary-button'
          : !secondary && 'bg-primary primary-variant'
      } ${
        secondary &&
        'border-[1px] hover:border-0 border-primary secondary-variant'
      } 'text-white'
       text-[16px]  ${width ? widthClass : 'w-full'}  ${
        height ? heightClass : 'h-[50px]'
      }  py-3 my-5 tracking-[-0.5px] `}
    >
      <span
        className={`font-[600] lg:font-[500] ${
          textSize ? textSizeClass : 'text-[14px]'
        }`}
      >
        {text}
      </span>
    </button>
  );
}
