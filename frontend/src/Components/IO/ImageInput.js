import React, { useState } from 'react';

export default function ImageInput() {
  const [image, setImage] = useState('Upload Image');
  return (
    <div className="">
      <label
        htmlFor="filePicker"
        style={{
          backgroundImage: `url("/assets/Icons/ImagePlaceholder.svg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className=" text-[12px]  cursor-pointer font-bold text-gray-light py-[50px] px-[25px]  custom-round"
      >
        {image}
      </label>
      <input
        id="filePicker"
        style={{ visibility: 'hidden' }}
        type={'file'}
      ></input>
    </div>
  );
}
