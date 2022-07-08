import gsap from 'gsap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/AnimalProfileLeft';
import AnimalProfileMid from '../Components/AnimalProfileMid';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';

export default function AdoptionAnimalProfile() {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
          <div className=" lg:w-[50%]  lg:mr-10">
            <AnimalProfileLeft data={adoptionPostById} />
            <AnimalProfileMid data={adoptionPostById} />
          </div>
          <AnimalProfileBottom data={adoptionPostById} />
        </div>
      )}
    </>
  );
}
