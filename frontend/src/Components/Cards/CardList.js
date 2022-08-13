import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function CardList({ link, buttonText, list }) {
  useEffect(() => {
    gsap.from('.adoption-card-image-animation', {
      y: '+=60',
      opacity: 0,
      stagger: 0.2
    });
    gsap.to('.adoption-card-image-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, []);
  return (
    <div className="my-5 mt-[20px]  mb-[100px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4  mx-auto">
      {list.map((item) => (
        <Link to={`/adoption/${item.id}`} key={item.id}>
          <div className="adoption-card-image-animation card-item flex custom-round  relative justify-center overflow-hidden w-[100%] text-offwhite h-[300px] md:w-[100%] ">
            <div className=" card-image w-[100%] h-[300px] md:w-[100%] cursor-pointer">
              <div className="linear-background">
                <div
                  className="card-image w-[100%] h-[300px] md:w-[100%] cursor-pointer"
                  style={{
                    backgroundImage: `url(${item.imageone})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
              </div>
            </div>

            <div className="overlay w-[100%] h-[100%] px-5  absolute mx-auto flex flex-col justify-center bg-[#000000] bg-opacity-[0.6]">
              <div className="flex justify-between items-center relative mt-[120px] ">
                <h2 className="capitalize text-[20px] font-semibold tracking-tight ease-in-out duration-300 ">
                  {item.name}
                </h2>

                <div className="inline-flex">
                  <img src="/assets/tick.svg"></img>
                  <h3
                    className={`text-[12px] ${
                      item.availability ? `text-green` : `text-gray-light`
                    } mx-2`}
                  >
                    {item.availability
                      ? 'Available for adoption'
                      : 'Unavailable for adoption'}
                  </h3>
                </div>
              </div>

              <div className="relative mt-[20px]">
                <button className="bg-brand primary-button  w-[120px] h-[45px] text-[12px] text-offwhite px-20 py-3 ">
                  <span>{buttonText ? buttonText : 'Adopt me'}</span>
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
