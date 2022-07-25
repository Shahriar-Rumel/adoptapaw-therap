import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
