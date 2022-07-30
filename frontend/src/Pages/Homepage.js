import React, { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../Components/Cards/CardList';
import Loader from '../Components/Loader';
import { adoptionPostsAction } from '../actions/adoptionActions';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import { missingPostsAction } from '../actions/missingAnimalActions';
import MissingCardList from '../Components/Cards/MissingCardList';

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(missingPostsAction(0, 8));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[140px] ">
          <h1 className="image-animation font-black tracking-tighter text-[24px] px-3 text-primary mb-[30px] border-l-4 border-l-green">
            Paws for adoption
          </h1>
          {adoptionPosts && adoptionPosts.totalElements > 0 ? (
            <CardList list={adoptionPosts.content} />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )}
          <h1 className="image-animation font-black tracking-tighter text-[24px] mb-[30px] px-3 text-primary border-l-4 border-l-red mt-[60px]">
            Paws Missing
          </h1>
          {missingPosts && missingPosts.totalElements > 0 ? (
            <MissingCardList
              list={missingPosts.content}
              buttonText={'Help me'}
            />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )}
          {/* {missingPosts && missingPosts.totalElements > 0 ? (
            <MissingCardList
              list={missingPosts.content}
              buttonText={'Help me'}
            />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )} */}
        </div>
      )}
    </>
  );
}
