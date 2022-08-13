import React from 'react';

export default function AttributeCard({ Attribute, feature }) {
  return (
    <div className=" missing-animation Attribute-card-shadow flex items-center my-5 relative overflow-hidden custom-round">
      <img
        src="/assets/card-color.svg"
        className="absolute z-[-2] mx-[-10px] mt-[-40px] -rotate-45 w-[40px] h-[40px] "
      ></img>
      <div className="flex py-6 justify-between items-center  px-4 w-[100%]">
        <h4 className="text-[12px] font-bold text-gray-light">{Attribute}</h4>
        <h2 className="text-primary font-bold text-[16px] mr-[10px] tracking-tight">
          {feature}
        </h2>
      </div>
    </div>
  );
}
