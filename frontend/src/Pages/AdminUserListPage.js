import React from 'react';
import UserList from '../Components/List/UserList';

export default function AdminUserListPage() {
  return (
    <div className="lg:flex lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
      <h1 className="font-extrabold text-[24px] tracking-tight text-primary">
        Total user
      </h1>
      <UserList />
    </div>
  );
}
