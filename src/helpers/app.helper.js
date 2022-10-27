import { CATEGORIES_INFO } from "./constants";

export default class AppHelper {

    static getLocalStorageItem(key) {
        const result = localStorage.getItem(key);
        return result ? JSON.parse(result) : null
    }
    static setLocalStorageItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return value
    }

    static getAllCategories() {
        const info = this.getLocalStorageItem(CATEGORIES_INFO);
        return info ? info : []
    }

    static setAllCategories(categoryInfo) {
        this.setLocalStorageItem(CATEGORIES_INFO, categoryInfo);
        return categoryInfo
    }

    static addBookmark(categoryName, bookmarkInfo) {
        const allCateogories = this.getLocalStorageItem(CATEGORIES_INFO);
        if (!allCateogories) {
            const newCategory = { categoryName, bookmarks: [bookmarkInfo] }
            this.setAllCategories([newCategory])
            return [newCategory]
        }
        const itemIndex = allCateogories.findIndex((item) => item.categoryName == categoryName)
        if (itemIndex !== -1) {
            allCateogories[itemIndex].bookmarks.push(bookmarkInfo)
            this.setAllCategories(allCateogories)
        } else {
            const newCategory = { categoryName, bookmarks: [bookmarkInfo] }
            allCateogories.push(newCategory)
            this.setAllCategories(allCateogories)
            return allCateogories
        }
    }

    static getBookmarkInfo(categoryName, bookmarkUrl) {
        const allCateogories = this.getAllCategories()
        if (!allCateogories.length) return null
        const categoryIndex = allCateogories.findIndex((item) => item.categoryName === categoryName)

        if (categoryIndex === -1) return null

        const bookmarkIndex = allCateogories[categoryIndex].findIndex((item) => item.bookmarkUrl === bookmarkUrl)
        return bookmarkIndex === -1 ? -1 : allCateogories[categoryIndex].bookmarks[bookmarkIndex]
    }

    static redirectToExternalPage(url) {
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
        );
    };


    static getCategoryList() {
        return this.getAllCategories().filter(item => item.categoryName).map((item) => {
            return item.categoryName
        })

    };
}