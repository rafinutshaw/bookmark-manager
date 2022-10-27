import React, { useContext } from 'react';
import { BookmarkContext } from '../../appContext/bookmarkContext';

export default function BookmarkItem({ categoryName, bookmark }) {
  const bookmarkContext = useContext(BookmarkContext);

  const onDetailsClick = () => {
    bookmarkContext.setSelectedBookmark({ categoryName, bookmark })
  }

  return (
    <div className='border border-gray-600 flex justify-between p-2' >
      <div>{bookmark.title}</div>
      <button className='btn btn-rounded' type='button' onClick={() => onDetailsClick()} >Details</button>
    </div>
  )
}
