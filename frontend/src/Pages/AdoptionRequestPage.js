import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimalProfileLeft from '../Components/AnimalProfileLeft';
import AnimalProfileMid from '../Components/AnimalProfileMid';
import Button from '../Components/Button';
import Features from '../Components/Features';
import RequestForm from '../Components/RequestForm';

export default function AdoptionRequestPage() {
  useEffect(() => {
    gsap.from('.request-adoption-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.request-adoption-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  });

  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] lg:mt-[200px] items-center lg:flex justify-between mb-[100px]">
      <div className="lg:w-[50%] lg:mr-6 request-adoption-gallery-animation">
        <AnimalProfileLeft poster={2} />
        <AnimalProfileMid poster={2} />
        <Features className="mt-[-20px]" />
      </div>
      <div>
        <div className="my-10 lg:mt-[-50px] ">
          <h1 className="font-extrabold tracking-tight leading-[24px] text-center pt-10 text-primary text-[24px]">
            Please provide information required for adoption request
          </h1>
        </div>
        <div className="request-adoption-gallery-animation">
          <RequestForm />
        </div>

        <div className="request-adoption-gallery-animation">
          <Link to="/adoption/request/success">
            <Button text="Confirm Adoption Request" />
          </Link>
        </div>
      </div>
    </div>
  );
}
