import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function List({ title, data, limit, query, page }) {
  var count = 1;
  let limitforSection = 0;
  if (limit == 0) {
    // limitforSection = data.length;
  } else limitforSection = 5;

  //   .filter((listdataitem) => listdataitem.district.includes(query))
  //   .sort((a, b) => ('' + a.date).localeCompare(b.date))

  return (
    <>
      {data && (
        <div className="mt-20 w-11/12 mx-auto">
          <div className="flex justify-center items-center">
            <h3 className="font-extrabold text-[24px] text-center tracking-tight text-primary">
              Adoption Requests
            </h3>
          </div>
          <div className=" mt-5 py-2 px-5 md:px-1  overflow-auto ">
            <table className="auto w-11/12 mx-auto shadow-md custom-round ">
              <thead className="bg-primary ">
                <tr className="mb-5 py-4 text-[14px]  tracking-tight">
                  <th className=" text-white text-left py-4 min-w-[160px] px-6 ">
                    Pet's Name
                  </th>
                  <th className=" text-white text-left   min-w-[200px]">
                    Pet's Location
                  </th>
                  <th className=" text-white text-left  min-w-[200px]">
                    Request Date
                  </th>
                  <th className=" text-white text-left min-w-[200px]">
                    Approved Date
                  </th>
                  <th className=" text-white text-left min-w-[120px]">
                    Status
                  </th>
                  <th className=" text-white text-left min-w-[120px]">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <>
                    {count++ < data.length - 1 && (
                      <tr className="border-b border-gray font-medium tracking-tight text-[14px] text-gray-light align-middle">
                        <td scope="col" className="py-4 cursor-pointer px-6">
                          {item.name}
                        </td>
                        <td>{item.location}</td>
                        <td>{item.breed}</td>
                        <td>{item.training}</td>
                        <td>{item.vaccine}</td>
                        <td>
                          <Link to={'/user/profile/1/adoptionrequests/details'}>
                            <Button
                              text={'Details'}
                              width={true}
                              widthClass={'w-[30px]'}
                              height={true}
                              heightClass={'h-[40px]'}
                              brand={true}
                            />
                          </Link>
                        </td>
                      </tr>
                    )}
                    {count === data.length - 1 && (
                      <tr className="border-0 py-4 text-[14px] text-gray-light align-middle font-medium">
                        <td className="py-4 px-6 cursor-pointer">
                          {item.name}
                        </td>
                        <td>{item.location}</td>
                        <td>{item.breed}</td>
                        <td>{item.training}</td>
                        <td>{item.vaccine}</td>
                        <td>
                          <Link to={'/user/profile/1/adoptionrequests/details'}>
                            <Button
                              text={'Details'}
                              width={true}
                              widthClass={'w-[30px]'}
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
        </div>
      )}
    </>
  );
}
