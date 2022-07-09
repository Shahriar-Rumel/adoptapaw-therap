import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adoptionPostCreateAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import Checkbox from '../Components/Checkbox';
import ChoiceInput from '../Components/ChoiceInput';
import SelectBox from '../Components/SelectBox';
import TextInput from '../Components/TextInput';

export default function CreateAdoptionPost({ history }) {
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

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

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
    type: type
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

  const submitHandler = () => {
    console.log(dataport);
    if (dataport) {
      dispatch(adoptionPostCreateAction(dataport));
    } else {
      console.log('Data is empty');
    }
  };

  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[100px] ">
      <h1 className="text-[24px] font-extrabold  text-primary text-center tracking-tight">
        Please enter the details of your pet
      </h1>
      <form>
        <div className="lg:flex justify-between items-center">
          <TextInput
            label={'Location'}
            placeholder={'Dhaka,Bangladesh'}
            type={'text'}
            setData={setLocation}
          />
          <SelectBox
            minHeight={200}
            label={'Pet type'}
            choiceList={petType}
            setData={setType}
          />
          <TextInput
            label={'Pet name'}
            placeholder={'Tommy'}
            type={'text'}
            setData={setName}
          />
        </div>

        <TextInput
          label={'Pet description'}
          placeholder={'Lorep impsum ...'}
          type={'text'}
          setData={setDescription}
        />
        <SelectBox
          minHeight={200}
          label={'Pet gender'}
          choiceList={genderType}
          setData={setGender}
        />
        <SelectBox
          minHeight={200}
          label={'Pet breed'}
          choiceList={breedType}
          setData={setBreed}
        />
        <SelectBox
          minHeight={200}
          label={'Pet behaviour'}
          choiceList={behaviourType}
          setData={setBehaviour}
        />
        <TextInput
          label={"Pet's food"}
          placeholder={'Meat'}
          type={'text'}
          setData={setFood}
        />
        <TextInput
          label={"Pet's color"}
          placeholder={'Dhaka,Bangladesh'}
          type={'text'}
          setData={setColor}
        />

        <SelectBox
          minHeight={200}
          label={"Pet's physical condition"}
          choiceList={healthType}
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
