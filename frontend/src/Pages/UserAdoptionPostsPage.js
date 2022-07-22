import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByUserIdAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import AdoptionPostCard from '../Components/Cards/AdoptionPostCard';
import Loader from '../Components/Loader';

export default function UserAdoptionPostsPage() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const adoptionPostByUserIdData = useSelector(
    (state) => state.adoptionPostsByUserId
  );

  const { loading, error, adoptionPostByUserId } = adoptionPostByUserIdData;

  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(adoptionPostByUserIdAction(id));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        userInfo && (
          <div className="lg:w-3/4 w-[90vw]   mx-auto mt-[100px] mb-[40px] lg:flex justify-between ">
            <div className="w-full ">
              <h1 className="text-[24px] font-extrabold text-primary tracking-tighter mt-[30px] mb-3">
                Adoption posts
              </h1>
              {adoptionPostByUserId.content && (
                <AdoptionPostCard
                  data={adoptionPostByUserId.content}
                  columnSize={'lg:grid-cols-3'}
                  columnSizeXl={`xl:grid-cols-3`}
                />
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}
