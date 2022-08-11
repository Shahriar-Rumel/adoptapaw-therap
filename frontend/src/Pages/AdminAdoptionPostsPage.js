import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { adminAdoptionRequestsAction } from '../actions/adminActions';
import { adoptionPostsAction } from '../actions/adoptionActions';
import AdoptionPostList from '../Components/List/AdoptionPostList';
import AdoptionRequestList from '../Components/List/AdoptionRequestList';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

export default function AdminAdoptionPostsPage() {
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);
  const { loading, error, adoptionPosts } = adoptionPostsData;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(adoptionPostsAction(pageNo, 12));
  }, [dispatch, pageNo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto lg:w-3/4 w-[90vw] mt-[130px] lg:mt-[150px] mb-[100px]">
          <Topbar
            address={`Dashboard/Adoption/Posts/Page ${pageNo + 1}`}
            link={'/dashboard'}
          />
          {adoptionPosts && (
            <AdoptionPostList
              data={adoptionPosts.content}
              //   banHandler={banHandler}
            />
          )}
          {adoptionPosts && (
            <Pagination data={adoptionPosts} setPageNo={setPageNo} />
          )}
        </div>
      )}
    </>
  );
}
