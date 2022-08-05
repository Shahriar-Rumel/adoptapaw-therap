import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Message from '../Message';

export default function AdoptionPostList({ title, data, page }) {
  var count = 0;
  return (
    <>
      {data && (
        <div className="mt-20 w-full">
          <div className="flex  items-center">
            <h3 className="font-extrabold text-[24px] text-left tracking-tight text-primary">
              Adoption Posts
            </h3>
          </div>
          {data && data.length > 0 ? (
            <div className=" mt-5 py-2 px-5 md:px-1  overflow-auto ">
              <table className="auto w-full  shadow-md custom-round ">
                <thead className="bg-primary ">
                  <tr className="mb-5 py-4 text-[14px]  tracking-tight">
                    <th className=" text-white text-left py-4 min-w-[160px] px-6 ">
                      Post ID
                    </th>
                    <th className=" text-white text-left min-w-[120px]">
                      Pet Image
                    </th>
                    <th className=" text-white text-left   min-w-[200px]">
                      Pet Name
                    </th>
                    <th className=" text-white text-left  min-w-[200px]">
                      Location
                    </th>
                    <th className=" text-white text-left min-w-[200px]">
                      Status
                    </th>

                    <th className=" text-white text-left min-w-[120px]">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <>
                      <tr
                        className={` ${
                          index < data.length - 1 && `border-b border-gray`
                        } font-medium tracking-tight text-[14px] text-gray-light align-middle`}
                      >
                        <td
                          scope="col"
                          className="py-4 font-bold text-primary cursor-pointer px-6"
                        >
                          {item.id}
                        </td>
                        <td>
                          <div className="w-[35px] h-[35px] overflow-hidden rounded-[100%] ">
                            <div
                              className="w-[35px] h-[35px] flex items-center justify-center bg-brand"
                              style={{
                                backgroundImage: `url(${item.imageone})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                              }}
                            >
                              {!item.imageone && (
                                <h1 className="text-[12px] font-bold uppercase text-white">
                                  {item.name.split('')[0]}
                                </h1>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>{!item.status ? 'Available' : 'Unavailable'}</td>

                        <td>
                          <Link
                            to={`/user/${item.id}/adoption/request/${item.id}`}
                          >
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
