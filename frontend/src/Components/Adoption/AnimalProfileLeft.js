import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { adoptionListGallery } from '../../Data/adoption';
export default function AnimalProfileLeft({ poster, data }) {
  const [image, setImage] = useState(data ? data.imageone : '');
  useEffect(() => {
    gsap.from('.description-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.description-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, []);
  useEffect(() => {
    gsap.from('.description-image-animation', {
      opacity: 0
    });
    gsap.to('.description-image-animation', {
      opacity: 1,
      stagger: 0.2
    });
  }, []);
  return (
    <>
      {data && (
        <div className="w-[100%]  mr-10 description-gallery-animation">
          <div
            className=" flex items-center justify-center  custom-round bg-offwhite description-image-animation w-[100%] h-[250px] mx-auto md:h-[600px] md:w-[100%] lg:h-[45vh] lg:w-[100%] ease-in-out duration-300"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {!data.imageone && <h1 className="text-gray">N / A</h1>}
          </div>
          {poster !== 2 && (
            <div className="flex items-center justify-around my-5 w-[95%] mx-auto">
              <div
                className="flex items-center justify-center description-image-animation custom-round w-[30%] h-[60px] md:h-[100px] bg-offwhite cursor-pointer hover:opacity-[0.5]"
                style={{
                  backgroundImage: `url(${data.imageone})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                onClick={() => setImage(data.imageone)}
              >
                {!data.imageone && <h1 className="text-gray">N / A</h1>}
              </div>
              <div
                className="flex items-center justify-center description-image-animation custom-round w-[30%] h-[60px] md:h-[100px] bg-offwhite cursor-pointer hover:opacity-[0.5]"
                style={{
                  backgroundImage: `url(${data.imagetwo})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                onClick={() => setImage(data.imagetwo)}
              >
                {!data.imagetwo && <h1 className="text-gray">N / A</h1>}
              </div>
              <div
                className="flex items-center justify-center description-image-animation custom-round w-[30%] h-[60px] md:h-[100px]  bg-offwhite cursor-pointer hover:opacity-[0.5]"
                style={{
                  backgroundImage: `url(${data.imagethree})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                onClick={() => setImage(data.imagethree)}
              >
                {!data.imagethree && <h1 className="text-gray">N / A</h1>}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
