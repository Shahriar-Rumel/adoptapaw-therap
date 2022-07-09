import React, { useEffect, useRef, useState } from 'react';
import { adoptionList } from '../Data/adoption';

export default function SelectBox({ minHeight, label, choiceList }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [choice, setChoice] = useState(label);

  const dropDownRef = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (e.path[0] !== dropDownRef.current) {
        setShowDropDown(false);
      }
    };

    document.body.addEventListener('click', closeDropDown);

    return () => {
      document.body.removeEventListener('click', closeDropDown);
    };
  }, []);

  return (
    <div className="relative z-12  items-left w-full my-3 lg:my-0  lg:mt-[-20px]">
      <label className="font-bold text-primary text-[14px] mb-[15px]">
        {label}
      </label>
      <div
        className={
          !showDropDown
            ? 'drop-down focus:border-2 flex z-[12] justify-between w-full mx-auto border-0 bg-input custom-round py-4 px-5 cursor-pointer'
            : 'drop-down focus:border-2 flex z-[12] justify-between w-full mx-auto border border-brand custom-round py-4 px-5 cursor-pointer'
        }
        ref={dropDownRef}
        onClick={() => setShowDropDown((prev) => !prev)}
      >
        <h3 className="text-[black] text-[14px]">{choice}</h3>
        <img
          src="/assets/Icons/dropdown.svg"
          className="w-[20px] z-1 absolute right-4 mt-2"
        ></img>
      </div>
      <div
        className={
          showDropDown
            ? `custom-round w-full mx-auto py-4 z-[99] lg:py-0 bg-input mt-[2px] absolute border-brand border-[1px] transition-all ease-in block overflow-y-scroll  ${`h-[minHeight]px`}`
            : 'hidden'
        }
      >
        <div className="mx-auto w-[100%]">
          {choiceList.map((item) => (
            <div
              className="hover:bg-gradient-to-r ml-2 from-brand mx-auto to-primary hover:text-white py-3 px-5 text-[14px] text-[gray] cursor-pointer transition-all ease-in"
              onClick={() => {
                setShowDropDown(false);
                setChoice(item);
              }}
            >
              <span className="font-regular ">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
