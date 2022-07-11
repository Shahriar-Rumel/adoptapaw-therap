import React from 'react';
import Button from '../Button';
import TextBlock from '../TextBlock';

export default function UserAdoptionDetailsLeft() {
  return (
    <div className="">
      <div className="flex  justify-between items-center mt-[32px] shadow-md px-6 py-4 custom-round">
        <h2 className="text-[20px] font-bold tracking-tight text-primary ">
          Status
        </h2>
        <div className="flex items-center">
          <img src="/assets/icons/pending.svg" className="w-[16px]"></img>
          <h2 className="ml-2 text-blue font-bold">Pending</h2>
        </div>
      </div>
      <div className="shadow-md px-6 py-6 custom-round">
        <TextBlock
          header={'Reason for Adoption'}
          content={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices pellentesque velit a donec euismod. Tincidunt tempus, massa consequat velit ultricies nec neque a arcu. Volutpat quis duis velit turpis cursus tellus at. Massa risus condimentum non feugiat facilisis. Magna urna fames nunc sagittis, in neque dolor arcu. Massa ac eget aliquam'
          }
        />
        <div className="grid grid-cols-2 md:grid-cols-2">
          <TextBlock header={'Name'} content={'Bruce Wayne'} />
          <TextBlock header={'Location'} content={'Dhaka,Bangladesh'} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2">
          <TextBlock header={'Mobile Number'} content={'0174328428394'} />
          <TextBlock header={'Email'} content={'demo@gmail.com'} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2">
          <TextBlock header={"Had pet's before"} content={'Yes'} />
          <TextBlock header={'Self-Pick Up'} content={'Yes'} />
        </div>
      </div>

      <div className="mt-5">
        <Button text="Approve Request" />
      </div>
      <div className="mt-3">
        <Button text="Reject Request" secondary={true} />
      </div>
    </div>
  );
}
