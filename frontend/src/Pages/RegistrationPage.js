import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';

export default function RegistrationPage() {
  useEffect(() => {
    gsap.from('.request-form-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.request-form-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.1
    });
  });
  useEffect(() => {
    gsap.from('.request-form-image-animation', {
      opacity: 0
    });
    gsap.to('.request-form-image-animation', {
      opacity: 1,
      duration: 2
    });
  });
  return (
    <div className=" lg:flex  lg:flex-row-reverse justify-between lg:items-center lg:w-3/4 w-[90vw] mx-auto mt-[150px] mb-[100px]">
      <img
        src="/assets/dogcat.svg"
        className="w-[50vw] mx-auto lg:mr-5 mb-12 mt-[-50px] lg:mt-0 md:w-[40vw] lg:w-[35vw] xl:w-[25vw] request-form-image-animation"
      ></img>
      <div className="lg:w-[50%] ">
        <h1 className="font-extrabold text-[24px] tracking-tight text-primary request-form-animation">
          Want to help a paw ?
        </h1>
        <h3 className="text-[14px] font-regular text-gray-light mb-10 request-form-animation">
          Sign up to get Started
        </h3>
        <div className="request-form-animation">
          <TextInput label="Name" placeholder={'Example Name'} type="text" />
        </div>

        <div className="request-form-animation">
          <TextInput
            label="Email"
            placeholder={'example@gmail.com'}
            type="email"
          />
        </div>
        <div className="request-form-animation">
          <TextInput
            label="Password"
            placeholder={'123456Easy'}
            type="password"
          />
        </div>
        <div className="request-form-animation">
          <TextInput
            label="Location"
            placeholder={'Dhaka , Bangladesh'}
            type="address"
          />
        </div>
        <div className="request-form-animation">
          <Button text="Register" />
        </div>
        <div className="mt-5 request-form-animation">
          <h3 className="text-gray-light tracking-tight">
            Already have an account ?
            <Link to="/login">
              <span className="font-bold text-brand px-1 cursor-pointer">
                Login
              </span>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
