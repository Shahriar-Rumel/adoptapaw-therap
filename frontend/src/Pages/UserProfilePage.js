import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByUserIdAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import AdoptionPostCard from '../Components/Cards/AdoptionPostCard';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Topbar from '../Components/Topbar';

const ProfileCoverSection = ({ userInfo }) => {
  useEffect(() => {
    gsap.fromTo(
      '.user-profile-animation',
      { y: '+=60', autoAlpha: 0, stagger: 0.2 },
      { y: '0', autoAlpha: 1, stagger: 0.2 }
    );
  }, []);
  return (
    <div className=" flex flex-col items-center   lg:w-[50%] xl:w-[60%]  lg:mt-[100px]  mb-[100px] lg:mr-[30px] user-profile-information-animation ">
      <div
        className="w-[140px] h-[140px] lg:w-[240px] lg:h-[240px] flex items-center justify-center rounded-[100%] bg-brand user-profile-animation"
        style={{
          backgroundImage: `url(${userInfo.dp})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {!userInfo.dp && (
          <h1 className="uppercase font-bold text-[70px] lg:text-[124px] text-white">
            {userInfo.username.split('')[0]}
          </h1>
        )}
      </div>

      <h1 className=" text-[18px] font-bold text-primary tracking-tight text-center mt-3 user-profile-animation">
        {userInfo.name}
      </h1>

      <h1 className="user-profile-animation  text-[14px] font-medium text-gray-light tracking-tight text-center mb-1">
        {userInfo.email}
      </h1>

      <div className="flex user-profile-animation ">
        <img src="/assets/icons/location.svg"></img>
        <h1 className=" text-[14px] font-medium text-gray-light tracking-tight text-center mt-0 ml-2">
          {userInfo.location ? userInfo.location : 'No Location available'}
        </h1>
      </div>
      <Link to={`/user/profile/${userInfo.id}/edit`}>
        <div className="mt-5 user-profile-animation ">
          <Button
            text={'Edit Profile'}
            brand={true}
            width={true}
            widthClass={'w-[130px]'}
            height={true}
            heightClass={'h-[45px]'}
          />
        </div>
      </Link>
    </div>
  );
};

export default function UserProfilepage() {
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
    dispatch(adoptionPostByUserIdAction(id, 0, 4));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        userInfo && (
          <div className="lg:w-3/4 w-[90vw]   mx-auto mt-[140px] mb-[40px] lg:flex justify-between overflow-y-hidden">
            <Topbar address={'Home/Profile'} link={'/home'} />
            <ProfileCoverSection userInfo={userInfo} />
            <div className=" flex flex-col  items-start justify-start mt-[50px] lg:w-[50%] user-profile-animation">
              {userInfo && (
                <div className="w-full ">
                  <h1 className="text-[18px] font-bold text-primary tracking-tight mt-3 mb-3">
                    Bio
                  </h1>
                  <p className="text-[14px] text-gray-light lg:w-[90%]">
                    {userInfo.bio ? userInfo.bio : "You haven't set up bio yet"}
                  </p>
                </div>
              )}

              <div className="w-full ">
                <h1 className="text-[18px] font-bold text-primary tracking-tight mt-[30px] mb-3 user-profile-animation">
                  Adoption Posts
                </h1>
                {adoptionPostByUserId.content &&
                  (adoptionPostByUserId.content.length > 0 ? (
                    <div className="w-full ">
                      <AdoptionPostCard
                        data={adoptionPostByUserId.content}
                        columnSize={'lg:grid-cols-1'}
                        columnSizeXl={`xl:grid-cols-1`}
                      />
                    </div>
                  ) : (
                    <Message
                      variant={'danger'}
                      message={'No post available'}
                      active={true}
                    />
                  ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
