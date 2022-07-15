import React, { useEffect, useState } from 'react';
import AttributeCard from '../Components/Cards/AttributeCard';
import Features from '../Components/Adoption/Features';
import RewardCard from '../Components/Cards/RewardCard';
import { Link, useParams } from 'react-router-dom';
import { adoptionListGallery } from '../Data/adoption';
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
  const [image, setImage] = useState(adoptionListGallery[0].img);

  useEffect(() => {
    gsap.from('.missing-gallery-animation', {
      //   y: '+=110',
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
            <div
              className=" w-[90vw] h-[300px] lg:w-[35vw] mx-auto  missing-gallery-animation"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className=" flex justify-between items-center mt-10 lg:mb-10 missing-animation">
              <h1 className="font-extrabold text-[32px] tracking-tight text-primary -mt-[4px]">
                Tommy
              </h1>
              <div className="flex">
                <img src="/assets/fav.svg" className="w-[20px]"></img>
                <h3 className="mx-2 text-[12px] font-medium text-gray-light">
                  Dhanmondi,Dhaka
                </h3>
              </div>
            </div>
            <div className="missing-animation">
              <MissingFeature data={missingPostById} />
            </div>
          </div>
          <div className="lg:w-[50%] lg:ml-10">
            {missingPostById && (
              <>
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
                Do you have information about Tommy?
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
