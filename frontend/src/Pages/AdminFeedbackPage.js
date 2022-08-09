import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { feedbackAction } from '../actions/feedbackActions';
import Loader from '../Components/Loader';
import Pagination from '../Components/Pagination';
import Topbar from '../Components/Topbar';

const FeedbackStat = ({ data }) => {
  let positive = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].rating > 7) {
      positive++;
    }
  }
  let rate = Math.round((positive * 100) / data.length);
  return (
    <div className=" bg-opacity-20 mt-1 px-5 custom-round text-gray-light">
      <h1>
        Positive Feedbacks
        <span className="text-white bg-green px-2 custom-round py-2 font-bold ml-2">
          {rate}%
        </span>
      </h1>
    </div>
  );
};
export default function AdminFeedbackPage() {
  const [pageNo, setPageNo] = useState(0);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const feedbackData = useSelector((state) => state.feedbackStore);

  const { loading, error, feedbacks } = feedbackData;

  useEffect(() => {
    dispatch(feedbackAction(pageNo, 8));
  }, [dispatch, pageNo]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-3/4 w-[90vw] mx-auto mt-[100px] pt-[20px] lg:pt-[40px]">
          <Topbar address={`Dashboard/Feedbacks`} link={'/dashboard'} />
          <div className="flex justify-between items-center  my-5">
            <h1 className="font-extrabold text-primary text-[24px] text-left  tracking-tight">
              Feedbacks
            </h1>
            {feedbacks && feedbacks.content && (
              <FeedbackStat data={feedbacks.content} />
            )}
          </div>

          {feedbacks &&
            feedbacks.content &&
            feedbacks.content.map((item) => (
              <div
                className={`${
                  item.rating > 7 ? 'bg-green' : `bg-red`
                } bg-opacity-20 my-3 px-4 py-5 custom-round lg:flex justify-between items-center`}
              >
                <div className="mb-5 lg:mb-0 lg:w-[80%]">
                  <p className="text-[14px] text-gray-light">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center lg:w-[18%]">
                  <h1
                    className={`text-[24px] font-black  w-full ${
                      item.rating > 7 ? 'text-brand' : 'text-black'
                    }  text-center`}
                  >
                    {item.rating}
                  </h1>
                </div>
              </div>
            ))}
          {feedbacks && <Pagination data={feedbacks} setPageNo={setPageNo} />}
        </div>
      )}
    </>
  );
}
