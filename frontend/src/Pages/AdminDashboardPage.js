import React, { useEffect } from 'react';
import Button from '../Components/Button';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Link, useNavigate } from 'react-router-dom';
import { adminStatsAction } from '../actions/adminActions';
import Loader from '../Components/Loader';

const StatCard = ({ title, data, src, text, variant, brand, link }) => {
  return (
    <div className="shadow-md bg-primary-light bg-opacity-10 py-5 px-4 custom-round my-5 lg:my-3 lg:w-[33%]  ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-light tracking-tighter text-[16px]">
            {title}
          </h1>
          <h1 className="font-extrabold text-primary tracking-tight text-[32px] mb-4">
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
  const adminStatsData = useSelector((state) => state.adminStats);

  const {
    loading: statsLoading,
    error: statsError,
    adminStat
  } = adminStatsData;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo || userInfo.role[0].id != 1) {
      navigate('/home');
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(adminStatsAction());
  }, []);

  return (
    <>
      {statsLoading ? (
        <Loader />
      ) : (
        <div className="  mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[300px]">
          <div className="lg:flex lg:justify-between">
            <StatCard
              title={'Active user'}
              data={adminStat.userSize}
              src={'/assets/Icons/users.svg'}
              text={'All user'}
              brand={true}
              link={'/admin/user'}
            />
            <StatCard
              title={'Adoption request'}
              data={adminStat.adoptionRequestSize}
              src={'/assets/Icons/adoption.svg'}
              text={'All request'}
              link={'/admin/adoption/request'}
            />
            <StatCard
              title={'Missing Information'}
              data={adminStat.missingInformationSize}
              src={'/assets/Icons/missing.svg'}
              text={'All missing information'}
              variant={true}
              link={'/admin/missing/info'}
            />
          </div>
          <div className="lg:flex lg:justify-between">
            <StatCard
              title={'Adoption Post'}
              data={adminStat.adoptionAnimalSize}
              src={'/assets/Icons/adoptionPost.svg'}
              text={'All adoption post'}
              brand={true}
              link={`/admin/adoptionposts`}
            />
            <StatCard
              title={'Missing Post'}
              data={adminStat.missingPostSize}
              src={'/assets/Icons/missingPost.svg'}
              text={'All missing post'}
              link={'/admin/missingposts'}
            />
            <StatCard
              title={'Ongoing donation'}
              data={adminStat.donationSize}
              src={'/assets/Icons/donation.svg'}
              text={'All donation'}
              variant={true}
              link={'/admin/donation/posts'}
            />
          </div>
        </div>
      )}
    </>
  );
}
