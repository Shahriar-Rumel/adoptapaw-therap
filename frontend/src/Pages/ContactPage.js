import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import TextInput from '../Components/IO/TextInput';
import Topbar from '../Components/Topbar';

const Banner = () => {
  return (
    <div className="py-[30px] bg-white  md:shadow-none custom-round px-5 mb-10 md:mb-0 w-[100%]  md:ml-5">
      <h1 className=" text-center text-[16px]  tracking-tight  bg-opacity-30  text-primary  w-[100%] leading-5 contact-page-animation">
        We would love to hear from you
      </h1>
      <img
        src="/assets/icons/feedback.svg"
        className="w-[90%] mt-5 contact-page-animation"
      ></img>
    </div>
  );
};
const Rating = ({ rating, setRating }) => {
  let numberArray = new Array();

  for (let i = 0; i < 10; i++) {
    numberArray[i] = i + 1;
  }
  return (
    <div className="my-5">
      <div className="flex justify-between mt-5 ">
        {numberArray.map((item) => (
          <div
            className={`${
              rating === item ? `bg-brand` : `bg-primary-light`
            } w-[30px] h-[30px] rounded-[100%]  flex items-center justify-center cursor-pointer contact-page-animation`}
            onClick={() => setRating(item)}
          >
            <h2
              className={`${
                rating === item ? `text-white` : `text-gray-light`
              } font-bold text-[14px] mt-[-1px]`}
            >
              {item}
            </h2>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 contact-page-animation">
        <h2 className="font-medium  text-[14px] text-gray-light">Poor</h2>
        <h2 className="font-medium text-[14px] text-gray-light">Excellent</h2>
      </div>
    </div>
  );
};
export default function ContactPage() {
  const [rating, setRating] = useState();
  useEffect(() => {
    gsap.fromTo(
      '.contact-page-animation',
      { y: '+=60', autoAlpha: 0, stagger: 0.2 },
      { y: '0', autoAlpha: 1, stagger: 0.2 }
    );
  }, []);
  return (
    <div className=" mx-auto lg:w-3/4 w-[90vw] md:flex flex-row-reverse md:shadow-md  custom-round md:px-[30px] md:py-10 justify-between mt-[120px] lg:mt-[150px] mb-[100px]">
      <Topbar address={'Home/Feedback'} link={'/home'} />
      <div className="md:w-[48%] flex items-center justify-center ">
        <Banner />
      </div>

      <div className="md:w-[48%] flex items-center justify-center">
        <div className="w-[100%]">
          <h1 className="text-[30px] lg:text-[34px] contact-page-animation leading-8 text-primary font-black tracking-tight mb-8 lg:mb-12 mt-10 md:mt-0">
            Leave us your valuable feedback
          </h1>
          <h2 className="text-[16px] leading-6 contact-page-animation text-primary font-bold tracking-tight">
            How would you rate your experiences so far with our platform?
          </h2>
          <div className="contact-page-animation">
            <Rating setRating={setRating} rating={rating} />
          </div>

          <form>
            <div className="contact-page-animation">
              <TextInput
                label={'Tell us how we can improve'}
                placeholder={'Your Feedback'}
              />
            </div>
            <div className="contact-page-animation">
              <Button text={'Send Feedback'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
