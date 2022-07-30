import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { donationByUserIdAction } from '../actions/donationActions';
import DonationList from '../Components/Cards/DonationList';
import Loader from '../Components/Loader';
import Topbar from '../Components/Topbar';

export default function UserDonationListPage() {
  const dispatch = useDispatch();

  const donationByUserIdData = useSelector((state) => state.donationByUserId);

  const { loading, error, donationsByUserId } = donationByUserIdData;

  const { id } = useParams();
  useEffect(() => {
    dispatch(donationByUserIdAction(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-[80vw] w-[95vw] mx-auto mt-[160px]  mb-[100px]">
          <Topbar
            link={'/user/profile'}
            address={'Home/User/Adoption/Requests'}
          />
          {donationsByUserId && (
            <DonationList
              data={donationsByUserId.content}
              query={''}
              uid={id}
            />
          )}
        </div>
      )}
    </>
  );
}
