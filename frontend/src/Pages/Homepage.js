import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../Components/Cards/CardList';
import Loader from '../Components/Loader';
import { adoptionPostsAction } from '../actions/adoptionActions';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import { missingPostsAction } from '../actions/missingAnimalActions';

const MissingCardList = ({ list, buttonText }) => {
  return (
    <div className="my-5 mt-[20px] grid mb-[200px]   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
      {list.map((item) => (
        <Link to={`/missing/${item.id}`}>
          <div className="image-animation card-item flex  relative justify-center overflow-hidden mx-2 w-[100%] text-offwhite h-[300px] md:w-[100%] ">
            <div
              className=" card-image w-[100%] h-[300px] md:w-[100%] cursor-pointer hover:scale-[1.3] ease-in-out duration-300"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="overlay w-[100%] h-[100%] px-5  absolute mx-auto flex flex-col justify-center bg-[#000000] bg-opacity-[0.6]">
              <div className="flex justify-between items-center relative mt-[120px] ">
                <h2 className="capitalize text-[20px] font-semibold tracking-tight ease-in-out duration-300 ">
                  {item.name}
                </h2>
                <img src="/assets/fav.svg" className="w-[25px]"></img>
              </div>
              <Link to={`/missing/${item.id}`}>
                <div className="relative mt-[20px]  mx-auto">
                  <button className="bg-brand primary-button  w-[120px] h-[45px] text-[12px] text-offwhite px-20 py-3 ">
                    <span>{buttonText ? buttonText : 'Adopt me'}</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default function Homepage() {
  const dispatch = useDispatch();
  const adoptionPostsData = useSelector((state) => state.adoptionPosts);
  const missingPostsData = useSelector((state) => state.missingPostsStore);
  const { missingPosts } = missingPostsData;
  const { loading, error, adoptionPosts } = adoptionPostsData;

  useEffect(() => {
    dispatch(adoptionPostsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(missingPostsAction());
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
          {adoptionPosts.length > 0 ? (
            <CardList list={adoptionPosts} />
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
          {missingPosts.length > 0 ? (
            <MissingCardList list={missingPosts} buttonText={'Help me'} />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )}
        </div>
      )}
    </>
  );
}
