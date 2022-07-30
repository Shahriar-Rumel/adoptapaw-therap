import React from 'react';
import Button from '../Components/Button';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import List from '../Components/List';
import { Link } from 'react-router-dom';

const StatCard = ({ title, data, src, text, variant, brand, link }) => {
  return (
    <div className="shadow-md bg-primary-light bg-opacity-10 py-5 px-4 custom-round my-5 lg:my-3 lg:w-[33%] ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-light tracking-tighter text-[16px]">
            {title}
          </h1>
          <h1 className="font-black text-primary tracking-tight text-[32px] mt-2">
            {data}
          </h1>
        </div>
        <div className=" p-3 custom-round bg-opacity-25">
          <img src={src} className="w-[50px]"></img>
        </div>
      </div>
      <Link to={link} className="mt-4">
        <Button
          text={text}
          width={true}
          widthClass={'w-[160px]'}
          brand={brand}
          secondary={variant}
        />
      </Link>
    </div>
  );
};
export default function AdminDashboardPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionRequestByUserIdData = useSelector(
    (state) => state.adoptionRequestsByUserId
  );
  const { loading, error, adoptionRequestsByUserId } =
    adoptionRequestByUserIdData;

  return (
    <div className="  mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
      <div className="lg:flex lg:justify-between">
        <StatCard
          title={'Active user'}
          data={1200}
          src={'/assets/Icons/users.svg'}
          text={'See all user'}
          brand={true}
          link={'/admin/user'}
        />
        <StatCard
          title={'Adoption request'}
          data={1200}
          src={'/assets/Icons/adoption.svg'}
          text={'See all request'}
          link={'/admin/user'}
        />
        <StatCard
          title={'Ongoing donation'}
          data={1200}
          src={'/assets/Icons/donation.svg'}
          text={'See all donation'}
          variant={true}
          link={'/admin/user'}
        />
      </div>
      <StatCard
        title={'Ongoing donation'}
        data={1200}
        src={'/assets/Icons/donation.svg'}
        text={'See all donation'}
        variant={true}
        link={'/admin/user'}
      />

      <div className="lg:w-[11/12] w-[95vw] mx-auto mt-[80px]  mb-[100px]">
        {adoptionRequestsByUserId && (
          <List data={adoptionRequestsByUserId.content} query={''} uid={'1'} />
        )}
      </div>
    </div>
  );
}
