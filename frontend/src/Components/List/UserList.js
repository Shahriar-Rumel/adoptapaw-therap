import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Message from '../Message';

export default function UserList({ title, data, page }) {
  var count = 0;
  return (
    <>
      {data && (
        <div className="mt-20 w-full mx-auto">
          <div className="flex  items-center  w-11/12 mx-auto">
            <h3 className="font-extrabold text-[24px] text-left tracking-tight text-primary">
              Adoption Requests
            </h3>
          </div>
          {data && data.length > 0 ? (
            <div className=" mt-5 py-2 px-5 md:px-1  overflow-auto ">
              <table className="auto w-11/12 mx-auto shadow-md custom-round ">
                <thead className="bg-primary ">
                  <tr className="mb-5 py-4 text-[14px]  tracking-tight">
                    <th className=" text-white text-left py-4 min-w-[160px] px-6 ">
                      User ID
                    </th>
                    <th className=" text-white text-left   min-w-[200px]">
                      Name
                    </th>
                    <th className=" text-white text-left  min-w-[200px]">
                      Username
                    </th>
                    <th className=" text-white text-left min-w-[200px]">
                      Email
                    </th>
                    <th className=" text-white text-left min-w-[120px]">dp</th>
                    <th className=" text-white text-left min-w-[120px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <>
                      {count++ < data.length - 1 && (
                        <tr className="border-b border-gray font-medium tracking-tight text-[14px] text-gray-light align-middle">
                          <td scope="col" className="py-4 cursor-pointer px-6">
                            {item.id}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.dp ? 'Approved' : 'Pending'}</td>
                          <td>
                            <Link to={`/adoption/request/${item.id}`}>
                              <Button
                                text={'Details'}
                                width={true}
                                widthClass={'w-[80px]'}
                                height={true}
                                heightClass={'h-[40px]'}
                                brand={true}
                              />
                            </Link>
                          </td>
                        </tr>
                      )}
                      {count == data.length && (
                        <tr className="border-0 py-4 text-[14px] text-gray-light align-middle font-medium">
                          <td className="py-4 px-6 cursor-pointer">
                            {item.id}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.dp ? 'Approved' : 'Pending'}</td>
                          <td>
                            <Link to={`/adoption/request/${item.id}`}>
                              <Button
                                text={'Details'}
                                width={true}
                                widthClass={'w-[80px]'}
                                height={true}
                                heightClass={'h-[40px]'}
                                brand={true}
                              />
                            </Link>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-3/4 mx-auto">
              <Message
                message={"You haven't make any requests!"}
                variant={'danger'}
                active={true}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}