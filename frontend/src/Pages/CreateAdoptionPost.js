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

export default function CreateAdoptionPost({ history }) {
  const [name, setName] = useState('');
  const [behaviour, setBehaviour] = useState("Choose pet's behaviour");
  const [location, setLocation] = useState('');
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState("Choose pet's  gender");
  const [breed, setBreed] = useState("Choose pet's  breed");
  const [physicalcondition, setPhysicalcondition] = useState(
    "Choose pet's physical condition"
  );
  const [vaccine, setVaccine] = useState('');
  const [stray, setStray] = useState('');
  const [type, setType] = useState("Choose pet's type");
  const [training, setTraining] = useState('');
  const [color, setColor] = useState('');

  const [imageOne, setImageOne] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );
  const [imageTwo, setImageTwo] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );
  const [imageThree, setImageThree] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );

  const [image, setImage] = useState('Upload Image');

  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  const { id } = useParams();

  const createAdoptionPost = useSelector((state) => state.CreateAdoptionPost);

  // const redirect = location ? location.split('=')[1] : '/';

  const navigate = useNavigate();
  const dataport = {
    behaviour: behaviour,
    breed: breed,
    color: color,
    description: description,
    food: food,
    gender: gender,
    location: location,
    name: name,
    physicalcondition: physicalcondition,
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
        Please enter the details of your pet
      </h1>
      <form>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Location'}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              setData={setLocation}
            />
          </div>

          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet type'}
              choiceList={petType}
              data={type}
              setData={setType}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet name'}
              placeholder={'Tommy'}
              type={'text'}
              setData={setName}
            />
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet description'}
              placeholder={'Lorep impsum ...'}
              type={'text'}
              setData={setDescription}
            />
          </div>
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet gender'}
              choiceList={genderType}
              data={gender}
              setData={setGender}
            />
          </div>
          {uploading && (
            <div className="fixed z-[999] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center">
              <UploadLoader />
            </div>
          )}
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet breed'}
              choiceList={breedType}
              data={breed}
              setData={setBreed}
            />
          </div>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet behaviour'}
              choiceList={behaviourType}
              data={behaviour}
              setData={setBehaviour}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's food"}
              placeholder={'Meat'}
              type={'text'}
              setData={setFood}
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
        </div>
        <div className="flex justify-between items-center my-16  lg:py-[100px]">
          <div className="w-[32%] lg:w-[33%] ">
            <div className="">
              <label
                htmlFor="filePicker"
                style={{
                  backgroundImage: `url(${imageOne})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                className=" text-[12px]  cursor-pointer font-bold text-[transparent] py-[50px] px-[25px]  custom-round"
              >
                {image}
              </label>
              <input
                id="filePicker"
                onChange={uploadFileHandler}
                required
                style={{ visibility: 'hidden' }}
                type={'file'}
              ></input>
            </div>

            {/* <div className="flex flex-col my-3 request-form-animation">
              <label className="font-bold text-primary text-[14px]">
                Upload First Image
              </label>
              <input
                type="file"
                onChange={uploadFileHandler}
                required
                className="bg-input py-4 custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></input>
            </div> */}
          </div>
          {/* <div className="w-[32%] lg:w-[33%]">
            <ImageInput />
          </div>
          <div className="w-[32%] lg:w-[33%]">
            <ImageInput />
          </div> */}
        </div>
        <SelectBox
          minHeight={200}
          label={"Pet's physical condition"}
          choiceList={healthType}
          data={physicalcondition}
          setData={setPhysicalcondition}
        />
        <div className="flex justify-between">
          <Checkbox
            label={'Vaccinated'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[90px]'}
            setData={setVaccine}
          />
          <Checkbox
            label={'Stray'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[50px]'}
            setData={setStray}
          />
          <Checkbox
            label={'Trained'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[70px]'}
            setData={setTraining}
          />
        </div>
        <div onClick={submitHandler}>
          <Button text={'Create Post'} />
        </div>
      </form>
    </div>
  );
}
