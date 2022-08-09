import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { adminAdoptionRequestsAction } from '../actions/adminActions';
import { adoptionPostsAction } from '../actions/adoptionActions';
import { missingPostsAction } from '../actions/missingAnimalActions';
import AdoptionPostList from '../Components/List/AdoptionPostList';
import AdoptionRequestList from '../Components/List/AdoptionRequestList';
import MissingPostList from '../Components/List/MissingPostList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

export default function AdminMissingPostsPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const missingPostsData = useSelector((state) => state.missingPostsStore);
  const { loading, error, missingPosts } = missingPostsData;

  useEffect(() => {
    dispatch(missingPostsAction(pageNo, 12));
  }, [dispatch, pageNo]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto lg:w-3/4 w-[90vw] mt-[130px] lg:mt-[150px] mb-[100px]">
          <Topbar
            address={`Dashboard/Missing/Posts/Page ${pageNo + 1}`}
            link={'/dashboard'}
          />
          {missingPosts && (
            <MissingPostList
              data={missingPosts.content}
              //   banHandler={banHandler}
            />
          )}
          {missingPosts && (
            <Pagination data={missingPosts} setPageNo={setPageNo} />
          )}
        </div>
      )}
    </>
  );
}
