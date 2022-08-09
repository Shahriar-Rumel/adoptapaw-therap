import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminUserBanAction } from '../actions/adminActions';
import { getAllUserAction } from '../actions/userActions';
import UserList from '../Components/List/UserList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';
import UserbanModal from '../Components/Modals/UserbanModal';
import { useNavigate } from 'react-router-dom';

export default function AdminUserListPage() {
  const [pageNo, setPageNo] = useState(0);
  const [banModal, setBanModal] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allUsersData = useSelector((state) => state.allUsers);
  const { loading, error, allUser } = allUsersData;

  const UserBanData = useSelector((state) => state.adminUserBan);
  const { loading: banLoading, error: banError, success } = UserBanData;

  useEffect(() => {
    dispatch(getAllUserAction(pageNo, 8));
  }, [dispatch, pageNo, success]);

  const banHandler = (id) => {
    dispatch(adminUserBanAction(id));
  };

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
        <div className="mx-auto lg:w-3/4 w-[90vw]  mt-[130px] lg:mt-[150px] mb-[100px]">
          <Topbar
            address={`Dashboard/User List/Page ${pageNo + 1}`}
            link={'/dashboard'}
          />
          {allUser && (
            <UserList
              data={allUser.content}
              setBanModal={setBanModal}
              setId={setId}
            />
          )}
          {allUser && <Pagination data={allUser} setPageNo={setPageNo} />}
          {banModal && (
            <UserbanModal
              setModal={setBanModal}
              success={success}
              banLoading={banLoading}
              banhandler={banHandler}
              id={id}
            />
          )}
        </div>
      )}
    </>
  );
}
