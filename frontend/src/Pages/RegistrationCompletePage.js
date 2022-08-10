import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Topbar from '../Components/Topbar';
import { USER_REGISTER_RESET } from '../constants/userConstants';

export default function RegistrationCompletePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: USER_REGISTER_RESET
    });
  }, []);
  return (
    <div className=" lg:w-[600px] w-[90vw] mx-auto mt-[150px] mb-[100px] ">
      <Topbar address={'Home/Registration/Complete'} link={'/home'} />
      <img
        src="/assets/Icons/mail.svg"
        className="w-[150px] h-[150px] mx-auto mb-16"
      />
      <h1 className="font-extrabold text-[24px] text-primary tracking-tight">
        Your registration is complete !
      </h1>
      <p className="text-[14px] text-gray-light leading-4 mt-3 mb-8">
        We've sent instructions to activate your acount in your email.
      </p>

      <div className="mt-3"></div>
      <Link to={'/'}>
        <Button text="Done" secondary={true}></Button>
      </Link>
    </div>
  );
}
