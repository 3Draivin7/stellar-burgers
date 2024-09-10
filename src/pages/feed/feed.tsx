import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchFeeds } from '../../services/slices/feed/feedSlice';


export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={data.orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};