import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, navItemsLeft } from '../../Data/nav';

export default function DesktopMenu({ theme }) {
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
    </div>
  );
}
