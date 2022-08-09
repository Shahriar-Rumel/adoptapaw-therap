import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adoptionPostsAction } from '../actions/adoptionActions';
import AdoptionHeader from '../Components/Adoption/AdoptionHeader';
import Button from '../Components/Button';
import CardList from '../Components/Cards/CardList';
import Loader from '../Components/Loader';
import Topbar from '../Components/Topbar';
import Message from '../Components/Message';
import FilterBox from '../Components/IO/FilterBox';
import Pagination from '../Components/Pagination';
import Searchbox from '../Components/IO/Searchbox';



export default function Adoptionpage() {
  const [size, setSize] = useState();
  const [searchName, setSearchName] = useState('');
  const [availability, setAvailability] = useState();
  const [type, setType] = useState();
  const [pageNo, setPageNo] = useState(0);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [filterParam, setFilterParam] = useState();

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
  }, [dispatch, pageNo, type, availability]);

  const searchList = (adoptionPost, property, value) => {
    let name = property;
    return adoptionPost.filter((Object) =>
      Object.name.toString().toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearch = () => {
    if (searchName != '') {
      setPostList(searchList(adoptionPosts.content, 'name', searchName));
      setShowSearchBox(true);
    }
  };
  useEffect(() => {
    if (searchName != '') {
      setPostList(searchList(adoptionPosts.content, 'name', searchName));
      setShowSearchBox(true);
    } else {
      setPostList(adoptionPosts.content);
    }
  }, [searchName]);

  const filteredList = (adoptionPost, property, value) => {
    let name = property;
    if (value === 'availability') {
      value = true;
      return adoptionPost.filter((Object) => Object.availability === value);
    }
    if (value === 'Dog' || value === 'Cat') {
      return adoptionPost.filter((Object) => Object.type === value);
    }
  };
  const choiceList = [
    {
      property: 'availability',
      value: 'availability'
    },
    {
      property: 'type',
      value: 'Cat'
    },
    {
      property: 'type',
      value: 'Dog'
    }
  ];
  const filterHandler = (key, value) => {
    setPostList(filteredList(adoptionPosts.content, key, value));
    // setType(key);
    // setAvailability(value);
  };
  // useEffect(() => {
  //   if (type != '') {
  //     setPostList(filteredList(adoptionPosts.content, type, value));
  //     setShowSearchBox(true);
  //   }
  // }, [type]);

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
          <Searchbox
            searchName={searchName}
            setSearchName={setSearchName}
            handleSearch={handleSearch}
            showSearchBox={showSearchBox}
          />
          <div className="flex justify-between items-center  mt-10 mb-5 w-full ">
            <h1 className="font-extrabold tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-brand">
              Paws for adoption
            </h1>
            <div className="flex h-[20px] items-center">
              <h2 className="text-[14px]  text-gray-light w-[60px]">
                Filter By
              </h2>
              <FilterBox
                choiceList={choiceList}
                data={filterParam}
                setData={setFilterParam}
                filterHandler={filterHandler}
              />
            </div>
          </div>

          {adoptionPosts && adoptionPosts.totalElements > 0 ? (
            <CardList list={postList ? postList : adoptionPosts.content} />
          ) : (
            <Message
              message={'No adoption post available!'}
              variant={'danger'}
              active={true}
            />
          )}

          {adoptionPosts && (
            <Pagination
              data={adoptionPosts}
              setPageNo={setPageNo}
              setSearchName={setSearchName}
              setType={setType}
              setAvailability={setAvailability}
              setPostList={setPostList}
            />
          )}
        </div>
      )}
    </>
  );
}
