import React from 'react';
import Button from '../Button';
import TextBlock from '../TextBlock';
import { useDispatch, useSelector } from 'react-redux';
import { adminAdoptionRequestApproveAction } from '../../actions/adminActions';
import Message from '../Message';
import UploadLoader from '../UploadLoader/UploadLoader';

export default function UserAdoptionDetailsLeft({ data, userInfo }) {
  const dispatch = useDispatch();
  const adoptionRequestApprovedData = useSelector(
    (state) => state.adoptionRequestApprove
  );

  const { loading, success, error } = adoptionRequestApprovedData;

  const approveHandler = (e, uid, id) => {
    e.preventDefault();
    dispatch(adminAdoptionRequestApproveAction(uid, id));
  };

  return (
    <>
      {data && userInfo && (
        <div className="">
          {error && <Message message={error} variant={'danger'} />}
          {success && (
            <Message message={'Request Approved!'} variant={'success'} />
          )}
          {loading && <UploadLoader />}
          <div className="flex  justify-between items-center mt-[32px] shadow-md px-6 py-4 custom-round">
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
          {userInfo.role[0].id != 1 && data.status && (
            <div className="flex w-full bg-green bg-opacity-10 justify-between items-center mt-[12px] shadow-md px-6 py-4 custom-round">
              <div className="w-full">
                <h2 className="text-[18px] font-extrabold tracking-tighter text-primary ">
                  Your adoption request has been approved
                </h2>
                <p className="text-[12px] text-gray-light ">
                  Contact the owner and get {data.pet.name}{' '}
                </p>
                <div className="flex justify-between items-center mt-5">
                  <a href={`tel:${data.mobile}`}>
                    <button className="bg-brand h-[45px] w-[120px] custom-round text-white font-regular">
                      Call owner
                    </button>
                  </a>
                  <h2 className="font-bold text-[16px] tracking-2 text-primary">
                    {data.mobile}
                  </h2>
                </div>
              </div>
            </div>
          )}

          <div className="shadow-md px-6 py-6 custom-round">
            <TextBlock header={'Reason for Adoption'} content={data.rfa} />
            <div className="grid grid-cols-2 md:grid-cols-2">
              <TextBlock
                header={'Name'}
                content={data.adoptionseeker.username}
              />
              <TextBlock header={'Location'} content={data.pet.location} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2">
              <TextBlock header={'Mobile Number'} content={data.mobile} />
              <TextBlock header={'Email'} content={data.email} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2">
              <TextBlock
                header={"Had pet's before"}
                content={data.hadpet ? 'Yes' : 'No'}
              />
              <TextBlock
                header={'Self-Pick Up'}
                content={data.hadpet ? 'Yes' : 'No'}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2">
              <TextBlock
                header={'Requested at'}
                content={
                  data.requestdate ? data.requestdate.substring(0, 19) : 'N/A'
                }
              />
              <TextBlock
                header={'Approved at'}
                content={
                  data.approveddate ? data.approveddate.substring(0, 19) : 'N/A'
                }
              />
            </div>
          </div>
          {userInfo.role[0].name === 'ROLE_ADMIN' && data.status === false && (
            <form
              className="mt-5 "
              onSubmit={(e) => approveHandler(e, userInfo.id, data.id)}
            >
              <Button text="Approve Request" />
            </form>
          )}
          {/* {userInfo.role[0].name === 'ROLE_ADMIN' && data.status === false && (
            <div className="mt-3">
              <Button text="Reject Request" secondary={true} />
            </div>
          )} */}
        </div>
      )}
    </>
  );
}
