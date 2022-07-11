import gsap from 'gsap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import Button from '../Components/Button';
import Features from '../Components/Adoption/Features';
import Loader from '../Components/Loader';
import RequestForm from '../Components/RequestForm';

export default function AdoptionRequestPage() {
  useEffect(() => {
    gsap.from('.request-adoption-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.request-adoption-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
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

  const submitHandler = () => {};
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] lg:mt-[200px] items-center lg:flex justify-between mb-[100px]">
          <div className="lg:w-[50%] lg:mr-6 request-adoption-gallery-animation">
            <AnimalProfileLeft poster={2} data={adoptionPostById} />
            <AnimalProfileMid poster={2} data={adoptionPostById} />
            <Features className="mt-[-20px]" data={adoptionPostById} />
          </div>
          <div>
            <div className="my-10 lg:mt-[-50px] ">
              <h1 className="font-extrabold tracking-tight leading-[24px] text-center pt-10 text-primary text-[24px]">
                Please provide information required for adoption request
              </h1>
            </div>
            <div className="request-adoption-gallery-animation">
              <form>
                <RequestForm />
                <div onClick={submitHandler}>
                  <Button text="Confirm Adoption Request" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
