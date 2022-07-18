import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../actions/passwordResetAction';

export default function PasswordResetRequestSentPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { email } = useParams();

  useEffect(() => {
    dispatch(resetPasswordRequest(email));
  }, [dispatch, email]);
  return (
    <div className=" lg:w-[600px] w-[90vw] mx-auto mt-[150px] ">
      PasswordResetRequestSentPage
    </div>
  );
}
