import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import TextInput from '../IO/TextInput';
import axios from 'axios';
import UploadLoader from '../UploadLoader/UploadLoader';
import { missingInfoCreateAction } from '../../actions/missingInfoActions';
import Message from '../Message';
import { PRODUCTION_URL } from '../../Utils/Production';

const BASE_URL = PRODUCTION_URL;

export default function MissingAnimalDataModal({ data, setModal }) {
  const [image, setImage] = useState();
  const [location, setLocation] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const missingInfoData = useSelector((state) => state.missingInfo);
  const { loading, success, error } = missingInfoData;

  useEffect(() => {
    gsap.fromTo(
      '.missing-data-animation',
      { y: '+=60', autoAlpha: 0, stagger: 0.2 },
      { y: '0', autoAlpha: 1, stagger: 0.2 }
    );
  }, []);

  const dataport = {
    location: location,
    image: image,
    mobile: mobile,
    email: email
  };

  const { id } = useParams();
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
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
    dispatch(missingInfoCreateAction(id, dataport));
    setEmail('');
    setLocation('');
    setImage('');
    setMobile('');
  };
  console.log(email, mobile, location);
  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto  mb-[160px] absolute top-[140px] bg-white   z-[700]  shadow-lg p-8 custom-round">
      <div className="lg:flex lg:flex-row-reverse justify-between items-center  ">
        <div className="relative lg:w-[45%]">
          <div
            onClick={() => setModal(false)}
            className="cursor-pointer absolute  ml-[90%] lg:ml-[95%] mt-[-40px] lg:mt-[-150px] z-[800]"
          >
            <div className="w-[24px] h-[3px] bg-primary rotate-45 mt-1"></div>
            <div className="w-[24px] h-[3px] bg-primary -rotate-45 mt-[-3px] "></div>
          </div>
          <div
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
            src="/assets/DogBox.svg"
            className="mx-auto bg-primary custom-round w-[100%] h-[300px] lg:w-[100%] lg:pl-6 missing-data-animation lg:h-[400px] mt-[40px] "
          ></div>
        </div>

        <div className="lg:w-[50%] mt-[40px] lg:mt-0">
          <h1 className="font-extrabold text-[18px] lg:text-[24px] missing-data-animation  text-primary tracking-tight  text-left w-[100%] lg:w-[100%] leading-4 lg:leading-6 ">
            Do you have any information about {data.name}?
          </h1>

          <p className="missing-data-animation text-[14px]  text-gray-light mb-5 mt-3 ">
            Please fill in the form to let us know
          </p>

          {success && (
            <Message
              message={'Missing Information sent successfully!'}
              variant={'success'}
            />
          )}
          {error && <Message message={error} variant={'danger'} />}
          {loading && <UploadLoader />}
          <form onSubmit={submitHandler}>
            <div className="missing-data-animation">
              <TextInput
                type={'text'}
                label={`Location of ${data.name}`}
                placeholder={'Dhanmondi , Dhaka'}
                data={location}
                setData={setLocation}
              />
            </div>
            <div className="lg:flex relative justify-between items-center my-4 missing-data-animation">
              <div className="w-[100%]">
                <h2 className="font-bold text-primary text-[14px] mb-4">
                  Plase Upload Image of {data.name}
                </h2>
                <div className="w-[100%] lg:w-[100%] missing-data-animation">
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
                      className="text-[12px] block  w-[100%] lg:w-[200px] h-[300px] lg:h-[200px] cursor-pointer font-bold text-[transparent] py-[35px] px-[25px]  custom-round"
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
            <div className="missing-data-animation">
              <TextInput
                type={'email'}
                label={'Your Email'}
                placeholder={'demo@gmail.com'}
                data={email}
                setData={setEmail}
              />
            </div>{' '}
            <div className="missing-data-animation">
              <TextInput
                type={'number'}
                label={'Your Mobile Number'}
                placeholder={'01xxxxxxxx'}
                data={mobile}
                setData={setMobile}
              />
            </div>
            <div className="missing-data-animation">
              <Button text="Send"></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
