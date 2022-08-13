import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function MissingCardList({ list, buttonText }) {
  useEffect(() => {
    gsap.from('.missing-card-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.missing-card-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, []);
  return (
    <div className="my-5 mt-[20px] grid mb-[100px]   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto">
      {list.map((item) => (
        <Link
          to={`/missing/${item.id}`}
          className="missing-card-animation"
          key={item.id}
        >
          <div className="card-item flex  custom-round relative justify-center overflow-hidden  w-[100%] text-offwhite h-[300px] md:w-[100%] ">
            <div className="card-image w-[100%] h-[300px] md:w-[100%] cursor-pointer hover:scale-[1.3] ease-in-out duration-300">
              <div className="linear-background">
                <div
                  className="card-image w-[100%] h-[300px] md:w-[100%] cursor-pointer hover:scale-[1.3] ease-in-out duration-300"
                  style={{
                    backgroundImage: `url(${item.image})`,
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
                  <img
                    src="/assets/secondary/missing.svg"
                    className="w-[16px]"
                  ></img>
                  <h3
                    className={`text-[12px] ${
                      item.stillmissing ? `text-white` : `text-green`
                    } mx-2`}
                  >
                    {item.stillmissing ? 'Still missing' : 'Found'}
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
