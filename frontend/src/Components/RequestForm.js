import React from 'react';
import Checkbox from './IO/Checkbox';
import SelectBox from './IO/SelectBox';
import TextInput from './IO/TextInput';

export default function RequestForm({ setObjects }) {
  var choiceArray = ['Yes', 'No'];

  const {
    rfa,
    hadpet,
    pickup,
    mobile,
    email,
    setRfa,
    setHadpet,
    setPickup,
    setMobile,
    setEmail
  } = setObjects;

  return (
    <>
      <div className="w-[100%] ">
        <label className="font-bold text-primary text-[14px]">
          Tell us why you want to adopt
        </label>
        <textarea
          value={rfa}
          onChange={(e) => setRfa(e.target.value)}
          required
          className="bg-input w-[100%] py-4 custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
        />
      </div>

      <TextInput
        label={'Your mobile number'}
        placeholder={'0170000000'}
        type={'Number'}
        setData={setMobile}
      />
      <TextInput
        label={'Your email'}
        placeholder={'example@gmail.com'}
        type={'email'}
        setData={setEmail}
      />
      <div className="flex justify-between items-center">
        <Checkbox
          label={'Had Pets Before'}
          type={'checkbox'}
          width={'w-[120px]'}
          setData={setHadpet}
        />
        <Checkbox
          label={'Can pick up'}
          type={'checkbox'}
          width={'w-[90px]'}
          setData={setPickup}
        />
      </div>
    </>
  );
}
