import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
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

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push(redirect);
      navigate('/home');
    }
  }, [userInfo]);

  const { loading, error, adoptionPostById } = adoptionPostByIdDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(adoptionPostByIdAction(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] lg:mt-[150px]  mb-[100px]">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-[32px] text-primary font-extrabold tracking-tight text-center mb-[50px]">
              Adoption Requests
            </h1>
          </div>
          <div className="lg:flex lg:flex-row-reverse justify-between items-center ">
            {adoptionPostById && (
              <div className="lg:w-[48%] lg:mr-6 request-adoption-gallery-animation lg:flex flex-col justify-between lg:min-h-[580px] xl:min-h-full ">
                <UserAdoptionDetailsRight adoptionPostById={adoptionPostById} />
                <div className="mt-5">
                  <Button secondary={true} text={'Visit Post'} />
                </div>
              </div>
            )}
            <div className="lg:w-[48%] lg:mr-10">
              <UserAdoptionDetailsLeft />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
