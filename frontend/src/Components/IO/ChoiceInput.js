import React from 'react';

export default function ChoiceInput({ label, setData, optionList }) {
  return (
    <div className="flex flex-col my-3 request-form-animation">
      <label className="font-bold text-primary text-[14px]">{label}</label>
      <select
        className="bg-input py-4 custom-round px-4  my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
        onChange={(e) => setData(e.target.value)}
        required
      >
        {optionList.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
