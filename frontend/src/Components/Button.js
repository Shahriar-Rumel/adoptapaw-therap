import React from 'react';

export default function Button({
  text,
  width,
  brand,
  widthClass,
  height,
  heightClass,
  textSize,
  textSizeClass
}) {
  return (
    <button
      className={` ${
        !brand ? 'bg-brand primary-button' : 'bg-primary primary-variant'
      } text-[16px] text-white ${width ? widthClass : 'w-full'}  ${
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
