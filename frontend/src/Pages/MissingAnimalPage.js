import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { missingPostsAction } from '../actions/missingAnimalActions';
import Loader from '../Components/Loader';
import Button from '../Components/Button';
import Topbar from '../Components/Topbar';
import Message from '../Components/Message';
import Pagination from '../Components/Pagination';
import Searchbox from '../Components/IO/Searchbox';
import FilterBox from '../Components/IO/FilterBox';
import MissingCardList from '../Components/Cards/MissingCardList';

export default function MissingAnimalPage() {
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

  const missingPostsData = useSelector((state) => state.missingPostsStore);
  const { loading, error, missingPosts } = missingPostsData;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(missingPostsAction(pageNo, 12));
    setSize(missingPosts.totalPages);
  }, [dispatch, pageNo, type, availability]);

  const searchList = (missingPost, value) => {
    return missingPost.filter((Object) =>
      Object.name.toString().toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearch = () => {
    if (searchName != '') {
      setPostList(searchList(missingPosts.content, searchName));
      setShowSearchBox(true);
    }
  };
  useEffect(() => {
    if (searchName != '') {
      setPostList(searchList(missingPosts.content, searchName));
      setShowSearchBox(true);
    } else {
      setPostList(missingPosts.content);
    }
  }, [searchName]);

  const filteredList = (missingPost, property, value) => {
    let name = property;
    if (value === 'Still missing') {
      value = true;
      return missingPost.filter((Object) => Object.stillmissing === value);
    }
    if (value === 'Dog' || value === 'Cat') {
      return missingPost.filter((Object) => Object.type === value);
    }
  };
  const choiceList = [
    {
      property: 'stillmissing',
      value: 'Still missing'
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
    console.log(key, value);
    setPostList(filteredList(missingPosts.content, key, value));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[90vw] mx-auto mt-[140px] lg:mt-[180px]">
          <Topbar address={`Home/Missing/Page/${pageNo + 1}`} link={'/home'} />
          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center mb-5">
            <div className="bg-gradient-to-r from-[#880000] to-[#000004]  relative w-full h-[300px] custom-round mb-16 flex items-center justify-between px-6">
              <div className=" mt-[-100px] lg:mt-[-60px] z-[10]">
                <h1 className="text-white font-bold text-[20px] lg:text-[26px] tracking-tight mb-2">
                  Missing Animals
                </h1>
                <p className="text-offwhite text-[14px] lg:w-[70%]">
                  Every pet is precious to their owners. Perform a noble deed by
                  reuniting pets with their owners. We express our gratitude to
                  every person who is willing to come forward to help find a
                  missing animal.
                </p>
              </div>
              <div className="absolute left-6 bottom-8 z-[10]">
                {userInfo && (
                  <Link
                    to={`/missing/${userInfo.id}/createpost`}
                    className="w-[120px]"
                  >
                    <Button
                      text={'Create Post'}
                      width={true}
                      widthClass={'w-[120px] lg:w-[150px]'}
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
              <img
                src="/assets/cat.png"
                className="absolute custom-round  w-[150px] lg:w-[300px] right-0 bottom-0 "
              ></img>
            </div>
          </div>
          <Searchbox
            searchName={searchName}
            setSearchName={setSearchName}
            handleSearch={handleSearch}
            showSearchBox={showSearchBox}
          />
          <div className="flex justify-between items-center  mt-10 mb-5 w-full">
            <h1 className="font-extrabold tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-red">
              Paws Missing
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

          {missingPosts && missingPosts.totalElements > 0 ? (
            <MissingCardList
              list={postList ? postList : missingPosts.content}
              buttonText={'Help me'}
            />
          ) : (
            <Message
              message={'No missing post available!'}
              variant={'danger'}
              active={true}
            />
          )}
          {missingPosts && (
            <Pagination
              data={missingPosts}
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
