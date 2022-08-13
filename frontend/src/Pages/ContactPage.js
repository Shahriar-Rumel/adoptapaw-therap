import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedbackCreateAction } from '../actions/feedbackActions';
import Button from '../Components/Button';
import Topbar from '../Components/Topbar';
import Message from '../Components/Message';
import UploadLoader from '../Components/UploadLoader/UploadLoader';

const Banner = () => {
  return (
    <div className="py-[30px] bg-white  md:shadow-none custom-round px-5 mb-10 md:mb-0 w-[100%]  md:ml-5">
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
            key={item}
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
  const [description, setDescription] = useState();

  const dispatch = useDispatch();

  const feedbackCreateData = useSelector((state) => state.feedbackCreate);
  const { loading, success, error } = feedbackCreateData;

  useEffect(() => {
    gsap.from('.contact-page-animation', {
      y: '+=60',
      autoAlpha: 0,
      stagger: 0.2
    });
    gsap.to('.contact-page-animation', { y: '0', autoAlpha: 1, stagger: 0.2 });
  }, []);
  const dataPort = {
    rating: rating,
    description: description
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating && description) {
      dispatch(feedbackCreateAction(dataPort));
      setDescription('');
      setRating('');
    }
  };
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
          {success && (
            <Message
              message={'Your feedback has sent successfully! Thanks.'}
              variant={'success'}
            />
          )}
          {error && <Message message={error} variant={'danger'} />}
          {loading && (
            <div className="mx-auto flex justify-center">
              <UploadLoader />
            </div>
          )}
          <h2 className="text-[16px] leading-6 contact-page-animation text-primary font-bold tracking-tight">
            How would you rate your experiences so far with our platform?
          </h2>
          <form onSubmit={submitHandler}>
            <div className="contact-page-animation">
              <Rating setRating={setRating} rating={rating} />
            </div>
            <div className="flex flex-col my-3 contact-page-animation">
              <label className="font-bold text-primary text-[14px]">
                Tell us how we can improve
              </label>
              <textarea
                type="text"
                placeholder={'Your Feedback'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-input py-4  custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></textarea>
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
