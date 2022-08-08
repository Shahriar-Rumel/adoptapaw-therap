import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
export default function AdoptionPostCard({ data, columnSize, columnSizeXl }) {
  return (
    <div
      className={`grid mb-[30px]   grid-cols-1 md:grid-cols-2 ${columnSize} ${columnSizeXl} gap-3 mx-auto `}
    >
      {data.map((item) => (
        <div
          className="user-profile-adoption-posts-animation user-profile-animation donation-list-animation bg-card-light py-3  custom-round flex justify-between px-3  cursor-pointer w-full"
          key={item.id}
        >
          <div className="w-[70%] flex flex-col justify-between ">
            <div className="flex justify-between items-center ">
              <h1 className="text-primary font-extrabold text-[14px] md:text-[16px] md:leading-[18px] leading-[16px] tracking-tighter mr-3">
                {item.name}
              </h1>
              <div className="flex items-center">
                <img src="/assets/Icons/location.svg"></img>{' '}
                <h3 className="text-gray-light px-3 text-[14px]">
                  {item.location}
                </h3>
              </div>
            </div>
            <Link to={`/user/adoption/${item.id}`}>
              <Button
                text="View"
                brand={true}
                height={true}
                heightClass="h-[40px] md:h-[40px] "
                width={true}
                widthClass="w-[80px] md:w-[70px] lg:w-[100px]"
                textSize={true}
                textSizeClass="text-[12px] md:text-[14px]"
              />
            </Link>
          </div>
          <div
            className="w-[110px] min-h-[100px] bg-primary h-[100%]  ml-2 custom-round"
            style={{
              backgroundImage: `url(${item.imageone})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
            key={item.id}
          ></div>
        </div>
      ))}
    </div>
  );
}
