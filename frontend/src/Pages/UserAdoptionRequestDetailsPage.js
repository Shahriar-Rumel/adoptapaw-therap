import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
import { adoptionRequestByIdAction } from '../actions/adoptionRequestActions';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import Features from '../Components/Adoption/Features';
import UserAdoptionDetailsLeft from '../Components/Adoption/UserAdoptionDetailsLeft';
import UserAdoptionDetailsRight from '../Components/Adoption/UserAdoptionDetailsRight';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import TextBlock from '../Components/TextBlock';

export default function UserAdoptionRequestDetailsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const adoptionRequestByIdData = useSelector(
    (state) => state.adoptionRequestById
  );

  const { loading, error, adoptionRequest } = adoptionRequestByIdData;

  const { uid, id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate('/home');
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(adoptionRequestByIdAction(uid, id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-[80vw] w-[95vw] mx-auto mt-[100px] lg:mt-[150px]  mb-[100px]">
          <div className="flex items-center justify-center w-full">
            {adoptionRequest && (
              <h1 className="text-[32px] text-primary font-extrabold tracking-tight text-center mb-[50px]">
                Adoption Request :
                {adoptionRequest.id ? adoptionRequest.id : 'N/A'}
              </h1>
            )}
          </div>
          <div className="lg:flex lg:flex-row-reverse justify-between items-center ">
            <div className="lg:w-[48%] lg:mr-6 request-adoption-gallery-animation lg:flex flex-col justify-between lg:min-h-[580px] xl:min-h-full ">
              <UserAdoptionDetailsRight data={adoptionRequest} />
              <div className="mt-5">
                <Button secondary={true} text={'Visit Post'} />
              </div>
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
