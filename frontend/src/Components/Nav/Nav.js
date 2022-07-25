import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Burger from './Burger';
import { useDispatch, useSelector } from 'react-redux';

export default function Nav() {
  const [mobile, setMobile] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [burger, setBurgerClicked] = useState(false);
  const [theme, setTheme] = useState(0);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  window.onscroll = () => {
    window.pageYOffset === 0 ? setScrolled(false) : setScrolled(true);
  };

  window.onload = () => {
    if (window.innerWidth < 1042) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useEffect(() => {
    if (burger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [burger]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1042) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
  }, [mobile]);

  const arr = useLocation();
  useEffect(() => {
    if (arr.pathname != '/') {
      setTheme(1);
    } else {
      setTheme(0);
    }
  }, [arr]);

  return (
    <>
      <div
        className={`${scrolled ? 'shadow-md' : 'shadow-none'}
            fixed top-0 left-0 right-0 ease-in-out z-[999] bg-white`}
      >
        <div className="flex items-center  justify-center lg:justify-between md:w-[90vw] w-[95vw] mx-auto py-4  md:py-2 z-[999]">
          <Link
            to={userInfo && userInfo.role[0].id === 1 ? '/dashboard' : '/home'}
          >
            <img
              src={!theme ? 'assets/logo.svg' : 'assets/logo-primary.svg'}
              className="w-[160px] md:w-[160px]"
              alt={!theme ? 'assets/logo.svg' : 'assets/logo-primary.svg'}
            ></img>
          </Link>
          {!mobile && <DesktopMenu theme={theme} />}
          {mobile && (
            <Burger
              burger={burger}
              setBurgerClicked={setBurgerClicked}
              theme={theme}
            />
          )}
        </div>
      </div>
      {mobile && burger && <MobileMenu setBurgerClicked={setBurgerClicked} />}
    </>
  );
}
