import React from 'react';

export default function Pagination({
  data,
  setPageNo,
  setSearchName,
  setType,
  setAvailability,
  setPostList
}) {
  let numberArray = new Array();

  for (let i = 0; i < data.totalPages; i++) {
    numberArray[i] = i + 1;
  }
  return (
    <div className="my-5  py-2 px-4 flex justify-center">
      <div className="flex">
        {numberArray.map((item, index) => (
          <div
            className={` ${
              data.pageNo === item - 1
                ? `bg-brand text-white shadow-lg`
                : `text-gray-light shadow-md`
            } custom-round cursor-pointer w-[40px] h-[40px] ml-2 flex items-center justify-center`}
            onClick={() => {
              setPageNo(item - 1);
              setSearchName('');
              setType('');
              setAvailability('');
              setPostList('');
            }}
            key={index}
          >
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
