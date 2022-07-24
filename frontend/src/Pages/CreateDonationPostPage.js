import React, { useState } from 'react';
import TextInput from '../Components/IO/TextInput';
import SelectBox from '../Components/IO/SelectBox';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Button from '../Components/Button';
import { donationPostCreateAction } from '../actions/donationPostActions';

export default function CreateDonationPage() {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [targetAmount, setTargetAmount] = useState();
  const [remainingAmount, setRemainingAmount] = useState();
  const [peopleDonated, setPeopleDonated] = useState();
  const [image, setImage] = useState();

  const [empty, setEmpty] = useState(true);

  const [uploading, setUploading] = useState('');

  const typeArray = ['Cat', 'Dog'];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;

  const dataport = {
    name: name,
    type: type,
    description: description,
    targetamount: targetAmount,
    image: image
  };

  const BASE_URL = 'http://localhost:8081';

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
    } else {
      setEmpty(true);
      console.log('Data is empty');
    }
  };
  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[120px] mb-[100px] ">
      <h1 className="text-[24px] tracking-tight font-extrabold text-primary">
        Create Donation Post
      </h1>
      <p className="text-[16px]  text-gray-light">
        Provide all the necessary information to set up a donation
      </p>
      <form onSubmit={submitHandler}>
        <TextInput
          label={'Title'}
          placeholder={'Donation title'}
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
        <TextInput
          type={'number'}
          label={'Target amount'}
          data={targetAmount}
          setData={setTargetAmount}
        />
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
                  required
                  style={{ visibility: 'hidden' }}
                  className="absolute"
                  type={'file'}
                  accept="image/png, image/gif, image/jpeg"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <Button text={'Create donation post'} />
      </form>
    </div>
  );
}
