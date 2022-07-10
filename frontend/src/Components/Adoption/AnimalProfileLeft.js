import React, { useState } from 'react';
import { adoptionListGallery } from '../../Data/adoption';
export default function AnimalProfileLeft({ poster, data }) {
  const [image, setImage] = useState(adoptionListGallery[0].img);
  return (
    <div className="w-[100%]  mr-10 description-gallery-animation">
      <div
        className="description-image-animation w-[100%] h-[250px] mx-auto md:h-[600px] md:w-[100%] lg:h-[45vh] lg:w-[100%] ease-in-out duration-300"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      {poster !== 2 && (
        <div className="flex items-center justify-around my-5 w-[95%] mx-auto">
          {adoptionListGallery.map((item) => (
            <div
              className="description-image-animation w-[30%] h-[60px] md:h-[100px] cursor-pointer hover:opacity-[0.5]"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              onClick={() => setImage(item.img)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
