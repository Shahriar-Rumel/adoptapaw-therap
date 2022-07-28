import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adoptionPostsAction } from '../actions/adoptionActions';
import AdoptionHeader from '../Components/Adoption/AdoptionHeader';
import Button from '../Components/Button';
import CardList from '../Components/Cards/CardList';
import Loader from '../Components/Loader';
import Topbar from '../Components/Topbar';
import Message from '../Components/Message';

export default function Adoptionpage() {
  const [size, setSize] = useState();
  const [searchName, setSearchName] = useState('');
  const [pageNo, setPageNo] = useState(0);

  const [postList, setPostList] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);
  const { loading, error, adoptionPosts } = adoptionPostsData;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adoptionPostsAction(pageNo, 12));
    setSize(adoptionPosts.totalPages);
  }, [dispatch, pageNo]);

  let numberArray = new Array();

  for (let i = 0; i < adoptionPosts.totalPages; i++) {
    numberArray[i] = i + 1;
  }

  const filteredList = (adoptionPost, searchName) => {
    // return adoptionPost.filter((name) =>
    //   Object.keys(name).some((k) =>
    //     name[k].toString().toLowerCase().includes(searchName.toLowerCase())
    //   )
    // );
    return adoptionPost.filter((Object) =>
      Object.name.toString().toLowerCase().includes(searchName.toLowerCase())
    );
  };

  const handleSearch = () => {
    if (searchName != '') {
      dispatch(adoptionPostsAction(0, adoptionPosts.totalElements));
      setPostList(filteredList(adoptionPosts.content, searchName));
    }
  };
  // useEffect(() => {
  //   if (searchName != '') {
  //     dispatch(adoptionPostsAction(0, adoptionPosts.totalElements));
  //     setPostList(filteredList(adoptionPosts.content, searchName));
  //   }
  // }, [searchName]);

  useEffect(() => {
    if (searchName === '') {
      dispatch(adoptionPostsAction(pageNo, 12));
      setPostList(adoptionPosts.content);
    }
  }, [searchName]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[90vw] mx-auto mt-[140px] mb-[100px] ">
          <Topbar address={`Home/Adoption/Page ${pageNo + 1}`} link={'/home'} />

          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center">
            <AdoptionHeader
              link={'/assets/adoption/dogowner.svg'}
              header={'Adopt helpless animals today'}
              content={
                'We’re presenting you an opportunity to give a home to a misfortunate animal today. These animals are deprived of shelter, food, and love. We are sure these animals will fill your life with laughter, recreation, and happiness.'
              }
            />

            {userInfo && (
              <Link
                to={`/adoption/${userInfo.id}/createpost`}
                className="w-[120px]"
              >
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
              <Link to={`/login`} className="w-[120px]">
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
          <div className="my-5 flex items-center justify-center">
            <div className="custom-round overflow-hidden flex  w-[90vw] lg:w-[600px] border-[1px] border-input ">
              <input
                className="bg-input border-[1px] focus:outline-none focus:border-primary border-input  h-[45px] px-4 text-[14px] w-[100%]"
                placeholder="Search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              ></input>
              <button
                className="bg-primary px-2 h-[45px] w-[45px] flex items-center justify-center "
                onClick={handleSearch}
              >
                <img src="/assets/Icons/search.svg" className="w-[20px]" />
              </button>
            </div>
          </div>
          <h1 className="font-extrabold  mt-10 mb-5 tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-brand">
            Paws for adoption
          </h1>

          {adoptionPosts && adoptionPosts.totalElements > 0 ? (
            <CardList
              list={searchName && postList ? postList : adoptionPosts.content}
            />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )}

          {adoptionPosts && (
            <div className="my-5  py-2 px-4 flex justify-center">
              <div className="flex">
                {numberArray.map((item, index) => (
                  <div
                    className={` ${
                      adoptionPosts.pageNo === item - 1
                        ? `bg-brand text-white shadow-lg`
                        : `text-gray-light shadow-md`
                    } custom-round cursor-pointer w-[40px] h-[40px] ml-2 flex items-center justify-center`}
                    onClick={() => {
                      setPageNo(item - 1);
                      setSearchName('');
                    }}
                  >
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
