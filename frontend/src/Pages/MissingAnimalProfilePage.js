import React, { useEffect, useState } from 'react';
import AttributeCard from '../Components/Cards/AttributeCard';
import RewardCard from '../Components/Cards/RewardCard';
import { Link, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { missingPostByIdAction } from '../actions/missingAnimalActions';
import Loader from '../Components/Loader';
import FeaturesCol from '../Components/FeaturesCol';
import MissingAnimalDataModal from '../Components/Modals/MissingAnimalDataModal';

const MissingFeature = ({ data }) => {
  useEffect(() => {
    gsap.fromTo(
      '.missing-profile-animation',
      { y: '+=60', autoAlpha: 0, stagger: 0.2 },
      { y: '0', autoAlpha: 1, stagger: 0.2 }
    );
  }, []);
  return (
    <>
      {data && (
        <div className="missing-profile-animation flex mt-[30px]  lg:mt-[0px] lg:mb-5 justify-between items-center  mx-auto bg-primary-light py-3 px-5 custom-round">
          <div>
            <FeaturesCol title={'Breed'} value={data.breed} />
          </div>
          <div className={'border-l-brand border-l-2 pl-3'}>
            <FeaturesCol title={'Lost on'} value={data.datemissing} />
          </div>
          <div className={'border-l-brand border-l-2 pl-3'}>
            <FeaturesCol title={'Vaccinated'} value={data.vaccine} />
          </div>
          <div className={'border-l-brand border-l-2 pl-3'}>
            <FeaturesCol title={'Color'} value={data.color} />
          </div>
        </div>
      )}
    </>
  );
};
export default function MissingAnimalProfilePage() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const missingPostByIdDataSet = useSelector(
    (state) => state.missingPostByIdStore
  );
  const { loading, error, missingPostById } = missingPostByIdDataSet;

  const { id } = useParams();

  useEffect(() => {
    dispatch(missingPostByIdAction(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:flex lg:justify-between lg:flex-row mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
          {modal && (
            <MissingAnimalDataModal
              data={missingPostById}
              setModal={setModal}
            />
          )}
          <div className="lg:w-[50%] lg:mr-10">
            {missingPostById && (
              <div
                className="bg-primary w-[90vw] h-[400px] lg:w-[35vw] mx-auto custom-round  missing-profile-animation"
                style={{
                  backgroundImage: `url(${missingPostById.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
            )}

            {missingPostById && (
              <div className=" flex justify-between items-center mt-10 lg:mb-10 missing-profile-animation">
                <h1 className="font-extrabold text-[32px] tracking-tight text-primary -mt-[4px]">
                  {missingPostById.name}
                </h1>
                <div className="flex items-center">
                  <img
                    src="/assets/Icons/location.svg"
                    className="w-[12px]"
                  ></img>
                  <h3 className="mx-2 text-[12px] font-medium text-gray-light">
                    {missingPostById.location}
                  </h3>
                </div>
              </div>
            )}

            <div className="missing-profile-animation">
              <MissingFeature data={missingPostById} />
            </div>
            <div className="  my-5 flex mx-auto items-center justify-center py-5 bg-gray-dark custom-round missing-profile-animation">
              <h3 className="mx-2 text-[12px] font-bold text-white">
                Went missing on
              </h3>
              {missingPostById && (
                <div className="relative">
                  <img
                    src="/assets/icons/bannerfordate.svg"
                    className="h-[30px]"
                  ></img>
                  <h3 className="ml-[20px] text-[12px] absolute  mt-[-25px] font-bold text-white">
                    {missingPostById.datemissing}
                  </h3>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-[50%] lg:ml-10">
            {missingPostById && (
              <>
                <div className="py-5 px-5 bg-white custom-round Attribute-card-shadow flex justify-between items-center missing-profile-animation">
                  <h1 className="font-bold text-[14px] text-gray-light">
                    Status
                  </h1>
                  {missingPostById.stillmissing && (
                    <h1
                      className={`${
                        missingPostById.stillmissing ? `text-red` : `text-green`
                      } font-extrabold tracking-tight`}
                    >
                      {missingPostById.stillmissing ? 'Missing' : 'Found'}
                    </h1>
                  )}
                </div>
                <div className="missing-profile-animation">
                  <AttributeCard
                    Attribute={'Specific Attribute'}
                    feature={missingPostById.specificattribute}
                  />
                </div>
                <div className="missing-profile-animation">
                  <AttributeCard
                    Attribute={'Accessories Last Worn'}
                    feature={missingPostById.accessorieslastworn}
                  />
                </div>
                <div className="missing-profile-animation">
                  <RewardCard
                    name={missingPostById.name}
                    reward={missingPostById.rewards}
                  />
                </div>
              </>
            )}

            <div className="missing-profile-animation">
              <h3
                className="text-[12px] text-gray-light mt-10 mb-4  <RewardCard
                  name={missingPostById.name}
                  reward={missingPostById.rewards}
                />"
              >
                {missingPostById &&
                  `Do you have information about ${missingPostById.name}?`}
              </h3>
              <div onClick={() => setModal(true)}>
                <Button text="Send Information" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
