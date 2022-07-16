import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  missingPostByIdAction,
  missingPostsAction
} from '../actions/missingAnimalActions';
import Loader from '../Components/Loader';

import AdoptionHeader from '../Components/Adoption/AdoptionHeader';
import CardList from '../Components/Cards/CardList';
import Button from '../Components/Button';

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

              <Link to={`/adoption/${item.id}`}>
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

export default function MissingAnimalPage() {
  const dispatch = useDispatch();

  const missingPostsData = useSelector((state) => state.missingPostsStore);

  const { loading, error, missingPosts } = missingPostsData;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(missingPostsAction());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[90vw] mx-auto mt-[100px]">
          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center mb-5">
            <AdoptionHeader
              link="/assets/Lost-dog.svg"
              header="Missing Animals"
            />
            {userInfo && (
              <Link to={`/missing/${userInfo.id}/createpost`}>
                <Button
                  text="Create Post"
                  height={true}
                  heightClass="h-[50px]"
                  width={true}
                  widthClass="w-[120px]"
                />
              </Link>
            )}
            {!userInfo && (
              <Link to={`/login`}>
                <Button
                  text="Create Post"
                  height={true}
                  heightClass="h-[50px]"
                  width={true}
                  widthClass="w-[120px]"
                />
              </Link>
            )}
          </div>

          <h1 className="font-extrabold tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-red">
            Paws Missing
          </h1>

          <MissingCardList list={missingPosts} buttonText={'Help me'} />
        </div>
      )}
    </>
  );
}
