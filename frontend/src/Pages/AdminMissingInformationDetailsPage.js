import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adoptionRequestByIdAction } from '../actions/adoptionRequestActions';
import { missingInfoByIdAction } from '../actions/missingInfoActions';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import TextBlock from '../Components/TextBlock';
import Topbar from '../Components/Topbar';
import Message from '../Components/Message';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Features from '../Components/Adoption/Features';
import RewardCard from '../Components/Cards/RewardCard';
import { adminMissingInfoApproveAction } from '../actions/adminActions';
import { MISSING_INFO_APPROVE_RESET } from '../constants/missingInfoConstants';

const MissingInformationDetailsLeft = ({ data, userInfo }) => {
  const dispatch = useDispatch();

  const missingInfoApprovedData = useSelector(
    (state) => state.missingInfoApprove
  );
  const { loading, success, error } = missingInfoApprovedData;

  const approveHandler = (e, uid, id) => {
    e.preventDefault();
    dispatch(adminMissingInfoApproveAction(uid, id));
  };

  useEffect(() => {
    dispatch({
      type: MISSING_INFO_APPROVE_RESET
    });
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <>
      {data && userInfo && (
        <div className="">
          {error && <Message message={error} variant={'danger'} />}
          {success && (
            <Message message={'Request Approved!'} variant={'success'} />
          )}
          {loading && <UploadLoader />}
          <div className="flex  justify-between items-center mt-[32px] shadow-md  px-6 py-4 pt-[20px] custom-round">
            <h2 className="text-[20px] font-extrabold tracking-tight text-primary ">
              Status
            </h2>
            <div className="flex items-center">
              <img
                src={
                  data.status
                    ? `/assets/icons/approvedgreen.svg`
                    : `/assets/icons/pending.svg`
                }
                className="w-[18px]"
              ></img>
              <h2
                className={`ml-2 ${
                  data.status ? `text-green` : `text-blue`
                } font-bold`}
              >
                {data.status ? 'Approved' : 'Pending'}
              </h2>
            </div>
          </div>
          <div className="shadow-md px-6 py-6 custom-round">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center   ">
              <div className="lg:w-[50%]">
                <div className="flex justify-between lg:block">
                  <TextBlock header={'Mobile Number'} content={data.mobile} />
                  <TextBlock header={'Email'} content={data.email} />
                </div>

                <TextBlock header={'Location'} content={data.pet.location} />
              </div>
              <div
                className="custom-round mt-[40px] bg-primary description-image-animation w-[100%] lg:w-[50%] h-[300px] lg:h-[250px] mx-auto  ease-in-out duration-300"
                style={{
                  backgroundImage: `url(${data.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2">
              <TextBlock
                header={'Received at'}
                content={
                  data.requestdate
                    ? data.requestdate.substring(0, 19) + ' BDT'
                    : 'N/A'
                }
              />
              <TextBlock
                header={'Approved at'}
                content={
                  data.approvedate
                    ? data.approvedate.substring(0, 19) + ' BDT'
                    : 'N/A'
                }
              />
            </div>
          </div>
          {/* {userInfo.role[0].name === 'ROLE_ADMIN' && data.status === false && (
            <form className="mt-5 ">
              <Button text="Mail User" brand={true} />
            </form>
          )} */}
          {userInfo.role[0].name === 'ROLE_ADMIN' && data.status === false && (
            <form
              className="mt-3 "
              onSubmit={(e) => approveHandler(e, userInfo.id, data.id)}
            >
              <Button text="Mark as Found" />
            </form>
          )}
        </div>
      )}
    </>
  );
};
const MissingInformationDetailsRight = ({ data }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col items-center justify-between">
          <div className="w-[100%]  description-gallery-animation">
            <div
              className="custom-round description-image-animation w-[100%] h-[250px] mx-auto md:h-[300px] md:w-[100%] lg:h-[400px] lg:w-[100%] ease-in-out duration-300"
              style={{
                backgroundImage: `url(${data.pet.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
          </div>
          <div className="w-[100%] ">
            <div className="mt-[20px] mb-5 lg:mt-[20px]  description-gallery-animation flex justify-between items-center">
              <h1 className="text-[32px] font-black text-primary tracking-tighter">
                {data.pet.name}
              </h1>
              <h1
                className={`font-bold tracking-tigther text-[14px]  ${
                  data.pet.stillmissing ? 'text-red' : 'text-green'
                }`}
              >
                {data.pet.stillmissing ? 'Still Missing' : 'Found'}
              </h1>
            </div>
            <div className="w-[100%] flex justify-between bg-white shadow-md px-3 py-3 custom-round">
              <div className="text-[12px] flex-col font-bold text-primary first-letter:py-2 flex justify-between items-center">
                <h3>Specific Attribute</h3>
                <h3 className="text-gray-light">
                  {data.pet.specificattribute}
                </h3>
              </div>
              <div className=" flex-col text-[12px] font-bold text-primary first-letter:py-2 flex justify-between items-center">
                <h3>Accessories Last Worn</h3>
                <h3 className="text-gray-light">
                  {data.pet.accessorieslastworn}
                </h3>
              </div>
            </div>
            <div className=" mt-4">
              <RewardCard name={data.pet.name} reward={data.pet.rewards} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function AdminMissingInformationDetailsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const missingInformationByIdData = useSelector(
    (state) => state.missingInfoByIdStore
  );
  const { loading, error, missingInfo } = missingInformationByIdData;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate('/home');
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(missingInfoByIdAction(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[95vw] lg:w-3/4  mx-auto mt-[100px] lg:mt-[150px]  mb-[100px]">
          <Topbar
            address={`Dashboard/Missing/Information/${id}`}
            link={'/admin/missing/info'}
          />
          <div className="flex items-center  w-full">
            {missingInfo && (
              <div className="flex flex-col">
                <h1 className=" w-full text-[32px]  text-primary font-extrabold text-left tracking-tight">
                  Missing Information
                </h1>
                <h2 className="font-bold text-gray-light mt-5">
                  Information ID :
                  <span className="text-primary ml-3">
                    {missingInfo.id ? missingInfo.id : 'N/A'}
                  </span>
                </h2>
              </div>
            )}
          </div>
          <div className="lg:flex lg:flex-row-reverse justify-between ">
            <div className="lg:w-[48%] lg:mr-6 request-adoption-gallery-animation lg:flex flex-col justify-between lg:min-h-[580px] xl:min-h-full ">
              <MissingInformationDetailsRight
                data={missingInfo}
                userInfo={userInfo}
              />
              {missingInfo && (
                <Link to={`/missing/${missingInfo.pet.id}`} className="mt-0">
                  <Button secondary={true} text={'Visit Post'} />
                </Link>
              )}
            </div>
            <div className="lg:w-[48%] lg:mr-10">
              <MissingInformationDetailsLeft
                data={missingInfo}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
