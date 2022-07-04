import React, { useState } from 'react';
import { adoptionList } from '../Data/adoption';

export default function SelectBox({ minHeight }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [choice, setChoice] = useState('Yes');
  const choiceList = ['Yes', 'No'];

  return (
    <div className="relative z-12 flex flex-col items-center w-full my-3">
      <div
        className={
          !showDropDown
            ? 'drop-down focus:border-2 flex justify-between w-full mx-auto border-0 bg-input custom-round py-4 px-5 cursor-pointer'
            : 'drop-down focus:border-2 flex justify-between w-full mx-auto border border-brand custom-round py-4 px-5 cursor-pointer'
        }
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
            ? `custom-round w-full mx-auto py-4 absolute bg-input mt-[50px] transition-all ease-in block overflow-y-scroll  ${`h-[minHeight]px`}`
            : 'hidden'
        }
      >
        <div>
          {choiceList.map((item) => (
            <div
              className="hover:bg-gradient-to-r from-brand to-primary hover:text-white py-3 px-5 text-[14px] text-[gray] cursor-pointer transition-all ease-in"
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
