import gsap from 'gsap';
import React, { useEffect } from 'react';

export default function AdoptionHeader({ link, header }) {
  useEffect(() => {
    gsap.from('.header-animation', { y: '+=60', opacity: 0, stagger: 0.2 });
    gsap.to('.header-animation', { y: '0', opacity: 1, stagger: 0.2 });
  });
  useEffect(() => {
    gsap.to('.header-image-animation', { opacity: 1, duration: 1.5 });
  });
  return (
    <div className="flex header-animation items-center w-[100%] py-3 overflow-hidden flex-row px-5 custom-round my-5 lg:flex-row justify-between lg:items-center md:w-[70%] lg:w-[70%] bg-primary-light">
      <div className="lg:mx-auto">
        <img
          src={link ? link : '/assets/adoption/dogowner.svg'}
          className="header-image-animation   w-[60px] lg:w-[80px] "
        ></img>
      </div>

      <div className="lg:w-[70%] ml-5">
        <h1 className="header-animation  text-[16px] font-extrabold tracking-tight leading-5 text-primary">
          {header ? header : 'Adopt helpless animals Today'}
        </h1>
        <p className="header-animation hidden text-[12px] lg:block mt-3 text-gray-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus leo
          arcu ac a tortor in mattis. Adipiscing ac velit adipiscing pulvinar
          arcu integer donec blandit dolor. Lacinia at id porttitor pulvinar in
          in nulla faucibus nulla.
        </p>
      </div>
    </div>
  );
}



















