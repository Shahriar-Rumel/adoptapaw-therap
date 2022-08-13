import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button';

export default function AnimalProfileMid({ poster, data }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  return (
    <>
      {data && (
        <div className="mt-[40px] lg:mt-[60px] description-gallery-animation">
          <div className=" flex items-center justify-between my-3 adoption-details-animation">
            <div className="inline-flex">
              <img src="/assets/tick.svg"></img>
              <h3
                className={`text-[12px] ${
                  data.availability ? `text-green` : `text-gray-light`
                } mx-2`}
              >
                {data.availability
                  ? 'Available for adoption'
                  : 'Unavailable for adoption'}
              </h3>
            </div>
          </div>
          <div className="flex justify-between items-center ">
            <h1 className="text-[32px] font-black mb-5 text-primary tracking-tighter adoption-details-animation">
              {data.name}
            </h1>
            <div className="flex justify-center items-center ">
              <img src="/assets/Icons/location.svg"></img>{' '}
              <h2 className="ml-2 text-[12px] font-bold text-primary">
                {data.location}
              </h2>
            </div>
          </div>

          {poster !== 2 && (
            <>
              <div className="flex items-center justify-between text-[12px] mb-5 adoption-details-animation">
                <h3 className="gray-dark">
                  Posted by
                  <span className="text-primary font-bold mx-1">
                    {data.user.username ? data.user.username : 'Dummy'}
                  </span>
                </h3>
                <h3 className="gray-dark">
                  {data.postedon ? data.postedon.substring(0, 11) : 'N/A'}
                </h3>
              </div>
              {/* {userInfo && data.availability && data.user.id != userInfo.id && (
                <Link
                  to={
                    userInfo
                      ? `/adoption/${data.id}/user/${userInfo.id}/createadoptionrequest`
                      : '/login'
                  }
                >
                  <Button text={`Adopt ${data.name}`} />
                </Link>
              )} */}
              {data.availability && (
                <Link
                  to={
                    userInfo
                      ? `/adoption/${data.id}/user/${userInfo.id}/createadoptionrequest`
                      : '/login'
                  }
                  className="adoption-details-animation"
                >
                  <Button text={`Adopt ${data.name}`} />
                </Link>
              )}
              {!data.availability && (
                <button
                  className="bg-gray-light adoption-details-animation cursor-not-allowed w-[100%] custom-round h-[55px] text-white"
                  disabled
                >
                  Adopt {data.name}
                </button>
              )}
            </>
          )}
        </div>
      )}{' '}
    </>
  );
}
