import React from 'react'
import styles from '../../styles/CategoryBox.module.css'
import BookmarkItem from './BookmarkItem'
export default function CategoryBox({ category }) {
    if (!category) return null
    return (
        <div className={`shadow-md mb-3 w-16 p-2 ${styles.boxContainer}`}>
            <div>
                {category.categoryName}
            </div>
            <div>
                {category.bookmarks.map((item, index) => item && <BookmarkItem key={index} categoryName={category.categoryName} bookmark={item} />)}
            </div>
        </div>
    )
}
