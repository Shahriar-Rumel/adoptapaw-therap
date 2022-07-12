import React from 'react';

export default function TextBlock({ header, content }) {
  return (
    <div>
      <h2 className="text-[16px] font-extrabold tracking-tight text-primary mt-[32px]">
        {header}
      </h2>
      <p className="text-[16px] text-gray-light leading-[20px] mt-4 tracking-tight ">
        {content}
      </p>
    </div>
  );
}
