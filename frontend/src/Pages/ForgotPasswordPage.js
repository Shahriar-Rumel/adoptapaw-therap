import React from 'react';
import Button from '../Components/Button';
import TextInput from '../Components/IO/TextInput';

export default function ForgotPasswordPage() {
  return (
    <div className=" lg:w-[600px] w-[90vw] mx-auto mt-[150px] ">
      <h1 className="font-extrabold text-[24px] text-primary tracking-tight">
        Reset Password
      </h1>
      <p className="text-[14px] text-gray-light leading-4 mt-3 mb-8">
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password
      </p>
      <TextInput label={'Email address'} placeholder={'demo@gmail.com'} />
      <Button text={'Send Instructions'} />
    </div>
  );
}
