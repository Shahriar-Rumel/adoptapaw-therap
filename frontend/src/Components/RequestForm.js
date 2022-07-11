import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import SelectBox from './IO/SelectBox';
import TextInput from './IO/TextInput';

export default function RequestForm() {
  const [data, setData] = useState('Yes');
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
  var choiceArray = ['Yes', 'No'];

  return (
    <>
      <TextInput
        label={'Tell us why you want to adopt'}
        placeholder={'Placeholder'}
        type={'text'}
      />

      <SelectBox
        minHeight={200}
        label={' Did you had any pets before ?'}
        choiceList={choiceArray}
        data={data}
        setData={setData}
      />

      <SelectBox
        minHeight={200}
        label={'Will you be able to pick up by yourself ?'}
        choiceList={choiceArray}
        data={data}
        setData={setData}
      />

      <TextInput
        label={'Your mobile number'}
        placeholder={'0170000000'}
        type={'Number'}
      />
      <TextInput
        label={'Your email'}
        placeholder={'example@gmail.com'}
        type={'email'}
      />
    </>
  );
}
