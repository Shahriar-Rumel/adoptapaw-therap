import React, { useState } from 'react';
import TextInput from '../IO/TextInput';
import SelectBox from '../IO/SelectBox';
import UploadLoader from '../UploadLoader/UploadLoader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Button from '../Button';
import { donationPostUpdateAction } from '../../actions/donationPostActions';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import { PRODUCTION_URL } from '../../Utils/Production';

const BASE_URL = PRODUCTION_URL;

export default function AdminDonationPostEditModal({ data, setModal }) {
  const [name, setName] = useState(data.name);
  const [type, setType] = useState(data.type);
  const [description, setDescription] = useState(data.description);
  const [targetAmount, setTargetAmount] = useState(data.targetamount);
  const [image, setImage] = useState(data.image);
  const [location, setLocation] = useState(data.location);

  const [uploading, setUploading] = useState('');

  const typeArray = ['Cat', 'Dog'];

  const dispatch = useDispatch();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;

  const createDonationPost = useSelector(
    (state) => state.donationPostUpdateStore
  );

  const { loading, success } = createDonationPost;

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
      dataport.image &&
      dataport.location
    ) {
      dispatch(donationPostUpdateAction(id, dataport));
    }
  };
  return (
    <div className=" lg:w-[1000px] w-[90vw] top-[100px]  shadow-xl custom-round bg-white px-4 py-5 ">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] tracking-tight font-extrabold text-primary">
          Edit Donation Post
        </h1>
        <div onClick={() => setModal(false)} className="cursor-pointer">
          <div className="w-[24px] h-[3px] bg-primary rotate-45 mt-1"></div>
          <div className="w-[24px] h-[3px] bg-primary -rotate-45 mt-[-3px] "></div>
        </div>
      </div>

      <p className="text-[16px]  text-gray-light">
        Provide all the necessary information to set up a donation
      </p>

      {success && (
        <Message message={'Post updated successfully!'} variant={'success'} />
      )}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="lg:flex justify-between">
          <div className="lg:w-[48%]">
            <TextInput
              label={'Title'}
              placeholder={'Donation title'}
              data={name}
              setData={setName}
              type={'text'}
            />
          </div>
          <div className="lg:w-[48%]">
            <SelectBox
              label={'Pet type'}
              placeholder={'Pet name'}
              choiceList={typeArray}
              data={type}
              setData={setType}
              type={'text'}
            />
          </div>
        </div>
        <div className="flex flex-col my-3 request-form-animation">
          <label className="font-bold text-primary text-[14px]">
            Pet Description
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
        <div className="lg:flex justify-between">
          <div className="lg:w-[48%]">
            <TextInput
              type={'number'}
              label={'Target amount'}
              data={targetAmount}
              setData={setTargetAmount}
            />
          </div>
          <div className="lg:w-[48%]">
            <TextInput
              type={'text'}
              label={'Location'}
              data={location}
              setData={setLocation}
            />
          </div>
        </div>

        <div className="lg:flex relative justify-between items-center my-4">
          <div className="w-[100%]">
            <h2 className="font-bold text-primary text-[14px] mb-4">
              Plase Upload Image of your pet
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
                  style={{ visibility: 'hidden' }}
                  className="absolute"
                  type={'file'}
                  accept="image/*"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <Button text={'Update donation post'} />
      </form>
    </div>
  );
}
