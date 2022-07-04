import React from 'react';
import { aditionalFeatures } from '../Data/adoption';
export default function AdditionalFeatures() {
  let count = 1;
  return (
    <div className="description-animation  bg-shadow py-6 px-4 mt-5 custom-round ">
      {aditionalFeatures.map((item) => (
        <div
          className={
            count++ < 5
              ? 'flex justify-between py-4 border-b border-b-gray'
              : 'flex justify-between py-4'
          }
        >
          <h2 className="mb-4 font-[700] text-[16px] text-primary tracking-tight">
            {item.title}
          </h2>
          <div className="text-[14px] text w-[50%] ">
            {item.feature.map((featureItem) => (
              <div className="flex pb-2 pt-[2px]">
                <img src={item.img}></img>
                <h1 className="mx-3 text-gray-light">{featureItem}</h1>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
