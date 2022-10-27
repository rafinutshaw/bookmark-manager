import React, { useContext } from 'react';
import { BookmarkContext } from '../../appContext/bookmarkContext';
import AppHelper from '../../helpers/app.helper';
import styles from '../../styles/BookmarkBox.module.css';

export default function BookmarkBox() {
    const bookmarkContext = useContext(BookmarkContext);

    const redirectPage = (url) => {
        AppHelper.redirectToExternalPage(bookmarkContext.selectedBookmark.bookmark.bookmarkUrl)
    }

    if (!bookmarkContext.selectedBookmark) return null
    return (
        <div>
            <div className={`shadow-md border border-gray-600 p-2 ${styles.boxContainer}`}>
                <div> Title: {bookmarkContext.selectedBookmark.bookmark.title}</div>
                <div>  Url: <span className='cursor-pointer' onClick={() => redirectPage()}>{bookmarkContext.selectedBookmark.bookmark.bookmarkUrl}</span></div>
                <div>Category: {bookmarkContext.selectedBookmark.categoryName}</div>
            </div>
        </div>
    )
}
