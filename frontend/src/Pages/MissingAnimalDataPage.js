import React from 'react';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';

export default function MissingAnimalDataPage() {
  return (
    <div className="lg:flex lg:justify-between lg:flex-row-reverse mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
      <img
        src="/assets/DogBox.svg"
        className="mx-auto lg:w-[400px] lg:pl-6"
      ></img>
      <div className="lg:w-[50%]">
        <h1 className="font-extrabold text-[24px] lg:text-[32px] text-primary tracking-tight my-5 text-center lg:text-left w-[95%] lg:w-[100%] leading-6 lg:leading-8 ">
          Did you find Tommy ? Please fill in the form to let us know
        </h1>
        <TextInput
          label={'Location of doggy'}
          placeholder={'Dhanmondi , Dhaka'}
        />
        <TextInput
          label={'Please upload an image of doggy'}
          placeholder={'Dhanmondi , Dhaka'}
        />
        <TextInput
          label={'Your Mobile Number / Email'}
          placeholder={'demo@gmail.com'}
        />
        <Button text="Send"></Button>
      </div>
    </div>
  );
}
