import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostCreateAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import Checkbox from '../Components/IO/Checkbox';
import ChoiceInput from '../Components/IO/ChoiceInput';
import ImageInput from '../Components/IO/ImageInput';
import SelectBox from '../Components/IO/SelectBox';
import TextInput from '../Components/IO/TextInput';
import Loader from '../Components/Loader';
import UploadLoader from '../Components/UploadLoader/UploadLoader';

export default function CreateMissingPost({ history }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [reward, setReward] = useState('');
  const [gender, setGender] = useState("Choose pet's  gender");
  const [breed, setBreed] = useState("Choose pet's  breed");
  const [accessory, setAccessory] = useState('');
  const [date, setDate] = useState('');
  const [attribute, setAttribute] = useState('');

  const [vaccine, setVaccine] = useState('');
  const [type, setType] = useState("Choose pet's type");
  const [training, setTraining] = useState('');
  const [color, setColor] = useState('');

  const [imageOne, setImageOne] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );

  const [image, setImage] = useState('');

  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  const { id } = useParams();

  const createAdoptionPost = useSelector((state) => state.CreateAdoptionPost);

  // const redirect = location ? location.split('=')[1] : '/';

  const navigate = useNavigate();
  const dataport = {
    breed: breed,
    color: color,
    reward: reward,
    location: location,
    name: name,
    training: training,
    vaccine: vaccine,
    type: type,
    image: imageOne
  };

  useEffect(() => {
    if (!userInfo) {
      // history.push(redirect);
      navigate('/login');
    }
  }, [history, userInfo]);

  var petType = ['Cat', 'Dog'];
  var genderType = ['Male', 'Female'];
  var breedType = ['Breed one', 'Breed Two'];
  var healthType = ['Healthy', 'Conditioned'];
  var behaviourType = ['Calm', 'Angry'];

  const submitHandler = (e) => {
    e.preventDefault();
    if (dataport) {
      dispatch(adoptionPostCreateAction(id, dataport));
    } else {
      console.log('Data is empty');
    }
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

      setImageOne(data);
      console.log(data);
      setUploading(false);
    } catch (errror) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[100px] ">
      <h1 className="text-[24px] font-extrabold  text-primary text-center tracking-tight">
        Please provide details of missing pet
      </h1>
      <form>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet name'}
              placeholder={'Tommy'}
              type={'text'}
              setData={setName}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's color"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              setData={setColor}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's specific attribute"}
              placeholder={'Any marks or sign'}
              type={'text'}
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
              setData={setLocation}
            />
          </div>

          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet breed'}
              choiceList={breedType}
              data={breed}
              setData={setBreed}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Accessories last worn'}
              placeholder={'Accessories'}
              type={'text'}
              setData={setAccessory}
            />
          </div>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Reward'}
              placeholder={'Rewards amount in BDT'}
              type={'text'}
              setData={setReward}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Went missing on'}
              placeholder={'27/06/2022'}
              type={'date'}
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
                  accept="image/png, image/gif, image/jpeg"
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
                label={'Trained'}
                placeholder={'Tommy'}
                type={'checkbox'}
                width={'w-[70px]'}
                setData={setTraining}
              />
            </div>
            <div className="lg:w-[32%]">
              <Checkbox
                label={'Vaccinated'}
                placeholder={'Tommy'}
                type={'checkbox'}
                width={'w-[90px]'}
                setData={setVaccine}
              />
            </div>
          </div>
        </div>

        <div onClick={submitHandler}>
          <Button text={'Create Post'} />
        </div>
      </form>
    </div>
  );
}
