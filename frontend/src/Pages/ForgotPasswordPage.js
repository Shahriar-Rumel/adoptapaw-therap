import React, { useState } from 'react';
import Button from '../Components/Button';
import TextInput from '../Components/IO/TextInput';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Components/Topbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const submitHnadler = (e) => {
    e.preventDefault();
    console.log(email);
    navigate(`/forgot/${email}`);
  };

  return (
    <div className=" lg:w-[600px] w-[90vw] mx-auto mt-[150px] mb-[200px] py-[100px] ">
      <Topbar address={'Home/Forgot Password'} link={'/home'} />
      <h1 className="font-extrabold text-[24px] text-primary tracking-tight">
        Reset Password
      </h1>
      <p className="text-[14px] text-gray-light leading-4 mt-3 mb-8">
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password
      </p>
      <form onSubmit={submitHnadler}>
        <TextInput
          label={'Email address'}
          placeholder={'demo@gmail.com'}
          data={email}
          setData={setEmail}
        />
        <Button text={'Send Instructions'} />
      </form>
    </div>
  );
}
