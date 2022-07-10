import React from 'react';

export default function RewardCard() {
  return (
    <div className="missing-animation Attribute-card-shadow h-[75px] flex items-center justify-between px-4 mb-4 custom-round">
      <img src="/assets/giftbox.svg" className="h-[95px] mt-[10px]"></img>
      <div className="flex items-center flex-col text-[12px] font-bold text-gray-light h-[60px]">
        <h3>Rewards for finding Tommy</h3>
        <div className="relative mt-1">
          <h2 className="font-extrabold text-[20px] tracking-tighter text-primary">
            10,000
          </h2>
          <h3 className="abssolute mt-[-30px] ml-[55px] text-primary">ট</h3>
        </div>
      </div>
    </div>
  );
}
