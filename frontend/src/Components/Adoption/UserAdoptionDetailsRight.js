import React from 'react';
import Features from './Features';

export default function UserAdoptionDetailsRight({ data }) {
  return (
    <>
      {data && (
        <div className="flex flex-col items-center justify-between">
          <div className="w-[100%]  description-gallery-animation">
            <div
              className="custom-round description-image-animation w-[100%] h-[250px] mx-auto md:h-[300px] md:w-[100%] lg:h-[400px] lg:w-[100%] ease-in-out duration-300"
              style={{
                backgroundImage: `url(${data.pet.imageone})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
          </div>
          <div className="w-[100%] ">
            <div className="mt-[20px] lg:mt-[20px] description-gallery-animation">
              <h1 className="text-[32px] font-black mb-5 text-primary tracking-tighter">
                {data.pet.name}
              </h1>
            </div>
            <div className="w-[100%] ">
              <Features className="mt-[-20px]" data={data.pet} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
