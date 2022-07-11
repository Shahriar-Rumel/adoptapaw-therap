import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Button from '../Components/Button';
import { useDispatch, useSelector } from 'react-redux';

export default function Onboarding() {
  useEffect(() => {
    gsap.from('.arriving-animation', { y: '+=200', opacity: 0, stagger: 0.2 });
    gsap.to('.arriving-animation', { y: '0', opacity: 1, stagger: 0.2 });
  }, []);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  // const redirect = location ? location.split('=')[1] : '/';

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      // history.push(redirect);
      navigate('/home');
    }
  }, [userInfo]);
  return (
    <div className=" mx-auto  w-[95vw] lg:w-3/4 mt-[50px] md:mt-[80px]   ">
      <div className="cover"></div>
      <div className="flex flex-col justify-between xl:flex-row relative xl:justify-between mt-10 lg:mt-6 xl:mt-32 onboarding">
        <div className="mt-6 ">
          <h2 className="mt-[50px] md:mt-[30px] uppercase arriving-animation   text-[12px] md:text-[14px] font-regular leading-[14px]  text-center text-offwhite lg:text-left">
            Thousands of paws need shelter everyday
            {/* <span className="text-brand font-medium"> be the change</span> */}
          </h2>
          <h1 className="-mt-1 -md:mt-8 arriving-animation text-[#ffff]  text-[50px] whitespace-nowrap lg:w-full xl:w-3/4 md:text-[108px] md:leading-[108px] lg:text-[128px] lg:leading-[128px] xl:text-[142px] xl:leading-[142px] uppercase font-black  leading-[50px]  text-center lg:text-left">
            Be the <span className="outlined">home</span>
          </h1>
          <h1 className=" text-[#ffff] arriving-animation   text-[50px] whitespace-nowrap lg:w-full xl:w-3/4 md:text-[108px] md:leading-[108px] lg:text-[128px] lg:leading-[128px] xl:text-[142px] xl:leading-[142px] uppercase font-black  leading-[50px] mt-[0px] text-center lg:text-left">
            <span className="outlined">for </span>a paw
          </h1>
          <div className="  mx-auto w-[100%] arriving-animation   flex items-center justify-center mt-[50px] md:mt-24 lg:flex-none lg:justify-start">
            <Link to="/home">
              <Button
                text="Adopt Paws"
                brnad={false}
                width={true}
                widthClass={'w-[200px]'}
                height={true}
                heightClass={'h-[55px]'}
              />
            </Link>
          </div>
        </div>
        <img
          src="/assets/CoverIllustration.svg"
          className="dogday-mobile w-[95vw] md:w-[30vw] mt-[80px] mx-auto arriving-animation"
        ></img>
        <img
          src="/assets/dogdayafternoon-desktop.svg"
          className="dogday-pc w-[95vw] lg:w-[40vw] xl:w-[40vw]  2xl:w-[35vw] xl:mt-[180px] mx-auto xl:absolute xl:ml-[50%] mt5 arriving-animation "
        ></img>
      </div>
    </div>
  );
}
