import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems, navItemsLeft } from '../../Data/nav';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/userActions';
import Button from '../Button';
import ProfileBurger from './ProfileBurger';
import gsap from 'gsap';

const ProfileSection = ({ userInfo }) => {
  return (
    <div className="mr-8">
      <div
        className="w-[30px] h-[30px] bg-brand rounded-[100%] flex items-center justify-center"
        style={{
          backgroundImage: `url(${userInfo.dp})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {!userInfo.dp && (
          <h1 className="uppercase font-bold text-white">
            {userInfo.username.split('')[0]}
          </h1>
        )}
      </div>
    </div>
  );
};

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
      duration: 0.5,
      stagger: 0.1
    });
  }, []);

  return (
    <div
      className={`profile-menu-bg z-[999] bg-white shadow-lg fixed top-[80px]  bottom-0  right-0 flex flex-col items-center 
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
          className=" flex flex-col profile-menu-animation opacity-0 border-b w-[100%]  py-6 border-gray text-primary hover:text-primary-hover"
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
              link={`/user/profile/${userInfo.id}/missingposts`}
              title={'Posts'}
            />
            {userInfo.role[0].id === 1 && (
              <ProfileMenuItem
                userInfo={userInfo}
                setShowProfileMenu={setShowProfileMenu}
                link={`/admin/donation/posts`}
                title={'Donation Posts'}
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
      <ProfileMenuItem
        userInfo={userInfo}
        setShowProfileMenu={setShowProfileMenu}
        link={`/user/profile/${userInfo.id}/donations`}
        title={'Donations'}
      />
      {userInfo.role[0].id === 1 && (
        <ProfileMenuItem
          userInfo={userInfo}
          setShowProfileMenu={setShowProfileMenu}
          link={`/admin/user`}
          title={'Users'}
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
      <div
        className="mt-16 profile-menu-animation bg-brand opacity-0 w-[80px] h-[80px] rounded-[100%] flex items-center justify-center"
        style={{
          backgroundImage: `url(${userInfo.dp})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {!userInfo.dp && (
          <h1 className="font-black text-[24px] text-white">
            {userInfo.name.split('')[0]}
          </h1>
        )}
      </div>
      <h2 className="profile-menu-animation text-gray-light text-[14px] tracking-tight opacity-0">
        {userInfo.name}
      </h2>
    </div>
  );
};
const AnonymousUserLeftSection = ({ theme }) => {
  return (
    <div className="flex justify-between ml-10">
      {navItemsLeft.map((item) => (
        <Link
          to={item.link}
          className="menu-item-border flex items-center justify-left mx-2 cursor-pointer my-5  rounded-full"
        >
          <img
            src={!theme ? item.imgsecondary : item.imgprimary}
            className="w-[25px] absolute"
          ></img>
          <h1
            className={
              theme
                ? 'px-2 text-primary font-semibold ml-8'
                : 'px-2 text-offwhite ml-8'
            }
          >
            {item.title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default function DesktopMenu({ theme }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const LogoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div className="menu lg:flex justify-between w-3/4 hidden  ">
      <div className="flex justify-between md:w-[680px]">
        {userInfo && userInfo.role[0].id === 1 && (
          <Link to="/dashboard">
            <div className="menu-item-border flex items-center justify-left mx-2 cursor-pointer my-5   rounded-full">
              <img
                src={
                  theme
                    ? '/assets/Icons/dashboard-primary.svg'
                    : '/assets/Icons/dashboard-secondary.svg'
                }
                className="w-[18px] absolute mt-1"
              ></img>
              <h1
                className={
                  theme
                    ? 'px-2 text-primary font-semibold ml-6'
                    : 'px-2 text-offwhite ml-6'
                }
              >
                Dashboard
              </h1>
            </div>
          </Link>
        )}
        {navItems.map((item) => (
          <Link to={item.link} key={item.link}>
            <div className="menu-item-border flex items-center justify-left mx-2 cursor-pointer my-5   rounded-full">
              <img
                src={!theme ? item.imgsecondary : item.imgprimary}
                className="w-[25px] absolute"
              ></img>
              <h1
                className={
                  theme
                    ? 'px-2 text-primary font-semibold ml-8'
                    : 'px-2 text-offwhite ml-8'
                }
              >
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
      {userInfo && (
        <div className="cursor-pointer flex items-center flex-row justify-center relative ">
          <ProfileSection userInfo={userInfo} />
          <div onClick={() => setShowProfileMenu((prev) => !prev)}>
            <ProfileBurger
              data={showProfileMenu}
              setData={setShowProfileMenu}
            />
          </div>

          {showProfileMenu && (
            <ProfileMenuSection
              userInfo={userInfo}
              setShowProfileMenu={setShowProfileMenu}
              LogoutHandler={LogoutHandler}
            />
          )}
        </div>
      )}
      {!userInfo && <AnonymousUserLeftSection theme={theme} />}
    </div>
  );
}
