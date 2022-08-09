import React from 'react';

export default function Searchbox({
  searchName,
  setSearchName,
  handleSearch,
  showSearchBox
}) {
  return (
    <div className="mb-5 flex  flex-col items-center justify-center ">
      <div className="custom-round overflow-hidden flex  w-[90vw] lg:w-[600px] border-[1px] border-input hover:shadow-lg focus:shadow-lg ">
        <input
          className="bg-input border-[1px] focus:outline-none  border-input  h-[45px] px-4 text-[14px] w-[100%]"
          placeholder="Search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        ></input>
        <button
          className="bg-primary px-2 h-[45px] w-[45px] flex items-center justify-center "
          onClick={handleSearch}
        >
          <img src="/assets/Icons/search.svg" className="w-[20px]" />
        </button>
      </div>
      {searchName && showSearchBox && (
        <div className="mt-8">
          <h2 className="text-[16px] text-gray-light">
            Showing Result for :{' '}
            <span className="text-brand font-bold">{searchName}</span>
          </h2>
        </div>
      )}
    </div>
  );
}
