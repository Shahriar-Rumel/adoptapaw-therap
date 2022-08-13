import React from 'react';
import AdditionalFeatures from '../Adoption/AdditionalFeatures';
import Features from './Features';

export default function AnimalProfileBottom({ data }) {
  return (
    <>
      {data && (
        <div className="lg:w-[50%]">
          <div className="adoption-details-animation">
            <Features data={data} />
          </div>

          <div className="adoption-details-animation bg-shadow py-6 px-4 mt-5 lg:mt-0 custom-round ">
            <h2 className="mb-4 font-[700] text-[20px] text-primary tracking-tight">
              Description
            </h2>
            <p className="text-[14px] text-gray-light ">{data.description}</p>
          </div>
          <div className="adoption-details-animation">
            <AdditionalFeatures data={data} />
          </div>
        </div>
      )}
    </>
  );
}
