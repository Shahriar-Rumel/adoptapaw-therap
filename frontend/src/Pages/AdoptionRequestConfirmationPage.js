import gsap from 'gsap';
import React, { useEffect } from 'react';
import Button from '../Components/Button';

export default function AdoptionRequestConfirmationPage() {
  useEffect(() => {
    gsap.from('.request-confirmed-svg-animation', {
      opacity: 0
    });
    gsap.to('.request-confirmed-svg-animation', {
      opacity: 1,
      duration: 2,
      stagger: 0.2
    });
  });
  return (
    <div className=" flex lg:flex lg:justify-between flex-col items-center mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px]">
      <img
        src="/assets/Icons/confirmed.svg"
        className="w-[150px] mx-auto lg:w-[250px] request-confirmed-svg-animation"
      ></img>
      <h1 className="text-primary font-extrabold tracking-tight text-[24px] text-center mt-5 lg:text-[36px] request-confirmed-svg-animation">
        Thanks for confirming !
      </h1>
      <h3 className="text-gray-light font-regular text-[10px] lg:text-[14px] text-center mb-36 request-confirmed-svg-animation">
        We will let you know soon via email .
      </h3>
      <div className="request-confirmed-svg-animation">
        <Button
          width={true}
          widthClass={'w-[200px]'}
          height={true}
          heightClass={'h-[55px]'}
          text="Go to homepage"
          brand={true}
        />
      </div>
    </div>
  );
}
