import React from 'react';
import Message from '../Message';

export default function DonationList({ title, data, limit, query, page, uid }) {
  let count = 0;
  return (
    <div className="">
      {data && (
        <div className="mt-20 w-full mx-auto">
          <h3 className="font-extrabold text-[24px] text-left tracking-tight my-5 text-primary">
            Your donations
          </h3>

          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {data.map((item) => (
                <div
                  className="bg-brand bg-opacity-5 flex justify-between items-center px-4 py-4 custom-round "
                  key={item.id}
                >
                  <div className="">
                    <h1 className="font-bold text-[18px] text-primary">
                      {item.donationpost.name}
                    </h1>
                    <div className="flex items-center mt-2">
                      <img src="/assets/Icons/location.svg"></img>
                      <h3 className="ml-2 text-gray-light text-[14px]">
                        {item.donationpost.location}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold text-gray-light tracking-[-0.2px] text-[14px]">
                      Donation Amount
                    </h3>
                    <h1 className=" font-black tracking-tight mt-2 text-primary ">
                      {item.amountofmoney} BDT
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-3/4 mx-auto">
              <Message
                message={"You haven't make any requests!"}
                variant={'danger'}
                active={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
