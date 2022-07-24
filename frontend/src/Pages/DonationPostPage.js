import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import DonationListCard from '../Components/Cards/DonationListCard';
import { useDispatch, useSelector } from 'react-redux/es';
import { donationPostsAction } from '../actions/donationPostActions';
import Loader from '../Components/Loader';

export default function DonationPostPage() {
  const dispatch = useDispatch();

  const donationPostsData = useSelector((state) => state.donationPosts);

  const { loading, error, donationPosts } = donationPostsData;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(donationPostsAction());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[90vw] mx-auto mt-[100px]">
          <div className="lg:flex justify-between items-center mb-5 lg:mb-0">
            <div className="lg:w-[60%]">
              <h1 className="font-extrabold text-primary text-[24px] text-left mb-2 tracking-tight">
                Ongoing Donations
              </h1>
              <p className="text-[14px] text-gray-light font-medium text-left mb-12 ">
                Please donate to save the lives of the animals in need. These
                animals have encountered a cruel life where people mistreated or
                abandoned them and threw them away in unsafe environments. Help
                us raise money for their treatment and rehabilitation.
              </p>
            </div>
            {userInfo && userInfo.role[0].id === 1 && (
              <Link to="/donation/createpost">
                <Button
                  text={'Create Donation'}
                  width={true}
                  widthClass={'w-[140px]'}
                />
              </Link>
            )}
          </div>

          {donationPosts && (
            <DonationListCard data={donationPosts} userInfo={userInfo} />
          )}
        </div>
      )}
    </>
  );
}
