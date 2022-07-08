import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adoptionPostsAction } from '../actions/adoptionActions';
import AdoptionHeader from '../Components/AdoptionHeader';
import Button from '../Components/Button';
import CardList from '../Components/CardList';
import Loader from '../Components/Loader';
import Searchbox from '../Components/Searchbox';

export default function Adoptionpage({ history }) {
  const dispatch = useDispatch();

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);

  const { loading, error, adoptionPosts } = adoptionPostsData;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  // const redirect = location ? location.split('=')[1] : '/';

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adoptionPostsAction());
  }, [dispatch]);

  console.log(userInfo);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[100px] mb-[100px] ">
          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center">
            <AdoptionHeader />
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
