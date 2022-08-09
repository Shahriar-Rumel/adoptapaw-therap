import React, { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../Components/Cards/CardList';
import Loader from '../Components/Loader';
import { adoptionPostsAction } from '../actions/adoptionActions';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import { missingPostsAction } from '../actions/missingAnimalActions';
import MissingCardList from '../Components/Cards/MissingCardList';
import Button from '../Components/Button';

export default function Homepage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);

  const missingPostsData = useSelector((state) => state.missingPostsStore);

  const { missingPosts } = missingPostsData;
  const { loading, error, adoptionPosts } = adoptionPostsData;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role[0].id === 1) {
        navigate('/dashboard');
      }
      if (userInfo.role[0].id === 2) {
        navigate('/home');
      }
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(adoptionPostsAction(0, 8));
    dispatch(missingPostsAction(0, 8));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] lg:mt-[120px] ">
          <div className="bg-gradient-to-r from-[#3A1607] to-[#DA4A0C]  relative w-full h-[300px] custom-round mb-16 flex items-center justify-between px-6">
            <div className=" mt-[-100px] lg:mt-[-60px] z-[300]">
              <h1 className="text-white font-bold text-[20px] lg:text-[26px]  mb-2">
                Adoptapaw Encourages Charity for Animals
              </h1>
              <p className="text-white text-[14px] lg:w-[70%]">
                Adoption of animal saves those animals who cannot protect
                themselves.Having a missing animal find their way back home is a
                noble deed.Donation for sick animals is equivalent to saving a
                life.
              </p>
            </div>
            <div className="absolute left-6 bottom-8 z-[300]">
              <Button
                text={'Adopt now'}
                width={true}
                widthClass={'w-[120px] lg:w-[150px]'}
              />
            </div>
            <img
              src="/assets/cat.png"
              className="absolute custom-round  w-[150px] lg:w-[300px] right-0 bottom-0 "
            ></img>
          </div>
          <div className="flex justify-between items-center">
            <h1 className=" font-black tracking-tighter text-[24px] px-3 text-primary mb-[30px] border-l-4 border-l-green">
              Paws for adoption
            </h1>
            <Link to="/adoption">
              <Button
                text={'More'}
                secondary={true}
                width={true}
                widthClass={'w-[100px]'}
              />
            </Link>
          </div>
          {adoptionPosts && adoptionPosts.totalElements > 0 ? (
            <CardList list={adoptionPosts.content} />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )}
          <div className="flex justify-between items-center">
            <h1 className=" font-black tracking-tighter text-[24px] px-3 text-primary mb-[30px] border-l-4 border-l-red">
              Paws missing
            </h1>
            <Link to="/missing">
              <Button
                text={'More'}
                secondary={true}
                width={true}
                widthClass={'w-[100px]'}
              />
            </Link>
          </div>
          {missingPosts && missingPosts.totalElements > 0 ? (
            <MissingCardList
              list={missingPosts.content}
              buttonText={'Help me'}
            />
          ) : (
            <Message
              message={'No missing post available!'}
              variant={'danger'}
              active={true}
            />
          )}
        </div>
      )}
    </>
  );
}
