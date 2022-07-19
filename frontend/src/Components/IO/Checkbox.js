import React from 'react';

export default function Checkbox({
  type,
  label,
  setData,
  placeholder,
  width,
  data
}) {
  return (
    <div
      className={`flex flex-row-reverse  justify-between  items-center my-3 request-form-animation  ${width}`}
    >
      <label className="font-bold text-primary text-[14px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onClick={() => {
          setData((prev) => !prev);
        }}
        checked={data}
        className="bg-input py-4 custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
      ></input>
    </div>
  );
}
