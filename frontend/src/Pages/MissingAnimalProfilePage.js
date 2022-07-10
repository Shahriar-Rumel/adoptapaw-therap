import React, { useEffect, useState } from 'react';
import AttributeCard from '../Components/Cards/AttributeCard';
import Features from '../Components/Adoption/Features';
import RewardCard from '../Components/Cards/RewardCard';
import { Link } from 'react-router-dom';
import { adoptionListGallery } from '../Data/adoption';
import Button from '../Components/Button';
import gsap from 'gsap';

export default function MissingAnimalProfilePage() {
  const [image, setImage] = useState(adoptionListGallery[0].img);

  useEffect(() => {
    gsap.from('.missing-gallery-animation', {
      //   y: '+=110',
      opacity: 0
    });
    gsap.to('.missing-gallery-animation', {
      y: '0',
      opacity: 1,
      duration: 2,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.missing-image-animation', {
      opacity: 0
    });
    gsap.to('.missing-image-animation', {
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.missing-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.missing-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.3
    });
  });
  return (
    <div className="lg:flex lg:justify-between lg:flex-row mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
      <div className="lg:w-[50%] lg:mr-10">
        <div
          className=" w-[90vw] h-[300px] lg:w-[35vw] mx-auto  missing-gallery-animation"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className=" flex justify-between items-center mt-10 lg:mb-10 missing-animation">
          <h1 className="font-extrabold text-[32px] tracking-tight text-primary -mt-[4px]">
            Tommy
          </h1>
          <div className="flex">
            <img src="/assets/fav.svg" className="w-[20px]"></img>
            <h3 className="mx-2 text-[12px] font-medium text-gray-light">
              Dhanmondi,Dhaka
            </h3>
          </div>
        </div>
        <div className="missing-animation">
          <Features />
        </div>
      </div>
      <div className="lg:w-[50%] lg:ml-10">
        <AttributeCard
          Attribute={'Specific Attribute'}
          feature={'Has a black dot on tail'}
        />
        <AttributeCard
          Attribute={'Accessories Last Worn'}
          feature={'A pink belt on neck'}
        />
        <RewardCard />
        <div className="missing-animation">
          <h3 className="text-[12px] text-gray-light mt-10 mb-4">
            Do you have information about Tommy?
          </h3>

          <Link to={'/missing/cat/information'}>
            <Button text="Send Information" />
          </Link>
        </div>
      </div>
    </div>
  );
}
