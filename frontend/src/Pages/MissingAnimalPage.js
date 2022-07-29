import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { missingPostsAction } from '../actions/missingAnimalActions';
import Loader from '../Components/Loader';
import AdoptionHeader from '../Components/Adoption/AdoptionHeader';
import Button from '../Components/Button';
import Topbar from '../Components/Topbar';
import Message from '../Components/Message';
import gsap from 'gsap';
import Pagination from '../Components/Pagination';
import Searchbox from '../Components/IO/Searchbox';
import FilterBox from '../Components/IO/FilterBox';
import MissingPostCard from '../Components/Cards/MissingPostCard';

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

  const filteredList = (adoptionPost, property, value) => {
    let name = property;
    if (value === 'missing') {
      value = true;
      return adoptionPost.filter((Object) => Object.availability === value);
    }
    if (value === 'Dog' || value === 'Cat') {
      return adoptionPost.filter((Object) => Object.type === value);
    }
  };
  const choiceList = [
    {
      property: 'still missing',
      value: 'still missing'
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
    setPostList(filteredList(missingPosts.content, key, value));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[90vw] mx-auto mt-[140px]">
          <Topbar address={`Home/Missing/Page/${pageNo + 1}`} link={'/home'} />
          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center mb-5">
            <AdoptionHeader
              link="/assets/Lost-dog.svg"
              header="Missing Animals"
              content="Every pet is precious to their owners. Perform a noble deed by reuniting pets with their owners. We express our gratitude to every person who is willing to come forward to help find a missing animal."
            />
            {userInfo && (
              <Link
                to={`/missing/${userInfo.id}/createpost`}
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
            <MissingPostCard
              list={postList ? postList : missingPosts.content}
              buttonText={'Help me'}
            />
          ) : (
            <Message
              message={'No adoption post available!'}
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
