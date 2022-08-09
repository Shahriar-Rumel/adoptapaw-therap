import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { donationPostByIdAction } from '../actions/donationPostActions';
import Loader from '../Components/Loader';
import AdminDonationPostEditModal from '../Components/Modals/AdminDonationPostEditModal';
import Topbar from '../Components/Topbar';

const DonationCover = ({ data }) => {
  return (
    <>
      <div
        className="w-[100%]  h-[300px] lg:h-[500px] custom-round"
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
  let remainingamount = Number.parseInt(data.remainingamount);
  if (remainingamount < 0) remainingamount = 0;
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
            {data.remainingamount > 0 ? data.remainingamount : 0}
          </h3>
        </div>
      </div>
    </>
  );
};

export default function AdminDonationPostDetailsPage() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationPostByIdDataSet = useSelector(
    (state) => state.donationPostByIdStore
  );
  const { loading, error, donationPostById } = donationPostByIdDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(donationPostByIdAction(id));
  }, [dispatch]);

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
          <div className="lg:w-3/4 w-[90vw] mx-auto mt-[150px] mb-[40px] lg:flex justify-center">
            <Topbar
              address={`Dashboard/Donation/Post/${donationPostById.id}`}
              link={'/dashboard'}
            />
            <div className="lg:w-[1000px]">
              <DonationCover data={donationPostById} />
              <DonationHeader data={donationPostById} />
              <DonationBar data={donationPostById} />
              <div className=" flex  justify-between mt-5">
                <div onClick={() => setModal(true)}>
                  <Button width={true} text={'Edit'} widthClass={'w-[100px]'} />
                </div>
                <div>
                  <Button
                    width={true}
                    text={'Delete'}
                    widthClass={'w-[100px]'}
                    secondary={true}
                  />
                </div>
              </div>
            </div>
            {modal && (
              <AdminDonationPostEditModal
                data={donationPostById}
                setModal={setModal}
              />
            )}
            {/* {deleteModal && (
              <UserAdoptionPostDeleteModal
                data={donationPostById}
                setModal={setDeleteModal}
                setRefresh={setRefresh}
              />
            )} */}
          </div>
        )
      )}
    </>
  );
}
