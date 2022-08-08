import React, { useEffect, useRef, useState } from 'react';

export default function FilterBox({
  minHeight,
  label,
  choiceList,
  data,
  setData,
  filterHandler
}) {
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
  }, [document]);
  return (
    <div className="relative z-12 flex flex-col  items-left w-[120px] my-3 ">
      <label className="font-bold text-primary text-[14px] ">{label}</label>
      <div
        className={`drop-down focus:border-2 flex z-[12] justify-between w-full mx-auto ${
          !showDropDown ? 'border-0' : 'border border-brand'
        } bg-input custom-round h-[33px] px-2 my-3 cursor-pointer items-center`}
        ref={dropDownRef}
        onClick={() => setShowDropDown((prev) => !prev)}
      >
        <h3 className="text-[black] text-[14px] capitalize">{data}</h3>
        <img
          src="/assets/Icons/dropdown.svg"
          className="w-[14px] z-1 absolute right-2 "
        ></img>
      </div>

      <div
        className={
          showDropDown
            ? `custom-round w-full mx-auto py-4 z-[99] lg:py-4 bg-white mt-[50px] absolute shadow-xl transition-all ease-in block overflow-y-scroll  ${`h-[minHeight]px`}`
            : 'hidden'
        }
      >
        <div className="mx-auto w-[100%]">
          {choiceList.map((item) => (
            <div
              className="hover:bg-gradient-to-r ml-2  from-brand mx-auto to-primary hover:text-white py-3 px-5 text-[14px] text-[gray] cursor-pointer transition-all ease-in"
              onClick={() => {
                setShowDropDown(false);
                setData(item.value);
                filterHandler(item.property, item.value);
              }}
              key={item.value}
            >
              <span className="font-regular capitalize ">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
