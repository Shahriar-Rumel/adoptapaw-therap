import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { update } from '../actions/userActions';
import Button from '../Components/Button';
import TextInput from '../Components/IO/TextInput';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Message from '../Components/Message';
import Topbar from '../Components/Topbar';
import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL;

const DpUpload = ({ rawData, setData, setUploading, userInfo, id }) => {
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.jwtdto.accessToken}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/files/upload`,
        formData,
        config
      );
      setData(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <div className="relative flex items-center justify-center mt-[-100px]">
      <label
        htmlFor={id}
        style={{
          backgroundImage: `url(${rawData})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="text-[12px] bg-brand  mt-5 lg:mt-0 flex items-center justify-center mx-auto w-[50vw]   h-[50vw] lg:w-[300px]  lg:h-[300px]  cursor-pointer font-bold text-[transparent] py-[35px] px-[25px]  rounded-[100%]"
      >
        {!rawData && (
          <h1 className="uppercase font-bold text-[70px] lg:text-[124px] text-white">
            {userInfo.username.split('')[0]}
          </h1>
        )}
      </label>
      <img
        src="/assets/icons/edit.svg"
        className="absolute mt-[190px] w-[30px]"
      ></img>
      <input
        id={id}
        onChange={uploadFileHandler}
        required
        style={{ visibility: 'hidden' }}
        className="absolute"
        type={'file'}
        accept="image/png, image/gif, image/jpeg"
      ></input>
    </div>
  );
};

export default function UserProfileEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateData = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdateData;

  const [dp, setDp] = useState(userInfo.dp);
  const [uploading, setUploading] = useState('');
  const [name, setName] = useState(userInfo.name);
  const [location, setLocation] = useState(userInfo.location);
  const [password, setpPassword] = useState();
  const [bio, setBio] = useState(userInfo.bio);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.id != id) {
        navigate('/home');
      }
    } else {
      navigate('/home');
    }
  }, [userInfo]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(update(id, name, dp, password, location, bio));
  };
  return (
    <div className="lg:w-3/4 w-[90vw]   mx-auto mt-[140px] mb-[40px] ">
      <Topbar
        address={'Home/Profile/Edit'}
        link={`/user/profile/${userInfo.id}`}
      />
      {uploading && (
        <div className="fixed z-[999] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center">
          <UploadLoader />
        </div>
      )}
      {loading && (
        <div className="fixed top-[80px] bottom-0 left-0 right-0 bg-primary-light bg-opacity-25 z-[880]  flex items-center justify-center">
          <UploadLoader />
        </div>
      )}
      {success && (
        <div className="">
          <Message
            message={'Profile updated successfully!'}
            variant={'success'}
          />
        </div>
      )}
      {error && (
        <div className="">
          <Message message={error} variant={'danger'} />
        </div>
      )}
      <div className="lg:flex justify-between">
        <DpUpload
          rawData={dp}
          setData={setDp}
          setUploading={setUploading}
          id={'dpid'}
          userInfo={userInfo}
        />
        <form className="w-full lg:ml-[100px]">
          <div className="md:w-[100%] lg:ml-5">
            <TextInput
              type={'text'}
              label={'Name'}
              data={name}
              setData={setName}
            />
            <div className="flex flex-col my-3 request-form-animation">
              <label className="font-bold text-primary text-[14px]">
                Email
              </label>
              <input
                type="text"
                placeholder={'Okay'}
                value={userInfo.email}
                required
                disabled
                className="bg-input py-4 cursor-not-allowed custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></input>
            </div>
            <div className="flex flex-col my-3 request-form-animation">
              <label className="font-bold text-primary text-[14px]">
                Username
              </label>
              <input
                type="text"
                placeholder={'Okay'}
                value={userInfo.username}
                required
                disabled
                className="bg-input py-4 cursor-not-allowed custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></input>
            </div>
            <div className="flex flex-col my-3 request-form-animation">
              <label className="font-bold text-primary text-[14px]">
                Password
              </label>
              <input
                type="password"
                placeholder={''}
                value={password}
                onChange={(e) => {
                  setpPassword(e.target.value);
                }}
                className="bg-input py-4 custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></input>
            </div>
            <TextInput
              type={'text'}
              label={'Location'}
              data={location}
              setData={setLocation}
            />

            <div className="flex flex-col my-3 request-form-animation">
              <label className="font-bold text-primary text-[14px]">Bio</label>
              <textarea
                type="text"
                placeholder={'Okay'}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                className="bg-input py-4  custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></textarea>
            </div>
            <div onClick={updateHandler}>
              <Button text={'Update Profile'} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
