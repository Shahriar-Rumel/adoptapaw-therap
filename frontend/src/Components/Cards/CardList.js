import React, { useEffect } from 'react';
import { adoptionList } from '../../Data/adoption';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function CardList({ link, buttonText, list }) {
  useEffect(() => {
    gsap.from('.image-animation', { y: '+=120', opacity: 0, stagger: 0.2 });
    gsap.to('.image-animation', { y: '0', opacity: 1, stagger: 0.2 });
  });
  return (
    <div className="my-5 mt-[20px] grid mb-[200px]   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
      {list.map((item) => (
        <Link to={`/adoption/${item.id}`}>
          <div className="image-animation card-item flex  relative justify-center overflow-hidden mx-2 w-[100%] text-offwhite h-[300px] md:w-[100%] ">
            <div
              className=" card-image w-[100%] h-[300px] md:w-[100%] cursor-pointer hover:scale-[1.3] ease-in-out duration-300"
              style={{
                backgroundImage: `url(${item.imageone})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>

            <div className="overlay w-[100%] h-[100%] px-5  absolute mx-auto flex flex-col justify-center bg-[#000000] bg-opacity-[0.6]">
              <div className="flex justify-between items-center relative mt-[120px] ">
                <h2 className="capitalize text-[20px] font-semibold tracking-tight ease-in-out duration-300 ">
                  {item.name}
                </h2>
                <img src="/assets/fav.svg" className="w-[25px]"></img>
              </div>

              <Link to={`/adoption/${item.id}`}>
                <div className="relative mt-[20px]  mx-auto">
                  <button className="bg-brand primary-button  w-[120px] h-[45px] text-[12px] text-offwhite px-20 py-3 ">
                    <span>{buttonText ? buttonText : 'Adopt me'}</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
