import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navItems, navItemsLeft } from '../Data/nav';

export default function NeoNav({ setBurgerClicked }) {
  useEffect(() => {
    gsap.from('.mobile-menu-bg', {
      width: '0',
      //   x: '+=130',
      opacity: 1,
      stagger: 0.1
    });
    gsap.to('.mobile-menu-bg', {
      width: '100%',
      //   x: '+=130',
      opacity: 1,
      stagger: 0.1
    });
  });
  return (
    <div className="mobile-menu-bg flex flex-col  fixed top-0 right-0 bottom-0 ease-in-out  menu-blur-2  z-50 ">
      {/* <div className="flex  justify-left md:w-[600px] flex-col -ml-[100px] mt-24">
        {navItems.map((item) => (
          <Link to={item.link}>
            <div
              onClick={() => setBurgerClicked((prev) => !prev)}
              className="flex mobile-menu-animation opacity-0  items-center justify-left mx-2 cursor-pointer my-5  rounded-full py-2 "
            >
              <img src={item.imgprimary} className="w-[25px] absolute"></img>
              <h1 className="px-2 text-primary ml-12 font-semibold text-[14px]">
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </div> */}
      {/* <div className="flex flex-col -ml-[100px] justify-between ">
        {navItemsLeft.map((item) => (
          <div
            className="flex  mobile-menu-animation opacity-0 items-center justify-left mx-2 cursor-pointer my-5 py-2"
            onClick={() => setBurgerClicked((prev) => !prev)}
          >
            <img src={item.imgprimary} className="w-[25px] absolute"></img>
            <h1 className="px-2 text-primary ml-12 font-semibold text-[14px]">
              {item.title}
            </h1>
          </div>
        ))}
      </div> */}
    </div>
  );
}
