import React from 'react';

export default function Burger({ setBurgerClicked, burger, theme }) {
  return (
    <div
      className="burger w-[25px] cursor-pointer absolute right-5 lg:hidden"
      onClick={() => setBurgerClicked((prev) => !prev)}
    >
      <div
        className={
          burger
            ? `h-[2px] 
                ${
                  theme < 1 ? 'bg-[#ffffff]' : 'bg-[#451E06]'
                } mt-[5px] -rotate-45 ease-in duration-300 `
            : `h-[2px] ${theme < 1 ? 'bg-[#ffffff]' : 'bg-[#451E06]'} mt-[3px]`
        }
      ></div>
      <div
        className={
          !burger
            ? `h-[2px] ${theme < 1 ? 'bg-[#ffffff]' : 'bg-[#451E06]'} mt-[3px] `
            : 'none'
        }
      ></div>
      <div
        className={
          burger
            ? `h-[2px] ${
                theme < 1 ? 'bg-[#ffffff]' : 'bg-[#451E06]'
              } mt-[-1px] rotate-45 ease-in duration-300 `
            : `h-[2px] ${theme < 1 ? 'bg-[#ffffff]' : 'bg-[#451E06]'} mt-[3px]`
        }
      ></div>
    </div>
  );
}
