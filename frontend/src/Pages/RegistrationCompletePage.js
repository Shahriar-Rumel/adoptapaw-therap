import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../actions/passwordResetAction';
import Button from '../Components/Button';

export default function RegistrationCompletePage() {
  const navigate = useNavigate();

  return (
    <div className=" lg:w-[600px] w-[90vw] mx-auto mt-[150px] ">
      <img
        src="/assets/Icons/mail.svg"
        className="w-[150px] h-[150px] mx-auto mb-16"
      />
      <h1 className="font-extrabold text-[24px] text-primary tracking-tight">
        Check your mail
      </h1>
      <p className="text-[14px] text-gray-light leading-4 mt-3 mb-8">
        We've sent a password reset instructions to your email.
      </p>

      <div className="mt-3"></div>
      <Link to={'/'}>
        <Button text="Done" secondary={true}></Button>
      </Link>
    </div>
  );
}
