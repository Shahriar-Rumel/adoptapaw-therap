import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { verify } from '../actions/userActions';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

export default function AccountVerificationConfirmationPage() {
  const dispatch = useDispatch();

  const verifyData = useSelector((state) => state.userVerify);
  const { loading, success, error } = verifyData;

  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    dispatch(verify(token));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-[600px] w-[90vw] mx-auto mt-[150px] ">
          {success && (
            <div>
              <img
                src="/assets/Icons/confirmed.svg"
                className="w-[150px] h-[150px] mx-auto mb-16"
              />
              <h1 className="font-extrabold text-[24px] text-primary tracking-tight">
                Your account has been confirmed
              </h1>
              <p className="text-[14px] text-gray-light leading-4 mt-3 mb-8">
                Login to get started with adoptapaw
              </p>

              <div className="mt-3"></div>
              <Link to={'/login'}>
                <Button text="Login" secondary={true}></Button>
              </Link>
            </div>
          )}
          {error && <Message message={error} variant={'danger'} />}
        </div>
      )}
    </>
  );
}
