import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { donationPostsAction } from '../actions/donationPostActions';
import Button from '../Components/Button';
import AdminDonationListCard from '../Components/Cards/AdminDonationListCard';
import Loader from '../Components/Loader';

export default function AdminDonationPostsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationPostsData = useSelector((state) => state.donationPosts);
  const { loading, error, donationPosts } = donationPostsData;

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
          <div className="flex justify-between items-center my-5">
            <div className=" my-5">
              <h1 className="font-extrabold text-primary text-[24px] text-left mb-2 tracking-tight">
                All ongoing donation posts
              </h1>
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
            <AdminDonationListCard data={donationPosts} userInfo={userInfo} />
          )}
        </div>
      )}
    </>
  );
}
