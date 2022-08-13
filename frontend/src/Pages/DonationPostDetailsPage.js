import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { donationPostByIdAction } from '../actions/donationPostActions';
import { donationCreateAction } from '../actions/donationActions';
import Loader from '../Components/Loader';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Message from '../Components/Message';
import Button from '../Components/Button';
import Topbar from '../Components/Topbar';

const DonationCover = ({ data }) => {
  useEffect(() => {
    gsap.from('.donation-details-animation', {
      y: '+=60',
      autoAlpha: 0,
      stagger: 0.2
    });
    gsap.to('.donation-details-animation', {
      y: '0',
      autoAlpha: 1,
      stagger: 0.2
    });
  }, []);
  return (
    <>
      <div
        className="w-[100%]  h-[300px] lg:h-[400px] custom-round donation-details-animation"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="flex justify-between items-center">
        <div className="bg-primary-light w-[100px] flex items-center justify-center py-3 custom-round mt-5 donation-details-animation">
          <h2 className="text-[14px] font-bold text-gray-light">{data.type}</h2>
        </div>
        <div className="flex items-center mt-2">
          <img src="/assets/Icons/location.svg"></img>
          <h3 className="ml-2 text-gray-light text-[14px]">{data.location}</h3>
        </div>
      </div>
    </>
  );
};
const DonationHeader = ({ data }) => {
  return (
    <>
      <h1 className="donation-details-animation font-extrabold tracking-tight text-[24px] text-primary leading-7 my-4">
        Make a <span className="text-brand">donation</span> ; Help {data.name}{' '}
        live a healthy life
      </h1>
      <p className="text-[14px] text-gray-light leading-4 donation-details-animation">
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
      <div className="w-full h-[8px] bg-gray bg-opacity-40 mt-8 donation-details-animation">
        <div className={`bg-brand h-full`} style={{ width: widthClass }}></div>
      </div>
      <div className="flex mt-3 justify-between donation-details-animation">
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
    <div className="flex items-center donation-details-animation">
      <div
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="w-[30px]  bg-brand h-[30px] rounded-full"
      ></div>
      <div
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="ml-[-15px] bg-primary w-[30px] h-[30px] rounded-full"
      ></div>
      <div
        style={{
          backgroundImage: `url("/assets/adoption/cat.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="ml-[-15px] bg-blue w-[30px] h-[30px] rounded-full"
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
    <div className="mt-16 lg:mt-[0px] donation-details-animation lg:w-[70%]">
      <h1 className="font-extrabold tracking-tight text-[20px] text-primary leading-5 ">
        How your donation help us take care of helpless animals
      </h1>
      <p className="text-[14px] text-gray-light leading-4 mt-4">
        We spend your donation money buying food and medicine for sick and
        hungry animals. Majority of the cost goes to pay the hospital and
        treatment bills. After that, the remaining amount of donation money is
        used to find a rehabilitation shelter for the animal.
      </p>
      <img
        src="/assets/Icons/DonationSteps.svg"
        className="w-[100%] mt-4  h-[500px] custom-round donation-details-animation"
      ></img>
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
  remains,
  success,
  donationCreateLoading
}) => {
  return (
    <>
      {modal && (
        <div
          className={`fixed z-[990] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center`}
        >
          <div
            className={`donation-modal-animation w-[90vw] lg:w-[600px]  bg-white shadow-xl
               absolute z-[999] py-8 px-6 mx-auto custom-round overflow-hidden`}
          >
            <div
              className={` w-[40px] h-[40px] absolute right-3 cursor-pointer flex items-center justify-center`}
              onClick={() => setModal(false)}
            >
              <CrossIcon />
            </div>

            <h2 className="donation-modal-animation font-bold tracking-tight mt-10">
              Payment Amount
            </h2>
            {donationCreateLoading && <UploadLoader />}
            {success && (
              <Message message={'Donated successfully!'} variant={'success'} />
            )}

            <form onSubmit={(e) => handleDonation(e, amountofmoney)}>
              <input
                type="number"
                placeholder="Amount"
                value={amountofmoney}
                onChange={(e) => setAmountofmoney(e.target.value)}
                required
                className="donation-modal-animation w-[100%] py-4 border border-[#000000] custom-round px-4 my-3 font-[500] text-[14px] focus:border-brand active:border-brand focus:border-[1px] active:border-[1px] outline-none"
              ></input>
              <button
                text="Donate with Bkash"
                disabled={remains <= 0}
                className={` donation-modal-animation text-white custom-round ${
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
              className="donation-modal-animation font-bold tracking-tight  text-gray-light w-[100px] mt-8 cursor-pointer"
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationPostByIdDataSet = useSelector(
    (state) => state.donationPostByIdStore
  );
  const { loading, error, donationPostById } = donationPostByIdDataSet;

  const donationCreateDataSet = useSelector((state) => state.donationStore);
  const {
    loading: donationCreateLoading,
    success,
    donation
  } = donationCreateDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(donationPostByIdAction(id));
  }, [dispatch]);

  const handleDonation = (e, amountofmoney) => {
    e.preventDefault();
    dispatch(donationCreateAction(amountofmoney, id, userInfo.id));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        donationPostById && (
          <div className="lg:w-3/4 w-[90vw] mx-auto mt-[180px] mb-[40px] lg:flex justify-start  overflow-y-hidden">
            <Topbar
              address={`Home/Donation/Post/${donationPostById.id}`}
              link={'/ongoingdonations'}
            />

            <div className="lg:mr-10  lg:w-[80%] donation-details-animation ">
              <DonationCover data={donationPostById} />
              <DonationHeader data={donationPostById} />
              <DonationBar data={donationPostById} />
              <div className=" flex  justify-between mt-5">
                <DonatorAvatar data={donationPostById} />
                {userInfo && userInfo.role[0].id != 1 && (
                  <div
                    onClick={() => setModal(true)}
                    className="donation-details-animation"
                  >
                    <Button
                      width={true}
                      text={'Donate Now'}
                      widthClass={'w-[100px]'}
                    />
                  </div>
                )}
              </div>
            </div>

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
              donationCreateLoading={donationCreateLoading}
            />
          </div>
        )
      )}
    </>
  );
}
