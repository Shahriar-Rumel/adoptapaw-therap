import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donationList } from '../../Data/donation';
import Button from '../Button';
export default function DonationListCard() {
  useEffect(() => {
    gsap.from('.donation-list-animation', {
      y: '+=120',
      opacity: 0,
      stagger: 0.2
    });
    gsap.to('.donation-list-animation', { y: '0', opacity: 1, stagger: 0.2 });
  });
  return (
    <div className="grid mb-[200px]   grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 mx-auto ">
      {donationList.map((item) => (
        <div className="bg-card-light py-3  custom-round flex justify-between px-3 donation-list-animation cursor-pointer ">
          <div className="w-[70%] flex flex-col justify-between">
            <div className="flex justify-between">
              <h1 className="text-primary font-extrabold text-[14px] md:text-[16px] md:leading-[18px] leading-[16px] tracking-tighter mr-3">
                {item.name}
              </h1>
              <Link to="/ongoingdonations/1">
                <Button
                  text="Donate"
                  height={true}
                  heightClass="h-[40px] md:h-[45px]"
                  width={true}
                  widthClass="w-[30px] md:w-[65px]"
                  textSize={true}
                  textSizeClass="text-[12px] md:text-[14px]"
                />
              </Link>
            </div>

            <div className="flex mt-2 mb-5">
              <img src="/assets/Icons/location.svg"></img>{' '}
              <h3 className="text-gray-light px-3 text-[14px]">
                {item.location}
              </h3>
            </div>
            <div className="flex justify-between">
              <h4 className="font-extrabold text-primary text-[12px]">
                Target
              </h4>
              <h6 className="font-extrabold text-gray-light text-[12px]">
                {item.target} bdt
              </h6>
            </div>
            <div className="flex justify-between">
              <h4 className="font-extrabold text-primary text-[12px]">
                Reached
              </h4>
              <h6 className="font-extrabold text-gray-light text-[12px]">
                {item.reached} bdt
              </h6>
            </div>
          </div>
          <div
            className="w-[110px] min-h-[100px] h-[100%]  ml-2 custom-round"
            style={{
              backgroundImage: `url(${item.image})`,
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
