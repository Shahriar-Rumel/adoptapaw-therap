import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, useParams } from 'react-router-dom';
import { missingPostByUserIdAction } from '../actions/missingAnimalActions';
import MissingPostCard from '../Components/Cards/MissingPostCard';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Pagination from '../Components/Pagination';

export default function UserMissingAnimalPostsPage() {
  const [pageNo, setPageNo] = useState(0);
  const [postList, setPostList] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const missingPostByUserIdData = useSelector(
    (state) => state.missingPostsByUserId
  );
  const { loading, error, missingPostByUserId } = missingPostByUserIdData;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(missingPostByUserIdAction(id, pageNo, 8));
  }, [dispatch, id, pageNo]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        userInfo && (
          <div className="lg:w-3/4 w-[90vw]  mx-auto mt-[100px] mb-[40px] lg:flex justify-between ">
            <div>
              <h1 className="text-[18px] font-bold text-primary tracking-tight mt-[30px] mb-3">
                Missing Posts
              </h1>
              <div className="lg:w-[72vw] ">
                {missingPostByUserId &&
                missingPostByUserId.content &&
                missingPostByUserId.content.length > 0 ? (
                  <MissingPostCard
                    data={missingPostByUserId.content}
                    columnSize={'lg:grid-cols-3'}
                    columnSizeXl={`xl:grid-cols-3`}
                  />
                ) : (
                  <Message
                    message={'No adoption post available!'}
                    variant={'danger'}
                    active={true}
                  />
                )}
              </div>
              {missingPostByUserId && (
                <Pagination
                  data={missingPostByUserId}
                  setPageNo={setPageNo}
                  setPostList={setPostList}
                />
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}
