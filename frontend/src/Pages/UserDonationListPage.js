import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { donationByUserIdAction } from '../actions/donationActions';
import DonationList from '../Components/Cards/DonationList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

export default function UserDonationListPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationByUserIdData = useSelector((state) => state.donationByUserId);

  const { loading, error, donationsByUserId } = donationByUserIdData;

  const { id } = useParams();
  useEffect(() => {
    dispatch(donationByUserIdAction(id, pageNo, 8));
  }, [dispatch, id]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[95vw] mx-auto mt-[160px]  mb-[100px]">
          <Topbar link={'/user/profile'} address={'Home/User/Donation'} />
          {donationsByUserId && (
            <DonationList
              data={donationsByUserId.content}
              query={''}
              uid={id}
            />
          )}
        </div>
      )}
      {donationsByUserId && (
        <Pagination data={donationsByUserId} setPageNo={setPageNo} />
      )}
    </>
  );
}
