import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems, navItemsLeft } from '../../Data/nav';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/userActions';
import Button from '../Button';
import ProfileBurger from './ProfileBurger';

export default function DesktopMenu({ theme }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const LogoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div className="menu flex justify-between w-3/4">
      <div className=" flex justify-between md:w-[550px]">
        {navItems.map((item) => (
          <Link to={item.link}>
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
        <div
          // onClick={() => setShowProfileMenu((prev) => !prev)}
          className="cursor-pointer flex items-center flex-row justify-center relative"
        >
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
            {/* <h2 className=" text-primary font-semibold text-[14px]">
              {userInfo.username}
            </h2> */}
          </div>
          <div onClick={() => setShowProfileMenu((prev) => !prev)}>
            <ProfileBurger
              data={showProfileMenu}
              setData={setShowProfileMenu}
            />
          </div>

          {showProfileMenu && (
            <div className="w-[200px] h-[450px] menu-blur shadow-md absolute flex flex-col mr-[100px] items-center justify-between mt-[500px] custom-round px-4 py-4">
              <Link
                to={`/user/profile/${userInfo.id}`}
                className="w-[100%]"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              >
                <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                  <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                    Profile
                  </h2>
                </div>
              </Link>
              {userInfo.role[0].id === 2 ? (
                <Link
                  to={`/user/profile/${userInfo.id}/adoptionposts`}
                  className="w-[100%]"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                    <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                      My adoption posts
                    </h2>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/user/profile/${userInfo.id}/adoptionposts`}
                  className="w-[100%]"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                    <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                      Adoption Requests
                    </h2>
                  </div>
                </Link>
              )}
              {userInfo.role[0].id === 2 ? (
                <Link
                  to={`/user/profile/${userInfo.id}/missingposts`}
                  className="w-[100%]"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                    <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                      My missing posts
                    </h2>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/user/profile/${userInfo.id}/adoptionposts`}
                  className="w-[100%]"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                    <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                      Missing Leads
                    </h2>
                  </div>
                </Link>
              )}
              <Link
                to={`/user/profile/${userInfo.id}/adoptionrequests`}
                className="w-[100%]"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              >
                <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                  <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                    Adoption Posts
                  </h2>
                </div>
              </Link>
              {userInfo.role[0].id === 1 && (
                <Link
                  to={`/user/profile/${userInfo.id}/adoptionrequests`}
                  className="w-[100%]"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                    <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                      Missing Posts
                    </h2>
                  </div>
                </Link>
              )}

              <Link
                to={`/user/profile/${userInfo.id}`}
                className="w-[100%]"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              >
                <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand">
                  <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                    Donations
                  </h2>
                </div>
              </Link>
              {userInfo.role[0].id === 1 && (
                <Link
                  to={`/user/profile/${userInfo.id}`}
                  className="w-[100%]"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <div className="border-b w-[100%] py-3 border-gray text-gray-light hover:text-brand mb-5">
                    <h2 className="px-2 text-[14px] font-semibold ml-2 ">
                      Users
                    </h2>
                  </div>
                </Link>
              )}

              <div onClick={LogoutHandler}>
                <Button
                  text="Logout"
                  width={true}
                  widthClass={'w-[120px]'}
                  height={true}
                  heightClass={'h-[50px]'}
                  brand={true}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {!userInfo && (
        <div className="flex justify-between ml-10">
          {navItemsLeft.map((item) => (
            <Link to={item.link}>
              <div className="menu-item-border flex items-center justify-left mx-2 cursor-pointer my-5  rounded-full">
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
      )}
    </div>
  );
}
