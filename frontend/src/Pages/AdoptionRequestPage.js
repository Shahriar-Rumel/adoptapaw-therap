import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  adoptionPostByIdAction,
  adoptionRequestAction
} from '../actions/adoptionActions';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import Button from '../Components/Button';
import Features from '../Components/Adoption/Features';
import Loader from '../Components/Loader';
import RequestForm from '../Components/RequestForm';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Message from '../Components/Message';

export default function AdoptionRequestPage() {
  const [rfa, setRfa] = useState('');
  const [hadpet, setHadpet] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );
  const { loading, error, adoptionPostById } = adoptionPostByIdDataSet;

  const adoptionRequestData = useSelector(
    (state) => state.adoptionRequstCreated
  );
  const {
    loading: requestLoading,
    success,
    error: requestError
  } = adoptionRequestData;

  const navigate = useNavigate();
  const { id, uid } = useParams();

  const dataset = {
    rfa: rfa,
    hadpet: hadpet ? true : false,
    pickup: pickup ? true : false,
    mobile: mobile,
    email: email
  };

  const setObjects = {
    rfa: rfa,
    hadpet: hadpet,
    pickup: pickup,
    mobile: mobile,
    email: email,
    setRfa: setRfa,
    setHadpet: setHadpet,
    setPickup: setPickup,
    setMobile: setMobile,
    setEmail: setEmail
  };

  useEffect(() => {
    dispatch(adoptionPostByIdAction(id));
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (rfa && mobile && email) {
      dispatch(adoptionRequestAction(dataset, id, uid));
    } else {
      window.alert("Data can't be empty");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (success && email) {
      navigate(`/user/profile/${uid}/adoptionrequests`);
    }
  }, [success]);

  useEffect(() => {
    gsap.from('.request-adoption-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.request-adoption-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] lg:mt-[200px] items-center lg:flex justify-between mb-[100px]">
          <div className="lg:w-[50%] lg:mr-6 request-adoption-gallery-animation">
            <AnimalProfileLeft poster={2} data={adoptionPostById} />
            <AnimalProfileMid poster={2} data={adoptionPostById} />
            <Features className="mt-[-20px]" data={adoptionPostById} />
          </div>
          <div>
            <div className="my-10 lg:mt-[-50px] ">
              <h1 className="font-extrabold tracking-tight leading-[24px] text-center pt-10 text-primary text-[24px]">
                Please provide information required for adoption request
              </h1>
            </div>
            {requestLoading && <UploadLoader />}{' '}
            {requestError && (
              <Message message={requestError} variant={'danger'} />
            )}
            <div className="request-adoption-gallery-animation">
              <form onSubmit={submitHandler}>
                <RequestForm setObjects={setObjects} />
                <div>
                  <Button text="Confirm Adoption Request" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
