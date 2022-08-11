import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Button from '../Components/Button';
import TextInput from '../Components/IO/TextInput';
import { resetPassword } from '../actions/passwordResetAction';
import Message from '../Components/Message';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Topbar from '../Components/Topbar';

export default function ForgotPasswordResetPage() {
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const resetPasswordData = useSelector((state) => state.passwordResetStore);
  const { loading, success, error, passwordReset } = resetPasswordData;

  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password));
  };
  return (
    <div className=" lg:w-[600px] w-[90vw] mb-[400px]  mx-auto mt-[190px] ">
      <Topbar address={'Home/Forgot Password / Reset'} link={'/home'} />
      {success && (
        <Message
          message={'Password reset success'}
          text={'Login'}
          link={'/login'}
          variant={'success'}
          button={true}
        />
      )}
      {error && (
        <Message
          message={error}
          text={'Retry'}
          link={'/forgot'}
          variant={'danger'}
          button={true}
        />
      )}
      {loading && (
        <div className="mx-auto flex justify-center">
          <UploadLoader />
        </div>
      )}
      <h1 className="font-extrabold text-[24px] text-primary tracking-tight">
        Create new password
      </h1>
      <p className="text-[14px] text-gray-light leading-4 mt-3 mb-8">
        Please enter the new password
      </p>
      <form onSubmit={submitHandler}>
        <TextInput
          label={'New password'}
          type={'password'}
          data={password}
          setData={setPassword}
        />
        <Button text={'Reset Password'} />
      </form>
    </div>
  );
}
