import React from 'react';
import Button from '../Button';
import TextBlock from '../TextBlock';

export default function UserAdoptionDetailsLeft({ data, userInfo }) {
  return (
    <>
      {data && userInfo && (
        <div className="">
          <div className="flex  justify-between items-center mt-[32px] shadow-md px-6 py-4 custom-round">
            <h2 className="text-[20px] font-extrabold tracking-tight text-primary ">
              Status
            </h2>
            <div className="flex items-center">
              <img
                src={`${
                  !data.sataus
                    ? `/assets/icons/confirmed.svg`
                    : `/assets/icons/pending.svg`
                }`}
                className="w-[16px]"
              ></img>
              <h2
                className={`ml-2 ${
                  !data.sataus ? `text-green` : `text-blue`
                } font-bold`}
              >
                {data.status ? 'Approved' : 'Pending'}
              </h2>
            </div>
          </div>
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
                  data.requestdate.split('20')[0] +
                  data.approveddate.split('BDT')[1].split(' ')[0]
                }
              />
              <TextBlock
                header={'Approved at'}
                content={
                  data.approveddate
                    ? data.approveddate.split('20')[0] +
                      data.approveddate.split('BDT')[1].split(' ')[0]
                    : 'N/A'
                }
              />
            </div>
          </div>

          {userInfo.role[0].name === 'ROLE_ADMIN' && (
            <div className="mt-5">
              <Button text="Approve Request" />
            </div>
          )}
          {userInfo.role[0].name === 'ROLE_ADMIN' && (
            <div className="mt-3">
              <Button text="Reject Request" secondary={true} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
