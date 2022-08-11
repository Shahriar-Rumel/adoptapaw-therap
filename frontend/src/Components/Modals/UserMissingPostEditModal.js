import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button';
import Checkbox from '../IO/Checkbox';
import SelectBox from '../IO/SelectBox';
import TextInput from '../IO/TextInput';
import UploadLoader from '../UploadLoader/UploadLoader';
import Message from '../Message';
import { missingPostUpdateAction } from '../../actions/missingAnimalActions';

import { PRODUCTION_URL } from '../../Utils/Production';

const BASE_URL = PRODUCTION_URL;

export default function UserMissingPostEditModal({ data, setModal }) {
  const [name, setName] = useState(data.name);
  const [location, setLocation] = useState(data.location);
  const [reward, setReward] = useState(data.rewards);
  const [gender, setGender] = useState(data.gender);
  const [breed, setBreed] = useState(data.breed);
  const [accessory, setAccessory] = useState(data.accessorieslastworn);
  const [date, setDate] = useState(data.datemissing);
  const [attribute, setAttribute] = useState(data.specificattribute);

  const [vaccine, setVaccine] = useState(data.vaccine);
  const [type, setType] = useState(data.type);
  const [color, setColor] = useState(data.color);

  const [empty, setEmpty] = useState(false);

  const [imageOne, setImageOne] = useState(data.image);

  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;
  const { id } = useParams();

  const createMissingPost = useSelector(
    (state) => state.missingPostUpdateStore
  );

  const { loading, success } = createMissingPost;

  const navigate = useNavigate();
  const dataport = {
    name: name,
    breed: breed,
    vaccine: vaccine,
    color: color,
    datemissing: date,
    specificattribute: attribute,
    location: location,
    accessorieslastworn: accessory,
    image: imageOne,
    rewards: reward,
    gender: gender,
    type: type
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  var petType = ['Cat', 'Dog'];
  var genderType = ['Male', 'Female'];

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      dataport.name &&
      dataport.breed &&
      dataport.color &&
      dataport.datemissing &&
      dataport.specificattribute &&
      dataport.location &&
      dataport.accessorieslastworn &&
      dataport.image &&
      dataport.rewards &&
      dataport.gender &&
      dataport.type
    ) {
      dispatch(missingPostUpdateAction(id, dataport));
    } else {
      console.log('Data is empty');
    }
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

      const { data } = await axios.post(
        `${BASE_URL}/api/files/upload`,
        formData,
        config
      );

      setImageOne(data);

      setUploading(false);
    } catch (errror) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    // <div className="bg-green fixed left-0 right-0 top-[10px] z-[100] flex items-center justify-center">
    <div className="w-full mx-auto   mb-[100px]   bg-white  z-[700]  shadow-lg p-8 custom-round">
      <div className="flex justify-between items-center ">
        <h1 className="text-[30px] font-extrabold text-primary   tracking-tighter">
          Edit Missing Post
        </h1>
        <div onClick={() => setModal(false)} className="cursor-pointer">
          <div className="w-[24px] h-[3px] bg-primary rotate-45 mt-1"></div>
          <div className="w-[24px] h-[3px] bg-primary -rotate-45 mt-[-3px] "></div>
        </div>
      </div>

      <p className="text-[14px] text-gray-light mb-8">
        Please enter the details of your missing pet
      </p>
      {empty && (
        <Message
          message={'Please fill in all the fields !'}
          variant={'danger'}
        />
      )}
      {success && (
        <Message message={'Post updated successfully!'} variant={'success'} />
      )}
      {loading && <UploadLoader />}
      <form>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet name'}
              placeholder={'Tommy'}
              type={'text'}
              data={name}
              setData={setName}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's color"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              data={color}
              setData={setColor}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's specific attribute"}
              placeholder={'Any marks or sign'}
              type={'text'}
              data={attribute}
              setData={setAttribute}
            />
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's last seen location"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              data={location}
              setData={setLocation}
            />
          </div>

          <div className="lg:w-[32%]">
            <TextInput
              minHeight={200}
              label={'Pet breed'}
              data={breed}
              setData={setBreed}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Accessories last worn'}
              placeholder={'Accessories'}
              type={'text'}
              data={accessory}
              setData={setAccessory}
            />
          </div>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Reward'}
              placeholder={'Rewards amount in BDT'}
              type={'number'}
              data={reward}
              setData={setReward}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Went missing on'}
              placeholder={'27/06/2022'}
              type={'date'}
              data={date}
              setData={setDate}
            />
          </div>
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={"Pet's gender"}
              choiceList={genderType}
              data={gender}
              setData={setGender}
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
                    backgroundImage: `url(${imageOne})`,
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

        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet Type'}
              choiceList={petType}
              data={type}
              setData={setType}
            />
          </div>
          <div className="flex justify-between lg:w-[60%]">
            <div className="lg:w-[32%]">
              <Checkbox
                label={'Vaccinated'}
                placeholder={'Tommy'}
                type={'checkbox'}
                width={'w-[90px]'}
                data={vaccine}
                setData={setVaccine}
              />
            </div>
          </div>
        </div>

        <div onClick={submitHandler}>
          <Button text={'Update Missing Post'} />
        </div>
      </form>
    </div>
    // </div>
  );
}
