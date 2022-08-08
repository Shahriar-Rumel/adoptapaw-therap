import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../actions/userActions';
import Button from '../Button';

const ProfileMenuItem = ({ userInfo, setShowProfileMenu, link, title }) => {
  return (
    <Link to={link} onClick={() => setShowProfileMenu((prev) => !prev)}>
      <div className="profile-menu-animation opacity-0 border-b w-[200px] py-6 border-gray text-primary hover:text-primary-hover">
        <h2 className="px-2 text-[14px] font-semibold tracking-tight ml-2 ">
          {title}
        </h2>
      </div>
    </Link>
  );
};

const ProfileMenuNestedItem = ({
  userInfo,
  setShowProfileMenu,
  link,
  title
}) => {
  return (
    <Link to={link} onClick={() => setShowProfileMenu((prev) => !prev)}>
      <div className="profile-nested-menu-animation opacity-0 border-b w-[180px] py-6 border-[#D9D9D9] text-gray-light hover:text-gray-hover">
        <h2 className="px-2 text-[13px] font-bold tracking-tight ml-2 ">
          {title}
        </h2>
      </div>
    </Link>
  );
};
const ProfileMenuSection = ({
  userInfo,
  setShowProfileMenu,
  LogoutHandler
}) => {
  const [adoption, setAdoption] = useState(false);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    gsap.from('.profile-menu-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.profile-menu-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, []);
  useEffect(() => {
    gsap.from('.profile-nested-menu-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.profile-nested-menu-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  }, [adoption, missing]);
  useEffect(() => {
    gsap.from('.profile-menu-bg', {
      width: '0',
      opacity: 0
    });
    gsap.to('.profile-menu-bg', {
      width: '250',
      opacity: 1,
      stagger: 0.1
    });
  }, []);

  return (
    <div
      className={`profile-menu-bg z-[999] bg-white shadow-lg fixed top-[59px]  bottom-0  left-0 flex flex-col items-center 
          px-4 py-4`}
    >
      <ProfileMenuItem
        userInfo={userInfo}
        setShowProfileMenu={setShowProfileMenu}
        link={`/user/profile/${userInfo.id}`}
        title={'Profile'}
      />
      <div className="w-[200px]">
        <div
          className=" flex flex-col profile-menu-animation  border-b w-[100%]  py-6 border-gray text-primary hover:text-primary-hover"
          onClick={() => setAdoption((prev) => !prev)}
        >
          <h2 className="px-2 text-[14px] font-semibold tracking-tight ml-2  ">
            Adoption
          </h2>
          <div className="absolute ml-[160px] mt-2">
            <div className="w-[12px] h-[2px] bg-primary"></div>
            {!adoption && (
              <div className="w-[12px] h-[2px] bg-primary rotate-90 mt-[-2px]"></div>
            )}
          </div>
        </div>
        {adoption && (
          <div className="ml-[20px]">
            <ProfileMenuNestedItem
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              link={`/adoption/${userInfo.id}/createpost`}
              title={'Create new post'}
            />
            <ProfileMenuNestedItem
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              link={`/user/profile/${userInfo.id}/adoptionposts`}
              title={'Posts'}
            />
            <ProfileMenuNestedItem
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              link={`/user/profile/${userInfo.id}/adoptionrequests`}
              title={'Requests'}
            />
          </div>
        )}
      </div>
      <div className="w-[200px]">
        <div
          className=" flex flex-col profile-menu-animation opacity-0 border-b w-[100%]  py-6 border-gray text-primary hover:text-primary-hover"
          onClick={() => setMissing((prev) => !prev)}
        >
          <h2 className="px-2 text-[14px] font-semibold tracking-tight ml-2  ">
            Missing
          </h2>
          <div className="absolute ml-[160px] mt-2">
            <div className="w-[12px] h-[2px] bg-primary"></div>
            {!missing && (
              <div className="w-[12px] h-[2px] bg-primary rotate-90 mt-[-2px]"></div>
            )}
          </div>
        </div>
        {missing && (
          <div className="ml-[20px]">
            <ProfileMenuNestedItem
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              link={`/missing/${userInfo.id}/createpost`}
              title={'Create new post'}
            />
            <ProfileMenuNestedItem
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              link={
                userInfo.role[0].id === 1
                  ? `/admin/missingposts`
                  : `/user/profile/${userInfo.id}/missingposts`
              }
              title={'Posts'}
            />
            {userInfo.role[0].id === 1 && (
              <ProfileMenuNestedItem
                userInfo={userInfo}
                setShowProfileMenu={setShowProfileMenu}
                link={`/admin/missing/info`}
                title={'Info'}
              />
            )}
          </div>
        )}
      </div>
      {userInfo.role[0].id === 1 && (
        <ProfileMenuItem
          userInfo={userInfo}
          setShowProfileMenu={setShowProfileMenu}
          link={`/admin/donation/posts`}
          title={'Donation Posts'}
        />
      )}
      {userInfo.role[0].id != 1 && (
        <ProfileMenuItem
          userInfo={userInfo}
          setShowProfileMenu={setShowProfileMenu}
          link={`/user/profile/${userInfo.id}/donations`}
          title={'Donations'}
        />
      )}
      {userInfo.role[0].id === 1 && (
        <ProfileMenuItem
          userInfo={userInfo}
          setShowProfileMenu={setShowProfileMenu}
          link={`/admin/user`}
          title={'Users'}
        />
      )}
      {userInfo.role[0].id === 1 && (
        <ProfileMenuItem
          userInfo={userInfo}
          setShowProfileMenu={setShowProfileMenu}
          link={`/admin/feedback`}
          title={'Feedbacks'}
        />
      )}
      <div
        onClick={LogoutHandler}
        className="mt-5 profile-menu-animation opacity-0"
      >
        <Button
          text="Logout"
          width={true}
          widthClass={'w-[120px]'}
          height={true}
          heightClass={'h-[50px]'}
          secondary={true}
        />
      </div>
    </div>
  );
};
export default function MobileProfileMenu({
  setShowProfileMenu,
  showProfileMenu
}) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const LogoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div>
      {userInfo && (
        <div className="cursor-pointer flex items-center flex-row justify-center relative ">
          {showProfileMenu && (
            <ProfileMenuSection
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              LogoutHandler={LogoutHandler}
            />
          )}
        </div>
      )}
    </div>
  );
}
