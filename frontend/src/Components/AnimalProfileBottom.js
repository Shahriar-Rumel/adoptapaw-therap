import gsap from 'gsap';
import React, { useEffect } from 'react';
import AdditionalFeatures from './AdditionalFeatures';
import Features from './Features';

export default function AnimalProfileBottom() {
  return (
    <div className="lg:w-[50%] description-animation">
      <Features />
      <div className="description-animation bg-shadow py-6 px-4 mt-5 lg:mt-0 custom-round ">
        <h2 className="mb-4 font-[700] text-[20px] text-primary tracking-tight">
          Description
        </h2>
        <p className="text-[14px] text-gray-light">
          Cats have very sweet features. It has two beautiful eyes, adorably
          tiny paws, sharp claws, and two perky ears which are very sensitive to
          sounds. It has a tiny body covered with smooth fur and it has a furry
          tail as well. Cats have an adorable face with a tiny nose, a big mouth
          and a few whiskers under its nose.It has a tiny body covered with
          smooth fur and it has a furry tail as well.
        </p>
      </div>
      <AdditionalFeatures />
    </div>
  );
}
