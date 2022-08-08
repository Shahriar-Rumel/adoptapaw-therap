import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByUserIdAction } from '../actions/adoptionActions';
import AdoptionPostCard from '../Components/Cards/AdoptionPostCard';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

const ForAnimation = () => {
  useEffect(() => {
    gsap.from('.user-profile-adoption-posts-animation', {
      y: '+=60',
      autoAlpha: 0,
      stagger: 0.2
    });
    gsap.to('.user-profile-adoption-posts-animation', {
      y: '0',
      autoAlpha: 1,
      stagger: 0.2
    });
  }, []);
  return;
};
export default function UserAdoptionPostsPage() {
  const [pageNo, setPageNo] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostByUserIdData = useSelector(
    (state) => state.adoptionPostsByUserId
  );
  const { loading, error, adoptionPostByUserId } = adoptionPostByUserIdData;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(adoptionPostByUserIdAction(id, pageNo, 12));
  }, [dispatch, id, pageNo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        userInfo && (
          <div className="lg:w-3/4 w-[90vw]   mx-auto mt-[160px] mb-[40px] lg:flex justify-between ">
            <Topbar
              address={`Home/Profile/Adoption/Post/Page ${pageNo + 1}`}
              link={`/user/profile/${userInfo.id}`}
            />
            <ForAnimation />
            <div className="w-full ">
              <h1 className="user-profile-adoption-posts-animation text-[24px] font-extrabold text-primary tracking-tighter mt-[30px] mb-3">
                Adoption posts
              </h1>
              <div>
                {adoptionPostByUserId &&
                adoptionPostByUserId.content &&
                adoptionPostByUserId.content.length > 0 ? (
                  <AdoptionPostCard
                    data={adoptionPostByUserId.content}
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
              {adoptionPostByUserId && (
                <Pagination data={adoptionPostByUserId} setPageNo={setPageNo} />
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}
