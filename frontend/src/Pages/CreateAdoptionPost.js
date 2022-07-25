import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostCreateAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import Checkbox from '../Components/IO/Checkbox';
import SelectBox from '../Components/IO/SelectBox';
import TextInput from '../Components/IO/TextInput';
import Loader from '../Components/Loader';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Message from '../Components/Message';

const FileUpload = ({ rawData, setData, setUploading, userInfo, id }) => {
  const uploadFileHandler = async (e) => {
    const BASE_URL = 'http://localhost:8081';

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

      setData(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <>
      <label
        htmlFor={id}
        style={{
          backgroundImage: `url(${rawData})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="text-[12px] block mt-5 lg:mt-0 w-[100%] lg:w-[32%] h-[300px] lg:h-[200px] xl:h-[300px] 2xl:h-[400px] cursor-pointer font-bold text-[transparent] py-[35px] px-[25px]  custom-round"
      ></label>
      <input
        id={id}
        onChange={uploadFileHandler}
        required
        style={{ visibility: 'hidden' }}
        className="absolute"
        type={'file'}
        accept="image/png, image/gif, image/jpeg"
      ></input>
    </>
  );
};

export default function CreateAdoptionPost() {
  const [name, setName] = useState('');
  const [behaviour, setBehaviour] = useState('');
  const [location, setLocation] = useState('');
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [physicalcondition, setPhysicalcondition] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [stray, setStray] = useState('');
  const [type, setType] = useState('');
  const [training, setTraining] = useState('');
  const [color, setColor] = useState('');
  const [empty, setEmpty] = useState(false);
  const [imageOne, setImageOne] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );
  const [imageTwo, setImageTwo] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );
  const [imageThree, setImageThree] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );

  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createAdoptionPost = useSelector((state) => state.adoptionPostCreated);
  const { loading, success, adoptionPost } = createAdoptionPost;

  const navigate = useNavigate();
  const { id } = useParams();

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
    imageone: imageOne,
    imagetwo: imageTwo,
    imagethree: imageThree
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  var petType = ['Cat', 'Dog'];
  var genderType = ['Male', 'Female'];
  var healthType = ['Healthy', 'Conditioned'];
  var behaviourType = ['Playful', 'Calm'];

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      dataport.behaviour &&
      dataport.breed &&
      dataport.color &&
      dataport.description &&
      dataport.food &&
      dataport.gender &&
      dataport.location &&
      dataport.name &&
      dataport.physicalcondition &&
      dataport.type &&
      dataport.imageone &&
      dataport.imagetwo &&
      dataport.imagethree
    ) {
      dispatch(adoptionPostCreateAction(id, dataport));
      setEmpty(false);
      setBehaviour('');
      setBreed('');
      setColor('');
      setDescription('');
      setFood('');
      setGender('');
      setLocation('');
      setName('');
      setPhysicalcondition('');
      setTraining('');
      setVaccine('');
      setType('');
    } else {
      setEmpty(true);
      console.log('Data is empty');
    }
  };

  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[120px] mb-[100px] ">
      <h1 className="text-[30px] font-extrabold mt-14 text-primary  tracking-tighter">
        Please enter the details of your pet
      </h1>
      <p className="text-[14px] text-gray-light mb-8">
        Please enter the details of your pet
      </p>
      {empty && (
        <Message
          message={'Please fill in all the fields !'}
          variant={'danger'}
        />
      )}
      {success && (
        <Message message={'Post created successfully!'} variant={'success'} />
      )}
      {loading && <Loader />}
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
            <TextInput
              minHeight={200}
              label={'Pet breed'}
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
              <div className="w-[100%] lg:border-dashed lg:border-2 custom-round lg:py-3 lg:px-3 border-offwhite lg:flex items-center justify-between">
                <FileUpload
                  rawData={imageOne}
                  setData={setImageOne}
                  setUploading={setUploading}
                  userInfo={userInfo}
                  id={'one'}
                />
                <FileUpload
                  rawData={imageTwo}
                  setData={setImageTwo}
                  setUploading={setUploading}
                  userInfo={userInfo}
                  id={'two'}
                />
                <FileUpload
                  rawData={imageThree}
                  setData={setImageThree}
                  setUploading={setUploading}
                  userInfo={userInfo}
                  id={'three'}
                />
              </div>
            </div>
          </div>
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
