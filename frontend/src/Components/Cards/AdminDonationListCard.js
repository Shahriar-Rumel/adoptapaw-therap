import gsap from 'gsap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

export default function AdminDonationListCard({ data, userInfo }) {
  useEffect(() => {
    gsap.from('.donation-list-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.donation-list-animation', { y: '0', opacity: 1, stagger: 0.1 });
  });
  return (
    <div className="grid mb-[100px]   grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 mx-auto ">
      {data &&
        data.map((item) => (
          <div className="bg-card-light py-3  custom-round flex justify-between px-3 donation-list-animation cursor-pointer ">
            <div className="w-[70%] flex flex-col justify-between">
              <div className="flex justify-between">
                <h1 className="text-primary font-extrabold text-[18px] md:text-[20px] md:leading-[24px] leading-[22px] tracking-tighter mr-3">
                  {item.name}
                </h1>
                <Link
                  to={
                    userInfo ? `/admin/donation/post/${item.id}/edit` : '/login'
                  }
                >
                  <Button
                    text="Details"
                    height={true}
                    heightClass="h-[40px] md:h-[45px]"
                    width={true}
                    widthClass="w-[80px] md:w-[95px]"
                    textSize={true}
                    textSizeClass="text-[12px] md:text-[14px]"
                  />
                </Link>
              </div>

              <div className="flex justify-between">
                <h4 className="font-extrabold text-primary text-[12px]">
                  Target
                </h4>
                <h6 className="font-extrabold text-gray-light text-[12px]">
                  {item.targetamount} bdt
                </h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-extrabold text-primary text-[12px]">
                  Remaining
                </h4>
                <h6 className="font-extrabold text-gray-light text-[12px]">
                  {item.remainingamount > 0 ? item.remainingamount : 0} bdt
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
