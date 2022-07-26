import gsap from 'gsap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/Adoption/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';

export default function AdoptionAnimalProfile() {
  const dispatch = useDispatch();

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );
  const { loading, error, adoptionPostById } = adoptionPostByIdDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(adoptionPostByIdAction(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        adoptionPostById && (
          <div className=" lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
            <div className=" lg:w-[50%]  lg:mr-10">
              <AnimalProfileLeft data={adoptionPostById} />
              <AnimalProfileMid data={adoptionPostById} />
            </div>
            <AnimalProfileBottom data={adoptionPostById} />
          </div>
        )
      )}
    </>
  );
}
