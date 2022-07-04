import gsap from 'gsap';
import React, { useEffect } from 'react';
import SelectBox from './SelectBox';
import TextInput from './TextInput';

export default function RequestForm() {
  useEffect(() => {
    gsap.from('.request-form-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.request-form-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  });
  return (
    <form className="">
      <TextInput
        label={'Tell us why you want to adopt'}
        placeholder={'Placeholder'}
        type={'text'}
      />
      <div className="flex flex-col my-5 request-form-animation ">
        <label className="font-bold text-primary text-[14px]">
          Did you had any pets before ?
        </label>
        <SelectBox minHeight={200} />
      </div>
      <div className="flex flex-col my-5 request-form-animation">
        <label className="font-bold text-primary text-[14px]">
          Will you be able to pick up by yourself ?
        </label>
        <SelectBox minHeight={200} />
      </div>
      <TextInput
        label={'Your mobile number'}
        placeholder={'0170000000'}
        type={'Number'}
      />{' '}
      <TextInput
        label={'Your email'}
        placeholder={'example@gmail.com'}
        type={'email'}
      />
    </form>
  );
}
