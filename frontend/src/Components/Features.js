import React from 'react';
import { features } from '../Data/adoption';

export default function () {
  let count = 1;
  return (
    <div className="description-animation missing-animation flex mt-[30px]  lg:mt-[0px] lg:mb-5 justify-between items-center  mx-auto bg-primary-light py-3 px-5 custom-round">
      {features.map((item) => (
        <div className={count++ > 1 && 'border-l-brand border-l-2 pl-3'}>
          <h1 className="text-primary font-[600]">{item.title}</h1>
          <h1 className="text-gray-light text-[14px] font-[500]">
            {item.feature}
          </h1>
        </div>
      ))}
    </div>
  );
}
