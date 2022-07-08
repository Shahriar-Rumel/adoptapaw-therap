import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateAdoptionPost({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  // const redirect = location ? location.split('=')[1] : '/';

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push(redirect);
      navigate('/login');
    }
  }, [history, userInfo]);

  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[100px] ">
      <h1 className='text-[1'>Please enter the details of your pet</h1>
    </div>
  );
}
