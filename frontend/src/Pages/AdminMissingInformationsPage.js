import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {
  adminAdoptionRequestsAction,
  adminAllMissingInfoAction
} from '../actions/adminActions';
import AdoptionRequestList from '../Components/List/AdoptionRequestList';
import MissingInfoList from '../Components/List/MissingInformationList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

export default function AdminMissingInformationsPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const missingInfoData = useSelector((state) => state.adminAllMissingInfo);
  const { loading, error, missingInformations } = missingInfoData;

  useEffect(() => {
    dispatch(adminAllMissingInfoAction(userInfo.id, pageNo, 8));
  }, [dispatch, pageNo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
          <Topbar
            address={`Dashboard/Missing/Information/Page ${pageNo + 1}`}
            link={'/dashboard'}
          />
          {missingInformations && (
            <MissingInfoList
              data={missingInformations.content}
              //   banHandler={banHandler}
            />
          )}
          {missingInformations && (
            <Pagination data={missingInformations} setPageNo={setPageNo} />
          )}
        </div>
      )}
    </>
  );
}
