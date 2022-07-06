import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, navItemsLeft } from '../../Data/nav';
import { useDispatch, useSelector, d } from 'react-redux';
import { logOut } from '../../actions/userActions';
import Button from '../Button';

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
          onClick={() => setShowProfileMenu((prev) => !prev)}
          className="cursor-pointer flex items-center flex-col relative"
        >
          <div className="w-[50px] h-[50px] bg-brand rounded-[100%]"></div>
          <h2>{userInfo.email}</h2>
          {showProfileMenu && (
            <div className="w-[200px] h-[200px] bg-white shadow-md absolute flex flex-col items-center justify-between mt-[90px] custom-round px-4 py-4">
              <h2>{userInfo.email}</h2>
              <div onClick={LogoutHandler}>
                <Button text="Logout" width={true} widthClass={'w-[100px]'} />
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
