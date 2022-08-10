import React, { useEffect, useState } from 'react';
import TextInput from '../Components/IO/TextInput';
import SelectBox from '../Components/IO/SelectBox';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Button from '../Components/Button';
import { donationPostCreateAction } from '../actions/donationPostActions';
import Topbar from '../Components/Topbar';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useNavigate } from 'react-router-dom';
import { PRODUCTION_URL } from '../Utils/Production';
import {
  DONATION_POST_CREATE_RESET,
  DONATION_POST_DELETE_RESET
} from '../constants/donationPostConstants';

const BASE_URL = PRODUCTION_URL;

export default function CreateDonationPage() {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [targetAmount, setTargetAmount] = useState();
  const [image, setImage] = useState('/assets/Icons/ImagePlaceholder.svg');
  const [empty, setEmpty] = useState(true);
  const [location, setLocation] = useState();
  const [uploading, setUploading] = useState('');

  const typeArray = ['Cat', 'Dog'];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationPostCreateData = useSelector(
    (state) => state.donationPostCreated
  );
  const { loading, success, error } = donationPostCreateData;

  const dataport = {
    name: name,
    type: type,
    description: description,
    targetamount: targetAmount,
    image: image,
    location: location
  };

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

      console.log(config);
      const { data } = await axios.post(
        `${BASE_URL}/api/files/upload`,
        formData,
        config
      );

      setImage(data);
      console.log(data);
      setUploading(false);
    } catch (errror) {
      console.log(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      dataport.name &&
      dataport.type &&
      dataport.description &&
      dataport.targetamount &&
      dataport.image
    ) {
      dispatch(donationPostCreateAction(dataport));
      setEmpty(false);
      setName('');
      setType('');
      setDescription('');
      setTargetAmount('');
      setImage('');
      setLocation('');
    } else {
      setEmpty(true);
      console.log('Data is empty');
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[160px] mb-[100px] ">
          <Topbar
            address={'Home/Donation/Create Post'}
            link={'/ongoingdonations'}
          />
          <h1 className="text-[24px] tracking-tight font-extrabold text-primary">
            Create Donation Post
          </h1>
          <p className="text-[16px]  text-gray-light mb-10">
            Provide all the necessary information to set up a donation
          </p>
          {error && <Message message={'error'} variant={'danger'} />}
          {success && (
            <Message
              message={'Donation post created successfully!'}
              variant={'success'}
            />
          )}
          <form onSubmit={submitHandler}>
            <TextInput
              label={'Pet name'}
              placeholder={'Tommy'}
              data={name}
              setData={setName}
              type={'text'}
            />
            <SelectBox
              label={'Pet type'}
              placeholder={'Pet name'}
              choiceList={typeArray}
              data={type}
              setData={setType}
              type={'text'}
            />
            <div className="flex flex-col my-3 request-form-animation">
              <label className="font-bold text-primary text-[14px]">
                Pet description
              </label>
              <textarea
                type="text"
                placeholder={'Okay'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-input py-4  custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></textarea>
            </div>
            <TextInput
              type={'number'}
              label={'Target amount'}
              data={targetAmount}
              setData={setTargetAmount}
            />
            <TextInput
              type={'text'}
              label={'Location'}
              data={location}
              setData={setLocation}
            />
            <div className="lg:flex relative justify-between items-center my-4">
              <div className="w-[100%]">
                <h2 className="font-bold text-primary text-[14px] mb-4">
                  Please Upload Image of the pet
                </h2>
                <div className="w-[100%] lg:w-[100%] ">
                  {uploading && (
                    <div className="fixed z-[999] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center">
                      <UploadLoader />
                    </div>
                  )}
                  <div className="w-[100%] lg:border-dashed lg:border-2 custom-round lg:py-5 border-offwhite flex items-center justify-center">
                    <label
                      htmlFor="filePicker"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                      className="text-[12px] block  w-[100%] lg:w-[48%] h-[300px] lg:h-[400px] cursor-pointer font-bold text-[transparent] py-[35px] px-[25px]  custom-round"
                    ></label>
                    <input
                      id="filePicker"
                      onChange={uploadFileHandler}
                      required
                      style={{ visibility: 'hidden' }}
                      className="absolute"
                      type={'file'}
                      accept="image/*"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <Button text={'Create donation post'} />
          </form>
        </div>
      )}
    </>
  );
}
