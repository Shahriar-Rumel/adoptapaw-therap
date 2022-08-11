import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostUpdateAction } from '../../actions/adoptionActions';
import Button from '../Button';
import Checkbox from '../IO/Checkbox';
import SelectBox from '../IO/SelectBox';
import TextInput from '../IO/TextInput';
import Loader from '../Loader';
import UploadLoader from '../UploadLoader/UploadLoader';
import Message from '../Message';
import { PRODUCTION_URL } from '../../Utils/Production';

const BASE_URL = PRODUCTION_URL;

const FileUpload = ({ rawData, setData, setUploading, userInfo, id }) => {
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
        accept="image/*"
      ></input>
    </>
  );
};

export default function UserAdoptionPostDetailsEdit({
  data,
  setModal,
  setRefresh
}) {
  const [name, setName] = useState(data.name);
  const [behaviour, setBehaviour] = useState(data.behaviour);
  const [location, setLocation] = useState(data.location);
  const [food, setFood] = useState(data.food);
  const [description, setDescription] = useState(data.description);
  const [gender, setGender] = useState(data.gender);
  const [breed, setBreed] = useState(data.breed);
  const [physicalcondition, setPhysicalcondition] = useState(
    data.physicalcondition
  );
  const [vaccine, setVaccine] = useState(
    data.vaccine === 'true' ? true : false
  );
  const [type, setType] = useState(data.type);
  const [training, setTraining] = useState(
    data.training === 'true' ? true : false
  );
  const [color, setColor] = useState(data.color);

  const [empty, setEmpty] = useState(false);
  const [mobile, setMobile] = useState(data.mobile);
  const [imageOne, setImageOne] = useState(data.imageone);
  const [imageTwo, setImageTwo] = useState(data.imagetwo);
  const [imageThree, setImageThree] = useState(data.imagethree);

  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const { id } = useParams();

  const createAdoptionPost = useSelector(
    (state) => state.adoptionPostUpdateStore
  );

  const { loading, error, success } = createAdoptionPost;

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
    imageone: imageOne,
    imagetwo: imageTwo,
    imagethree: imageThree,
    mobile: mobile
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
      dispatch(adoptionPostUpdateAction(id, dataport));
      setRefresh(true);
    } else {
      setEmpty(true);
      console.log('Data is empty');
    }
  };

  return (
    <div className="w-full mx-auto  mb-[100px]  bg-white  z-[700]  shadow-lg p-8 custom-round">
      <div className="flex justify-between items-center ">
        <h1 className="text-[30px] font-extrabold text-primary   tracking-tighter">
          Edit Post
        </h1>
        <div onClick={() => setModal(false)} className="cursor-pointer">
          <div className="w-[24px] h-[3px] bg-primary rotate-45 mt-1"></div>
          <div className="w-[24px] h-[3px] bg-primary -rotate-45 mt-[-3px] "></div>
        </div>
      </div>

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
        <Message message={'Post updated successfully!'} variant={'success'} />
      )}
      {error && <Message message={error} variant={'danger'} />}
      {loading && <Loader />}
      <form>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet name'}
              type={'text'}
              data={name}
              setData={setName}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Location'}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              data={location}
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
              type={'textarea'}
              data={description}
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
              data={food}
              setData={setFood}
            />
          </div>

          <div className="lg:w-[32%]">
            <TextInput
              label={'Mobile Number'}
              placeholder={'017xxxxxxx'}
              type={'number'}
              setData={setMobile}
              data={mobile}
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
        <div className="flex justify-between">
          <div className="lg:w-[48%]">
            <SelectBox
              minHeight={200}
              label={"Pet's physical condition"}
              choiceList={healthType}
              data={physicalcondition}
              setData={setPhysicalcondition}
            />
          </div>
          <div className="lg:w-[48%]">
            <TextInput
              label={"Pet's color"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              data={color}
              setData={setColor}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Checkbox
            label={'Vaccinated'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[90px]'}
            data={vaccine}
            setData={setVaccine}
          />

          <Checkbox
            label={'Trained'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[70px]'}
            data={training}
            setData={setTraining}
          />
        </div>
        <div onClick={submitHandler}>
          <Button text={'Update Post'} />
        </div>
      </form>
    </div>
  );
}
