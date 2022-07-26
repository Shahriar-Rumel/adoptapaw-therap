import gsap from 'gsap';
import React, { useEffect } from 'react';
import AdditionalFeatures from '../Adoption/AdditionalFeatures';
import Features from './Features';

export default function AnimalProfileBottom({ data }) {
  useEffect(() => {
    gsap.from('.description-animation', {
      y: '+=120',
      opacity: 0
    });
    gsap.to('.description-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.3
    });
  });
  return (
    <>
      {data && (
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
      )}
    </>
  );
}
