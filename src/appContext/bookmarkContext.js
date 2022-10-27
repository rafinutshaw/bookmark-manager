import React, { createContext, useState } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = props => {
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    return (
        <BookmarkContext.Provider value={{ selectedBookmark, setSelectedBookmark }}>{props.children}</BookmarkContext.Provider>
    );
};

