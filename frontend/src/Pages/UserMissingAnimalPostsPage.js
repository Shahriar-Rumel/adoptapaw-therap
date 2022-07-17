import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByUserIdAction } from '../actions/adoptionActions';
import { missingPostByUserIdAction } from '../actions/missingAnimalActions';
import Button from '../Components/Button';
import AdoptionPostCard from '../Components/Cards/AdoptionPostCard';
import Loader from '../Components/Loader';

export default function UserMissingAnimalPostsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const missingPostByUserIdData = useSelector(
    (state) => state.missingPostsByUserId
  );

  const { loading, error, missingPostByUserId } = missingPostByUserIdData;

  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(missingPostByUserIdAction(id));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        userInfo && (
          <div className="lg:w-3/4 w-[90vw]   mx-auto mt-[100px] mb-[40px] lg:flex justify-between ">
            <div>
              <h1 className="text-[18px] font-bold text-primary tracking-tight mt-[30px] mb-3">
                Missing Posts
              </h1>
              {missingPostByUserId.contentfile && (
                <AdoptionPostCard
                  data={missingPostByUserId.contentfile}
                  columnSize={3}
                  columnSizeXl={3}
                />
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}
