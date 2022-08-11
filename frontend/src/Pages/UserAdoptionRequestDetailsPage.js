import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adoptionRequestByIdAction } from '../actions/adoptionRequestActions';
import UserAdoptionDetailsLeft from '../Components/Adoption/UserAdoptionDetailsLeft';
import UserAdoptionDetailsRight from '../Components/Adoption/UserAdoptionDetailsRight';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import Topbar from '../Components/Topbar';
import { ADOPTION_REQUEST_APPROVE_RESET } from '../constants/adoptionRequestConstants';

export default function UserAdoptionRequestDetailsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionRequestByIdData = useSelector(
    (state) => state.adoptionRequestById
  );
  const { loading, error, adoptionRequest } = adoptionRequestByIdData;

  const approvedData = useSelector((state) => state.adoptionRequestApprove);
  const { loading: approveLoading, success } = approvedData;

  const navigate = useNavigate();
  const { uid, id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate('/home');
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(adoptionRequestByIdAction(uid, id));
    dispatch({
      type: ADOPTION_REQUEST_APPROVE_RESET
    });
  }, [dispatch, uid, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[95vw] lg:w-3/4  mx-auto mt-[100px] lg:mt-[150px]  mb-[100px]">
          <Topbar
            address={`Home/Profile/Adoption/Request/${id}`}
            link={'/home'}
          />
          <div className="flex items-center  w-full">
            {adoptionRequest && (
              <div className="flex flex-col">
                <h1 className=" w-full text-[32px]  text-primary font-extrabold text-left tracking-tight">
                  Adoption Request
                </h1>
                <h2 className="font-bold text-gray-light mt-5">
                  Request ID :
                  <span className="text-primary ml-3">
                    {adoptionRequest.id ? adoptionRequest.id : 'N/A'}
                  </span>
                </h2>
              </div>
            )}
          </div>
          <div className="lg:flex lg:flex-row-reverse justify-between items-center ">
            <div className="lg:w-[48%] lg:mr-6 request-adoption-gallery-animation lg:flex flex-col justify-between lg:min-h-[580px] xl:min-h-full ">
              <UserAdoptionDetailsRight data={adoptionRequest} />
              {adoptionRequest && (
                <Link
                  to={`/adoption/${adoptionRequest.pet.id}`}
                  className="mt-2"
                >
                  <Button secondary={true} text={'Visit Post'} />
                </Link>
              )}
            </div>
            <div className="lg:w-[48%] lg:mr-10">
              <UserAdoptionDetailsLeft
                data={adoptionRequest}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
