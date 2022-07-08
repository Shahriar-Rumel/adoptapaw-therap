import gsap from 'gsap';
import React, { useEffect } from 'react';
import AdditionalFeatures from './AdditionalFeatures';
import Features from './Features';

export default function AnimalProfileBottom({ data }) {
  return (
    <div className="lg:w-[50%] description-animation">
      <Features data={data} />
      <div className="description-animation bg-shadow py-6 px-4 mt-5 lg:mt-0 custom-round ">
        <h2 className="mb-4 font-[700] text-[20px] text-primary tracking-tight">
          Description
        </h2>
        <p className="text-[14px] text-gray-light">{data.description}</p>
      </div>
      <AdditionalFeatures data={data} />
    </div>
  );
}
