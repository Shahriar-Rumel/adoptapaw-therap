import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adoptionPostByIdAction,
  adoptionPostDeleteAction
} from '../actions/adoptionActions';
import AnimalProfileBottom from '../Components/Adoption/AnimalProfileBottom';
import AnimalProfileLeft from '../Components/Adoption/AnimalProfileLeft';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import Button from '../Components/Button';
import UserAdoptionPostDetailsEditModal from '../Components/Modals/UserAdoptionDetailsEditModal';
import UserAdoptionPostDeleteModal from '../Components/Modals/UserPostDeleteModal';
import { ADOPTION_POST_DELETE_RESET } from '../constants/adoptionConstants';
import Topbar from '../Components/Topbar';

export default function UserAdoptionPostDetailsPage() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adoptionPostByIdDataSet = useSelector(
    (state) => state.adoptionPostByIdStore
  );
  const { loading, adoptionPostById } = adoptionPostByIdDataSet;

  const adoptionPostDeleteData = useSelector(
    (state) => state.adoptionPostDelete
  );
  const { loading: deleteLoading, success } = adoptionPostDeleteData;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userInfo ||
      (adoptionPostById &&
        userInfo.role[0].id != 1 &&
        userInfo.id != adoptionPostById.user.id)
    ) {
      navigate('/home');
    }
  }, [adoptionPostById, userInfo]);

  useEffect(() => {
    dispatch(adoptionPostByIdAction(id));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch({
        type: ADOPTION_POST_DELETE_RESET
      });
      if (userInfo && userInfo.role[0].id === 1) {
        navigate(`/admin/adoptionposts`);
      } else {
        navigate(`/user/profile/${userInfo.id}/adoptionposts`);
      }
    }
  }, [success]);

  const deletePosthandler = () => {
    dispatch(adoptionPostDeleteAction(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" mx-auto lg:w-3/4 w-[90vw]  mt-[120px] lg:mt-[160px] mb-[100px]">
          {userInfo && adoptionPostById && (
            <Topbar
              address={`Home/Profile/Adoption/Post/${adoptionPostById.id}`}
              link={`/user/profile/${userInfo.id}/adoptionposts`}
            />
          )}
          {!modal && (
            <div className="lg:flex lg:justify-between mt-[70px] ">
              <div className=" lg:w-[50%]  lg:mr-10">
                <div className="flex items-center  w-full mb-5">
                  {adoptionPostById && (
                    <div className="flex flex-col">
                      <h1 className=" w-full text-[32px]  text-primary font-extrabold text-left tracking-tight">
                        Adoption Post
                      </h1>
                      <h2 className="font-bold text-gray-light mt-3 mb-3">
                        Post ID :
                        <span className="text-primary ml-3">
                          {adoptionPostById.id ? adoptionPostById.id : 'N/A'}
                        </span>
                      </h2>
                    </div>
                  )}
                </div>
                <AnimalProfileLeft data={adoptionPostById} />
                <h1 className="text-[24px] font-black text-primary capitalize">
                  {adoptionPostById && adoptionPostById.name}
                </h1>
                <div className="flex justify-between items-center my-4">
                  <div className="" onClick={() => setModal(true)}>
                    <Button
                      text={'Edit'}
                      width={true}
                      widthClass={'w-[100px]'}
                    />
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
              <AnimalProfileBottom data={adoptionPostById} />
            </div>
          )}
          {modal && (
            <UserAdoptionPostDetailsEditModal
              data={adoptionPostById}
              setModal={setModal}
            />
          )}
          {deleteModal && (
            <UserAdoptionPostDeleteModal
              data={adoptionPostById}
              setModal={setDeleteModal}
              success={success}
              deleteLoading={deleteLoading}
              deletePosthandler={deletePosthandler}
            />
          )}
        </div>
      )}
    </>
  );
}
