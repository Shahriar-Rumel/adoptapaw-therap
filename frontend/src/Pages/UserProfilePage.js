import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostByUserIdAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import AdoptionPostCard from '../Components/Cards/AdoptionPostCard';
import Loader from '../Components/Loader';

export default function UserProfilepage({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const createAdoptionPost = useSelector((state) => state.CreateAdoptionPost);

  const navigate = useNavigate();

  const adoptionPostByUserIdData = useSelector(
    (state) => state.adoptionPostsByUserId
  );

  const { loading, error, adoptionPostByUserId } = adoptionPostByUserIdData;

  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [history, userInfo]);
  useEffect(() => {
    dispatch(adoptionPostByUserIdAction(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        userInfo && (
          <div className="lg:w-3/4 w-[90vw]   mx-auto mt-[100px] mb-[40px] lg:flex justify-between ">
            <div className=" flex flex-col items-center   lg:w-[50%] xl:w-[60%]  lg:mt-[100px]  lg:mr-[30px] ">
              <div
                className="w-[140px] h-[140px] lg:w-[240px] lg:h-[240px] flex items-center justify-center rounded-[100%] bg-brand"
                // style={{
                //   backgroundImage: `url("/assets/adoption/cat.jpg")`,
                //   backgroundPosition: 'center',
                //   backgroundSize: 'cover',
                //   backgroundRepeat: 'no-repeat'
                // }}
              >
                <h1 className="uppercase font-bold text-[70px] lg:text-[124px] text-white">
                  {userInfo.username.split('')[0]}
                </h1>
              </div>

              <h1 className="text-[18px] font-bold text-primary tracking-tight text-center mt-3">
                {userInfo.username}
              </h1>

              <h1 className="text-[14px] font-medium text-gray-light tracking-tight text-center mb-1">
                {userInfo.email}
              </h1>

              <div className="flex">
                <img src="/assets/icons/location.svg"></img>
                <h1 className="text-[14px] font-medium text-gray-light tracking-tight text-center mt-0 ml-2">
                  Dhaka,Bangladesh
                </h1>
              </div>
              <div className="mt-5">
                <Button
                  text={'Edit Profile'}
                  brand={true}
                  width={true}
                  widthClass={'w-[130px]'}
                  height={true}
                  heightClass={'h-[45px]'}
                />
              </div>
            </div>
            <div className=" flex flex-col  items-start justify-start mt-[50px] ">
              <div>
                <h1 className="text-[18px] font-bold text-primary tracking-tight mt-3 mb-3">
                  Bio
                </h1>
                <p className="text-[14px] text-gray-light lg:w-[90%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  scelerisque mauris pellentes lorem porttitor. Sed orci, fusce
                  proin risus, ornare id lacus cras. Justo dolor est congue
                  pulvinar scelerisque. Vulputate felis luctus urna risus
                </p>
              </div>
              <div>
                <h1 className="text-[18px] font-bold text-primary tracking-tight mt-[30px] mb-3">
                  Adoption Posts
                </h1>
                {adoptionPostByUserId.content && (
                  <AdoptionPostCard data={adoptionPostByUserId.content} />
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
