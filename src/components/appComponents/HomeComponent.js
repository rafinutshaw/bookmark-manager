import React, { useEffect, useState } from 'react';
import AppHelper from '../../helpers/app.helper';
import AddBookmarkModal from './AddBookmarkModal';
import BookmarkBox from './BookmarkBox';
import CategoryBox from './CategoryBox';

export default function HomeComponent() {

    const [allCateogories, setAllCategories] = useState([])
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        updateAllCategories();
    }, [])

    const updateAllCategories = () => {
        setAllCategories(AppHelper.getAllCategories())
    }

    const modalOnClose = (data) => {
        console.log(data)
        setOpenModal(false)

        AppHelper.addBookmark(data.categoryName, data.bookmark)
        updateAllCategories()
    };

    return (
        <div className='container '>
            <div className='text-lg font-bold pt-4'>Bookmark Manager</div>
            <div className='flex justify-end'>
                <button type='button' className='btn btn-rounded' onClick={() => setOpenModal(true)} > Add Bookmark </button>
            </div>
            <div className='flex justify-between mt-4'>
                <div>
                    {allCateogories.map((item) => <CategoryBox key={item.categoryName} category={item} />)}
                </div>
                <BookmarkBox />
            </div>
            <AddBookmarkModal
                handleClose={(value) => modalOnClose(value)}
                showModal={openModal}
            />
        </div>
    )
}
