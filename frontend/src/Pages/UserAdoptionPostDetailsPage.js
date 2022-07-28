import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adoptionPostByIdAction,
  adoptionPostDeleteAction
} from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/Adoption/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import Button from '../Components/Button';
import UserAdoptionPostDetailsEditModal from '../Components/Modals/UserAdoptionDetailsEditModal';
import UserAdoptionPostDeleteModal from '../Components/Modals/UserPostDeleteModal';
import { ADOPTION_POST_DELETE_RESET } from '../constants/adoptionConstants';
import Topbar from '../Components/Topbar';

export default function UserAdoptionPostDetailsPage() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );
  const { loading, error, adoptionPostById } = adoptionPostByIdDataSet;

  const adoptionPostDeleteData = useSelector(
    (state) => state.adoptionPostDelete
  );
  const { loading: deleteLoading, success } = adoptionPostDeleteData;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (adoptionPostById && userInfo.id != adoptionPostById.user.id) {
      navigate('/home');
    }
  }, [adoptionPostById]);

  useEffect(() => {
    dispatch(adoptionPostByIdAction(id));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch({
        type: ADOPTION_POST_DELETE_RESET
      });
      navigate(`/user/profile/${userInfo.id}/adoptionposts`);
    }
  }, [success]);

  const deletePosthandler = () => {
    dispatch(adoptionPostDeleteAction(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[140px] lg:mt-[160px] mb-[100px]">
          {userInfo && adoptionPostById && (
            <Topbar
              address={`Home/Profile/Adoption/Post/${adoptionPostById.id}`}
              link={`/user/profile/${userInfo.id}/adoptionposts`}
            />
          )}

          <div className=" lg:w-[50%]  lg:mr-10">
            <AnimalProfileLeft data={adoptionPostById} />
            <h1 className="text-[24px] font-black text-primary capitalize">
              {/* {adoptionPostById.name} */}
            </h1>
            <div className="flex justify-between items-center my-4">
              <div className="" onClick={() => setModal(true)}>
                <Button text={'Edit'} width={true} widthClass={'w-[100px]'} />
              </div>

              <div className="" onClick={() => setDeleteModal(true)}>
                <Button
                  text={'Delete'}
                  secondary={true}
                  width={true}
                  widthClass={'w-[100px]'}
                />
              </div>
            </div>

            {modal && (
              <UserAdoptionPostDetailsEditModal
                data={adoptionPostById}
                setModal={setModal}
              />
            )}
            {deleteModal && (
              <UserAdoptionPostDeleteModal
                data={adoptionPostById}
                setModal={setDeleteModal}
                success={success}
                deleteLoading={deleteLoading}
                deletePosthandler={deletePosthandler}
              />
            )}
            {/* <AnimalProfileMid data={adoptionPostById} /> */}
          </div>
          <AnimalProfileBottom data={adoptionPostById} />
        </div>
      )}
    </>
  );
}
