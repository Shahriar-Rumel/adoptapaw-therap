import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const [theme, setTheme] = useState(true);

  const arr = useLocation();

  useEffect(() => {
    if (arr.pathname === '/') {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }, [arr]);
  return (
    <div
      className={`bg-[#2F0F02] ${
        theme ? `h-[300px]` : `h-0`
      } flex items-center  left-0 right-0 bottom-0 mt-[200px]`}
    >
      <div
        className={` ${
          theme ? `flex` : `hidden`
        } md:w-[80vw] w-[85vw]  mx-auto  flex-col lg:flex-row items-center justify-between`}
      >
        <img src="/assets/logo.svg" className="w-[200px]"></img>
        <div className="flex flex-col items-center">
          <h1 className="text-white mt-[100px] lg:mt-0 mb-5 text-[14px] text-gray-light">
            Follow us on
          </h1>
          <div className="flex justify-between  items-center w-[200px]">
            <img src="/assets/Icons/insta.svg" className="w-[30px]"></img>
            <img src="/assets/Icons/fb.svg" className="w-[30px]"></img>
            <img src="/assets/Icons/twitter.svg" className="w-[30px]"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
