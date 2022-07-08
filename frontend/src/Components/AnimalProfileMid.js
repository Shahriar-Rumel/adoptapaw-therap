import { dblClick } from '@testing-library/user-event/dist/click';
import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Features from './Features';

export default function AnimalProfileMid({ poster, data }) {
  return (
    <div className="mt-[40px] lg:mt-[60px] description-gallery-animation">
      <div className=" flex items-center justify-between my-3 ">
        <div className="inline-flex">
          <img src="/assets/tick.svg"></img>
          <h3 className="text-[12px] text-green mx-2">
            Available for adoption
          </h3>
        </div>

        <img src="/assets/fav.svg" className="w-[20px]"></img>
      </div>
      <h1 className="text-[32px] font-black mb-5 text-primary tracking-tighter">
        {data.name}
      </h1>
      {poster !== 2 && (
        <>
          <div className="flex items-center justify-between text-[12px] mb-5">
            <h3 className="gray-dark">
              Posted by
              <span className="text-primary font-bold">
                {/* {data.user.username ? data.user.username : 'Dummy'} */}
              </span>
            </h3>
            <h3 className="gray-dark">19 June 2022</h3>
          </div>
          <Link to={`/adoption/${data.id}/request`}>
            <Button text={`Adopt ${data.name}`} />
          </Link>
        </>
      )}
    </div>
  );
}
