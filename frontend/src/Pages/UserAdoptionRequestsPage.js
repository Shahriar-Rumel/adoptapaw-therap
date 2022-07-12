import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionRequestsByUserIdAction } from '../actions/adoptionRequestActions';
import List from '../Components/List';
import Loader from '../Components/Loader';

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
  }, [userInfo, navigate]);
  useEffect(() => {
    dispatch(adoptionRequestsByUserIdAction(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-[11/12] w-[95vw] mx-auto mt-[80px]  mb-[100px]">
          {adoptionRequestsByUserId && (
            <List data={adoptionRequestsByUserId.content} query={''} uid={id} />
          )}
        </div>
      )}
    </>
  );
}
