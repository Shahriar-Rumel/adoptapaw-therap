import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { navItems, navItemsLeft } from '../../Data/nav';

export default function MobileMenu({
  theme,
  burger,
  setBurgerClicked,
  userInfo
}) {
  useEffect(() => {
    gsap.from('.mobile-menu-animation', {
      y: '+=20',
      opacity: 0
    });
    gsap.to('.mobile-menu-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, []);
  useEffect(() => {
    gsap.from('.mobile-menu-bg', {
      width: '0',
      opacity: 1
    });
    gsap.to('.mobile-menu-bg', {
      width: '85%',
      opacity: 1,
      duration: 0.5,
      stagger: 0.1
    });
  }, [burger]);

  return (
    <div
      className={`mobile-menu-bg lg:hidden  ${
        burger ? `flex flex-col` : 'hidden'
      } bg-brand fixed top-0 right-0 bottom-0 linear menu-blur-2  z-50 overflow-hidden `}
    >
      <div className="flex   md:w-[600px]  flex-col  mt-24">
        {navItems.map((item) => (
          <Link to={item.link} key={item.link}>
            <div
              onClick={() => setBurgerClicked((prev) => !prev)}
              className="flex justify-end mobile-menu-animation opacity-0 mx-2 cursor-pointer my-5  rounded-full py-2 "
            >
              <img
                src={item.imgprimary}
                className="w-[25px] absolute mr-[130px]"
              ></img>
              <div className="w-[120px] flex">
                <h1 className="px-2  text-primary mr-10 font-semibold text-[14px] text-right">
                  {item.title}
                </h1>
              </div>
              <div className="h-[1px] w-[80%] bg-primary absolute mt-12 mr-5"></div>
            </div>
          </Link>
        ))}
      </div>

      {!userInfo && (
        <div className="flex flex-col">
          {navItemsLeft.map((item) => (
            <Link to={item.link} key={item.link}>
              <div
                className="flex  mobile-menu-animation opacity-0 relative  items-center justify-end mx-2 cursor-pointer my-5 py-2  "
                onClick={() => setBurgerClicked((prev) => !prev)}
              >
                <img
                  src={item.imgprimary}
                  className="w-[25px] absolute mr-[130px]"
                ></img>
                <div className="w-[120px] flex">
                  <h1 className="px-2 text-primary mr-10 font-semibold text-[14px]">
                    {item.title}
                  </h1>
                </div>
                <div className="h-[1px] w-[80%] bg-primary absolute mt-20 mr-5"></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
