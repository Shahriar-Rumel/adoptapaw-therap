import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adoptionPostsAction } from '../actions/adoptionActions';
import AdoptionHeader from '../Components/Adoption/AdoptionHeader';
import Button from '../Components/Button';
import CardList from '../Components/Cards/CardList';
import Loader from '../Components/Loader';

export default function Adoptionpage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);
  const { loading, error, adoptionPosts } = adoptionPostsData;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adoptionPostsAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[100px] ">
          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center">
            <AdoptionHeader
              link={'/assets/adoption/dogowner.svg'}
              header={'Adopt helpless animals today'}
              content={
                'We’re presenting you an opportunity to give a home to a misfortunate animal today. These animals are deprived of shelter, food, and love. We are sure these animals will fill your life with laughter, recreation, and happiness.'
              }
            />
            {userInfo && (
              <Link to={`/adoption/${userInfo.id}/createpost`}>
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

          <h1 className="font-extrabold  mt-10 mb-5 tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-brand">
            Paws for adoption
          </h1>

          <CardList list={adoptionPosts} />
        </div>
      )}
    </>
  );
}
