import gsap from 'gsap';
import React, { useEffect } from 'react';
import AnimalProfileBottom from '../Components/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/AnimalProfileLeft';
import AnimalProfileMid from '../Components/AnimalProfileMid';

export default function AdoptionAnimalProfile() {
  useEffect(() => {
    gsap.from('.description-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.description-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.description-image-animation', {
      opacity: 0
    });
    gsap.to('.description-image-animation', {
      opacity: 1,
      stagger: 0.2
    });
  });
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
    <div className=" lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
      <div className=" lg:w-[50%]  lg:mr-10">
        <AnimalProfileLeft />
        <AnimalProfileMid />
      </div>
      <AnimalProfileBottom />
    </div>
  );
}
