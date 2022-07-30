import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAction } from '../actions/userActions';
import UserList from '../Components/List/UserList';
import Loader from '../Components/Loader';

export default function AdminUserListPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const allUsersData = useSelector((state) => state.allUsers);
  const { loading, error, allUser } = allUsersData;

  useEffect(() => {
    dispatch(getAllUserAction(pageNo, 8));
  }, [dispatch, pageNo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
          <h1 className="font-extrabold text-[24px] tracking-tight text-primary">
            Total user
          </h1>
          {allUser && <UserList data={allUser.content} />}
        </div>
      )}
    </>
  );
}
