import React, { useEffect } from 'react';
import AttributeCard from '../Components/Cards/AttributeCard';
import RewardCard from '../Components/Cards/RewardCard';
import { Link, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { missingPostByIdAction } from '../actions/missingAnimalActions';
import Loader from '../Components/Loader';
import FeaturesCol from '../Components/FeaturesCol';

const MissingFeature = ({ data }) => {
  return (
    <>
      {data && (
        <div className="description-animation missing-animation flex mt-[30px]  lg:mt-[0px] lg:mb-5 justify-between items-center  mx-auto bg-primary-light py-3 px-5 custom-round">
          <div>
            <FeaturesCol title={'Breed'} value={data.breed} />
          </div>
          <div className={'border-l-brand border-l-2 pl-3'}>
            <FeaturesCol title={'Went Missing'} value={data.datemissing} />
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
  useEffect(() => {
    gsap.from('.missing-gallery-animation', {
      opacity: 0
    });
    gsap.to('.missing-gallery-animation', {
      y: '0',
      opacity: 1,
      duration: 2,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.missing-image-animation', {
      opacity: 0
    });
    gsap.to('.missing-image-animation', {
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.missing-animation', {
      y: '+=60',
      opacity: 0
    });
    gsap.to('.missing-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.3
    });
  });

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
          <div className="lg:w-[50%] lg:mr-10">
            {missingPostById && (
              <div
                className=" w-[90vw] h-[300px] lg:w-[35vw] mx-auto custom-round  missing-gallery-animation"
                style={{
                  backgroundImage: `url(${missingPostById.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
            )}

            {missingPostById && (
              <div className=" flex justify-between items-center mt-10 lg:mb-10 missing-animation">
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

            <div className="missing-animation">
              <MissingFeature data={missingPostById} />
            </div>
            <div className="  my-5 flex mx-auto items-center justify-center py-5 bg-gray-dark custom-round">
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
                <div className="py-5 px-5 bg-white custom-round Attribute-card-shadow flex justify-between items-center">
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
                <AttributeCard
                  Attribute={'Specific Attribute'}
                  feature={missingPostById.specificattribute}
                />
                <AttributeCard
                  Attribute={'Accessories Last Worn'}
                  feature={missingPostById.accessorieslastworn}
                />
                <RewardCard
                  name={missingPostById.name}
                  reward={missingPostById.rewards}
                />
              </>
            )}

            <div className="missing-animation">
              <h3 className="text-[12px] text-gray-light mt-10 mb-4">
                {missingPostById &&
                  `Do you have information about ${missingPostById.name}?`}
              </h3>
              <Link to={'/missing/cat/information'}>
                <Button text="Send Information" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
