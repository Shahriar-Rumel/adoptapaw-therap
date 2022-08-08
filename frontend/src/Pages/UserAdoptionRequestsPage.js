import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionRequestsByUserIdAction } from '../actions/adoptionRequestActions';
import List from '../Components/List';
import Loader from '../Components/Loader';
import Topbar from '../Components/Topbar';

export default function UserAdoptionRequestsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionRequestByUserIdData = useSelector(
    (state) => state.adoptionRequestsByUserId
  );
  const { loading, error, adoptionRequestsByUserId } =
    adoptionRequestByUserIdData;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(adoptionRequestsByUserIdAction(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[95vw] mx-auto mt-[160px]  mb-[100px]">
          {userInfo && (
            <Topbar
              link={`/user/profile/${userInfo.id}`}
              address={'Home/User/Adoption/Requests'}
            />
          )}

          {adoptionRequestsByUserId && (
            <List data={adoptionRequestsByUserId.content} query={''} uid={id} />
          )}
        </div>
      )}
    </>
  );
}
