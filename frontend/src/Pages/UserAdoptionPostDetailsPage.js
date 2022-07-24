import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adoptionPostByIdAction,
  adoptionPostDeleteAction
} from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/Adoption/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import Button from '../Components/Button';
import UserAdoptionPostDetailsEditModal from '../Components/Modals/UserAdoptionDetailsEditModal';
import UserAdoptionPostDeleteModal from '../Components/Modals/UserAdoptionPostDeleteModal';
import { ADOPTION_POST_DELETE_RESET } from '../constants/adoptionConstants';

export default function UserAdoptionPostDetailsPage() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    gsap.from('.description-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.description-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.description-image-animation', {
      opacity: 0
    });
    gsap.to('.description-image-animation', {
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.description-animation', {
      y: '+=120',
      opacity: 0
    });
    gsap.to('.description-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.3
    });
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );
  const adoptionPostDeleteData = useSelector(
    (state) => state.adoptionPostDelete
  );

  const { loading, error, adoptionPostById } = adoptionPostByIdDataSet;

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
    if (refresh) {
      dispatch(adoptionPostByIdAction(id));
    }
  }, [refresh]);

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
        <div className=" lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
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
                setRefresh={setRefresh}
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
