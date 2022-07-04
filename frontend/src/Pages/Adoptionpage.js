import React from 'react';
import AdoptionHeader from '../Components/AdoptionHeader';
import Button from '../Components/Button';
import CardList from '../Components/CardList';
import Searchbox from '../Components/Searchbox';

export default function Adoptionpage() {
  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[100px] ">
      <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center">
        <AdoptionHeader />
        <Button
          text="Create Post"
          height={true}
          heightClass="h-[50px]"
          width={true}
          widthClass="w-[120px]"
        />
      </div>

      <h1 className="font-extrabold  mt-10 mb-5 tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-brand">
        Paws for adoption
      </h1>

      <CardList />
    </div>
  );
}
