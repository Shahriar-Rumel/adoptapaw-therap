import React from 'react';

export default function FeaturesRow({ title, value }) {
  return (
    <div className={'flex justify-between py-4 border-b border-b-gray'}>
      <h2 className="mb-4 font-[700] text-[16px] text-primary tracking-tight">
        {title}
      </h2>
      <div className="text-[14px] text w-[50%] ">
        <div className="flex pb-2 pt-[2px]">
          <img src={''}></img>
          <h1 className="mx-3 text-gray-light">{value}</h1>
        </div>
      </div>
    </div>
  );
}
