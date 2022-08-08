import React from 'react';

export default function Loader() {
  return (
    <div className="absolute  top-[58px] lg:top-[80px] left-0 right-0 bottom-0 bg-white  z-[999] flex items-center   justify-center">
      <img src="/assets/Loader.svg" className="loader w-[120px]"></img>
    </div>
  );
}
