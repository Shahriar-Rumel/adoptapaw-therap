import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
export default function AnimalProfileLeft({ poster, data }) {
  const [image, setImage] = useState(data ? data.imageone : '');
  useEffect(() => {
    gsap.fromTo(
      '.adoption-details-animation',
      { y: '+=60', autoAlpha: 0, stagger: 0.2 },
      { y: '0', autoAlpha: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <>
      {data && (
        <div className="w-[100%]  mr-10">
          <div className="linear-background custom-round">
            <div
              className="ease-in-out duration-300 flex items-center justify-center  custom-round   w-[100%] h-[350px] mx-auto md:h-[600px] md:w-[100%] lg:h-[45vh] lg:w-[100%] "
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {!data.imageone && <h1 className="text-gray">N / A</h1>}
            </div>
          </div>

          {poster !== 2 && (
            <div className="flex items-center justify-around my-5 w-[95%] mx-auto">
              <div
                className=" flex items-center justify-center adoption-details-animation custom-round w-[30%] h-[60px] md:h-[100px] bg-primary cursor-pointer hover:opacity-[0.5]"
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
                className="flex items-center justify-center adoption-details-animation custom-round w-[30%] h-[60px] md:h-[100px] bg-primary cursor-pointer hover:opacity-[0.5]"
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
                className="flex items-center justify-center adoption-details-animation custom-round w-[30%] h-[60px] md:h-[100px]  bg-primary cursor-pointer hover:opacity-[0.5]"
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
