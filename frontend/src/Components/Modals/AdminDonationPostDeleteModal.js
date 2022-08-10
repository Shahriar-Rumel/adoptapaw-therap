import React from 'react';
import Button from '../Button';
import Message from '../Message';
import UploadLoader from '../UploadLoader/UploadLoader';

export default function AdminDonatinPostDeleteModal({
  setModal,
  success,
  deleteHandler,
  deleteLoading,
  deleteError
}) {
  return (
    <div className=" top-[80px] bg-gray bg-opacity-30  z-[700] flex items-center justify-center shadow-lg fixed left-0 right-0 bottom-0">
      <div className=" w-[90%] lg:w-[600px]  bg-white custom-round px-5 py-8">
        <div className="flex justify-between items-center">
          <h1 className="font-extrabold tracking-tight text-[20px] text-primary">
            Ary you sure you want to delete this post?
          </h1>
          <div onClick={() => setModal(false)} className="cursor-pointer">
            <div className="w-[24px] h-[3px] bg-primary rotate-45 mt-1"></div>
            <div className="w-[24px] h-[3px] bg-primary -rotate-45 mt-[-3px] "></div>
          </div>
        </div>

        <p className="text-[14px] text-gray mb-10">
          You can't be able to retrive the post after deletion
        </p>
        {success && (
          <Message message={'Post Deleted successfully!'} variant={'success'} />
        )}
        {deleteError && <Message message={'deleteError'} variant={'danger'} />}

        {deleteLoading && (
          <div className="flex items-center justify-center">
            <UploadLoader />
          </div>
        )}
        <div onClick={deleteHandler}>
          <Button text={'Delete Now'} secondary={true} />
        </div>
      </div>
    </div>
  );
}
