import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { adminAdoptionRequestsAction } from '../actions/adminActions';
import AdoptionRequestList from '../Components/List/AdoptionRequestList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

export default function AdminAdoptionRequestsPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionRequestsData = useSelector(
    (state) => state.adminAllAdoptionRequest
  );
  const { loading, error, adoptionRequests } = adoptionRequestsData;

  useEffect(() => {
    dispatch(adminAdoptionRequestsAction(userInfo.id, pageNo, 8));
  }, [dispatch, pageNo]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto lg:w-3/4 w-[90vw] mt-[130px] lg:mt-[150px] mb-[100px]">
          <Topbar
            address={`Dashboard/User List/Page ${pageNo + 1}`}
            link={'/dashboard'}
          />
          {adoptionRequests && (
            <AdoptionRequestList
              data={adoptionRequests.content}
              //   banHandler={banHandler}
            />
          )}
          {adoptionRequests && (
            <Pagination data={adoptionRequests} setPageNo={setPageNo} />
          )}
        </div>
      )}
    </>
  );
}
