import React from 'react';

export default function RewardCard({ reward, name }) {
  return (
    <div className="missing-animation Attribute-card-shadow h-[75px] flex items-center justify-between px-4 mb-4 custom-round">
      <img src="/assets/giftbox.svg" className="h-[95px] mt-[10px]"></img>
      <div className="flex items-center flex-col text-[12px] font-bold text-gray-light h-[60px]">
        <h3>Rewards for finding {name}</h3>
        <div className="relative mt-1 flex items-center justify-center">
          <h2 className="font-extrabold text-[20px] tracking-tighter text-primary">
            {reward}
          </h2>
          <h3 className="abssolute mt-[-8px] ml-[2px] text-primary font-extrabold">
            BDT
          </h3>
        </div>
      </div>
    </div>
  );
}
