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

const MissingCardList = ({ list, buttonText }) => {
  useEffect(() => {
    gsap.from('.missing-image-animation', {
      y: '+=60',
      duration: 0.4,
      opacity: 0,
      stagger: 0.2
    });
    gsap.to('.missing-image-animation', { y: '0', opacity: 1, stagger: 0.2 });
  }, []);
  return (
    <div className="my-5 mt-[20px] grid mb-[100px]   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
      {list.map((item) => (
        <Link to={`/missing/${item.id}`} className="missing-image-animation">
          <div className=" card-item flex  custom-round relative justify-center overflow-hidden mx-2 w-[100%] text-offwhite h-[300px] md:w-[100%] ">
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
                <div className="inline-flex">
                  <img
                    src="/assets/secondary/missing.svg"
                    className="w-[16px]"
                  ></img>
                  <h3
                    className={`text-[12px] ${
                      item.stillmissing ? `text-white` : `text-gray-light`
                    } mx-2`}
                  >
                    {item.stillmissing ? 'Still missing' : 'Found'}
                  </h3>
                </div>
              </div>

              {/* <Link to={`/adoption/${item.id}`}> */}
              <div className="relative mt-[20px]">
                <button className="bg-brand primary-button  w-[120px] h-[45px] text-[12px] text-offwhite px-20 py-3 ">
                  <span>{buttonText ? buttonText : 'Adopt me'}</span>
                </button>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

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
          <Topbar address={'Home/Missing'} link={'/home'} />
          <div className="flex flex-col w-[100%]  md:flex-row md:justify-between md:items-center mb-5">
            <AdoptionHeader
              link="/assets/Lost-dog.svg"
              header="Missing Animals"
              content="Every pet is precious to their owners. Perform a noble deed by reuniting pets with their owners. We express our gratitude to every person who is willing to come forward to help find a missing animal."
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
