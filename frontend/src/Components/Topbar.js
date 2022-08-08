import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar({ address, link }) {
  const addressArray = address.split('/');
  return (
    <div className="bg-primary fixed shadow-md left-0 right-0 top-[58px] lg:top-[80px] py-3 z-[800] flex items-center">
      <div className="lg:w-3/4 w-[90vw] mx-auto flex justify-between items-center">
        <div className="flex">
          {addressArray.map((item, index) => (
            <h2 className="text-white text-[14px]" key={index}>
              {item}
              {index < addressArray.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </h2>
          ))}
        </div>

        <Link to={link}>
          <button className="flex">
            <img
              src="/assets/Icons/back.svg"
              alt="Back Button"
              className="max-w-[20px]"
            ></img>
          </button>
        </Link>
      </div>
    </div>
  );
}
