import React from 'react';

export default function ProfileBurger({ data, setData }) {
  return (
    <div className="burger w-[25px] cursor-pointer right-5">
      <div
        className={
          data
            ? `h-[2px] bg-[#451E06] mt-[5px] -rotate-45 ease-in duration-300 `
            : `h-[2px]  bg-[#451E06] mt-[3px]`
        }
      ></div>
      <div className={!data ? `h-[2px] bg-[#451E06] mt-[3px] ` : 'none'}></div>
      <div
        className={
          data
            ? `h-[2px] 
               bg-[#451E06]
               mt-[-1px] rotate-45 ease-in duration-300 `
            : `h-[2px] bg-[#451E06] mt-[3px]`
        }
      ></div>
    </div>
  );
}
