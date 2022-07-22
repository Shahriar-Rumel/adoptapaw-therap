import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adoptionPostByIdAction } from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/Adoption/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import AnimalProfileMid from '../Components/Adoption/AnimalProfileMid';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Button from '../Components/Button';
import UserMissingPostEditModal from '../Components/Modals/UserMissingPostEditModal';
import UserAdoptionPostDeleteModal from '../Components/Modals/UserAdoptionPostDeleteModal';
import { missingPostByIdAction } from '../actions/missingAnimalActions';
import AttributeCard from '../Components/Cards/AttributeCard';
import RewardCard from '../Components/Cards/RewardCard';
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

const MissingAnimalProfileLayout = ({
  missingPostById,
  setModal,
  setDeleteModal
}) => {
  return (
    <div className="lg:flex lg:justify-between lg:flex-row w-full">
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
          <>
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
            <div className="missing-animation">
              <MissingFeature data={missingPostById} />
            </div>
          </>
        )}

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
        <div className="flex justify-between items-center my-4">
          <div className="" onClick={() => setModal(true)}>
            <Button text={'Edit'} width={true} widthClass={'w-[100px]'} />
          </div>

          <div className="" onClick={() => setDeleteModal(true)}>
            <Button
              text={'Delete'}
              secondary={true}
              width={true}
              widthClass={'w-[100px]'}
            />
          </div>
        </div>
      </div>

      <div className="lg:w-[50%] lg:ml-10">
        {missingPostById && (
          <>
            <div className="py-5 px-5 bg-white custom-round Attribute-card-shadow flex justify-between items-center">
              <h1 className="font-bold text-[14px] text-gray-light">Status</h1>
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
            Do you have information about Tommy?
          </h3>
          <Link to={'/missing/cat/information'}>
            <Button text="Send Information" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function UserMissingPostDetailsPage() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    gsap.from('.description-gallery-animation', {
      y: '+=110',
      opacity: 0
    });
    gsap.to('.description-gallery-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.description-image-animation', {
      opacity: 0
    });
    gsap.to('.description-image-animation', {
      opacity: 1,
      stagger: 0.2
    });
  });
  useEffect(() => {
    gsap.from('.description-animation', {
      y: '+=120',
      opacity: 0
    });
    gsap.to('.description-animation', {
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
        <div className=" lg:flex   lg:justify-between mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
          {modal && (
            <UserMissingPostEditModal
              data={missingPostById}
              setModal={setModal}
              setRefresh={setRefresh}
            />
          )}
          {deleteModal && (
            <UserAdoptionPostDeleteModal
              data={missingPostById}
              setModal={setDeleteModal}
              setRefresh={setRefresh}
            />
          )}

          <MissingAnimalProfileLayout
            missingPostById={missingPostById}
            setDeleteModal={setDeleteModal}
            setModal={setModal}
          />
        </div>
      )}
    </>
  );
}
