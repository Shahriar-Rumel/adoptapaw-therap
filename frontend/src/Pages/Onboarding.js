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

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [userInfo]);
  return (
    <div className=" mx-auto  w-[95vw] lg:w-3/4 mt-[150px]  ">
      <div className="cover"></div>
      <div
        className="flex flex-col justify-between xl:flex-row
       relative xl:justify-between ml-[20px]"
      >
        <div className="">
          <h2
            className=" arriving-animation  text-[14px] md:text-[18px]
            leading-[14px]  text-white lg:text-left mb-4 lg:font-light"
          >
            Thousands of paws need shelter everyday
          </h2>
          <h1
            className=" arriving-animation text-[#ffff] 
            text-[14vw] whitespace-nowrap lg:w-full xl:w-3/4 md:text-[108px] 
            uppercase font-black  leading-[14vw] md:leading-[108px]  lg:text-left"
          >
            Be the <span className="outlined">home</span>
          </h1>
          <h1
            className=" text-[#ffff] arriving-animation 
           text-[16vw] md:text-[108px]  whitespace-nowrap lg:w-full xl:w-3/4
           uppercase font-black  
            leading-[14vw] md:leading-[108px] mt-[0px] lg:text-left"
          >
            <span className="outlined">for </span>a paw
          </h1>
          <div
            className="  mx-auto w-[100%] arriving-animation 
            flex items-center mt-[100px] md:mt-24 lg:flex-none 
            lg:justify-start"
          >
            <Link to="/home">
              <Button
                text="Adopt Paws"
                brnad={false}
                width={true}
                widthClass={' w-[120px] lg:w-[200px]'}
                height={true}
                heightClass={'h-[55px]'}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
