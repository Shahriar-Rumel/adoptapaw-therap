import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../Components/CardList';
import Loader from '../Components/Loader';
import { adoptionPostsAction } from '../actions/adoptionActions';

export default function Homepage() {
  const dispatch = useDispatch();

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);

  const { loading, error, adoptionPosts } = adoptionPostsData;

  useEffect(() => {
    dispatch(adoptionPostsAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] ">
          <h1 className="image-animation font-black tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-green">
            Paws for adoption
          </h1>
          <CardList list={adoptionPosts} />
          <h1 className="image-animation font-black tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-red mt-[-100px]">
            Paws Missing
          </h1>
          {/* <CardList /> */}
        </div>
      )}
    </>
  );
}
