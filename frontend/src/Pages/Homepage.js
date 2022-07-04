import React from 'react';
import CardList from '../Components/CardList';

export default function Homepage() {
  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] ">
      <h1 className="image-animation font-black tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-green">
        Paws for adoption
      </h1>
      <CardList />
      <h1 className="image-animation font-black tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-red mt-[-100px]">
        Paws Missing
      </h1>
      <CardList />
    </div>
  );
}
