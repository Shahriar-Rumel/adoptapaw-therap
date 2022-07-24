import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Components/Button';
import { useParams } from 'react-router-dom';
import { donationPostByIdAction } from '../actions/donationPostActions';
import Loader from '../Components/Loader';
import { stringify } from 'postcss';
import { donationCreateAction } from '../actions/donationActions';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Message from '../Components/Message';

const DonationCover = ({ data }) => {
  return (
    <>
      <div
        className="w-[100%]  h-[300px] lg:h-[400px] custom-round"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="bg-primary-light w-[100px] flex items-center justify-center py-3 custom-round mt-5">
        <h2 className="text-[14px] font-bold text-gray-light">{data.type}</h2>
      </div>
    </>
  );
};
const DonationHeader = ({ data }) => {
  return (
    <>
      <h1 className="font-extrabold tracking-tight text-[24px] text-primary leading-7 my-4">
        Make a <span className="text-brand">donation</span> ; Help {data.name}{' '}
        live a healthy life
      </h1>
      <p className="text-[14px] text-gray-light leading-4">
        {data.description}
      </p>
    </>
  );
};
const DonationBar = ({ data }) => {
  let target = Number.parseInt(data.targetamount);
  let remainingamount = Number.parseInt(
    data.remainingamount > 0 ? data.remainingamount : 0
  );
  let width = ((target - remainingamount) * 100) / target;
  let widthClass = width + '%';

  return (
    <>
      <div className="w-full h-[8px] bg-gray bg-opacity-40 mt-8">
        <div className={`bg-brand h-full`} style={{ width: widthClass }}></div>
      </div>
      <div className="flex mt-3 justify-between">
        <div className="flex">
          <h3 className="text-gray-light mr-5">Target</h3>
          <h3 className="font-bold mr-5">{data.targetamount}</h3>
        </div>
        <div className="flex">
          <h3 className="text-gray-light mr-5">Remaining</h3>
          <h3 className="font-bold">
            {data.remainingamount > 0 ? data.remainingamount : '0'}
          </h3>
        </div>
      </div>
    </>
  );
};

const DonatorAvatar = ({ data }) => {
  return (
    <div className="flex items-center">
      <div
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="w-[30px] h-[30px] rounded-full"
      ></div>
      <div
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="ml-[-15px] w-[30px] h-[30px] rounded-full"
      ></div>
      <div
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="ml-[-15px] w-[30px] h-[30px] rounded-full"
      ></div>
      <h3 className="text-gray-light font-bold tracking-tight ml-5">
        <span className="text-primary text-extrabold mr-1">
          {data.peopledonated}+
        </span>
        Donations
      </h3>
    </div>
  );
};

const DonationPurpose = () => {
  return (
    <div className="mt-16 lg:mt-[-40px] ">
      <h1 className="font-extrabold tracking-tight text-[20px] text-primary leading-7 my-4">
        How your donation help us take care of helpless animals
      </h1>
      <p className="text-[14px] text-gray-light leading-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat felis
        eu tincidunt cursus. Quam venenatis, id cras viverra at volutpat
        dictumst in fringilla.
      </p>
      <div
        className="w-[100%] mt-5  h-[500px] custom-round"
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </div>
  );
};

const CrossIcon = () => {
  return (
    <div>
      <div className="w-[25px] h-[3px] bg-primary rotate-45  ml-1"></div>
      <div className="w-[25px] h-[3px] bg-primary rotate-[-45deg] mt-[-3px] ml-1"></div>
    </div>
  );
};
const DonationModal = ({
  modal,
  setModal,
  handleDonation,
  amountofmoney,
  setAmountofmoney,
  target,
  remains,
  success
}) => {
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);
  useEffect(() => {
    gsap.from('.donation-animation', { y: '+=100', opacity: 0, stagger: 0.2 });
    gsap.to('.donation-animation', { y: '0', opacity: 1, stagger: 0.2 });
  }, [modal]);
  return (
    <>
      {modal && (
        <div
          className={`fixed z-[990] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center`}
        >
          <div
            className={` donation-animation w-[90vw] lg:w-[600px]  bg-white shadow-xl
               absolute z-[999] py-8 px-6 mx-auto custom-round overflow-hidden`}
          >
            <div
              className={` w-[40px] h-[40px] absolute right-3 cursor-pointer flex items-center justify-center`}
              onClick={() => setModal(false)}
            >
              <CrossIcon />
            </div>

            <h2 className=" donation-animation font-bold tracking-tight mt-10">
              Payment Amount
            </h2>
            {success && (
              <Message message={'Donated successfully!'} variant={'success'} />
            )}
            {/* <div className="mt-5 flex justify-between donation-animation">
              <div
                className={`${
                  monthly ? `bg-[#000000]` : 'bg-none border border-[#000000]'
                } cursor-pointer w-[47%] custom-round h-[55px] flex items-center justify-center donation-animation`}
                onClick={() => {
                  setMonthly(true);
                  setYearly(false);
                }}
              >
                <h2 className={monthly ? 'text-white' : 'text-[black]'}>
                  Monthly
                </h2>
              </div>
              <div
                className={`${
                  yearly ? `bg-[#000000]` : 'bg-none border border-[#000000]'
                } cursor-pointer w-[47%] custom-round h-[55px] flex items-center justify-center donation-animation`}
                onClick={() => {
                  setMonthly(false);
                  setYearly(true);
                }}
              >
                <h2 className={yearly ? 'text-white' : 'text-[black]'}>
                  Yearly
                </h2>
              </div>
            </div> */}
            <form onSubmit={(e) => handleDonation(e, amountofmoney)}>
              <input
                type="number"
                placeholder="Amount"
                value={amountofmoney}
                onChange={(e) => setAmountofmoney(e.target.value)}
                required
                className="donation-animation w-[100%] py-4 border border-[#000000] custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></input>
              <button
                text="Donate with Bkash"
                disabled={remains <= 0}
                className={` donation-animation text-white custom-round ${
                  remains <= 0
                    ? `bg-gray-light`
                    : `bg-[#D12053] hover:bg-[#a61a41]`
                }    w-[100%] py-4 flex items-center justify-center`}
              >
                <img src="/assets/icons/bkash.svg" className="mr-2"></img>
                Donate with Bkash
              </button>
            </form>

            <h2
              className="donation-animation font-bold tracking-tight  text-gray-light w-[100px] mt-8 cursor-pointer"
              onClick={() => setModal(false)}
            >
              Maybe Later
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default function DonationPostDetailsPage() {
  const [modal, setModal] = useState(false);
  const [amountofmoney, setAmountofmoney] = useState();

  const dispatch = useDispatch();

  const donationPostByIdDataSet = useSelector(
    (state) => state.donationPostByIdStore
  );
  const donationCreateDataSet = useSelector(
    (state) => state.donationGiverStore
  );

  const {
    loading: donationCreateLoading,
    success,
    donationGiver
  } = donationCreateDataSet;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error, donationPostById } = donationPostByIdDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(donationPostByIdAction(id));
  }, [dispatch]);

  const handleDonation = (e, amountofmoney) => {
    e.preventDefault();
    console.log(amountofmoney);
    dispatch(donationCreateAction(amountofmoney, id, userInfo.id));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        donationPostById && (
          <div className="lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[40px] lg:flex justify-start items-center">
            <div className="lg:mr-10 lg:w-[80%] ">
              <DonationCover data={donationPostById} />
              <DonationHeader data={donationPostById} />
              <DonationBar data={donationPostById} />
              <div className=" flex  justify-between mt-5">
                <DonatorAvatar data={donationPostById} />
                <div onClick={() => setModal(true)}>
                  <Button
                    width={true}
                    text={'Donate Now'}
                    widthClass={'w-[100px]'}
                  />
                </div>
              </div>
            </div>
            {donationCreateLoading && <UploadLoader />}
            <DonationPurpose />
            <DonationModal
              modal={modal}
              setModal={setModal}
              handleDonation={handleDonation}
              amountofmoney={amountofmoney}
              setAmountofmoney={setAmountofmoney}
              target={donationPostById.targetamount}
              remains={donationPostById.remainingamount}
              success={success}
            />
          </div>
        )
      )}
    </>
  );
}
