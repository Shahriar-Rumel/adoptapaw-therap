import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminUserBanAction } from '../actions/adminActions';
import { getAllUserAction } from '../actions/userActions';
import UserList from '../Components/List/UserList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

export default function AdminUserListPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const allUsersData = useSelector((state) => state.allUsers);
  const { loading, error, allUser } = allUsersData;

  useEffect(() => {
    dispatch(getAllUserAction(pageNo, 8));
  }, [dispatch, pageNo]);

  const banHandler = (id) => {
    dispatch(adminUserBanAction(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
          <Topbar
            address={`Dashboard/User List/Page ${pageNo + 1}`}
            link={'/dashboard'}
          />
          {allUser && (
            <UserList data={allUser.content} banHandler={banHandler} />
          )}
          {allUser && <Pagination data={allUser} setPageNo={setPageNo} />}
        </div>
      )}
    </>
  );
}
