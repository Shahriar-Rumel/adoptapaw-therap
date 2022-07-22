import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/Adoption/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Button from '../Components/Button';
import UserAdoptionPostDetailsEditPage from '../Components/Modals/UserAdoptionDetailsEditModal';
import UserAdoptionPostDeleteModal from '../Components/Modals/UserAdoptionPostDeleteModal';

export default function UserAdoptionDetailsPage() {
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

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );

  const { loading, error, adoptionPostById } = adoptionPostByIdDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(adoptionPostByIdAction(id));
  }, [dispatch]);

  useEffect(() => {
    if (refresh) {
      dispatch(adoptionPostByIdAction(id));
    }
  }, [refresh]);

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
              <UserAdoptionPostDetailsEditPage
                data={adoptionPostById}
                setModal={setModal}
                setRefresh={setRefresh}
              />
            )}
            {deleteModal && (
              <UserAdoptionPostDeleteModal
                data={adoptionPostById}
                setModal={setDeleteModal}
                setRefresh={setRefresh}
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
